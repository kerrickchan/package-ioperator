import { evalStringToRule } from '../src/eval-string-to-rule';

describe('String Evaluator', () => {
  const context = {
    a: 123,
    b: 100,
    c: [1, 2, 3, 123],
    d: 'hello',
  };

  test('evaluates equality', () => {
    expect(evalStringToRule('a eq 123', context)).toBe(true);
    expect(evalStringToRule('a eq 124', context)).toBe(false);
    expect(evalStringToRule('d eq "hello"', context)).toBe(true);
  });

  test('evaluates inequality', () => {
    expect(evalStringToRule('a ne 124', context)).toBe(true);
    expect(evalStringToRule('a ne 123', context)).toBe(false);
    expect(evalStringToRule('d ne "world"', context)).toBe(true);
  });

  test('evaluates greater than', () => {
    expect(evalStringToRule('a gt 100', context)).toBe(true);
    expect(evalStringToRule('a gt 123', context)).toBe(false);
  });

  test('evaluates greater than or equal', () => {
    expect(evalStringToRule('a gte 123', context)).toBe(true);
    expect(evalStringToRule('a gte 124', context)).toBe(false);
  });

  test('evaluates less than', () => {
    expect(evalStringToRule('b lt 101', context)).toBe(true);
    expect(evalStringToRule('b lt 100', context)).toBe(false);
  });

  test('evaluates less than or equal', () => {
    expect(evalStringToRule('b lte 100', context)).toBe(true);
    expect(evalStringToRule('b lte 99', context)).toBe(false);
  });

  test('evaluates in', () => {
    expect(evalStringToRule('a in c', context)).toBe(true);
    expect(evalStringToRule('b in c', context)).toBe(false);
    expect(evalStringToRule('a in [100, 123, 150]', context)).toBe(true);
  });

  test('evaluates not in', () => {
    expect(evalStringToRule('b nin c', context)).toBe(true);
    expect(evalStringToRule('a nin c', context)).toBe(false);
    expect(evalStringToRule('a nin [100, 124, 150]', context)).toBe(true);
  });

  test('throws error for invalid rule format', () => {
    expect(() => evalStringToRule('a eq 123 gt 100', context)).toThrow(
      'Invalid rule format'
    );
  });

  test('throws error for unknown operator', () => {
    expect(() => evalStringToRule('a unknown 123', context)).toThrow(
      'Unknown operator: unknown'
    );
  });
});
