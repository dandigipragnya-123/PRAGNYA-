import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { X, Mic, MicOff, Volume2, Send, AlertCircle, Sparkles } from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onNavigateToDocument: () => void;
  onNavigateToSchemes: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onNavigateToDocument,
  onNavigateToSchemes,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [responseText, setResponseText] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [typedInput, setTypedInput] = useState('');

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
    }
  }, []);

  if (!isOpen) return null;

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processCitizenQuery(text);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  const processCitizenQuery = (query: string) => {
    const qLower = query.toLowerCase();

    // Natural Kannada and English voice matching
    if (
      qLower.includes('rtc') ||
      qLower.includes('pahani') ||
      qLower.includes('ಪಹಣಿ') ||
      qLower.includes('ಭೂಮಿ') ||
      qLower.includes('land') ||
      qLower.includes('survey')
    ) {
      const reply =
        currentLanguage === 'kn'
          ? 'ನಿಮ್ಮ ಪಹಣಿ / ಆರ್.ಟಿ.ಸಿ ದಾಖಲೆಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಾನು ದಾಖಲೆ ನೆರವು ವಿಭಾಗಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತಿದ್ದೇನೆ.'
          : 'I will guide you to Document Assistance to analyze your RTC / Pahani record.';
      setResponseText(reply);
      speak(reply);
      setTimeout(() => {
        onNavigateToDocument();
        onClose();
      }, 2000);
    } else if (
      qLower.includes('scheme') ||
      qLower.includes('scholarship') ||
      qLower.includes('ಯೋಜನೆ') ||
      qLower.includes('ವಿದ್ಯಾರ್ಥಿವೇತನ') ||
      qLower.includes('ಗೃಹಲಕ್ಷ್ಮಿ') ||
      qLower.includes('gruha') ||
      qLower.includes('yuva')
    ) {
      const reply =
        currentLanguage === 'kn'
          ? 'ಕರ್ನಾಟಕದ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಅರ್ಹತೆ ಪರೀಕ್ಷಿಸಲು ಯೋಜನೆಗಳ ವಿಭಾಗಕ್ಕೆ ಸಾಗುತ್ತಿದ್ದೇವೆ.'
          : 'Navigating to Karnataka Scheme Eligibility to check your welfare entitlements.';
      setResponseText(reply);
      speak(reply);
      setTimeout(() => {
        onNavigateToSchemes();
        onClose();
      }, 2000);
    } else if (
      qLower.includes('ec') ||
      qLower.includes('encumbrance') ||
      qLower.includes('ಋಣಭಾರ') ||
      qLower.includes('kaveri')
    ) {
      const reply =
        currentLanguage === 'kn'
          ? 'ಕಾವೇರಿ ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (EC) ಪರಿಶೀಲನೆಗೆ ದಾಖಲೆ ನೆರವು ವಿಭಾಗ ತೆರೆಯಲಾಗುತ್ತಿದೆ.'
          : 'Opening Document Assistance to analyze your Kaveri Encumbrance Certificate.';
      setResponseText(reply);
      speak(reply);
      setTimeout(() => {
        onNavigateToDocument();
        onClose();
      }, 2000);
    } else {
      const reply =
        currentLanguage === 'kn'
          ? `ನೀವು ಕೇಳಿದ್ದು: "${query}". ನೀವು ದಾಖಲೆ ವಿಶ್ಲೇಷಣೆ ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.`
          : `You said: "${query}". You can select Document Assistance or Scheme Eligibility to proceed.`;
      setResponseText(reply);
      speak(reply);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    setTranscript(typedInput);
    processCitizenQuery(typedInput);
    setTypedInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden text-center">
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Karnataka Citizen Voice Assistance</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600">
            {currentLanguage === 'kn'
              ? 'ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಿ: "ಪಹಣಿ ಪರಿಶೀಲಿಸು", "ವಿದ್ಯಾರ್ಥಿವೇತನ ಯೋಜನೆ", "ಗೃಹಲಕ್ಷ್ಮಿ" ಅಥವಾ ಪ್ರಶ್ನೆ ಕೇಳಿ.'
              : 'Speak naturally: "Check RTC / Pahani", "SSP Scholarship", "Gruha Lakshmi", or "Encumbrance Certificate".'}
          </p>

          {/* Big Mic Button */}
          <div className="flex justify-center">
            <button
              onClick={startListening}
              disabled={isListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-100'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 ring-4 ring-amber-100'
              }`}
            >
              {isListening ? <Mic className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <div className="text-xs font-semibold text-slate-700">
            {isListening
              ? currentLanguage === 'kn'
                ? 'ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ'
                : 'Listening... please speak now'
              : currentLanguage === 'kn'
              ? 'ಮಾತನಾಡಲು ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ'
              : 'Tap mic button to speak'}
          </div>

          {transcript && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                You Asked / ನೀವು ಕೇಳಿದ್ದು:
              </span>
              <p className="text-xs text-slate-800 font-medium">{transcript}</p>
            </div>
          )}

          {responseText && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-left flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-950 leading-relaxed">{responseText}</p>
            </div>
          )}

          {/* Typed input fallback */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-2">Or type your query below:</span>
            <form onSubmit={handleTypedSubmit} className="flex gap-2">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={currentLanguage === 'kn' ? 'ಉದಾ: ಪಹಣಿ, ಖಾತಾ ಅಥವಾ ಸ್ಕಾಲರ್‌ಶಿಪ್...' : 'e.g. RTC, Khata, or SSP Scholarship...'}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 text-amber-300 hover:bg-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
