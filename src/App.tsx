import React, { useState, useEffect } from 'react';
import { User, Language, DocumentItem, EligibilityCheckRecord, AppNotification, Reminder } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DocumentAssistance } from './components/DocumentAssistance';
import { SchemeEligibility } from './components/SchemeEligibility';
import { SourceRegistry } from './components/SourceRegistry';
import { AuthModal } from './components/AuthModal';
import { NotificationsModal } from './components/NotificationsModal';
import { RemindersModal } from './components/RemindersModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(api.auth.getCurrentUser());
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    currentUser?.preferredLanguage || 'en'
  );
  const [activeTab, setActiveTab] = useState<'dashboard' | 'documents' | 'schemes' | 'sources'>(
    'dashboard'
  );
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [remindersModalOpen, setRemindersModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  // Data
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [eligibilityHistory, setEligibilityHistory] = useState<EligibilityCheckRecord[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    // Initial user sync
    api.auth.getMe().then((user) => {
      if (user) {
        setCurrentUser(user);
        if (user.preferredLanguage) setCurrentLanguage(user.preferredLanguage);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      refreshData();
    } else {
      setDocuments([]);
      setEligibilityHistory([]);
      setNotifications([]);
      setReminders([]);
    }
  }, [currentUser]);

  const refreshData = async () => {
    if (!currentUser) return;
    try {
      const [docs, history, notifs, rems] = await Promise.all([
        api.documents.getAll().catch(() => []),
        api.schemes.getHistory().catch(() => []),
        api.notifications.getAll().catch(() => []),
        api.reminders.getAll().catch(() => []),
      ]);
      setDocuments(docs);
      setEligibilityHistory(history);
      setNotifications(notifs);
      setReminders(rems);
    } catch (err) {
      console.error('Error refreshing state:', err);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.preferredLanguage) {
      setCurrentLanguage(user.preferredLanguage);
    }
    refreshData();
  };

  const handleLogout = () => {
    api.auth.logout();
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleCreateReminderFromDoc = async (title: string, date: string, desc?: string) => {
    if (!currentUser) {
      handleOpenAuth('login');
      return;
    }
    try {
      await api.reminders.create({
        title,
        due_date: date,
        description: desc,
      });
      refreshData();
      alert(`Reminder created for ${date}: ${title}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-200 selection:text-slate-900">
      <Navbar
        currentUser={currentUser}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          if (tab !== 'documents') {
            setSelectedDocId(null);
          }
        }}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenReminders={() => {
          if (!currentUser) handleOpenAuth('login');
          else setRemindersModalOpen(true);
        }}
        onOpenVoice={() => setVoiceModalOpen(true)}
        notifications={notifications}
        onOpenNotifications={() => {
          if (!currentUser) handleOpenAuth('login');
          else setNotificationsModalOpen(true);
        }}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <Dashboard
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onNavigate={(tab) => {
              setActiveTab(tab);
            }}
            onOpenAuth={handleOpenAuth}
            documents={documents}
            eligibilityHistory={eligibilityHistory}
            notifications={notifications}
            reminders={reminders}
            onSelectDocument={(id) => {
              setSelectedDocId(id);
              setActiveTab('documents');
            }}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentAssistance
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onOpenAuth={handleOpenAuth}
            selectedDocId={selectedDocId}
            onRefreshDocs={refreshData}
            onSetReminder={handleCreateReminderFromDoc}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemeEligibility
            currentUser={currentUser}
            currentLanguage={currentLanguage}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'sources' && <SourceRegistry currentLanguage={currentLanguage} />}
      </main>

      <Footer currentLanguage={currentLanguage} />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        currentLanguage={currentLanguage}
      />

      <NotificationsModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        notifications={notifications}
        onRefresh={refreshData}
      />

      <RemindersModal
        isOpen={remindersModalOpen}
        onClose={() => setRemindersModalOpen(false)}
        reminders={reminders}
        onRefresh={refreshData}
      />

      <VoiceAssistantModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        currentLanguage={currentLanguage}
        onNavigateToDocument={() => {
          setActiveTab('documents');
        }}
        onNavigateToSchemes={() => {
          setActiveTab('schemes');
        }}
      />
    </div>
  );
}
