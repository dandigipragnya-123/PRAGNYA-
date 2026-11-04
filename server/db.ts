import fs from 'fs';
import path from 'path';
import {
  User,
  DocumentItem,
  DocumentAnalysis,
  Scheme,
  EligibilityCheckRecord,
  GovernmentSource,
  Reminder,
  AppNotification,
} from '../src/types';
import { KARNATAKA_OFFICIAL_SOURCES } from './sourcesData';
import { KARNATAKA_SCHEMES } from './schemesData';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.resolve(process.cwd(), '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredUser extends User {
  passwordHash: string;
}

interface DatabaseState {
  users: StoredUser[];
  documents: DocumentItem[];
  document_analyses: DocumentAnalysis[];
  schemes: Scheme[];
  eligibility_checks: EligibilityCheckRecord[];
  government_sources: GovernmentSource[];
  notifications: AppNotification[];
  reminders: Reminder[];
}

const DB_FILE = path.join(DATA_DIR, 'nagrikai_store.json');

function loadState(): DatabaseState {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      return {
        users: parsed.users || [],
        documents: parsed.documents || [],
        document_analyses: parsed.document_analyses || [],
        schemes: (parsed.schemes && parsed.schemes.length > 0) ? parsed.schemes : KARNATAKA_SCHEMES,
        eligibility_checks: parsed.eligibility_checks || [],
        government_sources: (parsed.government_sources && parsed.government_sources.length > 0) ? parsed.government_sources : KARNATAKA_OFFICIAL_SOURCES,
        notifications: parsed.notifications || [],
        reminders: parsed.reminders || [],
      };
    }
  } catch (err) {
    console.error('Error loading local state, reinitializing:', err);
  }

  // Initial seed
  const defaultPasswordHash = bcrypt.hashSync('Karnataka@2026', 10);
  const defaultUser: StoredUser = {
    id: 'user-default-citizen',
    fullName: 'Poornima Moulya',
    email: 'poornima.moulya15@gmail.com',
    preferredLanguage: 'en',
    passwordHash: defaultPasswordHash,
    createdAt: new Date().toISOString(),
  };

  const initialNotifications: AppNotification[] = [
    {
      notification_id: 'notif-1',
      user_id: defaultUser.id,
      title: 'SSP Scholarship AY 2026-27 Open',
      message: 'State Scholarship Portal applications are currently active for Post-Matric and Pre-Matric courses. Apply with your Revenue RD number.',
      type: 'scheme',
      is_read: false,
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
      action_url: 'https://ssp.karnataka.gov.in/',
    },
    {
      notification_id: 'notif-2',
      user_id: defaultUser.id,
      title: 'Bhoomi RTC Digital Verification Update',
      message: 'Revenue Department has introduced instant Aadhaar-linked e-Pahani downloads on the official Bhoomi portal.',
      type: 'document',
      is_read: false,
      created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
      action_url: 'https://landrecords.karnataka.gov.in/',
    },
    {
      notification_id: 'notif-3',
      user_id: defaultUser.id,
      title: 'GBA / BBMP SAS Property Tax Early Rebate',
      message: 'Ensure 5% rebate compliance before May 31st by verifying your SAS property tax challan and PID number.',
      type: 'deadline',
      is_read: true,
      created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
      action_url: 'https://gba.karnataka.gov.in/',
    },
  ];

  const initialReminders: Reminder[] = [
    {
      reminder_id: 'rem-1',
      user_id: defaultUser.id,
      title: 'Submit SSP Post-Matric Scholarship Application',
      description: 'Upload fee receipt and verify Revenue RD caste/income certificate on SSP portal.',
      due_date: '2026-11-30',
      scheme_id: 'scheme-ssp-postmatric',
      is_completed: false,
      created_at: new Date().toISOString(),
    },
    {
      reminder_id: 'rem-2',
      user_id: defaultUser.id,
      title: 'Kaveri EC Verification for Property Purchase',
      description: 'Request 15-year Nil Encumbrance Certificate Form 15 on Kaveri 2.0 before executing agreement.',
      due_date: '2026-12-15',
      is_completed: false,
      created_at: new Date().toISOString(),
    },
  ];

  const state: DatabaseState = {
    users: [defaultUser],
    documents: [],
    document_analyses: [],
    schemes: KARNATAKA_SCHEMES,
    eligibility_checks: [],
    government_sources: KARNATAKA_OFFICIAL_SOURCES,
    notifications: initialNotifications,
    reminders: initialReminders,
  };

  saveState(state);
  return state;
}

