import {
  User,
  DocumentItem,
  DocumentAnalysis,
  Scheme,
  EligibilityCheckRecord,
  GovernmentSource,
  Reminder,
  AppNotification,
  UserEligibilityProfile,
  Language,
} from '../types';

const TOKEN_KEY = 'nagrikai_auth_token';
const USER_KEY = 'nagrikai_auth_user';

/**
 * Resolves the backend API base URL from environment variables.
 * In production when frontend is deployed on Vercel and backend is on Render/Cloud Run,
 * VITE_API_URL or VITE_BACKEND_URL points to the backend origin.
 */
export function getApiBaseUrl(): string {
  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_API_URL ||
        import.meta.env.VITE_BACKEND_URL ||
        import.meta.env.VITE_API_BASE_URL ||
        ''
      : '') || '';

  return envUrl ? envUrl.replace(/\/+$/, '') : '';
}

/**
 * Formats a clean API URL with optional base URL.
 */
export function apiUrl(endpoint: string): string {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return base ? `${base}${cleanEndpoint}` : cleanEndpoint;
}

function getHeaders(isJson = true): HeadersInit {
  const headers: Record<string, string> = {};
  if (isJson) {
    headers['Content-Type'] = 'application/json';
  }
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Safe fetch wrapper that:
 * 1. Validates Content-Type header before parsing JSON.
 * 2. Catches HTML responses (e.g. Vercel 404 / SPA index.html fallbacks / Render cold boot screens).
 * 3. Extracts meaningful error details from both Express { error } and FastAPI { detail } formats.
 * 4. Never blindly calls res.json() on HTML text, preventing "Unexpected token '<'" crashes.
 */
async function safeFetchJson<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (networkError: any) {
    const base = getApiBaseUrl();
    throw new Error(
      `Network error: Unable to connect to backend server at ${url}. ${
        base ? `(Configured API URL: ${base})` : 'Verify that the backend service is running and reachable.'
      } Details: ${networkError.message || networkError}`
    );
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.toLowerCase().includes('application/json');

  if (!isJson) {
    const rawText = await res.text().catch(() => '');
    const cleanSnippet = rawText
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    const isHtml =
      rawText.trim().startsWith('<') ||
      rawText.toLowerCase().includes('<!doctype') ||
      rawText.toLowerCase().includes('<html') ||
      cleanSnippet.toLowerCase().includes('the page could not be found');

    if (isHtml) {
      if (res.status === 404) {
        throw new Error(
          `API endpoint not found (HTTP 404): The server returned an HTML 404 page for "${url}". If deploying the frontend on Vercel and backend on Render, ensure VITE_API_URL is configured to your backend URL.`
        );
      }
      throw new Error(
        `Backend server configuration error (HTTP ${res.status}): Received an HTML webpage instead of JSON data from "${url}". Message snippet: "${cleanSnippet || 'HTML page returned'}". Ensure VITE_API_URL points to the active API backend.`
      );
    }

    if (!res.ok) {
      throw new Error(
        `Server error (HTTP ${res.status}): ${cleanSnippet || res.statusText || 'Unknown server response'}`
      );
    }

    throw new Error(
      `Unexpected response format from server (HTTP ${res.status}): Expected application/json, received "${contentType}". Content: "${cleanSnippet}"`
    );
  }

  let data: any;
  try {
    data = await res.json();
  } catch (parseError: any) {
    throw new Error(`Invalid JSON received from ${url}: ${parseError.message}`);
  }

  if (!res.ok) {
    let errorMsg = 'Request failed';
    if (data) {
      if (typeof data.error === 'string') {
        errorMsg = data.error;
      } else if (typeof data.detail === 'string') {
        errorMsg = data.detail;
      } else if (Array.isArray(data.detail)) {
        // FastAPI validation error format: [{ loc: [...], msg: "..." }]
        errorMsg = data.detail.map((d: any) => d.msg || JSON.stringify(d)).join(', ');
      } else if (typeof data.message === 'string') {
        errorMsg = data.message;
      } else {
        errorMsg = `Server error (HTTP ${res.status}): ${JSON.stringify(data)}`;
      }
    }
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  auth: {
    getToken(): string | null {
      return localStorage.getItem(TOKEN_KEY);
    },
    getCurrentUser(): User | null {
      const stored = localStorage.getItem(USER_KEY);
      if (!stored) return null;
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    },
    setSession(token: string, user: User) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    logout() {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
    async login(email: string, password: string): Promise<{ token: string; user: User }> {
      const data = await safeFetchJson<{ token?: string; access_token?: string; user: User }>(
        apiUrl('/api/auth/login'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, username: email }),
        }
      );

      const token = data.token || data.access_token || '';
      if (!token) {
        throw new Error('Authentication response did not contain a valid access token.');
      }

      api.auth.setSession(token, data.user);
      return { token, user: data.user };
    },
    async register(data: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      preferredLanguage: Language;
    }): Promise<{ token: string; user: User }> {
      const resData = await safeFetchJson<{ token?: string; access_token?: string; user: User }>(
        apiUrl('/api/auth/register'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const token = resData.token || resData.access_token || '';
      if (!token) {
        throw new Error('Registration response did not contain a valid access token.');
      }

      api.auth.setSession(token, resData.user);
      return { token, user: resData.user };
    },
    async getMe(): Promise<User | null> {
      const token = api.auth.getToken();
      if (!token) return null;
      try {
        const data = await safeFetchJson<{ user: User }>(apiUrl('/api/auth/me'), {
          headers: getHeaders(),
        });
        if (data && data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          return data.user;
        }
        return null;
      } catch (err) {
        console.warn('Failed to verify token:', err);
        return null;
      }
    },
  },

  // Documents
  documents: {
    async getSamples() {
      return safeFetchJson(apiUrl('/api/documents/samples'));
    },
    async loadSample(sampleId: string): Promise<DocumentItem> {
      return safeFetchJson<DocumentItem>(apiUrl('/api/documents/load-sample'), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ sampleId }),
      });
    },
    async upload(payload: {
      fileName: string;
      fileType: string;
      fileSize: number;
      extractedText?: string;
      imageBase64?: string;
    }): Promise<{ document: DocumentItem; imageBase64?: string }> {
      return safeFetchJson<{ document: DocumentItem; imageBase64?: string }>(
        apiUrl('/api/documents/upload'),
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify(payload),
        }
      );
    },
    async getAll(): Promise<DocumentItem[]> {
      return safeFetchJson<DocumentItem[]>(apiUrl('/api/documents'), {
        headers: getHeaders(),
      });
    },
    async getById(id: string): Promise<DocumentItem> {
      return safeFetchJson<DocumentItem>(apiUrl(`/api/documents/${id}`), {
        headers: getHeaders(),
      });
    },
    async getAnalysis(id: string): Promise<DocumentAnalysis> {
      return safeFetchJson<DocumentAnalysis>(apiUrl(`/api/documents/${id}/analysis`), {
        headers: getHeaders(),
      });
    },
    async analyze(
      id: string,
      language: Language,
      imageBase64?: string,
      mimeType?: string
    ): Promise<DocumentAnalysis> {
      return safeFetchJson<DocumentAnalysis>(apiUrl(`/api/documents/${id}/analyze`), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ language, imageBase64, mimeType }),
      });
    },
    async delete(id: string): Promise<void> {
      await safeFetchJson(apiUrl(`/api/documents/${id}`), {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },

  // Schemes
  schemes: {
    async getAll(category?: string): Promise<Scheme[]> {
      const endpoint =
        category && category !== 'all' ? `/api/schemes?category=${category}` : '/api/schemes';
      return safeFetchJson<Scheme[]>(apiUrl(endpoint));
    },
    async getById(id: string): Promise<Scheme> {
      return safeFetchJson<Scheme>(apiUrl(`/api/schemes/${id}`));
    },
    async checkEligibility(profile: UserEligibilityProfile): Promise<EligibilityCheckRecord> {
      return safeFetchJson<EligibilityCheckRecord>(apiUrl('/api/eligibility/check'), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(profile),
      });
    },
    async getHistory(): Promise<EligibilityCheckRecord[]> {
      return safeFetchJson<EligibilityCheckRecord[]>(apiUrl('/api/eligibility/history'), {
        headers: getHeaders(),
      });
    },
    async explain(result: any, profile: UserEligibilityProfile, language: Language): Promise<string> {
      const data = await safeFetchJson<{ explanation?: string }>(
        apiUrl('/api/gemini/explain-scheme'),
        {
          method: 'POST',
          headers: getHeaders(),
          body: JSON.stringify({ result, profile, language }),
        }
      );
      return data.explanation || '';
    },
  },

  // Sources
  sources: {
    async getAll(): Promise<GovernmentSource[]> {
      return safeFetchJson<GovernmentSource[]>(apiUrl('/api/sources'));
    },
    async getById(id: string): Promise<GovernmentSource> {
      return safeFetchJson<GovernmentSource>(apiUrl(`/api/sources/${id}`));
    },
  },

  // Notifications
  notifications: {
    async getAll(): Promise<AppNotification[]> {
      try {
        return await safeFetchJson<AppNotification[]>(apiUrl('/api/notifications'), {
          headers: getHeaders(),
        });
      } catch {
        return [];
      }
    },
    async markRead(id: string): Promise<void> {
      await safeFetchJson(apiUrl(`/api/notifications/${id}/read`), {
        method: 'PATCH',
        headers: getHeaders(),
      });
    },
  },

  // Reminders
  reminders: {
    async getAll(): Promise<Reminder[]> {
      try {
        return await safeFetchJson<Reminder[]>(apiUrl('/api/reminders'), {
          headers: getHeaders(),
        });
      } catch {
        return [];
      }
    },
    async create(data: {
      title: string;
      description?: string;
      due_date: string;
      document_id?: string;
      scheme_id?: string;
    }): Promise<Reminder> {
      return safeFetchJson<Reminder>(apiUrl('/api/reminders'), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
    },
    async delete(id: string): Promise<void> {
      await safeFetchJson(apiUrl(`/api/reminders/${id}`), {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },

  // Translation
  translate: {
    async text(text: string, targetLanguage: Language): Promise<string> {
      try {
        const data = await safeFetchJson<{ translated?: string }>(apiUrl('/api/gemini/translate'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLanguage }),
        });
        return data.translated || text;
      } catch {
        return text;
      }
    },
  },
};
