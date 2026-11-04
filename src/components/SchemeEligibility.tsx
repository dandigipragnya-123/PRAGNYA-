import React, { useState, useEffect } from 'react';
import {
  Scheme,
  SchemeEligibilityResult,
  UserEligibilityProfile,
  Language,
  User,
  EligibilityStatus,
  SchemeCategory,
} from '../types';
import { api } from '../services/api';
import { TRANSLATIONS } from '../i18n/translations';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Filter,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Building,
} from 'lucide-react';

interface SchemeEligibilityProps {
  currentUser: User | null;
  currentLanguage: Language;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

const KARNATAKA_DISTRICTS = [
  'Bengaluru Urban',
  'Bengaluru Rural',
  'Bagalkote',
  'Ballari (Bellary)',
  'Belagavi (Belgaum)',
  'Bidar',
  'Chamarajanagara',
  'Chikkaballapura',
  'Chikkamagaluru',
  'Chitradurga',
  'Dakshina Kannada (Mangaluru)',
  'Davanagere',
  'Dharwad (Hubballi)',
  'Gadag',
  'Hassan',
  'Haveri',
  'Kalaburagi (Gulbarga)',
  'Kodagu (Coorg)',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysuru (Mysore)',
  'Raichur',
  'Ramanagara',
  'Shivamogga (Shimoga)',
  'Tumakuru (Tumkur)',
  'Udupi',
  'Uttara Kannada (Karwar)',
  'Vijayanagara',
  'Vijayapura (Bijapur)',
  'Yadgir',
];

export const SchemeEligibility: React.FC<SchemeEligibilityProps> = ({
  currentUser,
  currentLanguage,
  onOpenAuth,
}) => {
  const [profile, setProfile] = useState<UserEligibilityProfile>({
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    age: 24,
    occupation: 'Student',
    education_level: 'Undergraduate',
    annual_income: 180000,
    category: '2A',
    gender: 'Female',
    has_disability: false,
    owns_agricultural_land: false,
    is_graduate_unemployed: false,
    is_income_tax_payer: false,
    is_female_head_of_family: true,
  });

  const [results, setResults] = useState<SchemeEligibilityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeAdviceId, setActiveAdviceId] = useState<string | null>(null);
  const [adviceLoading, setAdviceLoading] = useState<string | null>(null);
  const [adviceCache, setAdviceCache] = useState<Record<string, string>>({});

  const t = TRANSLATIONS[currentLanguage].schemes;

  // Run initial evaluation on mount with default profile
  useEffect(() => {
    handleEvaluate();
  }, []);

