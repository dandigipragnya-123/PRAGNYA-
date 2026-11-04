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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      api.auth.setSession(data.token, data.user);
      return data;
    },
    async register(data: {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      preferredLanguage: Language;
    }): Promise<{ token: string; user: User }> {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Registration failed');
      api.auth.setSession(resData.token, resData.user);
      return resData;
    },
    async getMe(): Promise<User | null> {
      const token = api.auth.getToken();
      if (!token) return null;
      try {
        const res = await fetch('/api/auth/me', { headers: getHeaders() });
        if (!res.ok) {
          api.auth.logout();
          return null;
        }
        const data = await res.json();
        if (data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
          return data.user;
        }
        return null;
      } catch {
        return null;
      }
    },
  },

  // Documents
  documents: {
    async getSamples() {
      const res = await fetch('/api/documents/samples');
      return res.json();
    },
    async loadSample(sampleId: string): Promise<DocumentItem> {
      const res = await fetch('/api/documents/load-sample', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ sampleId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load sample');
      return data;
    },
    async upload(payload: {
      fileName: string;
      fileType: string;
      fileSize: number;
      extractedText?: string;
      imageBase64?: string;
    }): Promise<{ document: DocumentItem; imageBase64?: string }> {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data;
    },
    async getAll(): Promise<DocumentItem[]> {
      const res = await fetch('/api/documents', { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch documents');
      return res.json();
    },
    async getById(id: string): Promise<DocumentItem> {
      const res = await fetch(`/api/documents/${id}`, { headers: getHeaders() });
      if (!res.ok) throw new Error('Document not found');
      return res.json();
    },
    async getAnalysis(id: string): Promise<DocumentAnalysis> {
      const res = await fetch(`/api/documents/${id}/analysis`, { headers: getHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis not found');
      return data;
    },
    async analyze(
      id: string,
      language: Language,
      imageBase64?: string,
      mimeType?: string
    ): Promise<DocumentAnalysis> {
      const res = await fetch(`/api/documents/${id}/analyze`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ language, imageBase64, mimeType }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      return data;
    },
    async delete(id: string): Promise<void> {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error('Failed to delete document');
    },
  },

  // Schemes
  schemes: {
    async getAll(category?: string): Promise<Scheme[]> {
      const url = category && category !== 'all' ? `/api/schemes?category=${category}` : '/api/schemes';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch schemes');
      return res.json();
    },
    async getById(id: string): Promise<Scheme> {
      const res = await fetch(`/api/schemes/${id}`);
      if (!res.ok) throw new Error('Scheme not found');
      return res.json();
    },
    async checkEligibility(profile: UserEligibilityProfile): Promise<EligibilityCheckRecord> {
      const res = await fetch('/api/eligibility/check', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Eligibility calculation failed');
      return data;
    },
    async getHistory(): Promise<EligibilityCheckRecord[]> {
      const res = await fetch('/api/eligibility/history', { headers: getHeaders() });
      if (!res.ok) throw new Error('Failed to fetch history');
      return res.json();
    },
    async explain(result: any, profile: UserEligibilityProfile, language: Language): Promise<string> {
      const res = await fetch('/api/gemini/explain-scheme', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ result, profile, language }),
      });
      const data = await res.json();
      return data.explanation || '';
    },
  },

  // Sources
  sources: {
    async getAll(): Promise<GovernmentSource[]> {
      const res = await fetch('/api/sources');
      if (!res.ok) throw new Error('Failed to fetch sources');
      return res.json();
    },
    async getById(id: string): Promise<GovernmentSource> {
      const res = await fetch(`/api/sources/${id}`);
      if (!res.ok) throw new Error('Source not found');
      return res.json();
    },
  },

  // Notifications
  notifications: {
    async getAll(): Promise<AppNotification[]> {
      const res = await fetch('/api/notifications', { headers: getHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
    async markRead(id: string): Promise<void> {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders(),
      });
    },
  },

  // Reminders
  reminders: {
    async getAll(): Promise<Reminder[]> {
      const res = await fetch('/api/reminders', { headers: getHeaders() });
      if (!res.ok) return [];
      return res.json();
    },
    async create(data: {
      title: string;
      description?: string;
      due_date: string;
      document_id?: string;
      scheme_id?: string;
    }): Promise<Reminder> {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Failed to create reminder');
      return resData;
    },
    async delete(id: string): Promise<void> {
      await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
    },
  },

  // Translation
  translate: {
    async text(text: string, targetLanguage: Language): Promise<string> {
      const res = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, targetLanguage }),
      });
      const data = await res.json();
      return data.translated || text;
    },
  },
};
