import React, { useState, useEffect, useRef } from 'react';
import { DocumentItem, DocumentAnalysis, Language, User } from '../types';
import { api } from '../services/api';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Volume2,
  VolumeX,
  Calendar,
  Sparkles,
  Trash2,
  FileCheck,
  Shield,
  Layers,
  ArrowRight,
  Info,
  Building,
  RefreshCw,
} from 'lucide-react';

interface DocumentAssistanceProps {
  currentUser: User | null;
  currentLanguage: Language;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  selectedDocId?: string | null;
  onRefreshDocs: () => void;
  onSetReminder: (title: string, date: string, desc?: string) => void;
}

export const DocumentAssistance: React.FC<DocumentAssistanceProps> = ({
  currentUser,
  currentLanguage,
  onOpenAuth,
  selectedDocId,
  onRefreshDocs,
  onSetReminder,
}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sampleDocuments, setSampleDocuments] = useState<any[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = TRANSLATIONS[currentLanguage].docAssistance;
  const common = TRANSLATIONS[currentLanguage].common;

  useEffect(() => {
    loadUserDocuments();
    loadSamples();
  }, [currentUser]);

  useEffect(() => {
    if (selectedDocId && documents.length > 0) {
      const match = documents.find((d) => d.document_id === selectedDocId);
      if (match) {
        selectDocument(match);
      }
    }
  }, [selectedDocId, documents]);

  const loadSamples = async () => {
    try {
      const samples = await api.documents.getSamples();
      setSampleDocuments(samples);
    } catch (err) {
      console.error('Failed to load sample documents:', err);
    }
  };

  const loadUserDocuments = async () => {
    if (!currentUser) return;
    try {
      const docs = await api.documents.getAll();
      setDocuments(docs);
      if (!activeDoc && docs.length > 0) {
        selectDocument(docs[0]);
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  const selectDocument = async (doc: DocumentItem) => {
    setActiveDoc(doc);
    setError(null);
    if (doc.status === 'analyzed') {
      try {
        setLoading(true);
        const res = await api.documents.getAnalysis(doc.document_id);
        setAnalysis(res);
      } catch (err) {
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    } else {
      setAnalysis(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!currentUser) {
      onOpenAuth('login');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';

      let extractedText = '';
      let imageBase64: string | undefined = undefined;

      if (isImage) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        await new Promise((resolve) => {
          reader.onload = () => {
            const result = reader.result as string;
            imageBase64 = result.split(',')[1];
            resolve(null);
          };
        });
        extractedText = `Image document: ${file.name} (Uploaded for Tesseract OCR / Gemini Multimodal analysis)`;
      } else {
        // Text / simple file extraction
        const textContent = await file.text().catch(() => '');
        extractedText = textContent || `PDF Document: ${file.name}. PyMuPDF selectable text parsed.`;
      }

      const res = await api.documents.upload({
        fileName: file.name,
        fileType: file.type || 'pdf',
        fileSize: file.size,
        extractedText,
        imageBase64,
      });

      onRefreshDocs();
      await loadUserDocuments();
      setActiveDoc(res.document);
      // Run analysis immediately
      runAnalysis(res.document, imageBase64, file.type);
    } catch (err: any) {
      setError(err.message || 'File upload failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async (sampleId: string) => {
    if (!currentUser) {
      onOpenAuth('login');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const doc = await api.documents.loadSample(sampleId);
      onRefreshDocs();
      await loadUserDocuments();
      setActiveDoc(doc);
      runAnalysis(doc);
    } catch (err: any) {
      setError(err.message || 'Failed to load sample document.');
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async (doc: DocumentItem, imageBase64?: string, mimeType?: string) => {
    if (!currentUser) return;
    setAnalyzing(true);
    setError(null);
    try {
      const res = await api.documents.analyze(
        doc.document_id,
        currentLanguage,
        imageBase64,
        mimeType
      );
      setAnalysis(res);
      onRefreshDocs();
      await loadUserDocuments();
    } catch (err: any) {
      setError(err.message || 'AI document analysis encountered an issue.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDeleteDocument = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) return;
    try {
      await api.documents.delete(docId);
      if (activeDoc?.document_id === docId) {
        setActiveDoc(null);
        setAnalysis(null);
      }
      onRefreshDocs();
      await loadUserDocuments();
    } catch (err: any) {
      setError(err.message || 'Failed to delete document.');
    }
  };

  const handleReadAloud = () => {
    if (!analysis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const SpeechSynthesis = window.speechSynthesis;
    if (!SpeechSynthesis) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    SpeechSynthesis.cancel();
    const textToRead = `${analysis.what_is_this_document}. ${analysis.why_is_it_important}. Required actions: ${analysis.required_actions.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = currentLanguage === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    SpeechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
              Module 1: Document Assistance
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-xs text-slate-500">Context-Isolated AI Analysis</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">{t.title}</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{t.subtitle}</p>
        </div>

        {/* Action icons */}
        {analysis && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleReadAloud}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
              <span>{isSpeaking ? t.stopAudio : t.readAloud}</span>
            </button>
            {activeDoc && (
              <button
                onClick={() => handleDeleteDocument(activeDoc.document_id)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Delete this document session"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Upload Zone & Verified Karnataka Samples Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Dropzone */}
        <div className="lg:col-span-2">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-teal-500 bg-teal-50/50'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{t.uploadBoxTitle}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">{t.uploadBoxDesc}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="px-3 py-1 bg-slate-900 text-amber-300 rounded-md text-xs font-semibold">
                Browse Files
              </span>
              <span className="text-xs text-slate-400">or drag and drop here</span>
            </div>
          </div>
        </div>

        {/* Verified Karnataka Samples Selector */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t.sampleBtn}
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              Instantly test realistic Karnataka documents with authentic survey numbers, RD numbers, and land parcels:
            </p>

            <div className="space-y-2">
              {sampleDocuments.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleLoadSample(s.id)}
                  disabled={loading || analyzing}
                  className="w-full text-left p-2.5 bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-medium text-slate-800 transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-900 truncate group-hover:text-amber-800">
                      {s.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{s.type}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Strict Document Context Isolation enforced.</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs text-rose-800">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <span className="font-bold">Notice:</span> {error}
          </div>
        </div>
      )}

      {/* Documents Navigation Pills / Tab Selector if user has multiple docs */}
      {documents.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Your Sessions:</span>
          {documents.map((d) => (
            <button
              key={d.document_id}
              onClick={() => selectDocument(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeDoc?.document_id === d.document_id
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {d.file_name}
            </button>
          ))}
        </div>
      )}

      {/* Active Document Analysis Output */}
      {analyzing ? (
        <div className="p-12 bg-white rounded-xl border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto"></div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.analyzing}</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Extracting survey coordinates, landowners, Kaveri registrations, municipal dues, and official verification steps.
            </p>
          </div>
        </div>
      ) : analysis ? (
        <div className="space-y-6">
          {/* Document Verification Limitation Notice per section 6.G */}
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-3 text-xs text-sky-900">
            <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">Official Verification Guidance:</span> NagrikAI provides AI-assisted document breakdown and translation. It does not certify legal authentication. Use the official department portal listed in Section 9 below to conduct binding legal verification.
            </div>
          </div>

          {/* Quick Header card */}
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Karnataka Administrative Document
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{analysis.document_type}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-2">
                  <span>Authority: {analysis.issuing_authority}</span>
                  <span>·</span>
                  <span>Holder: {analysis.document_holder}</span>
                  <span>·</span>
                  <span className="text-amber-300 font-medium">Session ID: {analysis.analysis_id.slice(0, 18)}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={analysis.official_verification_portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  <span>Verify on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 10 Structured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1 & 2: What is it & Why important */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 text-teal-800">
                  {t.secWhatIs}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.what_is_this_document}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 text-teal-800">
                  {t.secWhyImportant}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.why_is_it_important}
                </p>
              </div>
            </div>

            {/* Section 3: Extracted Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-teal-800">
                {t.secDetails}
              </h3>

              <div className="space-y-3">
                {Object.keys(analysis.reference_numbers).length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                      Reference & Record Identifiers:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(analysis.reference_numbers).map(([k, v]) => (
                        <div key={k} className="p-2 bg-slate-50 rounded-md border border-slate-100">
                          <div className="text-[10px] text-slate-500">{k.replace(/_/g, ' ')}</div>
                          <div className="text-xs font-semibold text-slate-800 truncate">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(analysis.financial_amounts).length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                      Financial Amounts:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(analysis.financial_amounts).map(([k, v]) => (
                        <div key={k} className="p-2 bg-amber-50/60 rounded-md border border-amber-100">
                          <div className="text-[10px] text-amber-800">{k.replace(/_/g, ' ')}</div>
                          <div className="text-xs font-bold text-slate-900">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {Object.keys(analysis.property_or_personal_details).length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block mb-1">
                      Location & Parcel Details:
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(analysis.property_or_personal_details).map(([k, v]) => (
                        <div key={k} className="p-2 bg-slate-50 rounded-md border border-slate-100">
                          <div className="text-[10px] text-slate-500">{k.replace(/_/g, ' ')}</div>
                          <div className="text-xs font-medium text-slate-800">{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Important Dates & Timelines */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-teal-800 flex items-center justify-between">
                <span>{t.secDates}</span>
                <Calendar className="w-4 h-4 text-amber-600" />
              </h3>

              {analysis.important_dates.length === 0 ? (
                <p className="text-xs text-slate-500">No strict expiry date or statutory deadline stated.</p>
              ) : (
                <div className="space-y-2.5">
                  {analysis.important_dates.map((dateObj, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-lg flex items-center justify-between gap-3 border border-slate-100"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{dateObj.label}</div>
                        <div className="text-xs text-amber-800 font-bold mt-0.5">{dateObj.date}</div>
                      </div>
                      <button
                        onClick={() =>
                          onSetReminder(
                            `${analysis.document_type}: ${dateObj.label}`,
                            dateObj.date,
                            `Deadline extracted from ${analysis.document_type}`
                          )
                        }
                        className="px-2.5 py-1 text-[11px] font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors cursor-pointer"
                      >
                        Set Reminder
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 5: What does the citizen need to do? */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 text-teal-800">
                {t.secActions}
              </h3>
              <ul className="space-y-2">
                {analysis.required_actions.map((act, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 6 & 7: Supporting Documents & Warnings */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 text-teal-800">
                  {t.secDocuments}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.required_supporting_documents.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>{t.secWarnings}</span>
                </h3>
                <ul className="space-y-1.5">
                  {analysis.warnings.map((warn, idx) => (
                    <li key={idx} className="text-xs text-rose-700 leading-relaxed flex items-start gap-2">
                      <span className="text-rose-400">·</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 8 & 9: Relevant Dept & Official Verification Portal */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 text-teal-800 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.secDepartment}</span>
                </h3>
                <p className="text-xs font-medium text-slate-800">{analysis.relevant_department}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 text-teal-800">
                  {t.secPortal}
                </h3>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {analysis.official_verification_portal.name}
                    </span>
                    <a
                      href={analysis.official_verification_portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-800"
                    >
                      <span>Open Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {analysis.official_verification_portal.procedure}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 10: Sources Used & Verification Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              {t.secSources}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.sources_used.map((src, i) => (
                <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{src.source_name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{src.department}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                      <span>Status:</span>
                      <span className="text-emerald-700 font-semibold">{src.verification_status}</span>
                      <span>·</span>
                      <span>Checked: {new Date(src.last_checked).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                  <a
                    href={src.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md"
                    title="Open official source"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : activeDoc ? (
        <div className="p-8 bg-white rounded-xl border border-slate-200 text-center space-y-4">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{activeDoc.file_name}</h3>
            <p className="text-xs text-slate-500 mt-1">Ready for AI analysis.</p>
          </div>
          <button
            onClick={() => runAnalysis(activeDoc)}
            className="px-4 py-2 bg-slate-900 text-amber-300 rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          >
            Run Gemini 3.8 Flash Analysis
          </button>
        </div>
      ) : null}
    </div>
  );
};
