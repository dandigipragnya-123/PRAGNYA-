import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from './server/db';
import {
  authenticateToken,
  AuthenticatedRequest,
  comparePassword,
  hashPassword,
  signToken,
} from './server/auth';
import { evaluateAllSchemes, evaluateSchemeEligibility } from './server/eligibilityEngine';
import {
  analyzeKarnatakaDocument,
  explainEligibilityResult,
  translateText,
} from './server/geminiService';
import { SAMPLE_DOCUMENTS } from './server/sampleDocuments';
import { DocumentItem, Language, User } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// CORS configuration for cross-origin frontend requests (Vercel, Render, Localhost)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  next();
});

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --------------------------------------------------------
// AUTHENTICATION ROUTES
// --------------------------------------------------------

app.post(['/api/auth/register', '/auth/register'], (req: Request, res: Response): void => {
  try {
    const { fullName, email, password, confirmPassword, preferredLanguage } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({ error: 'Please provide full name, email, and password.' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      res.status(409).json({ error: 'An account with this email already exists. Please log in.' });
      return;
    }

    const newUser = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      preferredLanguage: (preferredLanguage as Language) || 'en',
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    db.createUser(newUser);

    const safeUser: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      preferredLanguage: newUser.preferredLanguage,
      createdAt: newUser.createdAt,
    };

    const token = signToken(safeUser);
    res.status(201).json({ token, user: safeUser });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal registration failure. Please try again.' });
  }
});

app.post(['/api/auth/login', '/auth/login', '/auth/token'], (req: Request, res: Response): void => {
  try {
    // Handle both JSON body (email/password or username/password for OAuth2/FastAPI standard)
    const email = req.body.email || req.body.username;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({ error: 'Email (or username) and password are required.' });
      return;
    }

    const user = db.getUserByEmail(email.trim().toLowerCase());
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const isMatch = comparePassword(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    const safeUser: User = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      preferredLanguage: user.preferredLanguage,
      createdAt: user.createdAt,
    };

    const token = signToken(safeUser);
    res.json({ token, user: safeUser, access_token: token, token_type: 'bearer' });
  } catch (err: any) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login service failed. Please try again.' });
  }
});

app.get(['/api/auth/me', '/auth/me'], authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  res.json({ user: req.user });
});

// --------------------------------------------------------
// GOVERNMENT SOURCES REGISTRY (KARNATAKA ONLY)
// --------------------------------------------------------

app.get('/api/sources', (_req: Request, res: Response): void => {
  const sources = db.getSources();
  res.json(sources);
});

app.get('/api/sources/:id', (req: Request, res: Response): void => {
  const source = db.getSourceById(req.params.id);
  if (!source) {
    res.status(404).json({ error: 'Government source not found.' });
    return;
  }
  res.json(source);
});

// --------------------------------------------------------
// KARNATAKA SCHEMES & RULE-BASED ELIGIBILITY
// --------------------------------------------------------

app.get('/api/schemes', (req: Request, res: Response): void => {
  let schemes = db.getSchemes();
  const category = req.query.category as string;
  if (category && category !== 'all') {
    schemes = schemes.filter((s) => s.scheme_category === category);
  }
  res.json(schemes);
});

app.get('/api/schemes/:id', (req: Request, res: Response): void => {
  const scheme = db.getSchemeById(req.params.id);
  if (!scheme) {
    res.status(404).json({ error: 'Karnataka scheme not found.' });
    return;
  }
  res.json(scheme);
});

app.post('/api/eligibility/check', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const profile = req.body;
    const userId = req.user!.id;

    // Rule-based engine execution
    const results = evaluateAllSchemes(profile);

    const checkRecord = {
      check_id: 'check-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      user_id: userId,
      input_profile: profile,
      results,
      checked_at: new Date().toISOString(),
    };

    db.saveEligibilityCheck(checkRecord);
    res.json(checkRecord);
  } catch (err) {
    console.error('Eligibility check error:', err);
    res.status(500).json({ error: 'Failed to process eligibility calculation.' });
  }
});

app.get('/api/eligibility/history', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const history = db.getEligibilityChecks(req.user!.id);
  res.json(history);
});

// --------------------------------------------------------
// SAMPLE KARNATAKA DOCUMENTS
// --------------------------------------------------------

app.get('/api/documents/samples', (_req: Request, res: Response): void => {
  res.json(SAMPLE_DOCUMENTS);
});

app.post('/api/documents/load-sample', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { sampleId } = req.body;
    const sample = SAMPLE_DOCUMENTS.find((s) => s.id === sampleId);

    if (!sample) {
      res.status(404).json({ error: 'Sample document not found.' });
      return;
    }

    const docId = 'doc-sample-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    const newDoc: DocumentItem = {
      document_id: docId,
      user_id: req.user!.id,
      file_name: `${sample.name}.txt`,
      file_type: 'txt',
      file_size: sample.content.length,
      document_type_detected: sample.type,
      extracted_text: sample.content,
      uploaded_at: new Date().toISOString(),
      status: 'extracted',
    };

    db.saveDocument(newDoc);
    res.status(201).json(newDoc);
  } catch (err) {
    console.error('Error loading sample document:', err);
    res.status(500).json({ error: 'Could not load sample document.' });
  }
});

// --------------------------------------------------------
// DOCUMENT ASSISTANCE & GEMINI ANALYSIS
// --------------------------------------------------------

