import { Operator, OperatorValue } from './types';

/**
 * A function that compares two OperatorValues and returns a boolean result.
 * 
 * @typedef {(a: OperatorValue, b: OperatorValue) => boolean} Comparator
 */
type Comparator = (a: OperatorValue, b: OperatorValue) => boolean;

/**
 * Checks if a value is comparable (string or number).
 * 
 * @param {OperatorValue} value - The value to check
 * @returns {boolean} True if the value is a string or number, false otherwise
 */
function isComparable(value: OperatorValue): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

/**
 * Compares two OperatorValues and returns a number indicating their relative order.
 * 
 * @param {OperatorValue} a - The first value to compare
 * @param {OperatorValue} b - The second value to compare
 * @returns {number} A negative number if a < b, positive if a > b, and 0 if a === b
 * @throws {Error} If either value is not comparable (not a string or number)
 */
function compareValues(a: OperatorValue, b: OperatorValue): number {
  if (!isComparable(a) || !isComparable(b)) {
    throw new Error('Cannot compare non-primitive values');
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}

/**
 * Checks if two values are equal.
 * 
 * @type {Comparator}
 */
const eq: Comparator = (a, b) => {
  if (Array.isArray(a) || Array.isArray(b)) {
    return false; // Arrays are not supported for equality comparison
  }
  return a === b;
};

/**
 * Checks if two values are not equal.
 * 
 * @type {Comparator}
 */
const ne: Comparator = (a, b) => !eq(a, b);

/**
 * Checks if the first value is greater than the second.
 * 
 * @type {Comparator}
 */
const gt: Comparator = (a, b) => {
  if (!isComparable(a) || !isComparable(b)) return false;
  return compareValues(a, b) > 0;
};

/**
 * Checks if the first value is greater than or equal to the second.
 * 
 * @type {Comparator}
 */
const gte: Comparator = (a, b) => {
  if (!isComparable(a) || !isComparable(b)) return false;
  return compareValues(a, b) >= 0;
};

/**
 * Checks if the first value is less than the second.
 * 
 * @type {Comparator}
 */
const lt: Comparator = (a, b) => {
  if (!isComparable(a) || !isComparable(b)) return false;
  return compareValues(a, b) < 0;
};

/**
 * Checks if the first value is less than or equal to the second.
 * 
 * @type {Comparator}
 */
const lte: Comparator = (a, b) => {
  if (!isComparable(a) || !isComparable(b)) return false;
  return compareValues(a, b) <= 0;
};

/**
 * Checks if the first value is included in the second (which should be an array).
 * 
 * @type {Comparator}
 */
const isIn: Comparator = (a, b) => {
  if (!Array.isArray(b)) return false;
  return b.some(item => eq(a, item));
};

/**
 * Checks if the first value is not included in the second (which should be an array).
 * 
 * @type {Comparator}
 */
const notIn: Comparator = (a, b) => {
  if (!Array.isArray(b)) return false;
  return !b.some(item => eq(a, item));
};

/**
 * A record of all available operators and their corresponding comparison functions.
 * 
 * @type {Record<Operator, Comparator>}
 */
export const operators: Record<Operator, Comparator> = {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  in: isIn,
  nin: notIn
};
