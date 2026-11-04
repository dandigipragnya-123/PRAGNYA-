# NagrikAI – Karnataka's AI-Powered Citizen Assistance Platform
**ಕರ್ನಾಟಕ ನಾಗರಿಕ ಸೇವಾ ವೇದಿಕೆ**

NagrikAI is a full-stack, multilingual citizen assistance web platform focused exclusively on **Karnataka, India**. Its mission is to empower ordinary citizens to understand administrative documents and discover relevant state welfare schemes without depending on intermediaries or touts.

---

## 🏛️ Key Capabilities

### 1. Karnataka Document Assistance (ದಾಖಲೆ ನೆರವು)
- **Supported Documents**:
  - **RTC / Pahani (Form 16)** – Verified against Karnataka Bhoomi Land Records (`https://landrecords.karnataka.gov.in/`).
  - **Encumbrance Certificate (EC - Form 15 & 16)** – Verified against Kaveri Online Services (`https://kaveri.karnataka.gov.in/`).
  - **Khata Certificate (A-Khata / B-Khata / e-Khata)** – Greater Bengaluru Authority (GBA) / BBMP & e-Swathu (`https://gba.karnataka.gov.in/`, `https://eswathu.karnataka.gov.in/`).
  - **BBMP / GBA Property Tax Notices** – SAS Assessment & Demand Notices.
  - **Karnataka Rental / Lease Agreements** – Stamps & Registration Act compliance (`https://igr.karnataka.gov.in/`).
  - **Income & Caste Certificates** – Nadakacheri RD Number verification (`https://sevasindhu.karnataka.gov.in/`).
- **Input Formats**: PDF, JPG, PNG, and selectable text.
- **Context Isolation**: Every uploaded document runs in an independent session with dedicated IDs, isolated analysis records, and private user association.
- **Structured 10-Section Output**:
  1. What is this document?
  2. Why is it important?
  3. Extracted reference numbers, monetary amounts, and parcel details.
  4. Important dates & timelines (with one-click "Set Reminder").
  5. What does the citizen need to do? (Action items).
  6. Required supporting documents.
  7. Important warnings and encumbrance alerts.
  8. Relevant Karnataka government department.
  9. Official verification portal & step-by-step verification method.
  10. Sources used & verification status.

### 2. Karnataka Government Scheme Eligibility Checker (ಯೋಜನೆಗಳ ಅರ್ಹತಾ ಪರೀಕ್ಷಕ)
- **Rule-Based Evaluation Engine**: Evaluates conditions in backend code (age, income ceiling, Karnataka domicile, student course level, category, land ownership, tax status) returning one of 4 strict statuses:
  - `LIKELY ELIGIBLE`
  - `NOT ELIGIBLE`
  - `MORE INFORMATION REQUIRED`
  - `UNABLE TO VERIFY`
- **Transparent Reasoning**: Clear lists of conditions satisfied, conditions failed, and missing information.
- **AI Citizen Guidance**: Powered by Gemini 3.8 Flash, delivering compassionate guidance strictly grounded in the rule engine results without altering determinations.
- **Core Schemes Covered**:
  - Karnataka State Scholarship Portal (SSP Post-Matric & Pre-Matric)
  - Gruha Lakshmi Scheme (₹2,000/month for woman head of family)
  - Yuva Nidhi Scheme (Unemployment allowance for Karnataka graduates)
  - Raitha Siri Scheme (₹10,000/ha for millet cultivation)
  - Ganga Kalyana Scheme (Irrigation borewells for small/marginal SC/ST/OBC farmers)
  - Arivu Education Loan Scheme (Subsidized loans for higher education)
  - Gruha Jyothi (Free domestic power up to 200 units)
  - Shakthi Scheme (Free bus travel for women across Karnataka)
  - PM-KISAN (Central Government scheme integrated via Karnataka FRUITS)

### 3. Karnataka Official Source Registry
- Central database of **21 verified Karnataka Government Portals** (Bhoomi, Kaveri, Seva Sindhu, Seva One, SSP, FRUITS, Raita Mitra, GBA, etc.).
- Categorized by authority priority (Priority 1: Acts/Gazettes/Registries; Priority 2: Department Portals; Priority 3: NIC Technical Infrastructure).

### 4. Multilingual & Accessibility Support
- Complete localization across **5 languages**:
  - **Kannada (ಕನ್ನಡ)** – Primary state language.
  - **English** – Administrative and legal terminology.
  - **Hindi (हिंदी)**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**.
- **Voice Assistance**:
  - Speech-to-Text in Kannada (`kn-IN`) and English (`en-IN`).
  - Text-to-Speech read-aloud for document breakdowns and scheme results.
  - Typed query fallback.

### 5. Deadlines & Reminders
- Automatic deadline detection from analyzed documents.
- Custom deadline reminders with calendar tracking.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19 SPA, Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans & Noto Sans Kannada typography.
- **Backend**: Express + Node.js (with full TypeScript typing), RESTful APIs.
- **AI / LLM**: Gemini 3.8 Flash via `@google/genai` TypeScript SDK (server-side only with telemetry header `aistudio-build`).
- **Database**: MongoDB-compatible persistent datastore with optional `MONGODB_URI` connection.
- **Security**:
  - Password hashing with `bcryptjs`.
  - JWT token generation and verification middleware (`jsonwebtoken`).
  - User-level data isolation.
  - Safe error reporting and untrusted document handling.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start full-stack development server (Port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 🔑 Environment Variables (`.env`)

- `GEMINI_API_KEY`: Google Gemini API key (automatically injected in AI Studio).
- `JWT_SECRET`: Secret key for signing citizen authentication tokens.
- `MONGODB_URI`: Optional MongoDB Atlas URI for persistent database storage.