app.post('/api/documents/upload', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { fileName, fileType, fileSize, extractedText, imageBase64 } = req.body;

    if (!fileName) {
      res.status(400).json({ error: 'File name is required.' });
      return;
    }

    const docId = 'doc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);

    const doc: DocumentItem = {
      document_id: docId,
      user_id: req.user!.id,
      file_name: fileName,
      file_type: fileType || 'pdf',
      file_size: Number(fileSize) || 1024,
      extracted_text: extractedText || '',
      uploaded_at: new Date().toISOString(),
      status: extractedText ? 'extracted' : 'uploaded',
    };

    db.saveDocument(doc);
    res.status(201).json({ document: doc, imageBase64 });
  } catch (err) {
    console.error('Document upload error:', err);
    res.status(500).json({ error: 'Failed to upload document.' });
  }
});

app.get('/api/documents', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const docs = db.getDocuments(req.user!.id);
  res.json(docs);
});

app.get('/api/documents/:id', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const doc = db.getDocumentById(req.params.id, req.user!.id);
  if (!doc) {
    res.status(404).json({ error: 'Document not found.' });
    return;
  }
  res.json(doc);
});

app.get('/api/documents/:id/analysis', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const analysis = db.getAnalysis(req.params.id, req.user!.id);
  if (!analysis) {
    res.status(404).json({ error: 'Analysis for this document has not been generated yet.' });
    return;
  }
  res.json(analysis);
});

app.post('/api/documents/:id/analyze', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const docId = req.params.id;
    const doc = db.getDocumentById(docId, req.user!.id);

    if (!doc) {
      res.status(404).json({ error: 'Document not found.' });
      return;
    }

    const { language, imageBase64, mimeType } = req.body;
    const targetLang: Language = language || req.user!.preferredLanguage || 'en';

    // Strictly isolated analysis
    const analysis = await analyzeKarnatakaDocument(
      doc.extracted_text,
      doc.file_name,
      targetLang,
      imageBase64,
      mimeType
    );

    analysis.document_id = doc.document_id;
    analysis.user_id = req.user!.id;

    // Save analysis and update doc status
    db.saveAnalysis(analysis);
    doc.status = 'analyzed';
    doc.document_type_detected = analysis.document_type;
    db.saveDocument(doc);

    // If important deadlines were extracted, generate a reminder prompt
    const deadlines = analysis.important_dates.filter((d) => d.is_deadline);
    if (deadlines.length > 0) {
      deadlines.forEach((dl) => {
        db.createReminder({
          reminder_id: 'rem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
          user_id: req.user!.id,
          title: `${analysis.document_type}: ${dl.label}`,
          description: `Action deadline extracted from your ${analysis.document_type} (${analysis.issuing_authority}).`,
          due_date: dl.date,
          document_id: doc.document_id,
          is_completed: false,
          created_at: new Date().toISOString(),
        });
      });
    }

    res.json(analysis);
  } catch (err: any) {
    console.error('Document analysis route error:', err);
    res.status(500).json({ error: 'Failed to analyze document with AI engine.' });
  }
});

app.delete('/api/documents/:id', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const success = db.deleteDocument(req.params.id, req.user!.id);
  if (!success) {
    res.status(404).json({ error: 'Document not found or unauthorized.' });
    return;
  }
  res.json({ message: 'Document and its analysis deleted successfully.' });
});

// --------------------------------------------------------
// NOTIFICATIONS & REMINDERS
// --------------------------------------------------------

app.get('/api/notifications', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const notifications = db.getNotifications(req.user!.id);
  res.json(notifications);
});

app.patch('/api/notifications/:id/read', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const success = db.markNotificationRead(req.params.id, req.user!.id);
  res.json({ success });
});

app.get('/api/reminders', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const reminders = db.getReminders(req.user!.id);
  res.json(reminders);
});

app.post('/api/reminders', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  try {
    const { title, description, due_date, document_id, scheme_id } = req.body;
    if (!title || !due_date) {
      res.status(400).json({ error: 'Title and due date are required.' });
      return;
    }

    const reminder = db.createReminder({
      reminder_id: 'rem-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      user_id: req.user!.id,
      title,
      description: description || '',
      due_date,
      document_id,
      scheme_id,
      is_completed: false,
      created_at: new Date().toISOString(),
    });

    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create reminder.' });
  }
});

app.delete('/api/reminders/:id', authenticateToken, (req: AuthenticatedRequest, res: Response): void => {
  const success = db.deleteReminder(req.params.id, req.user!.id);
  res.json({ success });
});

// --------------------------------------------------------
// GEMINI MULTILINGUAL TRANSLATION & EXPLANATION
// --------------------------------------------------------

app.post('/api/gemini/translate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
      res.status(400).json({ error: 'Text and targetLanguage are required.' });
      return;
    }
    const translated = await translateText(text, targetLanguage);
    res.json({ translated });
  } catch (err) {
    res.status(500).json({ error: 'Translation failed.' });
  }
});

app.post('/api/gemini/explain-scheme', async (req: Request, res: Response): Promise<void> => {
  try {
    const { result, profile, language } = req.body;
    const explanation = await explainEligibilityResult(result, profile, language);
    res.json({ explanation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate explanation.' });
  }
});

// --------------------------------------------------------
// API 404 JSON HANDLER & GLOBAL ERROR MIDDLEWARE
// --------------------------------------------------------

app.all(['/api/*', '/auth/*'], (req: Request, res: Response): void => {
  res.status(404).json({
    error: `API endpoint not found: ${req.method} ${req.path}`,
    detail: `No route matches ${req.method} ${req.path}. Check your request URL and HTTP method.`
  });
});

app.use((err: any, _req: Request, res: Response, _next: express.NextFunction): void => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    detail: err.detail || undefined
  });
});

// --------------------------------------------------------
// VITE DEV MIDDLEWARE / STATIC ASSETS
// --------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NagrikAI Karnataka Citizen Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
