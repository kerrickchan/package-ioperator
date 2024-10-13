import { isValidOperator } from '../src/validators';
import { Operator } from '../src/types';

describe('isValidOperator', () => {
  const validOperators: Operator[] = [
    'eq',
    'ne',
    'gt',
    'gte',
    'lt',
    'lte',
    'in',
    'nin',
  ];
  const invalidOperators = ['invalid', 'notAnOperator', '123', ''];

  test('returns true for all valid operators', () => {
    validOperators.forEach((operator) => {
      expect(isValidOperator(operator)).toBe(true);
    });
  });

  test('returns false for invalid operators', () => {
    invalidOperators.forEach((operator) => {
      expect(isValidOperator(operator)).toBe(false);
    });
  });

  test('narrows type to Operator when true', () => {
    const unknownOperator: string = 'eq';
    if (isValidOperator(unknownOperator)) {
      // TypeScript should recognize unknownOperator as Operator here
      const operator: Operator = unknownOperator; // This should not cause a type error
      expect(operator).toBe('eq');
    }
  });

  test('does not narrow type when false', () => {
    const unknownOperator: string = 'invalid';
    if (!isValidOperator(unknownOperator)) {
      // TypeScript should not recognize unknownOperator as Operator here
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const operator: Operator = unknownOperator; // This should cause a type error
    }
  });
});
