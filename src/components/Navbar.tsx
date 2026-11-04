import React, { useState } from 'react';
import { User, Language, AppNotification } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  FileText,
  CheckCircle2,
  BookOpen,
  Bell,
  Calendar,
  LogOut,
  User as UserIcon,
  Mic,
  ShieldCheck,
  Menu,
  X,
  Languages,
} from 'lucide-react';

interface NavbarProps {
  currentUser: User | null;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: 'dashboard' | 'documents' | 'schemes' | 'sources';
  onNavigate: (tab: 'dashboard' | 'documents' | 'schemes' | 'sources') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenReminders: () => void;
  onOpenVoice: () => void;
  notifications: AppNotification[];
  onOpenNotifications: () => void;
}

const LANGUAGES: Array<{ code: Language; name: string; native: string }> = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentLanguage,
  onLanguageChange,
  activeTab,
  onNavigate,
  onOpenAuth,
  onLogout,
  onOpenReminders,
  onOpenVoice,
  notifications,
  onOpenNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[currentLanguage];

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      {/* Top micro-bar: Karnataka emblem & official trust bar */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-amber-300">ಕರ್ನಾಟಕ ಸರ್ಕಾರ | Government of Karnataka</span>
            <span className="text-slate-500 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">Karnataka Citizen Welfare & Document Intelligence</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hidden md:inline text-[11px] text-slate-400">
              Official Portal Registry: 21 Verified Sources
            </span>
            <button
              onClick={onOpenVoice}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 text-xs transition-colors cursor-pointer"
              title="Voice Assistance (ಕನ್ನಡ / English)"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice / ಧ್ವನಿ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-3.5 text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <ShieldCheck className="w-6 h-6 text-slate-950" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                    NAGRIK<span className="text-amber-400">AI</span>
                  </span>
                  <span className="text-xs text-amber-300/90 font-medium">ಕರ್ನಾಟಕ</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-none">Citizen Assistance Platform</p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {t.nav.dashboard}
            </button>

            <button
              onClick={() => onNavigate('documents')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'documents'
                  ? 'bg-slate-800 text-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>{t.nav.documents}</span>
            </button>

            <button
              onClick={() => onNavigate('schemes')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'schemes'
                  ? 'bg-slate-800 text-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.schemes}</span>
            </button>

            <button
              onClick={() => onNavigate('sources')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'sources'
                  ? 'bg-slate-800 text-amber-300'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>{t.nav.sources}</span>
            </button>
          </nav>

          {/* Right Action Icons: Language, Notifications, Deadlines, User Profile */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                title="Change Language"
              >
                <Languages className="w-3.5 h-3.5 text-amber-400" />
                <span>{LANGUAGES.find((l) => l.code === currentLanguage)?.native}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg bg-slate-800 border border-slate-700 shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                    Select Language / ಭಾಷೆ
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700 transition-colors cursor-pointer ${
                        currentLanguage === lang.code ? 'text-amber-300 font-semibold bg-slate-700/50' : 'text-slate-300'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({lang.name})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reminders / Deadlines Button */}
            {currentUser && (
              <button
                onClick={onOpenReminders}
                className="p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                title={t.nav.reminders}
              >
                <Calendar className="w-4 h-4" />
              </button>
            )}

            {/* Notifications with counter */}
            {currentUser && (
              <button
                onClick={onOpenNotifications}
                className="relative p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            )}

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <div className="hidden lg:block text-right">
                  <div className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.fullName}</div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{currentUser.email}</div>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title={t.nav.logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-md transition-colors cursor-pointer"
                >
                  {t.nav.login}
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-md transition-colors shadow-sm cursor-pointer"
                >
                  {t.nav.signup}
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => {
              onNavigate('dashboard');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
              activeTab === 'dashboard' ? 'bg-slate-800 text-amber-300' : 'text-slate-300'
            }`}
          >
            {t.nav.dashboard}
          </button>
          <button
            onClick={() => {
              onNavigate('documents');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              activeTab === 'documents' ? 'bg-slate-800 text-amber-300' : 'text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>{t.nav.documents}</span>
          </button>
          <button
            onClick={() => {
              onNavigate('schemes');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              activeTab === 'schemes' ? 'bg-slate-800 text-amber-300' : 'text-slate-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{t.nav.schemes}</span>
          </button>
          <button
            onClick={() => {
              onNavigate('sources');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
              activeTab === 'sources' ? 'bg-slate-800 text-amber-300' : 'text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>{t.nav.sources}</span>
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => {
                onOpenVoice();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-amber-300 py-1"
            >
              <Mic className="w-4 h-4" />
              <span>Voice / ಧ್ವನಿ ಸಹಾಯಕ</span>
            </button>
            {currentUser && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-400 flex items-center gap-1 py-1"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.nav.logout}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
