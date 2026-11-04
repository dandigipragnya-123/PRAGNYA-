import React, { useState } from 'react';
import { Language, User } from '../types';
import { api } from '../services/api';
import { X, Lock, Mail, User as UserIcon, Globe, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: User) => void;
  currentLanguage: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
  currentLanguage,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredLang, setPreferredLang] = useState<Language>(currentLanguage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          throw new Error('Please enter your full name.');
        }
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }

        const data = await api.auth.register({
          fullName: fullName.trim(),
          email: email.trim(),
          password,
          confirmPassword,
          preferredLanguage: preferredLang,
        });
        onSuccess(data.user);
        onClose();
      } else {
        const data = await api.auth.login(email.trim(), password);
        onSuccess(data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await api.auth.login('poornima.moulya15@gmail.com', 'Karnataka@2026');
      onSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header with state emblem styling */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-amber-500 flex items-center justify-center text-slate-950">
              <ShieldCheck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {mode === 'login' ? 'Citizen Sign In' : 'Citizen Registration'}
              </h2>
              <p className="text-xs text-slate-400">NagrikAI Karnataka Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-slate-900 border-b-2 border-amber-500'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In / ಲಾಗಿನ್
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-slate-900 border-b-2 border-amber-500'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            New Citizen Registration / ನೋಂದಣಿ
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name as per Official ID / ಪೂರ್ಣ ಹೆಸರು
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Poornima Moulya"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address / ಇಮೇಲ್ ವಿಳಾಸ
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@karnataka.gov.in"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password / ಗುಪ್ತಪದ (ಪಾಸ್‌ವರ್ಡ್)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Confirm Password / ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Preferred Language / ಆದ್ಯತೆಯ ಭಾಷೆ
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={preferredLang}
                    onChange={(e) => setPreferredLang(e.target.value as Language)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-slate-900"
                  >
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying credentials...</span>
            ) : mode === 'login' ? (
              <span>Sign In to Citizen Dashboard</span>
            ) : (
              <span>Complete Registration</span>
            )}
          </button>

          {/* Quick Demo Citizen Login */}
          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-amber-700" />
              <span>One-Click Citizen Demo Login (Poornima Moulya)</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-1.5">
              Instantly tests document history and Karnataka welfare eligibility.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
