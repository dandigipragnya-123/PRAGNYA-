import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  currentLanguage: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                NAGRIK<span className="text-amber-400">AI</span>
              </span>
              <span className="text-[11px] text-amber-300 font-medium">ಕರ್ನಾಟಕ</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Karnataka's AI-Powered Citizen Assistance Platform. Dedicated to demystifying administrative terminology in land records, municipal notices, and welfare scheme guidelines for all residents of Karnataka.
            </p>
            <div className="text-[11px] text-slate-500">
              Karnataka Resident Assistance · Multilingual (ಕನ್ನಡ, English, Hindi, Telugu, Tamil)
            </div>
          </div>

          {/* Quick Portals */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Official Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://landrecords.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Bhoomi Land Records</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://kaveri.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Kaveri 2.0 (EC / Deeds)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://sevasindhu.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Seva Sindhu Services</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://ssp.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>State Scholarship Portal (SSP)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://fruits.karnataka.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1"
                >
                  <span>FRUITS Agriculture Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Citizen Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Citizen Advisory
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              NagrikAI provides preliminary AI analysis and natural language explanation. It is not an issuing authority and does not replace official Tahsildar, Sub-Registrar, or Department verification.
            </p>
            <div className="mt-3 text-[11px] text-amber-400/90 font-medium">
              Data Privacy: No Aadhaar or banking OTPs are ever collected.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NagrikAI Karnataka Citizen Assistance. Grounded in authentic GoK data.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>·</span>
            <span>All 31 Karnataka Districts</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
