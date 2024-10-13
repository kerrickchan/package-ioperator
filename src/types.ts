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
 * @typedef {(string|number|(string|number)[])} OperatorValue
 * @description Can be a string, a number, or an array of strings or numbers.
 */
export type OperatorValue = string | number | (string | number)[];

/**
 * Represents a rule object where each key is an operator and the value is an OperatorValue.
 * 
 * @typedef {Object} OperatorRule
 * @property {OperatorValue} eq - Equal to value
 * @property {OperatorValue} ne - Not equal to value
 * @property {OperatorValue} gt - Greater than value
 * @property {OperatorValue} gte - Greater than or equal to value
 * @property {OperatorValue} lt - Less than value
 * @property {OperatorValue} lte - Less than or equal to value
 * @property {OperatorValue} in - Array to check inclusion in
 * @property {OperatorValue} nin - Array to check exclusion from
 */
export type OperatorRule = {
  [operator in Operator]: OperatorValue;
};

/**
 * Represents a complete rule with a left operand, operator, and right operand.
 * 
 * @typedef {Object} Rule
 * @property {string} left - The left operand, typically a key in the context object
 * @property {Operator} operator - The operator to apply
 * @property {OperatorValue} right - The right operand, can be a literal value or a key in the context object
 */
export type Rule = {
  left: string;
  operator: Operator;
  right: OperatorValue;
};
