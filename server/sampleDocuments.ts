export interface SampleDocumentTemplate {
  id: string;
  name: string;
  name_kannada: string;
  type: string;
  category: string;
  description: string;
  content: string;
  suggestedOfficialPortal: string;
  officialUrl: string;
}

export const SAMPLE_DOCUMENTS: SampleDocumentTemplate[] = [
  {
    id: 'sample-rtc-pahani',
    name: 'Karnataka Bhoomi RTC / Pahani (Form 16)',
    name_kannada: 'ಕರ್ನಾಟಕ ಭೂಮಿ ಆರ್.ಟಿ.ಸಿ / ಪಹಣಿ (ನಮೂನೆ 16)',
    type: 'RTC / Pahani',
    category: 'Land Records',
    description: 'Official Bhoomi land record extract showing Survey 42/1B in Doddaballapura Taluk with crop details and landowner rights.',
    suggestedOfficialPortal: 'Bhoomi Land Records Portal',
    officialUrl: 'https://landrecords.karnataka.gov.in/',
    content: `GOVERNMENT OF KARNATAKA - REVENUE DEPARTMENT
BHOOMI ONLINE RTC / RECORD OF RIGHTS, TENANCY AND CROPS (FORM NO. 16)
Generated Online: 02/11/2026 11:24:18 AM
District: Bengaluru Rural | Taluk: Doddaballapura | Hobli: Kasaba | Village: Doddabelavangala
Survey Number: 42 | Hissa Number: 1B | Total Extent: 02-14-00 (2 Acres 14 Guntas)
Kharab Land: 00-02-00 (A-Kharab: 2 Guntas) | Net Cultivable Area: 02-12-00 (Dry Land / Kushki)
Soil Assessment / Kandaya: Rs. 14.80 per annum

COLUMN 9 & 10 - OWNERSHIP DETAILS (ಖಾತೆದಾರರ ಮತ್ತು ಹಕ್ಕುಗಳ ವಿವರ):
Khata Number: 1042
Owner Name: ಶ್ರೀ ಬಸವರಾಜ ಗೌಡ (Basavaraj Gowda) bin late Channappa Gowda
Inheritance Mode: Mutation Register M.R. No. 14/2021-2022 (Vamsha Vruksha Partition)
Liabilities / Encumbrance: Nil / No bank hypothecation registered in Bhoomi

COLUMN 11 & 12 - CROP DETAILS (ಬೆಳೆ ವಿವರ - ಮುಂಗಾರು ಹಂಗಾಮು 2026):
Cultivator: Owner Self-Cultivated (ಸ್ವಂತ ಸಾಗುವಳಿ)
Crop: Ragi (ರಾಗಿ) - 1 Acre 20 Guntas; Tur Dal (ತೊಗರಿ) - 30 Guntas
Irrigation Source: Rainfed (ಮಳೆಯಾಶ್ರಿತ)
Tree Count: 4 Coconut Palms, 2 Neem Trees

Note: This computer-generated RTC is digitally signed and valid under Karnataka Land Revenue Act, 1964. Authenticate at https://landrecords.karnataka.gov.in/`
  },
  {
    id: 'sample-kaveri-ec',
    name: 'Kaveri Encumbrance Certificate (EC - Form 15)',
    name_kannada: 'ಕಾವೇರಿ ಋಣಭಾರ ಪ್ರಮಾಣ ಪತ್ರ (ನಮೂನೆ 15)',
    type: 'Encumbrance Certificate',
    category: 'Property Registration',
    description: 'Kaveri 2.0 certified search certificate showing nil encumbrance for a residential site in Jayanagar, Bengaluru.',
    suggestedOfficialPortal: 'Kaveri Online Services (Kaveri 2.0)',
    officialUrl: 'https://kaveri.karnataka.gov.in/',
    content: `DEPARTMENT OF STAMPS AND REGISTRATION - GOVERNMENT OF KARNATAKA
FORM NO. 15 - CERTIFICATE OF ENCUMBRANCE ON PROPERTY (KAVERI 2.0 ONLINE)
Application No: EC/KVR/2026/094821 | Date of Issue: 28/10/2026
Office of the Senior Sub-Registrar: Jayanagar (Bengaluru Urban)

SEARCH PARTICULARS:
Period of Search: From 01-04-2011 to 27-10-2026 (15 Years)
Property Details: Residential Site No. 24, Khata No. 88/24, 4th Block Jayanagar, Bengaluru - 560011
Measurement: East to West: 40 Feet, North to South: 60 Feet, Total Area: 2,400 Sq. Ft.
Boundaries: East: Site No. 25 | West: Site No. 23 | North: 40 Feet Road | South: Site No. 36

RECORDED TRANSACTIONS WITHIN SEARCH PERIOD:
Entry 1:
Date of Registration: 14-06-2018 | Document No: JAY-1-04128-2018-19 | Book 1 | CD No: JAYD128
Nature of Document: Absolute Sale Deed (ಸಂಪೂರ್ಣ ಕ್ರಯಪತ್ರ)
Executant (Seller): Sri N. Satish Kumar
Claimant (Purchaser): Smt. Poornima Moulya w/o R. Moulya
Market Value: Rs. 84,00,000 | Consideration: Rs. 84,00,000 | Stamp Duty Paid: Rs. 4,70,400 | Registration Fee: Rs. 84,000

Entry 2 (Subsequent period up to 27-10-2026):
NIL FURTHER TRANSACTIONS. No mortgages, court attachments, or lis pendens recorded.

CERTIFICATION:
I hereby certify that search has been made in Book 1 and its indexes on the Kaveri database. The search reveals no outstanding registered encumbrances.
Digital Signature: Sub-Registrar, Jayanagar, Bengaluru. Verify on https://kaveri.karnataka.gov.in/`
  },
  {
    id: 'sample-bbmp-khata',
    name: 'BBMP / GBA e-Khata Certificate & Extract',
    name_kannada: 'ಬಿಬಿಎಂಪಿ / ಜಿಬಿಎ ಇ-ಖಾತಾ ಪ್ರಮಾಣ ಪತ್ರ ಮತ್ತು ಸಾರಾಂಶ',
    type: 'Khata Certificate',
    category: 'Urban Property',
    description: 'Greater Bengaluru Authority (GBA) A-Khata certificate for residential property in Bellandur ward with Property ID (PID).',
    suggestedOfficialPortal: 'Greater Bengaluru Authority Portal',
    officialUrl: 'https://gba.karnataka.gov.in/',
    content: `GREATER BENGALURU AUTHORITY (GBA) / BRUHAT BENGALURU MAHANAGARA PALIKE
ASSESSMENT EXTRACT & E-KHATA CERTIFICATE (A-KHATA)
Issued under Karnataka Municipal Corporations Act & BBMP Property Tax Rules
Issue Date: 15-09-2026 | Certificate Ref: GBA/WZ/BLD/2026-27/003891

PROPERTY IDENTIFICATION:
Property Identification Number (PID): 084-W0150-29
Old Assessment No: 150/88/2 | New Ward: Ward 150 (Bellandur) | Zone: Mahadevapura
Property Address: Flat No. 302, 3rd Floor, 'Sowparnika Elite', 2nd Cross, Green Glen Layout, Bellandur, Bengaluru - 560103
Category: Residential Apartment (Own Occupation)
Super Built-up Area: 1,340 Sq. Ft. | Car Parking: 1 Covered Slot (120 Sq. Ft.)

OWNERSHIP DETAILS:
Khata Holder Name: Smt. Poornima Moulya
Aadhaar Linked: Verified (XXXX-XXXX-8921)
Sale Deed Reg No: JAY-1-04128-2018-19 dated 14-06-2018

TAX STATUS (FINANCIAL YEAR 2026-27):
Property Tax Assessed: Rs. 6,480.00 | Solid Waste Management (SWM) Cess: Rs. 720.00
State Cess: Rs. 864.00 | Total Tax Due: Rs. 8,064.00
Payment Status: PAID IN FULL (Challan No: BBMP-SAS-2026-881920 on 12-04-2026 with 5% rebate)
Tax Arrears: Rs. 0.00 (Nil)

Verification: This e-Khata is digitally verified with GIS coordinates. Verify at https://gba.karnataka.gov.in/`
  },
  {
    id: 'sample-nadakacheri-income',
    name: 'Karnataka Nadakacheri Income & Caste Certificate',
    name_kannada: 'ನಾಡಕಚೇರಿ ಆದಾಯ ಮತ್ತು ಜಾತಿ ಪ್ರಮಾಣ ಪತ್ರ (ಆರ್‌ಡಿ ಸಂಖ್ಯೆ)',
    type: 'Income Certificate',
    category: 'Citizen Welfare',
    description: 'Atalji Janasnehi Kendra (Nadakacheri) revenue certificate with Barcode RD Number for scholarship and scheme applications.',
    suggestedOfficialPortal: 'Seva Sindhu / Nadakacheri',
    officialUrl: 'https://sevasindhu.karnataka.gov.in/',
    content: `GOVERNMENT OF KARNATAKA - REVENUE DEPARTMENT
ATALJI JANASNEHI KENDRA (NADAKACHERI)
INCOME AND CASTE CERTIFICATE (CASTE FORM E / INCOME CERTIFICATE)
Certificate Number (RD Number): RD0038472910384
Application Reference: AJ-BNG-2026-081290 | Date of Issue: 18-07-2026
Valid For: 5 Years from Date of Issue (Valid up to 17-07-2031)

This is to certify that:
Applicant Name: Poornima Moulya
Father / Husband: Late R. Moulya | Mother: Parvathamma
Resident of: Village: Kengeri Hobli, Bengaluru South Taluk, Bengaluru Urban District, Karnataka

CASTE AND INCOME PARTICULARS:
1. Caste: Devanga (ದೇವಾಂಗ)
2. Notified Category under Karnataka Government Order: Category 2A (ಪ್ರವರ್ಗ-೨ಎ)
3. Annual Family Income from All Sources: Rs. 1,80,000/- (Rupees One Lakh Eighty Thousand Only)
   - Agriculture / Livestock: Rs. 40,000/-
   - Other Occupations / Services: Rs. 1,40,000/-
4. Purpose of Issue: For Karnataka State Scholarship Portal (SSP), Higher Education & Government Welfare Schemes.

Issued under the seal of Tahsildar, Bengaluru South Taluk.
Verify electronically on Nadakacheri or Seva Sindhu: https://sevasindhu.karnataka.gov.in/`
  },
  {
    id: 'sample-rental-agreement',
    name: 'Karnataka Residential Rental Agreement',
    name_kannada: 'ಕರ್ನಾಟಕ ವಸತಿ ಬಾಡಿಗೆ ಕರಾರು ಪತ್ರ',
    type: 'Rental Agreement',
    category: 'Tenancy & Housing',
    description: 'Standard 11-month Karnataka residential tenancy lease on e-Stamp paper with deposit, monthly rent, and termination terms.',
    suggestedOfficialPortal: 'Department of Stamps and Registration (IGR)',
    officialUrl: 'https://igr.karnataka.gov.in/',
    content: `KARNATAKA STATE NON-JUDICIAL E-STAMP PAPER
Certificate No: IN-KA89210381029482U | Certificate Issued Date: 01-08-2026
Stamp Duty Amount: Rs. 200.00 (Article 30 Karnataka Stamp Act)

RESIDENTIAL RENTAL AGREEMENT
This agreement is made on this 1st day of August 2026 at Bengaluru, Karnataka:
BETWEEN:
LESSOR / LANDLORD: Sri K. Ramesh Rao, aged about 56 years, residing at No. 12, 1st Main, Indiranagar, Bengaluru.
AND
LESSEE / TENANT: Sri Praveen Kumar, aged about 28 years, presently employed at Electronic City, Bengaluru.

TERMS AND CONDITIONS:
1. PREMISES: Flat No. 204, Second Floor, Green Meadows Apartment, Sarjapur Road, Bellandur, Bengaluru - 560103.
2. MONTHLY RENT: Rs. 24,000/- (Rupees Twenty Four Thousand Only) payable on or before 5th of every English calendar month.
3. SECURITY DEPOSIT: Rs. 1,20,000/- (Rupees One Lakh Twenty Thousand Only) paid via NEFT transaction ref: UTR29182019. Deposit is refundable without interest upon vacant handover.
4. PERIOD: 11 Months commencing from 01-08-2026 to 30-06-2027.
5. MAINTENANCE & UTILITIES: Water and Bescom domestic power bills to be paid directly by Tenant.
6. NOTICE PERIOD: 1 Month prior written notice from either party for termination.
7. RENEWAL CLAUSE: Escalation of 5% on monthly rent if renewed for another term.

Signed, Sealed and Delivered by Landlord and Tenant in the presence of two witnesses. Verify stamp certificate on https://igr.karnataka.gov.in/`
  }
];
