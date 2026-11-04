import React from 'react';
import { User, Language, DocumentItem, EligibilityCheckRecord, AppNotification, Reminder } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  FileText,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Clock,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Upload,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';

interface DashboardProps {
  currentUser: User | null;
  currentLanguage: Language;
  onNavigate: (tab: 'dashboard' | 'documents' | 'schemes' | 'sources') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  documents: DocumentItem[];
  eligibilityHistory: EligibilityCheckRecord[];
  notifications: AppNotification[];
  reminders: Reminder[];
  onSelectDocument: (docId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  currentLanguage,
  onNavigate,
  onOpenAuth,
  documents,
  eligibilityHistory,
  notifications,
  reminders,
  onSelectDocument,
}) => {
  const t = TRANSLATIONS[currentLanguage];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-150">
      {/* Welcome / Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-slate-700/80 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-teal-400 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            {t.dashboard.welcome} {currentUser ? currentUser.fullName : 'Citizen / ನಾಗರಿಕರೆ'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('documents')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{t.hero.btnDocAssistance}</span>
            </button>
            <button
              onClick={() => onNavigate('schemes')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-600 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.hero.btnSchemeChecker}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Primary Pillars */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Core Citizen Modules / ಪ್ರಮುಖ ಸೇವೆಗಳು
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Module 1: Document Assistance */}
          <div
            onClick={() => onNavigate('documents')}
            className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-teal-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                  Module 1
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {t.dashboard.docAssistanceTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t.dashboard.docAssistanceDesc}
              </p>

              {/* Supported formats preview */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                <span>RTC / Pahani (Bhoomi)</span>
                <span>·</span>
                <span>Encumbrance (Kaveri)</span>
                <span>·</span>
                <span>Khata Certificate</span>
                <span>·</span>
                <span>BBMP Tax Notice</span>
                <span>·</span>
                <span>Rental Agreement</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-teal-700">
              <span>Upload or Inspect Document</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Scheme Eligibility Checker */}
          <div
            onClick={() => onNavigate('schemes')}
            className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-emerald-500/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Module 2
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t.dashboard.schemeCheckerTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {t.dashboard.schemeCheckerDesc}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-[11px] text-slate-500 font-medium">
                <span>SSP Scholarships</span>
                <span>·</span>
                <span>Gruha Lakshmi (₹2,000/mo)</span>
                <span>·</span>
                <span>Yuva Nidhi</span>
                <span>·</span>
                <span>Raitha Siri (₹10,000/ha)</span>
                <span>·</span>
                <span>Ganga Kalyana</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>Run Rule-Based Eligibility Check</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Documents & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-900">{t.dashboard.recentDocs}</h3>
            </div>
            <button
              onClick={() => onNavigate('documents')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 cursor-pointer"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="py-10 text-center border-2 border-dashed border-slate-200 rounded-lg">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600 max-w-sm mx-auto">{t.dashboard.noDocsYet}</p>
              <button
                onClick={() => onNavigate('documents')}
                className="mt-3 px-3 py-1.5 bg-slate-900 text-amber-300 rounded-md text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Analyze a Document
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {documents.slice(0, 4).map((doc) => (
                <div
                  key={doc.document_id}
                  onClick={() => {
                    onSelectDocument(doc.document_id);
                    onNavigate('documents');
                  }}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors border border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-900 truncate">{doc.file_name}</h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="text-teal-700 font-medium">
                          {doc.document_type_detected || 'Karnataka Document'}
                        </span>
                        <span>·</span>
                        <span>
                          {new Date(doc.uploaded_at).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines & Reminders */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">{t.dashboard.upcomingDeadlines}</h3>
              </div>
            </div>

            {reminders.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                No active deadlines. Action dates detected in documents will appear here.
              </p>
            ) : (
              <div className="space-y-3">
                {reminders.slice(0, 3).map((r) => (
                  <div key={r.reminder_id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                      <span>{r.title}</span>
                      <span className="text-amber-800 text-[11px] font-bold">{r.due_date}</span>
                    </div>
                    {r.description && (
                      <p className="text-[11px] text-slate-600 mt-1 leading-snug">{r.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Karnataka Portals:</span>
              <button
                onClick={() => onNavigate('sources')}
                className="text-amber-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>21 Official Portals</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Official Portals Quick Access Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {t.dashboard.verifiedSources}
            </h3>
          </div>
          <button
            onClick={() => onNavigate('sources')}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            View Complete Registry →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {[
            { name: 'Bhoomi RTC', url: 'https://landrecords.karnataka.gov.in/', tag: 'Land' },
            { name: 'Kaveri 2.0', url: 'https://kaveri.karnataka.gov.in/', tag: 'EC / Deeds' },
            { name: 'Seva Sindhu', url: 'https://sevasindhu.karnataka.gov.in/', tag: 'Services' },
            { name: 'SSP Portal', url: 'https://ssp.karnataka.gov.in/', tag: 'Scholarships' },
            { name: 'FRUITS', url: 'https://fruits.karnataka.gov.in/', tag: 'Farmers' },
            { name: 'GBA / BBMP', url: 'https://gba.karnataka.gov.in/', tag: 'Urban Tax' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-left transition-colors group block"
            >
              <div className="text-[10px] text-slate-400 font-medium">{item.tag}</div>
              <div className="text-xs font-semibold text-slate-800 group-hover:text-amber-700 flex items-center justify-between">
                <span>{item.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-amber-700" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