  const handleEvaluate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) {
      // Evaluate locally or prompt login if checking
    }

    setLoading(true);
    setError(null);
    try {
      const res = await api.schemes.checkEligibility(profile);
      setResults(res.results);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate eligibility.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetAdvice = async (result: SchemeEligibilityResult) => {
    if (adviceCache[result.scheme_id]) {
      setActiveAdviceId(result.scheme_id);
      return;
    }

    setAdviceLoading(result.scheme_id);
    try {
      const explanation = await api.schemes.explain(result, profile, currentLanguage);
      setAdviceCache((prev) => ({ ...prev, [result.scheme_id]: explanation }));
      setActiveAdviceId(result.scheme_id);
    } catch (err) {
      console.error(err);
    } finally {
      setAdviceLoading(null);
    }
  };

  // Filter logic
  const filteredResults = results.filter((r) => {
    if (selectedCategory !== 'all' && r.category !== selectedCategory) return false;
    if (selectedStatus === 'eligible' && r.status !== 'LIKELY ELIGIBLE') return false;
    if (selectedStatus === 'not_eligible' && r.status !== 'NOT ELIGIBLE') return false;
    if (selectedStatus === 'more_info' && r.status !== 'MORE INFORMATION REQUIRED') return false;
    return true;
  });

  const getStatusBadge = (status: EligibilityStatus) => {
    switch (status) {
      case 'LIKELY ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>LIKELY ELIGIBLE</span>
          </span>
        );
      case 'NOT ELIGIBLE':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>NOT ELIGIBLE</span>
          </span>
        );
      case 'MORE INFORMATION REQUIRED':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>MORE INFO REQUIRED</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            <span>UNABLE TO VERIFY</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
            Module 2: Scheme Eligibility Checker
          </span>
          <span className="text-slate-400 text-xs">·</span>
          <span className="text-xs text-slate-500">Official Karnataka Government Orders & Rules</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">{t.title}</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Citizen Information Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs lg:sticky lg:top-24">
          <h2 className="text-sm font-bold text-slate-900 mb-1">{t.formTitle}</h2>
          <p className="text-xs text-slate-500 mb-4">
            Fields are conditional based on your occupation and family setup:
          </p>

          <form onSubmit={handleEvaluate} className="space-y-3.5 text-xs">
            {/* State & District */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-slate-700 mb-1">State / ರಾಜ್ಯ</label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                >
                  <option value="Karnataka">Karnataka (ಕರ್ನಾಟಕ)</option>
                  <option value="Other">Other State</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">District / ಜಿಲ್ಲೆ</label>
                <select
                  value={profile.district}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900 truncate"
                >
                  {KARNATAKA_DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Age (Years) / ವಯಸ್ಸು</label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={profile.age ?? ''}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Gender / ಲಿಂಗ</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                >
                  <option value="Female">Female (ಮಹಿಳೆ)</option>
                  <option value="Male">Male (ಪುರುಷ)</option>
                  <option value="Transgender">Transgender (ತೃತೀಯಲಿಂಗಿ)</option>
                </select>
              </div>
            </div>

            {/* Occupation */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Primary Occupation / ಉದ್ಯೋಗ
              </label>
              <select
                value={profile.occupation}
                onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              >
                <option value="Student">Student (ವಿದ್ಯಾರ್ಥಿ)</option>
                <option value="Farmer">Farmer / Cultivator (ರೈತ)</option>
                <option value="Unemployed">Unemployed Graduate / Seeking Job</option>
                <option value="Homemaker">Homemaker (ಗೃಹಿಣಿ)</option>
                <option value="Self-Employed">Self-Employed / Artisan</option>
                <option value="Salaried">Salaried Employee</option>
              </select>
            </div>

            {/* Conditional Education Level if Student or Unemployed */}
            {(profile.occupation === 'Student' || profile.occupation === 'Unemployed') && (
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Education Level / ವಿದ್ಯಾಭ್ಯಾಸ
                </label>
                <select
                  value={profile.education_level}
                  onChange={(e) => setProfile({ ...profile, education_level: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
                >
                  <option value="Pre-Matric">Pre-Matric (Class 1 to 10)</option>
                  <option value="Post-Matric">Post-Matric (PUC / 11-12th)</option>
                  <option value="Diploma">Diploma / ITI</option>
                  <option value="Undergraduate">Undergraduate Degree (BA / BSc / BCom / BE)</option>
                  <option value="Postgraduate">Postgraduate / Research</option>
                  <option value="Professional Course">Professional Medical / Engineering (KEA)</option>
                </select>
              </div>
            )}

            {/* Annual Income */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Annual Family Income (₹) / ವಾರ್ಷಿಕ ಕುಟುಂಬದ ಆದಾಯ
              </label>
              <input
                type="number"
                step="5000"
                value={profile.annual_income ?? ''}
                onChange={(e) => setProfile({ ...profile, annual_income: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                As per Nadakacheri Income Certificate (ಆದಾಯ ಪ್ರಮಾಣ ಪತ್ರ)
              </span>
            </div>

            {/* Social Category */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Social Category / ಜಾತಿ ಪ್ರವರ್ಗ
              </label>
              <select
                value={profile.category}
                onChange={(e) => setProfile({ ...profile, category: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none text-slate-900"
              >
                <option value="SC">SC (Scheduled Caste / ಪರಿಶಿಷ್ಟ ಜಾತಿ)</option>
                <option value="ST">ST (Scheduled Tribe / ಪರಿಶಿಷ್ಟ ಪಂಗಡ)</option>
                <option value="Cat-1">Category-1 (ಪ್ರವರ್ಗ-೧)</option>
                <option value="2A">Category-2A (ಪ್ರವರ್ಗ-೨ಎ)</option>
                <option value="2B">Category-2B (Minority / ಪ್ರವರ್ಗ-೨ಬಿ)</option>
                <option value="3A">Category-3A (ಪ್ರವರ್ಗ-೩ಎ)</option>
                <option value="3B">Category-3B (ಪ್ರವರ್ಗ-೩ಬಿ)</option>
                <option value="General">General Merit (ಸಾಮಾನ್ಯ)</option>
                <option value="Minority">Minority (ಅಲ್ಪಸಂಖ್ಯಾತ)</option>
              </select>
            </div>

            {/* Conditional Farmer land question */}
            {profile.occupation === 'Farmer' && (
              <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-md space-y-2">
                <label className="flex items-center gap-2 text-slate-800 font-medium">
                  <input
                    type="checkbox"
                    checked={profile.owns_agricultural_land}
                    onChange={(e) =>
                      setProfile({ ...profile, owns_agricultural_land: e.target.checked })
                    }
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Owns cultivable land in Karnataka (Bhoomi RTC registered)</span>
                </label>
              </div>
            )}

            {/* Conditional Gruha Lakshmi / Tax question */}
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-md space-y-2">
              <label className="flex items-center gap-2 text-slate-800">
                <input
                  type="checkbox"
                  checked={profile.is_income_tax_payer}
                  onChange={(e) =>
                    setProfile({ ...profile, is_income_tax_payer: e.target.checked })
                  }
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Applicant or spouse pays Income Tax or files GST</span>
              </label>

              <label className="flex items-center gap-2 text-slate-800">
                <input
                  type="checkbox"
                  checked={profile.has_disability}
                  onChange={(e) => setProfile({ ...profile, has_disability: e.target.checked })}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Person with benchmark disability (PwD / UDID)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Evaluating against Karnataka Rules...' : t.evaluateBtn}
            </button>
          </form>
        </div>

        {/* Right Column: Scheme Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Status filters */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {[
                { id: 'all', label: t.filterAll },
                { id: 'eligible', label: t.filterEligible },
                { id: 'not_eligible', label: t.filterNotEligible },
                { id: 'more_info', label: t.filterMoreInfo },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedStatus(f.id)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    selectedStatus === f.id
                      ? 'bg-slate-900 text-amber-300'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Category dropdown */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="scholarship">Scholarships</option>
                <option value="women_child">Women & Child Welfare</option>
                <option value="youth_employment">Youth Employment</option>
                <option value="farmer">Farmer Schemes</option>
                <option value="backward_classes">Backward Classes</option>
                <option value="social_welfare">Social Welfare</option>
              </select>
            </div>
          </div>

          {/* Results count & status summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing {filteredResults.length} of {results.length} Karnataka schemes evaluated
            </span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Grounded in verified Government Orders</span>
            </span>
          </div>

          {/* Scheme Cards */}
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="p-10 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-500">
                No schemes match the selected filter criteria.
              </div>
            ) : (
              filteredResults.map((scheme) => (
                <div
                  key={scheme.scheme_id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5 hover:border-slate-300 transition-all"
                >
                  {/* Card Header: Title, Department, Status */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-500">
                          {scheme.state_or_central}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[11px] text-slate-500">{scheme.department}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {scheme.scheme_name}
                      </h3>
                      {scheme.scheme_name_kannada && (
                        <p className="text-xs text-amber-800 font-medium">
                          {scheme.scheme_name_kannada}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0">{getStatusBadge(scheme.status)}</div>
                  </div>

                  {/* Benefits description */}
                  <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 text-xs text-slate-800">
                    <span className="font-bold text-amber-900 block mb-0.5">Key Benefit:</span>
                    <span className="leading-relaxed">{scheme.benefits}</span>
                  </div>

                  {/* Conditions Satisfied vs Failed (The Rule Engine Reasons) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {scheme.conditions_satisfied.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-emerald-800 block text-[11px]">
                          {t.conditionsSatisfied} ({scheme.conditions_satisfied.length})
                        </span>
                        {scheme.conditions_satisfied.map((c, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {scheme.conditions_not_satisfied.length > 0 && (
                      <div className="space-y-1">
                        <span className="font-semibold text-rose-800 block text-[11px]">
                          {t.conditionsFailed} ({scheme.conditions_not_satisfied.length})
                        </span>
                        {scheme.conditions_not_satisfied.map((c, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-rose-700">
                            <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {scheme.missing_information.length > 0 && (
                      <div className="space-y-1 sm:col-span-2">
                        <span className="font-semibold text-amber-800 block text-[11px]">
                          {t.missingInfo}:
                        </span>
                        {scheme.missing_information.map((c, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-amber-700">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Required Documents */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                      Required Documents:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.required_documents.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Advice Section */}
                  {activeAdviceId === scheme.scheme_id && adviceCache[scheme.scheme_id] && (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 animate-in fade-in duration-150">
                      <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>NagrikAI Grounded Citizen Advice:</span>
                      </div>
                      <p className="text-slate-800 leading-relaxed">
                        {adviceCache[scheme.scheme_id]}
                      </p>
                    </div>
                  )}

                  {/* Footer Action Links */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <button
                      onClick={() => handleGetAdvice(scheme)}
                      disabled={adviceLoading === scheme.scheme_id}
                      className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-900 font-semibold cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>
                        {adviceLoading === scheme.scheme_id
                          ? 'Generating advice...'
                          : t.askAdvice}
                      </span>
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={scheme.guidelines_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 underline text-[11px]"
                      >
                        Official Guidelines
                      </a>
                      <a
                        href={scheme.application_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 text-amber-300 font-semibold rounded-md hover:bg-slate-800 transition-colors shadow-xs"
                      >
                        <span>Apply on Official Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