let dbState = loadState();

function saveState(state: DatabaseState) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save state to disk:', err);
  }
}

export const db = {
  // Users
  getUserByEmail(email: string): StoredUser | undefined {
    return dbState.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  getUserById(id: string): StoredUser | undefined {
    return dbState.users.find((u) => u.id === id);
  },
  createUser(user: StoredUser): StoredUser {
    dbState.users.push(user);
    saveState(dbState);
    return user;
  },

  // Documents
  getDocuments(userId: string): DocumentItem[] {
    return dbState.documents
      .filter((d) => d.user_id === userId)
      .sort((a, b) => new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime());
  },
  getDocumentById(docId: string, userId: string): DocumentItem | undefined {
    return dbState.documents.find((d) => d.document_id === docId && d.user_id === userId);
  },
  saveDocument(doc: DocumentItem): DocumentItem {
    const existingIndex = dbState.documents.findIndex((d) => d.document_id === doc.document_id);
    if (existingIndex >= 0) {
      dbState.documents[existingIndex] = doc;
    } else {
      dbState.documents.push(doc);
    }
    saveState(dbState);
    return doc;
  },
  deleteDocument(docId: string, userId: string): boolean {
    const prevLen = dbState.documents.length;
    dbState.documents = dbState.documents.filter(
      (d) => !(d.document_id === docId && d.user_id === userId)
    );
    dbState.document_analyses = dbState.document_analyses.filter(
      (a) => !(a.document_id === docId && a.user_id === userId)
    );
    saveState(dbState);
    return dbState.documents.length < prevLen;
  },

  // Analyses
  saveAnalysis(analysis: DocumentAnalysis): DocumentAnalysis {
    const existingIndex = dbState.document_analyses.findIndex(
      (a) => a.document_id === analysis.document_id
    );
    if (existingIndex >= 0) {
      dbState.document_analyses[existingIndex] = analysis;
    } else {
      dbState.document_analyses.push(analysis);
    }
    saveState(dbState);
    return analysis;
  },
  getAnalysis(docId: string, userId: string): DocumentAnalysis | undefined {
    return dbState.document_analyses.find(
      (a) => a.document_id === docId && a.user_id === userId
    );
  },

  // Schemes
  getSchemes(): Scheme[] {
    return dbState.schemes;
  },
  getSchemeById(schemeId: string): Scheme | undefined {
    return dbState.schemes.find((s) => s.scheme_id === schemeId);
  },

  // Eligibility Checks
  saveEligibilityCheck(check: EligibilityCheckRecord): EligibilityCheckRecord {
    dbState.eligibility_checks.push(check);
    saveState(dbState);
    return check;
  },
  getEligibilityChecks(userId: string): EligibilityCheckRecord[] {
    return dbState.eligibility_checks
      .filter((c) => c.user_id === userId)
      .sort((a, b) => new Date(b.checked_at).getTime() - new Date(a.checked_at).getTime());
  },

  // Sources
  getSources(): GovernmentSource[] {
    return dbState.government_sources;
  },
  getSourceById(sourceId: string): GovernmentSource | undefined {
    return dbState.government_sources.find((s) => s.source_id === sourceId);
  },

  // Notifications
  getNotifications(userId: string): AppNotification[] {
    return dbState.notifications
      .filter((n) => n.user_id === userId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },
  markNotificationRead(notificationId: string, userId: string): boolean {
    const notif = dbState.notifications.find(
      (n) => n.notification_id === notificationId && n.user_id === userId
    );
    if (notif) {
      notif.is_read = true;
      saveState(dbState);
      return true;
    }
    return false;
  },
  addNotification(notif: AppNotification): AppNotification {
    dbState.notifications.unshift(notif);
    saveState(dbState);
    return notif;
  },

  // Reminders
  getReminders(userId: string): Reminder[] {
    return dbState.reminders
      .filter((r) => r.user_id === userId)
      .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  },
  createReminder(reminder: Reminder): Reminder {
    dbState.reminders.push(reminder);
    saveState(dbState);
    return reminder;
  },
  deleteReminder(reminderId: string, userId: string): boolean {
    const prevLen = dbState.reminders.length;
    dbState.reminders = dbState.reminders.filter(
      (r) => !(r.reminder_id === reminderId && r.user_id === userId)
    );
    saveState(dbState);
    return dbState.reminders.length < prevLen;
  },
};
