import { OperatorRule } from './rule';
import { Operator, OperatorValue } from './types';

/**
 * Evaluates a URL query string and returns an array of OperatorRule objects.
 *
 * @param params - A URLSearchParams object containing the query parameters.
 * @returns An array of OperatorRule objects.
 */
export function evalUrlToRules(params: URLSearchParams): OperatorRule[] {
  const rules: OperatorRule[] = [];

  for (const [key, value] of params.entries()) {
    if (Array.isArray(value)) {
      for (const val of value) {
        const parsedValue = parseValue(val);
        const operator = parseOperator(val);
        rules.push(new OperatorRule(key, operator, parsedValue));
      }
    } else {
      const parsedValue = parseValue(value);
      const operator = parseOperator(value);
      rules.push(new OperatorRule(key, operator, parsedValue));
    }
  }

  return rules;
}

/**
 * Parses a string value and returns the correct OperatorValue type.
 *
 * @param value - The string value to be parsed.
 * @returns The parsed OperatorValue.
 */
function parseValue(value: string): OperatorValue {
  if (!isNaN(Number(value))) return Number(value);
  return value;
}

/**
 * Parses a string value and returns the appropriate operator.
 *
 * @param value - The string value to be parsed.
 * @returns The operator.
 */
function parseOperator(value: string): Operator {
  const trimmedValue = value.trim();
  if (trimmedValue.startsWith('>=')) return 'gte';
  if (trimmedValue.startsWith('>')) return 'gt';
  if (trimmedValue.startsWith('<=')) return 'lte';
  if (trimmedValue.startsWith('<')) return 'lt';
  if (trimmedValue.startsWith('!')) return 'ne';
  return 'eq';
}
