export type Language = 'en' | 'kn' | 'hi' | 'te' | 'ta';

export interface User {
  id: string;
  fullName: string;
  email: string;
  preferredLanguage: Language;
  createdAt: string;
}

export type VerificationStatus =
  | 'Verified'
  | 'Verification Due'
  | 'Unavailable'
  | 'Unverified'
  | 'Review Required';

export interface GovernmentSource {
  source_id: string;
  source_name: string;
  department: string;
  source_type: 'Portal' | 'Order' | 'Registry' | 'Database' | 'Guidelines' | 'Service Portal';
  official_url: string;
  supported_document_types: string[];
  supported_scheme_ids: string[];
  publication_date?: string;
  effective_date?: string;
  last_checked_at: string;
  last_verified_at: string;
  verification_status: VerificationStatus;
  notes: string;
  authority_priority: 'Priority 1' | 'Priority 2' | 'Priority 3';
}

export interface DocumentItem {
  document_id: string;
  user_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  document_type_detected?: string;
  extracted_text: string;
  uploaded_at: string;
  status: 'uploaded' | 'extracted' | 'analyzed' | 'failed';
  error_message?: string;
}

export interface ImportantDate {
  label: string;
  date: string;
  is_deadline?: boolean;
}

export interface DocumentAnalysis {
  analysis_id: string;
  document_id: string;
  user_id: string;
  document_type: string;
  issuing_authority: string;
  document_holder: string;
  reference_numbers: Record<string, string>;
  financial_amounts: Record<string, string>;
  property_or_personal_details: Record<string, string>;
  what_is_this_document: string;
  why_is_it_important: string;
  important_dates: ImportantDate[];
  required_actions: string[];
  required_supporting_documents: string[];
  warnings: string[];
  relevant_department: string;
  official_verification_portal: {
    name: string;
    url: string;
    procedure: string;
    status: string;
  };
  sources_used: Array<{
    source_name: string;
    department: string;
    official_url: string;
    verification_status: string;
    last_checked: string;
  }>;
  analyzed_at: string;
  language: Language;
  confidence_score?: number;
}

export type SchemeCategory =
  | 'scholarship'
  | 'farmer'
  | 'social_welfare'
  | 'women_child'
  | 'youth_employment'
  | 'backward_classes';

export interface SchemeEligibilityRules {
  min_age?: number;
  max_age?: number;
  gender?: 'All' | 'Female' | 'Male';
  occupations?: string[];
  max_annual_income?: number;
  education_levels?: string[];
  categories?: string[];
  must_be_karnataka_resident: boolean;
  farmer_land_required?: boolean;
  is_unemployed_grad_required?: boolean;
  additional_criteria?: string[];
}

export interface Scheme {
  scheme_id: string;
  scheme_name: string;
  scheme_name_kannada: string;
  scheme_category: SchemeCategory;
  implementing_department: string;
  state_or_central: 'Karnataka State' | 'Central Government (Karnataka Integration)';
  description: string;
  benefits: string;
  eligibility_rules: SchemeEligibilityRules;
  exclusion_criteria: string[];
  required_documents: string[];
  application_process: string;
  application_url: string;
  official_guidelines_url: string;
  source_ids: string[];
  publication_date: string;
  effective_date: string;
  last_verified_date: string;
  verification_status: 'Verified' | 'Verification Due';
}

export type EligibilityStatus =
  | 'LIKELY ELIGIBLE'
  | 'NOT ELIGIBLE'
  | 'MORE INFORMATION REQUIRED'
  | 'UNABLE TO VERIFY';

export interface SchemeEligibilityResult {
  scheme_id: string;
  scheme_name: string;
  scheme_name_kannada?: string;
  department: string;
  state_or_central: string;
  category: SchemeCategory;
  status: EligibilityStatus;
  conditions_satisfied: string[];
  conditions_not_satisfied: string[];
  missing_information: string[];
  benefits: string;
  required_documents: string[];
  application_procedure: string;
  application_url: string;
  guidelines_url: string;
  last_verified_date: string;
  explanation?: string;
}

export interface UserEligibilityProfile {
  age?: number;
  state: string;
  district: string;
  annual_income?: number;
  occupation: string;
  education_level?: string;
  category?: string;
  gender?: string;
  has_disability?: boolean;
  is_farmer?: boolean;
  owns_agricultural_land?: boolean;
  land_area_acres?: number;
  is_graduate_unemployed?: boolean;
  graduation_year?: number;
  is_income_tax_payer?: boolean;
  is_female_head_of_family?: boolean;
}

export interface EligibilityCheckRecord {
  check_id: string;
  user_id: string;
  input_profile: UserEligibilityProfile;
  results: SchemeEligibilityResult[];
  checked_at: string;
}

export interface Reminder {
  reminder_id: string;
  user_id: string;
  title: string;
  description: string;
  due_date: string;
  document_id?: string;
  scheme_id?: string;
  is_completed: boolean;
  created_at: string;
}

export interface AppNotification {
  notification_id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'document' | 'scheme' | 'deadline' | 'advisory';
  is_read: boolean;
  created_at: string;
  action_url?: string;
}
