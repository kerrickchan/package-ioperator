import { Operator } from './types';
import { Comparator, compareValues, isComparable } from './validators';

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
