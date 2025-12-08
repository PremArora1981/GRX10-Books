// Validation utility functions

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  email?: boolean;
  number?: boolean;
  min?: number;
  max?: number;
  date?: boolean;
  dateAfter?: string; // ISO date string
  dateBefore?: string; // ISO date string
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateField = (value: any, rules: ValidationRule, fieldName: string): string | null => {
  // Required check
  if (rules.required && (value === null || value === undefined || value === '')) {
    return `${fieldName} is required`;
  }

  // Skip other validations if value is empty and not required
  if (!rules.required && (value === null || value === undefined || value === '')) {
    return null;
  }

  // Email validation
  if (rules.email && typeof value === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return `${fieldName} must be a valid email address`;
    }
  }

  // Number validation
  if (rules.number) {
    if (isNaN(Number(value))) {
      return `${fieldName} must be a number`;
    }
    const numValue = Number(value);
    if (rules.min !== undefined && numValue < rules.min) {
      return `${fieldName} must be at least ${rules.min}`;
    }
    if (rules.max !== undefined && numValue > rules.max) {
      return `${fieldName} must be at most ${rules.max}`;
    }
  }

  // String length validation
  if (typeof value === 'string') {
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be at most ${rules.maxLength} characters`;
    }
  }

  // Pattern validation
  if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  // Date validation
  if (rules.date && typeof value === 'string') {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return `${fieldName} must be a valid date`;
    }
    if (rules.dateAfter) {
      const afterDate = new Date(rules.dateAfter);
      if (date <= afterDate) {
        return `${fieldName} must be after ${rules.dateAfter}`;
      }
    }
    if (rules.dateBefore) {
      const beforeDate = new Date(rules.dateBefore);
      if (date >= beforeDate) {
        return `${fieldName} must be before ${rules.dateBefore}`;
      }
    }
  }

  // Custom validation
  if (rules.custom) {
    const customError = rules.custom(value);
    if (customError) {
      return customError;
    }
  }

  return null;
};

export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationErrors => {
  const errors: ValidationErrors = {};

  Object.keys(rules).forEach((field) => {
    const value = data[field];
    const fieldRules = rules[field];
    const error = validateField(value, fieldRules, field);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

// Common validation rules
export const commonRules = {
  required: { required: true },
  email: { required: true, email: true },
  phone: {
    pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    custom: (value: string) => {
      if (!value) return null;
      const cleaned = value.replace(/[\s\-\(\)]/g, '');
      if (cleaned.length < 10 || cleaned.length > 15) {
        return 'Phone number must be between 10 and 15 digits';
      }
      return null;
    }
  },
  pan: {
    pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)) {
        return 'PAN must be in format: ABCDE1234F';
      }
      return null;
    }
  },
  aadhar: {
    pattern: /^[0-9]{12}$/,
    custom: (value: string) => {
      if (!value) return null;
      const cleaned = value.replace(/\s/g, '');
      if (cleaned.length !== 12) {
        return 'Aadhar must be 12 digits';
      }
      return null;
    }
  },
  gstin: {
    pattern: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value)) {
        return 'GSTIN must be in format: 29AABCG1234H1Z5';
      }
      return null;
    }
  },
  ifsc: {
    pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    custom: (value: string) => {
      if (!value) return null;
      if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) {
        return 'IFSC must be in format: ABCD0123456';
      }
      return null;
    }
  },
  accountNumber: {
    minLength: 9,
    maxLength: 18,
    pattern: /^[0-9]+$/
  },
  date: { required: true, date: true },
  dateFuture: {
    date: true,
    custom: (value: string) => {
      if (!value) return null;
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        return 'Date must be today or in the future';
      }
      return null;
    }
  },
  datePast: {
    date: true,
    custom: (value: string) => {
      if (!value) return null;
      const date = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (date > today) {
        return 'Date must be in the past';
      }
      return null;
    }
  },
  salary: {
    required: true,
    number: true,
    min: 0,
    max: 100000000
  },
  percentage: {
    number: true,
    min: 0,
    max: 100
  }
};

