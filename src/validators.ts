import { Operator, OperatorValue } from './types';
import { operators } from './operators';

/**
 * Checks if the given string is a valid operator.
 * 
 * This function is a type guard that checks if the provided string
 * is one of the valid operators defined in the Operator type.
 * It does this by checking if the operator exists as a key in the operators object.
 * 
 * @param {string} operator - The string to check if it's a valid operator
 * @returns {boolean} True if the operator is valid, false otherwise
 * 
 * @example
 * isValidOperator('eq') // returns true
 * isValidOperator('invalid') // returns false
 */
export function isValidOperator(operator: string): operator is Operator {
  return operator in operators;
}

/**
 * A function that compares two OperatorValues and returns a boolean result.
 * 
 * @typedef {(a: OperatorValue, b: OperatorValue) => boolean} Comparator
 */
export type Comparator = (a: OperatorValue, b: OperatorValue) => boolean;

/**
 * Checks if a value is comparable (string or number).
 * 
 * @param {OperatorValue} value - The value to check
 * @returns {boolean} True if the value is a string or number, false otherwise
 */
export function isComparable(value: OperatorValue): value is string | number {
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
export function compareValues(a: OperatorValue, b: OperatorValue): number {
  if (!isComparable(a) || !isComparable(b)) {
    throw new Error('Cannot compare non-primitive values');
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), undefined, { numeric: true });
}
