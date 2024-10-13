/**
 * Represents the valid operators that can be used in rules.
 * 
 * @typedef {('eq'|'ne'|'gt'|'gte'|'lt'|'lte'|'in'|'nin')} Operator
 * @description
 * - 'eq': Equal to
 * - 'ne': Not equal to
 * - 'gt': Greater than
 * - 'gte': Greater than or equal to
 * - 'lt': Less than
 * - 'lte': Less than or equal to
 * - 'in': Included in (for arrays)
 * - 'nin': Not included in (for arrays)
 */
export type Operator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';

/**
 * Represents the possible values that can be used in rules.
 * 
 * @typedef {(string|number)} OperatorValue
 * @description Can be a string, a number, or an array of strings or numbers.
 */
export type OperatorValue = string | number;

/**
 * Represents a complete rule with a left operand, operator, and right operand.
 * 
 * @typedef {Object} Rule
 * @property {string} left - The left operand, typically a key in the context object
 * @property {Operator} operator - The operator to apply
 * @property {OperatorValue} right - The right operand, can be a literal value or a key in the context object
 */
export type OperatorRuleLiteral = {
  left: OperatorValue;
  operator: Operator;
  right: OperatorValue | OperatorValue[];
};
