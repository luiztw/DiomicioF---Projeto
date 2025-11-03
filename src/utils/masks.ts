/**
 * Utility functions for formatting input masks
 */

/**
 * Format CPF to XXX.XXX.XXX-XX
 */
export const formatCPF = (value: string): string => {
  // Remove all non-digit characters
  const numbers = value.replace(/\D/g, '');

  // Limit to 11 digits
  const limited = numbers.slice(0, 11);

  // Apply mask
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 6) {
    return `${limited.slice(0, 3)}.${limited.slice(3)}`;
  } else if (limited.length <= 9) {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`;
  } else {
    return `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`;
  }
};

/**
 * Format RG to XX.XXX.XXX-X
 */
export const formatRG = (value: string): string => {
  // Remove all non-digit and non-letter characters
  const cleaned = value.replace(/[^\dXx]/g, '').toUpperCase();

  // Limit to 9 characters (8 digits + 1 digit/X)
  const limited = cleaned.slice(0, 9);

  // Apply mask
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 5) {
    return `${limited.slice(0, 2)}.${limited.slice(2)}`;
  } else if (limited.length <= 8) {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5)}`;
  } else {
    return `${limited.slice(0, 2)}.${limited.slice(2, 5)}.${limited.slice(5, 8)}-${limited.slice(8)}`;
  }
};

/**
 * Format phone to (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export const formatPhone = (value: string): string => {
  // Remove all non-digit characters
  const numbers = value.replace(/\D/g, '');

  // Limit to 11 digits
  const limited = numbers.slice(0, 11);

  // Apply mask
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 6) {
    return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
  } else if (limited.length <= 10) {
    // Landline format: (XX) XXXX-XXXX
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
  } else {
    // Mobile format: (XX) XXXXX-XXXX
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
};

/**
 * Remove mask from CPF (returns only numbers)
 */
export const removeCPFMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * Remove mask from RG (returns only numbers and X)
 */
export const removeRGMask = (value: string): string => {
  return value.replace(/[^\dXx]/g, '');
};

/**
 * Remove mask from phone (returns only numbers)
 */
export const removePhoneMask = (value: string): string => {
  return value.replace(/\D/g, '');
};
