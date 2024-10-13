import { evaluateObjectRule, createRule } from '../src/evaluators';
import { Operator } from '../src/types';

describe('Object Evaluator', () => {
  const context = {
    a: 123,
    b: 100,
    c: [1, 2, 3, 123],
    d: 'hello',
  };

  test('evaluates equality', () => {
    expect(evaluateObjectRule(createRule('a', 'eq', 123), context)).toBe(true);
    expect(evaluateObjectRule(createRule('a', 'eq', 124), context)).toBe(false);
    expect(evaluateObjectRule(createRule('d', 'eq', 'hello'), context)).toBe(
      true
    );
  });

  test('evaluates inequality', () => {
    expect(evaluateObjectRule(createRule('a', 'ne', 124), context)).toBe(true);
    expect(evaluateObjectRule(createRule('a', 'ne', 123), context)).toBe(false);
    expect(evaluateObjectRule(createRule('d', 'ne', 'world'), context)).toBe(
      true
    );
  });

  test('evaluates greater than', () => {
    expect(evaluateObjectRule(createRule('a', 'gt', 100), context)).toBe(true);
    expect(evaluateObjectRule(createRule('a', 'gt', 123), context)).toBe(false);
  });

  test('evaluates greater than or equal', () => {
    expect(evaluateObjectRule(createRule('a', 'gte', 123), context)).toBe(true);
    expect(evaluateObjectRule(createRule('a', 'gte', 124), context)).toBe(
      false
    );
  });

  test('evaluates less than', () => {
    expect(evaluateObjectRule(createRule('b', 'lt', 101), context)).toBe(true);
    expect(evaluateObjectRule(createRule('b', 'lt', 100), context)).toBe(false);
  });

  test('evaluates less than or equal', () => {
    expect(evaluateObjectRule(createRule('b', 'lte', 100), context)).toBe(true);
    expect(evaluateObjectRule(createRule('b', 'lte', 99), context)).toBe(false);
  });

  test('evaluates in', () => {
    expect(
      evaluateObjectRule(createRule('a', 'in', [100, 123, 150]), context)
    ).toBe(true);
    expect(evaluateObjectRule(createRule('b', 'in', [1, 2, 3]), context)).toBe(
      false
    );
  });

  test('evaluates not in', () => {
    expect(evaluateObjectRule(createRule('b', 'nin', [1, 2, 3]), context)).toBe(
      true
    );
    expect(
      evaluateObjectRule(createRule('a', 'nin', [100, 123, 150]), context)
    ).toBe(false);
  });

  test('throws error for unknown left operand', () => {
    expect(() =>
      evaluateObjectRule(createRule('x', 'eq', 123), context)
    ).toThrow("Left operand 'x' not found in context");
  });

  test('throws error for unknown operator', () => {
    expect(() =>
      evaluateObjectRule(
        { left: 'a', operator: 'unknown' as Operator, right: 123 },
        context
      )
    ).toThrow('Unknown operator: unknown');
  });
});
