import { Scheme, SchemeEligibilityResult, UserEligibilityProfile, EligibilityStatus } from '../src/types';
import { KARNATAKA_SCHEMES } from './schemesData';

export function evaluateSchemeEligibility(
  scheme: Scheme,
  profile: UserEligibilityProfile
): SchemeEligibilityResult {
  const satisfied: string[] = [];
  const notSatisfied: string[] = [];
  const missing: string[] = [];

  const rules = scheme.eligibility_rules;

  // 1. Karnataka Residence / Domicile Check
  if (rules.must_be_karnataka_resident) {
    if (!profile.state) {
      missing.push('Karnataka state residency status is not specified');
    } else if (profile.state.toLowerCase() === 'karnataka') {
      satisfied.push('Resident of Karnataka state confirmed');
    } else {
      notSatisfied.push(`Scheme is exclusive to Karnataka residents (Provided state: ${profile.state})`);
    }
  }

  // 2. Gender requirement
  if (rules.gender && rules.gender !== 'All') {
    if (!profile.gender) {
      missing.push(`Applicant gender is required (${rules.gender} required)`);
    } else if (profile.gender.toLowerCase() === rules.gender.toLowerCase()) {
      satisfied.push(`Meets gender criterion: ${rules.gender}`);
    } else {
      notSatisfied.push(`Scheme is specifically for ${rules.gender} applicants`);
    }
  }

  // 3. Age Requirements
  if (rules.min_age !== undefined || rules.max_age !== undefined) {
    if (profile.age === undefined || profile.age === null) {
      missing.push('Applicant age is required for verification');
    } else {
      const age = Number(profile.age);
      if (rules.min_age !== undefined && age < rules.min_age) {
        notSatisfied.push(`Applicant age (${age} years) is below minimum age requirement of ${rules.min_age} years`);
      } else if (rules.max_age !== undefined && age > rules.max_age) {
        notSatisfied.push(`Applicant age (${age} years) exceeds maximum age limit of ${rules.max_age} years`);
      } else {
        satisfied.push(`Meets age criterion (${age} years falls within permitted bracket)`);
      }
    }
  }

  // 4. Occupation requirement
  if (rules.occupations && rules.occupations.length > 0) {
    if (!profile.occupation) {
      missing.push(`Occupation is required (${rules.occupations.join(', ')})`);
    } else {
      const occMatch = rules.occupations.some(
        (occ) => occ.toLowerCase() === profile.occupation.toLowerCase()
      );
      if (occMatch) {
        satisfied.push(`Occupation matched: ${profile.occupation}`);
      } else {
        notSatisfied.push(`Occupation does not match required categories (${rules.occupations.join(', ')}). Provided: ${profile.occupation}`);
      }
    }
  }

  // 5. Income Criteria
  if (rules.max_annual_income !== undefined) {
    if (profile.annual_income === undefined || profile.annual_income === null) {
      missing.push(`Annual family income is required (Ceiling: ₹${rules.max_annual_income.toLocaleString('en-IN')})`);
    } else {
      const inc = Number(profile.annual_income);
      if (inc <= rules.max_annual_income) {
        satisfied.push(`Annual family income ₹${inc.toLocaleString('en-IN')} is within eligibility threshold of ₹${rules.max_annual_income.toLocaleString('en-IN')}`);
      } else {
        notSatisfied.push(`Annual family income ₹${inc.toLocaleString('en-IN')} exceeds upper ceiling limit of ₹${rules.max_annual_income.toLocaleString('en-IN')}`);
      }
    }
  }

  // 6. Education Level
  if (rules.education_levels && rules.education_levels.length > 0) {
    if (!profile.education_level) {
      missing.push(`Current education level is required (${rules.education_levels.join(', ')})`);
    } else {
      const eduMatch = rules.education_levels.some(
        (lvl) => lvl.toLowerCase() === profile.education_level?.toLowerCase()
      );
      if (eduMatch) {
        satisfied.push(`Education level satisfied: ${profile.education_level}`);
      } else {
        notSatisfied.push(`Education level (${profile.education_level}) does not qualify for this course category (${rules.education_levels.join(', ')})`);
      }
    }
  }

  // 7. Social Category (SC/ST/OBC/General)
  if (rules.categories && rules.categories.length > 0) {
    if (!profile.category) {
      missing.push(`Social category is required (${rules.categories.join(', ')})`);
    } else {
      const catMatch = rules.categories.some(
        (c) => c.toLowerCase() === profile.category?.toLowerCase() || c === 'General'
      );
      if (catMatch) {
        satisfied.push(`Category criterion satisfied (${profile.category})`);
      } else {
        notSatisfied.push(`Category (${profile.category}) is not among notified target communities (${rules.categories.join(', ')})`);
      }
    }
  }

  // 8. Agricultural Landholding for Farmers
  if (rules.farmer_land_required) {
    if (profile.owns_agricultural_land === undefined) {
      missing.push('Agricultural land ownership status (Bhoomi RTC) is required');
    } else if (profile.owns_agricultural_land) {
      satisfied.push('Cultivable agricultural landholding confirmed');
    } else {
      notSatisfied.push('Scheme requires applicant to be an agricultural landholder registered in Bhoomi');
    }
  }

  // 9. Unemployed Graduate for Yuva Nidhi
  if (rules.is_unemployed_grad_required) {
    if (profile.is_graduate_unemployed === undefined) {
      missing.push('Employment status post-graduation is required');
    } else if (profile.is_graduate_unemployed) {
      satisfied.push('Confirmed unemployed graduate/diploma holder looking for livelihood');
    } else {
      notSatisfied.push('Scheme requires candidate to be actively seeking employment (not formally employed in EPF/ESIC)');
    }
  }

  // 10. Specific exclusions (e.g. Income tax / GST payer for Gruha Lakshmi)
  if (scheme.scheme_id === 'scheme-gruha-lakshmi') {
    if (profile.is_income_tax_payer === true) {
      notSatisfied.push('Applicant or spouse is an Income Tax / GST return payer (statutory scheme exclusion)');
    } else if (profile.is_income_tax_payer === false) {
      satisfied.push('Confirmed non-taxpayer household');
    } else {
      missing.push('Declaration of Income Tax/GST filing status is required');
    }
  }

  // Determine overall status based on strict rule evaluation
  let status: EligibilityStatus = 'LIKELY ELIGIBLE';

  if (notSatisfied.length > 0) {
    status = 'NOT ELIGIBLE';
  } else if (missing.length > 0) {
    status = 'MORE INFORMATION REQUIRED';
  } else if (scheme.verification_status !== 'Verified') {
    status = 'UNABLE TO VERIFY';
  }

  return {
    scheme_id: scheme.scheme_id,
    scheme_name: scheme.scheme_name,
    scheme_name_kannada: scheme.scheme_name_kannada,
    department: scheme.implementing_department,
    state_or_central: scheme.state_or_central,
    category: scheme.scheme_category,
    status,
    conditions_satisfied: satisfied,
    conditions_not_satisfied: notSatisfied,
    missing_information: missing,
    benefits: scheme.benefits,
    required_documents: scheme.required_documents,
    application_procedure: scheme.application_process,
    application_url: scheme.application_url,
    guidelines_url: scheme.official_guidelines_url,
    last_verified_date: scheme.last_verified_date
  };
}

export function evaluateAllSchemes(profile: UserEligibilityProfile): SchemeEligibilityResult[] {
  return KARNATAKA_SCHEMES.map((scheme) => evaluateSchemeEligibility(scheme, profile));
}
