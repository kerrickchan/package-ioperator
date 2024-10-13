import { operators } from './operators';
import { Operator, OperatorValue } from './types';
import { isValidOperator } from './validators';

/**
 * Evaluates a string rule against a given context.
 *
 * @param rule - A string in the format "left operator right".
 * @param context - An object containing the values to be used in the evaluation.
 * @returns A boolean indicating whether the rule evaluates to true or false.
 * @throws Error if the rule format is invalid, the operator is unknown, or the left operand is not found in the context.
 */
export function evalStringToRule(
  rule: string,
  context: Record<string, OperatorValue | OperatorValue[]>
): boolean {
  const parts = rule.split(' ');

  if (parts.length != 3) {
    throw new Error('Invalid rule format');
  }

  const left = parts[0];
  const operator = parts[1] as Operator;
  const right = parts.slice(2).join(' ');

  if (!isValidOperator(operator)) {
    throw new Error(`Unknown operator: ${operator}`);
  }

  if (!(left in context)) {
    throw new Error(`Left operand '${left}' not found in context`);
  }

  const leftValue = context[left] as OperatorValue;
  let rightValue: OperatorValue;

  // Parse the right value
  if (right in context) {
    // Handle context variables
    rightValue = context[right] as OperatorValue;
  } else if (operator === 'in' || operator === 'nin') {
    // Handle array literals for 'in' and 'nin' operators
    rightValue = JSON.parse(right);
  } else if (right.startsWith('"') && right.endsWith('"')) {
    // Handle string literals
    rightValue = right.slice(1, -1);
  } else if (!isNaN(Number(right))) {
    // Handle number literals
    rightValue = Number(right);
  } else {
    // Handle other literals
    rightValue = right;
  }

  return operators[operator](leftValue, rightValue);
}
