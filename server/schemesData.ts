import { Scheme } from '../src/types';

export const KARNATAKA_SCHEMES: Scheme[] = [
  {
    scheme_id: 'scheme-ssp-postmatric',
    scheme_name: 'Karnataka State Scholarship (SSP Post-Matric)',
    scheme_name_kannada: 'ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (ಮೆಟ್ರಿಕ್ ನಂತರದ ವಿದ್ಯಾರ್ಥಿವೇತನ)',
    scheme_category: 'scholarship',
    implementing_department: 'Social Welfare, Tribal Welfare, BCWD & Minorities Welfare Departments',
    state_or_central: 'Karnataka State',
    description: 'Comprehensive financial scholarship and fee reimbursement for Karnataka students pursuing Post-Matric, ITI, Diploma, Undergraduate, and Postgraduate degrees.',
    benefits: 'Full/Partial Tuition Fee reimbursement, Maintenance Allowance up to ₹1,200/month, and hostel fee subsidy.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      education_levels: ['Post-Matric', 'Diploma', 'Undergraduate', 'Postgraduate', 'Professional Course'],
      categories: ['SC', 'ST', 'Cat-1', '2A', '2B', '3A', '3B', 'General', 'Minority'],
      max_annual_income: 250000, // ₹2.5 Lakh for SC/ST and Cat-1; ₹1 Lakh for 2A/3A/3B unless specified
      occupations: ['Student']
    },
    exclusion_criteria: [
      'Students already availing full financial benefits from other central or private scholarship schemes',
      'Annual family income exceeding specified category threshold',
      'Non-Karnataka domicile students (unless special quota permitted by GoK)'
    ],
    required_documents: [
      'SATS Student Number / College USN / Registration Number',
      'RD Number of valid Caste and Income Certificate issued by Revenue Department (Nadakacheri)',
      'Aadhaar seeded active Bank Account',
      'College Fee Receipt & Admission Confirmation',
      'Hostel certificate (if residing in government/private hostel)'
    ],
    application_process: 'Apply electronically on the Karnataka State Scholarship Portal (SSP). Enter Aadhaar, authenticate via OTP, link College USN and Revenue RD numbers for instant verification.',
    application_url: 'https://ssp.karnataka.gov.in/',
    official_guidelines_url: 'https://ssp.karnataka.gov.in/postmatric/',
    source_ids: ['src-ssp', 'src-swd', 'src-bcwd'],
    publication_date: '2024-06-01',
    effective_date: '2024-06-01',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-gruha-lakshmi',
    scheme_name: 'Gruha Lakshmi Scheme',
    scheme_name_kannada: 'ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ',
    scheme_category: 'women_child',
    implementing_department: 'Department of Women and Child Development, Government of Karnataka',
    state_or_central: 'Karnataka State',
    description: 'Empowerment financial assistance providing ₹2,000 monthly direct bank transfer to the recognized woman head of every eligible household in Karnataka.',
    benefits: '₹2,000 per month (₹24,000 annually) directly credited to Aadhaar-seeded bank account of the woman head of household.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      gender: 'Female',
      min_age: 18,
      additional_criteria: [
        'Must be designated as the head of family in BPL, APL, or Antyodaya ration card',
        'Neither the woman head nor her husband may be income tax payers or GST filers'
      ]
    },
    exclusion_criteria: [
      'Woman head or her husband paying Income Tax (IT Returns)',
      'Woman head or her husband filing GST returns',
      'Government employees or pensioners drawing state/central government pensions'
    ],
    required_documents: [
      'Karnataka Food and Civil Supplies Ration Card (BPL / Antyodaya / APL) with applicant named as Head of Family',
      'Applicant Aadhaar Card',
      'Husband Aadhaar Card (if applicable)',
      'Aadhaar-linked Bank Passbook / NPCI mapping'
    ],
    application_process: 'Apply through Seva Sindhu portal, Grama One, Karnataka One, or Bangalore One centers. Free registration with biometric/OTP verification.',
    application_url: 'https://sevasindhu.karnataka.gov.in/',
    official_guidelines_url: 'https://dwcd.karnataka.gov.in/',
    source_ids: ['src-dwcd', 'src-sevasindhu', 'src-sevaone'],
    publication_date: '2023-08-30',
    effective_date: '2023-08-30',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-yuva-nidhi',
    scheme_name: 'Yuva Nidhi Scheme (Unemployment Allowance)',
    scheme_name_kannada: 'ಯುವನಿಧಿ ಯೋಜನೆ (ನಿರುದ್ಯೋಗ ಭತ್ಯೆ)',
    scheme_category: 'youth_employment',
    implementing_department: 'Department of Skill Development, Entrepreneurship and Livelihood, Karnataka',
    state_or_central: 'Karnataka State',
    description: 'Monthly unemployment financial allowance and skill-training support for educated Karnataka youths holding degree or diploma qualifications.',
    benefits: '₹3,000 per month for Degree holders; ₹1,500 per month for Diploma holders, for a maximum period of 2 years or until employment is secured.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      min_age: 18,
      max_age: 35,
      education_levels: ['Undergraduate', 'Postgraduate', 'Diploma', 'Professional Course'],
      is_unemployed_grad_required: true,
      occupations: ['Unemployed', 'Student']
    },
    exclusion_criteria: [
      'Employed in government, public sector, or private formal sector (covered under EPF/ESIC)',
      'Self-employed individuals paying GST or professional tax',
      'Students enrolled in full-time regular higher education programs after graduating',
      'Beneficiaries who have already completed 2 years under the scheme'
    ],
    required_documents: [
      'Degree / Diploma Convocation or Provisional Passing Certificate',
      'Karnataka SSLC / 10th Marks card / Domicile proof (minimum 6 years schooling in Karnataka)',
      'Aadhaar Card',
      'Aadhaar-seeded active Bank Account'
    ],
    application_process: 'Apply online on Seva Sindhu or via Karnataka One / Grama One. System verifies university degree credentials against Karnataka higher education repository.',
    application_url: 'https://sevasindhugs.karnataka.gov.in/',
    official_guidelines_url: 'https://sevasindhu.karnataka.gov.in/',
    source_ids: ['src-sevasindhu', 'src-dce'],
    publication_date: '2023-12-26',
    effective_date: '2024-01-01',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-raitha-siri',
    scheme_name: 'Raitha Siri Scheme (Millet Cultivation Incentive)',
    scheme_name_kannada: 'ರೈತ ಸಿರಿ ಯೋಜನೆ (ಸಿರಿಧಾನ್ಯ ಪ್ರೋತ್ಸಾಹಧನ)',
    scheme_category: 'farmer',
    implementing_department: 'Department of Agriculture, Government of Karnataka',
    state_or_central: 'Karnataka State',
    description: 'Financial assistance for Karnataka farmers growing nutricereals / millets (Ragi, Jowar, Navane, Same, Haraka, Korale, Baragu, Oodalu) to promote climate-resilient farming.',
    benefits: 'Direct financial incentive of ₹10,000 per hectare (maximum ₹20,000 up to 2 hectares) directly credited to farmer bank account.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      occupations: ['Farmer'],
      farmer_land_required: true,
      additional_criteria: [
        'Must cultivate designated minor millets (Siri Dhanya) in Karnataka',
        'Crop details must be recorded and verified in Karnataka Farmer Crop Survey Mobile App'
      ]
    },
    exclusion_criteria: [
      'Non-landowning individuals or lands not verified in Bhoomi',
      'Crops other than designated notified millets',
      'Landholding exceeding upper incentive subsidy threshold (max 2 hectares)'
    ],
    required_documents: [
      'FRUITS Farmer Identification (FID Number)',
      'Bhoomi RTC / Pahani showing land ownership and survey number',
      'Crop Survey App recording confirmation of millet cultivation',
      'Aadhaar-seeded bank passbook'
    ],
    application_process: 'Register on FRUITS portal with Bhoomi RTC. Agriculture Officer validates millet sowing via mobile crop survey data; incentive transferred via DBT.',
    application_url: 'https://fruits.karnataka.gov.in/',
    official_guidelines_url: 'https://raitamitra.karnataka.gov.in/',
    source_ids: ['src-fruits', 'src-raitamitra', 'src-bhoomi'],
    publication_date: '2023-04-01',
    effective_date: '2023-04-01',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-ganga-kalyana',
    scheme_name: 'Ganga Kalyana Scheme (Irrigation Borewells)',
    scheme_name_kannada: 'ಗಂಗಾ ಕಲ್ಯಾಣ ಯೋಜನೆ (ನೀರಾವರಿ ಕೊಳವೆಬಾವಿ)',
    scheme_category: 'farmer',
    implementing_department: 'Karnataka Minorities / BCWD / Dr. B.R. Ambedkar Development Corporation',
    state_or_central: 'Karnataka State',
    description: 'Individual and collective irrigation borewell drilling, pump energization, and pipeline installation for small and marginal farmers belonging to SC, ST, and backward communities.',
    benefits: 'Free borewell drilling, submersible pump motor supply, electrical infrastructure, and pipeline with subsidy up to ₹4.50 Lakhs in individual / group irrigation units.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      occupations: ['Farmer'],
      categories: ['SC', 'ST', 'Cat-1', '2A', '2B', '3A', '3B', 'Minority'],
      max_annual_income: 98000, // Rural limit: ₹98,000; Urban limit: ₹1,20,000
      farmer_land_required: true,
      additional_criteria: [
        'Must be a small or marginal farmer owning at least 1.20 acres up to 5 acres of dry land'
      ]
    },
    exclusion_criteria: [
      'Farmers possessing perennial irrigation sources or existing functional borewells',
      'Large farmers owning more than 5 acres of irrigated agricultural land',
      'Annual family income exceeding ₹98,000 in rural areas or ₹1,20,000 in urban areas'
    ],
    required_documents: [
      'Bhoomi RTC / Pahani (latest certified extract)',
      'Small / Marginal Farmer Certificate issued by local Tahsildar / Assistant Agricultural Director',
      'Caste and Income Certificate (RD Number from Nadakacheri)',
      'Groundwater clearance / No-Objection Certificate from District Geologist'
    ],
    application_process: 'Apply online through Seva Sindhu or dedicated Karnataka Corporation development portals (e.g. Ambedkar or Devaraj Urs Corporation).',
    application_url: 'https://sevasindhu.karnataka.gov.in/',
    official_guidelines_url: 'https://swd.karnataka.gov.in/',
    source_ids: ['src-bhoomi', 'src-swd', 'src-bcwd'],
    publication_date: '2023-05-15',
    effective_date: '2023-05-15',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-arivu-loan',
    scheme_name: 'Arivu Education Loan Scheme',
    scheme_name_kannada: 'ಅರಿವು ಶೈಕ್ಷಣಿಕ ಸಾಲ ಯೋಜನೆ',
    scheme_category: 'backward_classes',
    implementing_department: 'D. Devaraj Urs Backward Classes Development Corporation / KMDCL',
    state_or_central: 'Karnataka State',
    description: 'Low-interest education loan assistance for eligible students from backward classes and minority communities admitted to professional courses through KEA (CET / NEET).',
    benefits: 'Loan assistance up to ₹1,00,000 to ₹5,00,000 per year at a subsidized interest rate of 2% per annum, directly paid towards college tuition fees.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      categories: ['Cat-1', '2A', '3A', '3B', 'Minority'],
      max_annual_income: 350000,
      education_levels: ['Undergraduate', 'Professional Course'],
      occupations: ['Student']
    },
    exclusion_criteria: [
      'Management quota admissions without KEA (CET/NEET) counseling allotment',
      'Annual family income exceeding ₹3.5 Lakhs per annum',
      'Defaulters on prior state development corporation loans'
    ],
    required_documents: [
      'KEA Allotment Letter (CET / NEET admission slip)',
      '10th & 12th / PUC Marks cards',
      'Caste and Income Certificate with valid RD number',
      'College fee structure verified by the principal'
    ],
    application_process: 'Submit application via D. Devaraj Urs Corporation portal or Seva Sindhu after receiving KEA course allotment letter.',
    application_url: 'https://kmdc.karnataka.gov.in/',
    official_guidelines_url: 'https://bcwd.karnataka.gov.in/',
    source_ids: ['src-bcwd', 'src-sevasindhu'],
    publication_date: '2024-05-10',
    effective_date: '2024-05-10',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-gruha-jyothi',
    scheme_name: 'Gruha Jyothi (Free Domestic Electricity)',
    scheme_name_kannada: 'ಗೃಹ ಜ್ಯೋತಿ (ಉಚಿತ ಗೃಹ ವಿದ್ಯುತ್)',
    scheme_category: 'social_welfare',
    implementing_department: 'Energy Department, Government of Karnataka (BESCOM, HESCOM, GESCOM, MESCOM, CESC)',
    state_or_central: 'Karnataka State',
    description: 'Provides free domestic electricity up to 200 units per month to all residential domestic power consumers across Karnataka based on average consumption.',
    benefits: 'Zero electricity bill up to the eligible monthly entitlement limit (up to a ceiling of 200 units per month).',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      additional_criteria: [
        'Must hold an active domestic electricity connection Account ID in Karnataka (BESCOM/MESCOM/HESCOM/GESCOM/CESC)',
        'One connection per Aadhaar card per household'
      ]
    },
    exclusion_criteria: [
      'Commercial or industrial power connections',
      'Average monthly usage exceeding 200 units threshold',
      'Multiple claims registered on a single Aadhaar card'
    ],
    required_documents: [
      'Electricity Bill showing Consumer Account ID / Account Number',
      'Aadhaar Card of the resident / tenant',
      'Rental Agreement (if residing as tenant in rented premises)'
    ],
    application_process: 'Register on Seva Sindhu Gruha Jyothi portal with Electricity Consumer ID and Aadhaar. Automatic verification and billing rebate.',
    application_url: 'https://sevasindhugs.karnataka.gov.in/gruhajyothi/',
    official_guidelines_url: 'https://energy.karnataka.gov.in/',
    source_ids: ['src-sevasindhu'],
    publication_date: '2023-06-05',
    effective_date: '2023-08-01',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-shakthi',
    scheme_name: 'Shakthi Scheme (Free Bus Travel for Women)',
    scheme_name_kannada: 'ಶಕ್ತಿ ಯೋಜನೆ (ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಬಸ್ ಪ್ರಯಾಣ)',
    scheme_category: 'women_child',
    implementing_department: 'Transport Department, Government of Karnataka (KSRTC, BMTC, NWKRTC, KKRTC)',
    state_or_central: 'Karnataka State',
    description: 'Universal free bus travel for all women, girl students, and transgender individuals domicile in Karnataka across state-run ordinary and express bus services.',
    benefits: 'Free zero-fare bus ticket across BMTC, KSRTC, NWKRTC, and KKRTC state transport buses within the territorial jurisdiction of Karnataka.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      gender: 'Female',
      additional_criteria: [
        'Domicile resident of Karnataka state'
      ]
    },
    exclusion_criteria: [
      'Luxury, premium AC, sleeper, and inter-state bus services (e.g., Airavat, Club Class, Flybus, Rajahamsa)',
      'Travel originating or concluding outside the territorial boundaries of Karnataka'
    ],
    required_documents: [
      'Any Government-issued Photo ID card showing Karnataka address (Aadhaar, Voter ID, Driving License) or Shakthi Smart Card'
    ],
    application_process: 'Present government photo ID with Karnataka address to bus conductor to receive zero-fare Shakthi ticket. Apply on Seva Sindhu for physical Shakthi Smart Card.',
    application_url: 'https://sevasindhuservices.karnataka.gov.in/',
    official_guidelines_url: 'https://transport.karnataka.gov.in/',
    source_ids: ['src-sevasindhu', 'src-dwcd'],
    publication_date: '2023-06-11',
    effective_date: '2023-06-11',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  },
  {
    scheme_id: 'scheme-pmkisan-karnataka',
    scheme_name: 'PM-KISAN (Central Govt Scheme with Karnataka FRUITS Integration)',
    scheme_name_kannada: 'ಪಿಎಂ-ಕಿಸಾನ್ ಯೋಜನೆ (ಕೇಂದ್ರ ಸರ್ಕಾರ - ಕರ್ನಾಟಕ ಫ್ರೂಟ್ಸ್ ಜೋಡಣೆ)',
    scheme_category: 'farmer',
    implementing_department: 'Ministry of Agriculture, GoI (Administered in Karnataka via Agriculture Dept & FRUITS)',
    state_or_central: 'Central Government (Karnataka Integration)',
    description: 'Central Government income support scheme providing ₹6,000 per year in 3 equal installments to landholding farmer families across Karnataka, verified through FRUITS and Bhoomi land records.',
    benefits: '₹6,000 per year credited in three four-monthly installments of ₹2,000 directly into Aadhaar-seeded bank accounts.',
    eligibility_rules: {
      must_be_karnataka_resident: true,
      occupations: ['Farmer'],
      farmer_land_required: true,
      additional_criteria: [
        'Must hold cultivable landholding registered in Bhoomi land records',
        'Must complete mandatory Aadhaar e-KYC and FRUITS FID registration'
      ]
    },
    exclusion_criteria: [
      'Institutional landholders',
      'Farmer family members who paid income tax in the last assessment year',
      'Constitutional post holders, serving/retired government officers and employees',
      'Retired pensioners with monthly pension of ₹10,000 or more'
    ],
    required_documents: [
      'Karnataka FRUITS Farmer ID (FID)',
      'Bhoomi RTC / Pahani record',
      'Aadhaar Card with biometric/OTP e-KYC',
      'NPCI-mapped active bank account'
    ],
    application_process: 'Farmers can register via PM-KISAN portal or via Karnataka Raitha Samparka Kendras with their Bhoomi RTC and FRUITS FID number.',
    application_url: 'https://pmkisan.gov.in/',
    official_guidelines_url: 'https://fruits.karnataka.gov.in/',
    source_ids: ['src-pmkisan', 'src-fruits', 'src-bhoomi'],
    publication_date: '2019-02-24',
    effective_date: '2019-02-24',
    last_verified_date: '2026-11-01',
    verification_status: 'Verified'
  }
];
