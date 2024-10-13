import { operators } from './operators';
import { Operator, OperatorValue, Rule } from './types';
import { isValidOperator } from './validators';

/**
 * Evaluates a rule object against a given context.
 * 
 * @param rule - An object containing the left operand, operator, and right operand.
 * @param context - An object containing the values to be used in the evaluation.
 * @returns A boolean indicating whether the rule evaluates to true or false.
 * @throws Error if the left operand is not found in the context or if the operator is unknown.
 */
export function evaluateObjectRule(rule: Rule, context: Record<string, OperatorValue>): boolean {
  const { left, operator, right } = rule;

  if (!(left in context)) {
    throw new Error(`Left operand '${left}' not found in context`);
  }

  const leftValue = context[left];

  if (operator in operators) {
    return operators[operator](leftValue, right);
  } else {
    throw new Error(`Unknown operator: ${operator}`);
  }
}

/**
 * Evaluates a string rule against a given context.
 * 
 * @param rule - A string in the format "left operator right".
 * @param context - An object containing the values to be used in the evaluation.
 * @returns A boolean indicating whether the rule evaluates to true or false.
 * @throws Error if the rule format is invalid, the operator is unknown, or the left operand is not found in the context.
 */
export function evaluateStringRule(
  rule: string,
  context: Record<string, OperatorValue>,
): boolean {
  const parts = rule.split(' ');

  if (parts.length < 3) {
    throw new Error('Invalid rule format');
  }

  const left = parts[0];
  const operator = parts[1] as Operator;
  const right = parts.slice(2).join(' ');

  if (!isValidOperator(operator)) {
    throw new Error(`Unknown operator: ${operator}`);
  }

  // Check for invalid rule format
  if (operator !== 'in' && operator !== 'nin' && parts.length > 3) {
    throw new Error('Invalid rule format');
  }

  if (!(left in context)) {
    throw new Error(`Left operand '${left}' not found in context`);
  }

  const leftValue = context[left];
  let rightValue: OperatorValue;

  // Parse the right value
  if (right.startsWith('[') && right.endsWith(']')) {
    // Handle array literals
    rightValue = JSON.parse(right);
  } else if (right.startsWith('"') && right.endsWith('"')) {
    // Handle string literals
    rightValue = right.slice(1, -1);
  } else if (!isNaN(Number(right))) {
    // Handle number literals
    rightValue = Number(right);
  } else {
    // Handle context variables
    rightValue = context[right] ?? right;
  }

  return operators[operator](leftValue, rightValue);
}

/**
 * Creates a Rule object from the given left operand, operator, and right operand.
 * 
 * @param left - The left operand (usually a key in the context object).
 * @param operator - The operator to be used in the comparison.
 * @param right - The right operand (can be a literal value or a key in the context object).
 * @returns A Rule object containing the provided left, operator, and right values.
 */
export function createRule(left: string, operator: Operator, right: OperatorValue): Rule {
  return { left, operator, right };
}
