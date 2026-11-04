import React, { useState, useEffect } from 'react';
import { GovernmentSource, Language, VerificationStatus } from '../types';
import { api } from '../services/api';
import { TRANSLATIONS } from '../i18n/translations';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Clock,
  Building,
  Filter,
  AlertCircle,
} from 'lucide-react';

interface SourceRegistryProps {
  currentLanguage: Language;
}

export const SourceRegistry: React.FC<SourceRegistryProps> = ({ currentLanguage }) => {
  const [sources, setSources] = useState<GovernmentSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const t = TRANSLATIONS[currentLanguage].sources;

  useEffect(() => {
    loadSources();
  }, []);

  const loadSources = async () => {
    try {
      setLoading(true);
      const data = await api.sources.getAll();
      setSources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const departments = Array.from(new Set(sources.map((s) => s.department)));

  const filteredSources = sources.filter((s) => {
    const matchesSearch =
      s.source_name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.supported_document_types.some((dt) => dt.toLowerCase().includes(search.toLowerCase())) ||
      s.notes.toLowerCase().includes(search.toLowerCase());

    const matchesPriority =
      selectedPriority === 'all' || s.authority_priority === selectedPriority;

    const matchesDept = selectedDept === 'all' || s.department === selectedDept;

    return matchesSearch && matchesPriority && matchesDept;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Verified Official</span>
          </span>
        );
      case 'Verification Due':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Verification Due</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md">
            Karnataka Official Source Registry
          </span>
          <span className="text-slate-400 text-xs">·</span>
          <span className="text-xs text-slate-500">21 Authoritative Portals</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">{t.title}</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{t.subtitle}</p>
      </div>

      {/* Trust Philosophy Callout per section 3.B */}
      <div className="p-4 bg-slate-900 text-white rounded-xl shadow-xs border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Karnataka Government Source Authority Hierarchy</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          NagrikAI references verified state data only. <strong className="text-white">Priority 1:</strong> Official Government Orders, Bhoomi, Kaveri, and Gazette Notifications. <strong className="text-white">Priority 2:</strong> Official Department portals and citizen service delivery platforms. <strong className="text-white">Priority 3:</strong> NIC state technical architecture. Random blogs and private consultant pages are strictly barred.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="Priority 1">Priority 1 (Acts/Registries)</option>
              <option value="Priority 2">Priority 2 (Official Portals)</option>
              <option value="Priority 3">Priority 3 (NIC Infrastructure)</option>
            </select>

            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-700 focus:outline-none max-w-[200px] truncate"
            >
              <option value="all">{t.allDepartments}</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>Showing {filteredSources.length} of {sources.length} registered official portals</span>
          <span className="text-emerald-700 font-semibold">100% Karnataka Government Domains</span>
        </div>
      </div>

      {/* Grid of Sources */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-500">
          Loading Karnataka Government Source Registry...
        </div>
      ) : filteredSources.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-500">
          No portals match your search query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source) => (
            <div
              key={source.source_id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {source.authority_priority}
                  </span>
                  {getStatusBadge(source.verification_status)}
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {source.source_name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{source.department}</p>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {source.notes}
                </p>

                {source.supported_document_types.length > 0 && (
                  <div className="mt-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Supported Documents / Services:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {source.supported_document_types.map((dt, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] rounded"
                        >
                          {dt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Verified: {new Date(source.last_verified_at).toLocaleDateString('en-IN')}
                </span>
                <a
                  href={source.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
