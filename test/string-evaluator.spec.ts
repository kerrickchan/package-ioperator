import { evaluateStringRule } from '../src/evaluators';

describe('String Evaluator', () => {
  const context = {
    a: 123,
    b: 100,
    c: [1, 2, 3, 123],
    d: 'hello',
  };

  test('evaluates equality', () => {
    expect(evaluateStringRule('a eq 123', context)).toBe(true);
    expect(evaluateStringRule('a eq 124', context)).toBe(false);
    expect(evaluateStringRule('d eq "hello"', context)).toBe(true);
  });

  test('evaluates inequality', () => {
    expect(evaluateStringRule('a ne 124', context)).toBe(true);
    expect(evaluateStringRule('a ne 123', context)).toBe(false);
    expect(evaluateStringRule('d ne "world"', context)).toBe(true);
  });

  test('evaluates greater than', () => {
    expect(evaluateStringRule('a gt 100', context)).toBe(true);
    expect(evaluateStringRule('a gt 123', context)).toBe(false);
  });

  test('evaluates greater than or equal', () => {
    expect(evaluateStringRule('a gte 123', context)).toBe(true);
    expect(evaluateStringRule('a gte 124', context)).toBe(false);
  });

  test('evaluates less than', () => {
    expect(evaluateStringRule('b lt 101', context)).toBe(true);
    expect(evaluateStringRule('b lt 100', context)).toBe(false);
  });

  test('evaluates less than or equal', () => {
    expect(evaluateStringRule('b lte 100', context)).toBe(true);
    expect(evaluateStringRule('b lte 99', context)).toBe(false);
  });

  test('evaluates in', () => {
    expect(evaluateStringRule('a in c', context)).toBe(true);
    expect(evaluateStringRule('b in c', context)).toBe(false);
    expect(evaluateStringRule('a in [100, 123, 150]', context)).toBe(true);
  });

  test('evaluates not in', () => {
    expect(evaluateStringRule('b nin c', context)).toBe(true);
    expect(evaluateStringRule('a nin c', context)).toBe(false);
    expect(evaluateStringRule('a nin [100, 124, 150]', context)).toBe(true);
  });

  test('throws error for invalid rule format', () => {
    expect(() => evaluateStringRule('a eq 123 gt 100', context)).toThrow(
      'Invalid rule format'
    );
  });

  test('throws error for unknown operator', () => {
    expect(() => evaluateStringRule('a unknown 123', context)).toThrow(
      'Unknown operator: unknown'
    );
  });
});
