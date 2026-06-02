/**
 * Standard Email Regex validation.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates Medical Record Numbers (MRN) following standard clinical formats (e.g. MRN-123456).
 */
export const isValidMRN = (mrn: string): boolean => {
  const mrnRegex = /^MRN-\d{6}$/;
  return mrnRegex.test(mrn);
};

/**
 * Validates IP Addresses for server and security audit reports.
 */
export const isValidIP = (ipAddress: string): boolean => {
  const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ipAddress);
};

/**
 * Validates ICD-10 medical diagnostic classification codes (e.g. F43.10, D64.9).
 */
export const isValidICD10 = (code: string): boolean => {
  const icdRegex = /^[A-Z][0-9][0-9A-Z](?:\.[0-9A-Z]{1,4})?$/;
  return icdRegex.test(code);
};
