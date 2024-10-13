import { Operator } from './types';
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
