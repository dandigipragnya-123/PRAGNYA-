import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    dashboard: string;
    documents: string;
    schemes: string;
    sources: string;
    reminders: string;
    login: string;
    signup: string;
    logout: string;
    profile: string;
  };
  hero: {
    title: string;
    subtitle: string;
    btnDocAssistance: string;
    btnSchemeChecker: string;
    badge: string;
  };
  dashboard: {
    welcome: string;
    citizenPortalNote: string;
    docAssistanceTitle: string;
    docAssistanceDesc: string;
    schemeCheckerTitle: string;
    schemeCheckerDesc: string;
    recentDocs: string;
    recentChecks: string;
    upcomingDeadlines: string;
    verifiedSources: string;
    viewAll: string;
    noDocsYet: string;
    noChecksYet: string;
  };
  docAssistance: {
    title: string;
    subtitle: string;
    uploadBoxTitle: string;
    uploadBoxDesc: string;
    sampleBtn: string;
    analyzing: string;
    extracting: string;
    secWhatIs: string;
    secWhyImportant: string;
    secDetails: string;
    secDates: string;
    secActions: string;
    secDocuments: string;
    secWarnings: string;
    secDepartment: string;
    secPortal: string;
    secSources: string;
    readAloud: string;
    stopAudio: string;
    setReminder: string;
  };
  schemes: {
    title: string;
    subtitle: string;
    formTitle: string;
    evaluateBtn: string;
    filterAll: string;
    filterEligible: string;
    filterNotEligible: string;
    filterMoreInfo: string;
    askAdvice: string;
    conditionsSatisfied: string;
    conditionsFailed: string;
    missingInfo: string;
    officialPortal: string;
    officialGuidelines: string;
  };
  sources: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allDepartments: string;
    priority1: string;
    priority2: string;
    priority3: string;
  };
  common: {
    verified: string;
    unverified: string;
    official: string;
    close: string;
    cancel: string;
    save: string;
    delete: string;
    loading: string;
    success: string;
    error: string;
    karnatakaResident: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'NagrikAI',
    tagline: "Karnataka's AI-Powered Citizen Assistance Platform",
    nav: {
      dashboard: 'Dashboard',
      documents: 'Document Assistance',
      schemes: 'Scheme Eligibility',
      sources: 'Official Sources',
      reminders: 'Deadlines & Reminders',
      login: 'Sign In',
      signup: 'Create Account',
      logout: 'Sign Out',
      profile: 'My Profile',
    },
    hero: {
      title: 'Empowering Karnataka Citizens with AI & Verified Government Guidance',
      subtitle: 'Understand complex land records (RTC, Khata, EC), property tax notices, and discover Karnataka state welfare schemes without intermediaries.',
      btnDocAssistance: 'Analyze a Document',
      btnSchemeChecker: 'Check Scheme Eligibility',
      badge: 'Official Karnataka Government Sources Only',
    },
    dashboard: {
      welcome: 'Welcome,',
      citizenPortalNote: 'Citizen records are strictly isolated and grounded in verified Karnataka administrative databases.',
      docAssistanceTitle: 'Karnataka Document Assistance',
      docAssistanceDesc: 'Understand RTC/Pahani, Encumbrance Certificates, A/B-Khata, Rental Agreements, and Revenue Certificates in plain language.',
      schemeCheckerTitle: 'Welfare Scheme Eligibility Checker',
      schemeCheckerDesc: 'Rule-based matching for Karnataka SSP Scholarships, Gruha Lakshmi, Yuva Nidhi, Raitha Siri, and PM-KISAN.',
      recentDocs: 'Recent Analyzed Documents',
      recentChecks: 'Recent Scheme Eligibility Checks',
      upcomingDeadlines: 'Upcoming Deadlines & Actions',
      verifiedSources: 'Official Karnataka Government Portals',
      viewAll: 'View All',
      noDocsYet: 'No documents uploaded yet. Upload an RTC or try a sample to get started.',
      noChecksYet: 'No scheme checks yet. Fill the quick profile to discover eligible schemes.',
    },
    docAssistance: {
      title: 'Karnataka Document Assistance',
      subtitle: 'Instant AI breakdown of official land records, property extracts, municipal notices, and certificates.',
      uploadBoxTitle: 'Upload Government Document or Notice',
      uploadBoxDesc: 'Supports PDF, JPG, PNG or TXT (RTC / Pahani, Encumbrance Certificate, Khata, Rental Agreement, Income Certificate)',
      sampleBtn: 'Or Select a Verified Karnataka Sample',
      analyzing: 'Analyzing document with Gemini 3.8 Flash...',
      extracting: 'Extracting document text...',
      secWhatIs: '1. What is this document?',
      secWhyImportant: '2. Why is it important?',
      secDetails: '3. Important details extracted',
      secDates: '4. Important dates & timelines',
      secActions: '5. What does the citizen need to do?',
      secDocuments: '6. Required supporting documents',
      secWarnings: '7. Important warnings & caveats',
      secDepartment: '8. Relevant Karnataka government department',
      secPortal: '9. Official verification portal',
      secSources: '10. Official sources used & verification status',
      readAloud: 'Read Aloud (Voice)',
      stopAudio: 'Stop Audio',
      setReminder: 'Set Deadline Reminder',
    },
    schemes: {
      title: 'Karnataka Government Scheme Eligibility',
      subtitle: 'Transparent, rule-based verification backed by official Government Orders and Department Guidelines.',
      formTitle: 'Citizen Profile for Eligibility Verification',
      evaluateBtn: 'Evaluate My Eligibility',
      filterAll: 'All Schemes',
      filterEligible: 'Likely Eligible',
      filterNotEligible: 'Not Eligible',
      filterMoreInfo: 'More Info Required',
      askAdvice: 'Get AI Citizen Guidance',
      conditionsSatisfied: 'Conditions Satisfied',
      conditionsFailed: 'Criteria Not Met',
      missingInfo: 'Missing Information',
      officialPortal: 'Official Application Portal',
      officialGuidelines: 'Official Guidelines & Scheme Rules',
    },
    sources: {
      title: 'Official Karnataka Government Source Registry',
      subtitle: 'Central repository of authentic government portals, revenue registries, and citizen service delivery platforms.',
      searchPlaceholder: 'Search by portal name, department, or document type...',
      allDepartments: 'All Departments',
      priority1: 'Priority 1 (Acts, Rules, Orders & Registries)',
      priority2: 'Priority 2 (Official Department Portals)',
      priority3: 'Priority 3 (NIC Technical Infrastructure)',
    },
    common: {
      verified: 'Verified Official Source',
      unverified: 'Unverified',
      official: 'Official Portal',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      karnatakaResident: 'Karnataka Domicile',
    },
  },
  kn: {
    appName: 'ನಾಗರಿಕ್ ಎಐ',
    tagline: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆ',
    nav: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      documents: 'ದಾಖಲೆ ನೆರವು',
      schemes: 'ಯೋಜನೆಗಳ ಅರ್ಹತೆ',
      sources: 'ಅಧಿಕೃತ ಮೂಲಗಳು',
      reminders: 'ಗಡುವು & ಜ್ಞಾಪನೆಗಳು',
      login: 'ಲಾಗಿನ್',
      signup: 'ಖಾತೆ ತೆರೆಯಿರಿ',
      logout: 'ಲಾಗ್‌ಔಟ್',
      profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    },
    hero: {
      title: 'ಕರ್ನಾಟಕದ ನಾಗರಿಕರಿಗೆ ಸರಳ, ನಿಖರ ಹಾಗೂ ಮಧ್ಯವರ್ತಿ ರಹಿತ ಸರ್ಕಾರಿ ಮಾರ್ಗದರ್ಶನ',
      subtitle: 'ಭೂಮಿ ಪಹಣಿ/ಆರ್.ಟಿ.ಸಿ, ಖಾತಾ ಪ್ರಮಾಣಪತ್ರ, ಕಾವೇರಿ ಇ.ಸಿ, ಆಸ್ತಿ ತೆರಿಗೆ ನೋಟಿಸ್‌ಗಳನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಅರ್ಹ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳನ್ನು ಕಂಡುಕೊಳ್ಳಿ.',
      btnDocAssistance: 'ದಾಖಲೆ ಪರಿಶೀಲಿಸಿ',
      btnSchemeChecker: 'ಯೋಜನೆ ಅರ್ಹತೆ ಪರೀಕ್ಷಿಸಿ',
      badge: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಮೂಲಗಳಿಂದ ಮಾತ್ರ',
    },
    dashboard: {
      welcome: 'ಸುಸ್ವಾಗತ,',
      citizenPortalNote: 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿಡಲಾಗಿದೆ ಹಾಗೂ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹೋಲಿಸಲಾಗಿದೆ.',
      docAssistanceTitle: 'ಕರ್ನಾಟಕ ದಾಖಲೆ ನೆರವು (ಡಾಕ್ಯುಮೆಂಟ್ ಅಸಿಸ್ಟೆನ್ಸ್)',
      docAssistanceDesc: 'ಪಹಣಿ/ಆರ್.ಟಿ.ಸಿ, ಋಣಭಾರ ಪ್ರಮಾಣಪತ್ರ (EC), ಎ/ಬಿ-ಖಾತಾ, ಬಾಡಿಗೆ ಒಪ್ಪಂದ ಹಾಗೂ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಸರಳವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
      schemeCheckerTitle: 'ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಪರೀಕ್ಷಕ',
      schemeCheckerDesc: 'ಎಸ್.ಎಸ್.ಪಿ ವಿದ್ಯಾರ್ಥಿವೇತನ, ಗೃಹಲಕ್ಷ್ಮಿ, ಯುವನಿಧಿ, ರೈತಸಿರಿ, ಗಂಗಾ ಕಲ್ಯಾಣ ಮತ್ತು ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆಗಳ ನಿಯಮಾಧಾರಿತ ಪರಿಶೀಲನೆ.',
      recentDocs: 'ಇತ್ತೀಚೆಗೆ ವಿಶ್ಲೇಷಿಸಿದ ದಾಖಲೆಗಳು',
      recentChecks: 'ಇತ್ತೀಚಿನ ಯೋಜನಾ ಅರ್ಹತಾ ಫಲಿತಾಂಶಗಳು',
      upcomingDeadlines: 'ಮುಂದಿನ ಗಡುವುಗಳು ಮತ್ತು ಕ್ರಮಗಳು',
      verifiedSources: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳು',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
      noDocsYet: 'ಇನ್ನೂ ಯಾವುದೇ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿಲ್ಲ. ಆರಂಭಿಸಲು ಪಹಣಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಮಾದರಿ ಆಯ್ಕೆಮಾಡಿ.',
      noChecksYet: 'ಇನ್ನೂ ಯಾವುದೇ ಯೋಜನಾ ಪರಿಶೀಲನೆ ನಡೆದಿಲ್ಲ. ಅರ್ಹ ಯೋಜನೆಗಳನ್ನು ತಿಳಿಯಲು ವಿವರ ಭರ್ತಿ ಮಾಡಿ.',
    },
    docAssistance: {
      title: 'ಕರ್ನಾಟಕ ದಾಖಲೆ ನೆರವು',
      subtitle: 'ಭೂ ದಾಖಲೆಗಳು, ಆಸ್ತಿ ಸಾರಾಂಶಗಳು, ಪುರಸಭೆ ನೋಟಿಸ್‌ಗಳು ಮತ್ತು ಪ್ರಮಾಣಪತ್ರಗಳ ತ್ವರಿತ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ವಿವರಣೆ.',
      uploadBoxTitle: 'ಸರ್ಕಾರಿ ದಾಖಲೆ ಅಥವಾ ನೋಟಿಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      uploadBoxDesc: 'ಪಿಡಿಎಫ್, ಜೆಪಿಜಿ, ಪಿಎನ್‌ಜಿ ಅಥವಾ ಪಠ್ಯ ಬೆಂಬಲಿತವಾಗಿದೆ (ಆರ್.ಟಿ.ಸಿ / ಪಹಣಿ, ಇ.ಸಿ, ಖಾತಾ, ಬಾಡಿಗೆ ಒಪ್ಪಂದ, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ)',
      sampleBtn: 'ಅಥವಾ ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಮಾದರಿ ದಾಖಲೆ ಆರಿಸಿ',
      analyzing: 'ಜೆಮಿನಿ 3.8 ಫ್ಲ್ಯಾಶ್ ಮೂಲಕ ದಾಖಲೆ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
      extracting: 'ದಾಖಲೆಯ ಪಠ್ಯ ಹೊರತೆಗೆಯಲಾಗುತ್ತಿದೆ...',
      secWhatIs: '೧. ಈ ದಾಖಲೆ ಯಾವುದು?',
      secWhyImportant: '೨. ಇದು ಏಕೆ ಮುಖ್ಯ?',
      secDetails: '೩. ಹೊರತೆಗೆಯಲಾದ ಪ್ರಮುಖ ವಿವರಗಳು',
      secDates: '೪. ಮುಖ್ಯ ದಿನಾಂಕಗಳು ಮತ್ತು ಗಡುವುಗಳು',
      secActions: '೫. ನಾಗರಿಕರು ಈಗ ಏನು ಮಾಡಬೇಕು?',
      secDocuments: '೬. ಅಗತ್ಯವಿರುವ ಪೂರಕ ದಾಖಲೆಗಳು',
      secWarnings: '೭. ಪ್ರಮುಖ ಎಚ್ಚರಿಕೆಗಳು',
      secDepartment: '೮. ಸಂಬಂಧಪಟ್ಟ ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಇಲಾಖೆ',
      secPortal: '೯. ಅಧಿಕೃತ ಪರಿಶೀಲನಾ ಪೋರ್ಟಲ್',
      secSources: '೧೦. ಬಳಸಲಾದ ಅಧಿಕೃತ ಮೂಲಗಳು ಮತ್ತು ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ',
      readAloud: 'ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ (ಆಡಿಯೋ)',
      stopAudio: 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ',
      setReminder: 'ಗಡುವು ಜ್ಞಾಪನೆ ಹೊಂದಿಸಿ',
    },
    schemes: {
      title: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅರ್ಹತೆ',
      subtitle: 'ಸರ್ಕಾರಿ ಆದೇಶಗಳು ಮತ್ತು ಅಧಿಕೃತ ಇಲಾಖಾ ಮಾರ್ಗಸೂಚಿಗಳ ಆಧಾರದ ಮೇಲೆ ಪಾರದರ್ಶಕ ನಿಯಮಾಧಾರಿತ ಪರಿಶೀಲನೆ.',
      formTitle: 'ಅರ್ಹತಾ ಪರಿಶೀಲನೆಗಾಗಿ ನಾಗರಿಕ ವಿವರ',
      evaluateBtn: 'ನನ್ನ ಅರ್ಹತೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ',
      filterAll: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
      filterEligible: 'ಅರ್ಹತೆಯಿರುವ ಯೋಜನೆಗಳು',
      filterNotEligible: 'ಅರ್ಹವಿಲ್ಲದ ಯೋಜನೆಗಳು',
      filterMoreInfo: 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಗತ್ಯವಿದೆ',
      askAdvice: 'ಎಐ ನಾಗರಿಕ ಸಲಹೆ ಪಡೆಯಿರಿ',
      conditionsSatisfied: 'ಪೂರ್ಣಗೊಂಡ ಷರತ್ತುಗಳು',
      conditionsFailed: 'ಪೂರ್ಣಗೊಳ್ಳದ ಷರತ್ತುಗಳು',
      missingInfo: 'ಬಾಕಿ ಇರುವ ಮಾಹಿತಿ',
      officialPortal: 'ಅಧಿಕೃತ ಅರ್ಜಿ ಪೋರ್ಟಲ್',
      officialGuidelines: 'ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿ ಮತ್ತು ನಿಯಮಗಳು',
    },
    sources: {
      title: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಅಧಿಕೃತ ಮೂಲಗಳ ನೋಂದಣಿ',
      subtitle: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು, ಕಂದಾಯ ನೋಂದಣಿಗಳು ಮತ್ತು ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆಗಳ ಕೇಂದ್ರ ಭಂಡಾರ.',
      searchPlaceholder: 'ಪೋರ್ಟಲ್ ಹೆಸರು, ಇಲಾಖೆ ಅಥವಾ ದಾಖಲೆ ಪ್ರಕಾರದಿಂದ ಹುಡುಕಿ...',
      allDepartments: 'ಎಲ್ಲಾ ಇಲಾಖೆಗಳು',
      priority1: 'ಆದ್ಯತೆ ೧ (ಕಾಯಿದೆಗಳು, ನಿಯಮಗಳು, ಆದೇಶಗಳು ಮತ್ತು ನೋಂದಣಿಗಳು)',
      priority2: 'ಆದ್ಯತೆ ೨ (ಅಧಿಕೃತ ಇಲಾಖಾ ಜಾಲತಾಣಗಳು)',
      priority3: 'ಆದ್ಯತೆ ೩ (ಎನ್‌ಐಸಿ ತಾಂತ್ರಿಕ ಮೂಲಸೌಕರ್ಯ)',
    },
    common: {
      verified: 'ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಮೂಲ',
      unverified: 'ಪರಿಶೀಲಿಸದ',
      official: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್',
      close: 'ಮುಚ್ಚಿ',
      cancel: 'ರದ್ದುಮಾಡಿ',
      save: 'ಉಳಿಸಿ',
      delete: 'ಅಳಿಸಿ',
      loading: 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...',
      success: 'ಯಶಸ್ವಿ',
      error: 'ದೋಷ',
      karnatakaResident: 'ಕರ್ನಾಟಕ ನಿವಾಸಿ',
    },
  },
  hi: {
    appName: 'नागरिक AI',
    tagline: 'कर्नाटक का AI-संचालित नागरिक सहायता मंच',
    nav: {
      dashboard: 'डैशबोर्ड',
      documents: 'दस्तावेज़ सहायता',
      schemes: 'योजना पात्रता',
      sources: 'आधिकारिक स्रोत',
      reminders: 'समय सीमा और अनुस्मारक',
      login: 'साइन इन',
      signup: 'खाता बनाएं',
      logout: 'साइन आउट',
      profile: 'मेरी प्रोफ़ाइल',
    },
    hero: {
      title: 'कर्नाटक के नागरिकों के लिए सटीक और मध्यस्थ-मुक्त सरकारी सहायता',
      subtitle: 'भूमि अभिलेख (RTC/पहाणी), खाता प्रमाण पत्र, कावेरी EC, और कर्नाटक कल्याण योजनाओं को आसानी से समझें।',
      btnDocAssistance: 'दस्तावेज़ का विश्लेषण करें',
      btnSchemeChecker: 'योजना पात्रता जांचें',
      badge: 'केवल आधिकारिक कर्नाटक सरकारी स्रोत',
    },
    dashboard: {
      welcome: 'नमस्ते,',
      citizenPortalNote: 'आपके रिकॉर्ड सुरक्षित हैं और आधिकारिक कर्नाटक सरकारी डेटाबेस से सत्यापित हैं।',
      docAssistanceTitle: 'कर्नाटक दस्तावेज़ सहायता',
      docAssistanceDesc: 'RTC/पहाणी, एन्कम्ब्रन्स सर्टिफिकेट (EC), A/B-खाता, और आय प्रमाण पत्र को आसान भाषा में समझें।',
      schemeCheckerTitle: 'कल्याण योजना पात्रता परीक्षक',
      schemeCheckerDesc: 'SSP छात्रवृत्ति, गृह लक्ष्मी, युवा निधि, रैत सिरी, और पीएम-किसान के लिए नियम-आधारित जांच।',
      recentDocs: 'हाल के दस्तावेज़',
      recentChecks: 'हाल की योजना जांच',
      upcomingDeadlines: 'आगामी समय सीमा',
      verifiedSources: 'आधिकारिक कर्नाटक पोर्टल',
      viewAll: 'सभी देखें',
      noDocsYet: 'अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया है।',
      noChecksYet: 'अभी तक कोई योजना जांच नहीं की गई है।',
    },
    docAssistance: {
      title: 'कर्नाटक दस्तावेज़ सहायता',
      subtitle: 'भूमि अभिलेखों और प्रमाण पत्रों का त्वरित AI विवरण।',
      uploadBoxTitle: 'सरकारी दस्तावेज़ अपलोड करें',
      uploadBoxDesc: 'PDF, JPG, PNG समर्थित (RTC/पहाणी, EC, खाता, किराया समझौता, आदि)',
      sampleBtn: 'या सत्यापित कर्नाटक नमूना दस्तावेज़ चुनें',
      analyzing: 'दस्तावेज़ का विश्लेषण किया जा रहा है...',
      extracting: 'टेक्स्ट निकाला जा रहा है...',
      secWhatIs: '1. यह दस्तावेज़ क्या है?',
      secWhyImportant: '2. यह क्यों महत्वपूर्ण है?',
      secDetails: '3. निकाले गए मुख्य विवरण',
      secDates: '4. महत्वपूर्ण तिथियां और समय सीमा',
      secActions: '5. नागरिक को अब क्या करना चाहिए?',
      secDocuments: '6. आवश्यक सहायक दस्तावेज़',
      secWarnings: '7. महत्वपूर्ण चेतावनियां',
      secDepartment: '8. संबंधित कर्नाटक सरकारी विभाग',
      secPortal: '9. आधिकारिक सत्यापन पोर्टल',
      secSources: '10. प्रयुक्त आधिकारिक स्रोत',
      readAloud: 'आवाज़ में सुनें',
      stopAudio: 'रोकें',
      setReminder: 'अनुस्मारक सेट करें',
    },
    schemes: {
      title: 'कर्नाटक सरकारी योजना पात्रता',
      subtitle: 'सरकारी आदेशों और दिशानिर्देशों पर आधारित पारदर्शी नियम-आधारित सत्यापन।',
      formTitle: 'पात्रता सत्यापन के लिए नागरिक प्रोफ़ाइल',
      evaluateBtn: 'मेरी पात्रता जांचें',
      filterAll: 'सभी योजनाएं',
      filterEligible: 'संभावित पात्र',
      filterNotEligible: 'अपात्र',
      filterMoreInfo: 'अधिक जानकारी आवश्यक',
      askAdvice: 'AI नागरिक सलाह प्राप्त करें',
      conditionsSatisfied: 'शर्तें पूरी हुईं',
      conditionsFailed: 'शर्तें पूरी नहीं हुईं',
      missingInfo: 'अनुपलब्ध जानकारी',
      officialPortal: 'आधिकारिक आवेदन पोर्टल',
      officialGuidelines: 'आधिकारिक दिशानिर्देश',
    },
    sources: {
      title: 'आधिकारिक कर्नाटक सरकारी स्रोत रजिस्ट्री',
      subtitle: 'सत्यापित कर्नाटक सरकारी पोर्टलों और डेटाबेस का केंद्रीय भंडार।',
      searchPlaceholder: 'पोर्टल नाम, विभाग या दस्तावेज़ से खोजें...',
      allDepartments: 'सभी विभाग',
      priority1: 'प्राथमिकता 1 (अधिनियम, नियम और सरकारी आदेश)',
      priority2: 'प्राथमिकता 2 (आधिकारिक विभागीय पोर्टल)',
      priority3: 'प्राथमिकता 3 (एनआईसी तकनीकी बुनियादी ढांचा)',
    },
    common: {
      verified: 'सत्यापित स्रोत',
      unverified: 'असत्यापित',
      official: 'आधिकारिक पोर्टल',
      close: 'बंद करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      loading: 'प्रगति पर है...',
      success: 'सफल',
      error: 'त्रुटि',
      karnatakaResident: 'कर्नाटक निवासी',
    },
  },
  te: {
    appName: 'నాగరిక్ AI',
    tagline: 'కర్ణాటక ప్రభుత్వ AI పౌర సేవా వేదిక',
    nav: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      documents: 'పత్రాల సహాయం',
      schemes: 'పథకాల అర్హత',
      sources: 'అధికారిక వనరులు',
      reminders: 'గడువులు & రిమైండర్లు',
      login: 'లాగిన్',
      signup: 'ఖాతా సృష్టించండి',
      logout: 'లాగౌట్',
      profile: 'నా ప్రొఫైల్',
    },
    hero: {
      title: 'కర్ణాటక పౌరులకు ఖచ్చితమైన మరియు దళారీ రహిత ప్రభుత్వ మార్గదర్శకత్వం',
      subtitle: 'RTC/పహణి, ఖాతా సర్టిఫికేట్, కావేరి EC మరియు సంక్షేమ పథకాలను సులభంగా అర్థం చేసుకోండి.',
      btnDocAssistance: 'పత్రాన్ని విశ్లేషించండి',
      btnSchemeChecker: 'పథకం అర్హత తనిఖీ చేయండి',
      badge: 'అధికారిక కర్ణాటక ప్రభుత్వ మూలాలు మాత్రమే',
    },
    dashboard: {
      welcome: 'స్వాగతం,',
      citizenPortalNote: 'మీ రికార్డులు సురక్షితంగా మరియు అధికారిక కర్ణాటక డేటాబేస్లతో సరిపోల్చబడ్డాయి.',
      docAssistanceTitle: 'కర్ణాటక పత్రాల సహాయం',
      docAssistanceDesc: 'పహణి, ఎన్‌కంబరెన్స్ సర్టిఫికేట్ (EC), ఖాతా మరియు ఆదాయ ధృవీకరణ పత్రాలను సులభంగా అర్థం చేసుకోండి.',
      schemeCheckerTitle: 'సంక్షేమ పథకాల అర్హత తనిఖీ',
      schemeCheckerDesc: 'SSP స్కాలర్‌షిప్, గృహ లక్ష్మి, యువ నిధి మరియు రైతు సిరి కోసం నిబంధనల ఆధారిత తనిఖీ.',
      recentDocs: 'ఇటీవలి పత్రాలు',
      recentChecks: 'ఇటీవలి అర్హత తనిఖీలు',
      upcomingDeadlines: 'రాబోయే గడువులు',
      verifiedSources: 'అధికారిక కర్ణాటక పోర్టల్స్',
      viewAll: 'అన్నీ చూడండి',
      noDocsYet: 'ఇంకా పత్రాలు అప్‌లోడ్ చేయలేదు.',
      noChecksYet: 'ఇంకా పథకాల తనిఖీ జరగలేదు.',
    },
    docAssistance: {
      title: 'కర్ణాటక పత్రాల సహాయం',
      subtitle: 'భూమి రికార్డులు మరియు నోటీసుల తక్షణ AI వివరణ.',
      uploadBoxTitle: 'ప్రభుత్వ పత్రాన్ని అప్‌లోడ్ చేయండి',
      uploadBoxDesc: 'PDF, JPG, PNG మద్దతు ఉంది (RTC/పహణి, EC, ఖాతా, అద్దె ఒప్పందం, మొదలైనవి)',
      sampleBtn: 'లేదా ధృవీకరించబడిన కర్ణాటక నమూనాను ఎంచుకోండి',
      analyzing: 'పత్రాన్ని విశ్లేషిస్తోంది...',
      extracting: 'టెక్స్ట్ వెలికితీస్తోంది...',
      secWhatIs: '1. ఈ పత్రం ఏమిటి?',
      secWhyImportant: '2. ఇది ఎందుకు ముఖ్యం?',
      secDetails: '3. ముఖ్య వివరాలు',
      secDates: '4. ముఖ్యమైన తేదీలు & గడువులు',
      secActions: '5. పౌరుడు ఇప్పుడు ఏమి చేయాలి?',
      secDocuments: '6. అవసరమైన పత్రాలు',
      secWarnings: '7. ముఖ్యమైన హెచ్చరికలు',
      secDepartment: '8. సంబంధిత కర్ణాటక ప్రభుత్వ శాఖ',
      secPortal: '9. అధికారిక పోర్టల్',
      secSources: '10. ఉపయోగించిన అధికారిక మూలాలు',
      readAloud: 'వాయిస్ వినండి',
      stopAudio: 'ఆపండి',
      setReminder: 'రిమైండర్ సెట్ చేయండి',
    },
    schemes: {
      title: 'కర్ణాటక ప్రభుత్వ పథకాల అర్హత',
      subtitle: 'ప్రభుత్వ మార్గదర్శకాల ఆధారంగా పారదర్శక నిబంధనల ఆధారిత ధృవీకరణ.',
      formTitle: 'పౌరుడి వివరాలు',
      evaluateBtn: 'నా అర్హతను తనిఖీ చేయండి',
      filterAll: 'అన్ని పథకాలు',
      filterEligible: 'అర్హత కలిగినవి',
      filterNotEligible: 'అర్హత లేనివి',
      filterMoreInfo: 'మరింత సమాచారం అవసరం',
      askAdvice: 'AI పౌర సలహా పొందండి',
      conditionsSatisfied: 'పూర్తయిన నిబంధనలు',
      conditionsFailed: 'పూర్తికాని నిబంధనలు',
      missingInfo: 'తప్పిపోయిన సమాచారం',
      officialPortal: 'అధికారిక దరఖాస్తు పోర్టల్',
      officialGuidelines: 'అధికారిక మార్గదర్శకాలు',
    },
    sources: {
      title: 'కర్ణాటక అధికారిక ప్రభుత్వ పోర్టల్స్',
      subtitle: 'ధృవీకరించబడిన ప్రభుత్వ మూలాల కేంద్ర సమాచారం.',
      searchPlaceholder: 'శోధించండి...',
      allDepartments: 'అన్ని విభాగాలు',
      priority1: 'ప్రాధాన్యత 1 (చట్టాలు, నిబంధనలు మరియు ఉత్తర్వులు)',
      priority2: 'ప్రాధాన్యత 2 (అధికారిక వెబ్‌సైట్లు)',
      priority3: 'ప్రాధాన్యత 3 (NIC మౌలిక సదుపాయాలు)',
    },
    common: {
      verified: 'ధృవీకరించబడినది',
      unverified: 'ధృవీకరించబడలేదు',
      official: 'అధికారిక పోర్టల్',
      close: 'మూసివేయి',
      cancel: 'రద్దు చేయి',
      save: 'సేవ్ చేయి',
      delete: 'తొలగించు',
      loading: 'వేచి ఉండండి...',
      success: 'విజయవంతం',
      error: 'లోపం',
      karnatakaResident: 'కర్ణాటక నివాసి',
    },
  },
  ta: {
    appName: 'நாக்ரிக் AI',
    tagline: 'கர்நாடக அரசின் AI குடிமக்கள் உதவி தளம்',
    nav: {
      dashboard: 'முகப்பு பலகை',
      documents: 'ஆவண உதவி',
      schemes: 'திட்ட தகுதி',
      sources: 'அதிகாரப்பூர்வ ஆதாரங்கள்',
      reminders: 'காலக்கெடு & நினைவூட்டல்',
      login: 'உள்நுழையவும்',
      signup: 'கணக்கு தொடங்கவும்',
      logout: 'வெளியேறு',
      profile: 'சுயவிவரம்',
    },
    hero: {
      title: 'கர்நாடக குடிமக்களுக்கு துல்லியமான அரசு வழிகாட்டல்',
      subtitle: 'RTC/பஹானி, கட்டா சான்றிதழ், காவேரி EC மற்றும் அரசு நலத்திட்டங்களை எளிய முறையில் புரிந்து கொள்ளுங்கள்.',
      btnDocAssistance: 'ஆவணத்தை ஆராயுங்கள்',
      btnSchemeChecker: 'திட்ட தகுதியை சரிபார்க்கவும்',
      badge: 'அதிகாரப்பூர்வ கர்நாடக அரசு ஆதாரங்கள் மட்டுமே',
    },
    dashboard: {
      welcome: 'வணக்கம்,',
      citizenPortalNote: 'உங்கள் பதிவுகள் பாதுகாக்கப்பட்டவை மற்றும் கர்நாடக அரசு தரவுகளுடன் சரிபார்க்கப்பட்டவை.',
      docAssistanceTitle: 'கர்நாடக ஆவண உதவி',
      docAssistanceDesc: 'பஹானி, EC சான்றிதழ், கட்டா மற்றும் வருமான சான்றிதழ்களை எளிய மொழியில் புரிந்து கொள்ளுங்கள்.',
      schemeCheckerTitle: 'நலத்திட்ட தகுதி சரிபார்ப்பு',
      schemeCheckerDesc: 'SSP உதவித்தொகை, கிருஹ லட்சுமி, யுவ நிதி மற்றும் ரைத சிரி திட்டங்களுக்கான விதி அடிப்படையிலான தணிக்கை.',
      recentDocs: 'சமீபத்திய ஆவணங்கள்',
      recentChecks: 'சமீபத்திய திட்ட சோதனைகள்',
      upcomingDeadlines: 'வரவிருக்கும் காலக்கெடு',
      verifiedSources: 'அதிகாரப்பூர்வ போர்டல்கள்',
      viewAll: 'அனைத்தையும் காண்க',
      noDocsYet: 'ஆவணங்கள் எதுவும் பதிவேற்றப்படவில்லை.',
      noChecksYet: 'திட்ட சோதனைகள் எதுவும் செய்யப்படவில்லை.',
    },
    docAssistance: {
      title: 'கர்நாடக ஆவண உதவி',
      subtitle: 'நில ஆவணங்கள் மற்றும் அறிவிப்புகளின் உடனடி AI விளக்கம்.',
      uploadBoxTitle: 'அரசு ஆவணத்தை பதிவேற்றவும்',
      uploadBoxDesc: 'PDF, JPG, PNG ஆதரிக்கப்படுகிறது (RTC/பஹானி, EC, கட்டா, வாடகை ஒப்பந்தம், முதலியன)',
      sampleBtn: 'அல்லது மாதிரி கர்நாடக ஆவணத்தைத் தேர்ந்தெடுக்கவும்',
      analyzing: 'ஆவணம் ஆராயப்படுகிறது...',
      extracting: 'உரை பிரித்தெடுக்கப்படுகிறது...',
      secWhatIs: '1. இந்த ஆவணம் என்ன?',
      secWhyImportant: '2. இது ஏன் முக்கியமானது?',
      secDetails: '3. முக்கியமான விவரங்கள்',
      secDates: '4. முக்கிய தேதிகள் & காலக்கெடு',
      secActions: '5. குடிமகன் இப்போது என்ன செய்ய வேண்டும்?',
      secDocuments: '6. தேவையான ஆதரவு ஆவணங்கள்',
      secWarnings: '7. முக்கிய எச்சரிக்கைகள்',
      secDepartment: '8. தொடர்புடைய கர்நாடக அரசு துறை',
      secPortal: '9. அதிகாரப்பூர்வ போர்டல்',
      secSources: '10. பயன்படுத்தப்பட்ட அதிகாரப்பூர்வ ஆதாரங்கள்',
      readAloud: 'குரலில் கேளுங்கள்',
      stopAudio: 'நிறுத்து',
      setReminder: 'நினைவூட்டல் அமைக்கவும்',
    },
    schemes: {
      title: 'கர்நாடக அரசு திட்ட தகுதி',
      subtitle: 'அரசு வழிகாட்டுதல்களின் அடிப்படையில் வெளிப்படையான விதி அடிப்படையிலான சரிபார்ப்பு.',
      formTitle: 'குடிமக்கள் சுயவிவரம்',
      evaluateBtn: 'என் தகுதியை சரிபார்க்கவும்',
      filterAll: 'அனைத்து திட்டங்கள்',
      filterEligible: 'தகுதியுள்ளவை',
      filterNotEligible: 'தகுதியற்றவை',
      filterMoreInfo: 'கூடுதல் தகவல் தேவை',
      askAdvice: 'AI ஆலோசனை பெறுக',
      conditionsSatisfied: 'நிறைவேறிய நிபந்தனைகள்',
      conditionsFailed: 'நிறைவேறாத நிபந்தனைகள்',
      missingInfo: 'விடுபட்ட தகவல்கள்',
      officialPortal: 'அதிகாரப்பூர்வ விண்ணப்ப போர்டல்',
      officialGuidelines: 'அதிகாரப்பூர்வ வழிகாட்டுதல்கள்',
    },
    sources: {
      title: 'கர்நாடக அதிகாரப்பூர்வ அரசு ஆதாரங்கள்',
      subtitle: 'அங்கீகரிக்கப்பட்ட கர்நாடக அரசு தளங்களின் தொகுப்பு.',
      searchPlaceholder: 'தேடுக...',
      allDepartments: 'அனைத்து துறைகள்',
      priority1: 'முன்னுரிமை 1 (சட்டங்கள், விதிகள் & அரசு ஆணைகள்)',
      priority2: 'முன்னுரிமை 2 (அதிகாரப்பூர்வ துறை இணையதளங்கள்)',
      priority3: 'முன்னுரிமை 3 (NIC தொழில்நுட்ப கட்டமைப்பு)',
    },
    common: {
      verified: 'சரிபார்க்கப்பட்டது',
      unverified: 'சரிபார்க்கப்படாதது',
      official: 'அதிகாரப்பூர்வ போர்டல்',
      close: 'மூடு',
      cancel: 'ரத்து செய்',
      save: 'சேமி',
      delete: 'நீக்கு',
      loading: 'செயல்பாட்டில் உள்ளது...',
      success: 'வெற்றி',
      error: 'பிழை',
      karnatakaResident: 'கர்நாடக குடிமகன்',
    },
  },
};
