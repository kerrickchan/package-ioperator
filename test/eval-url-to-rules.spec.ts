import { URLSearchParams } from 'url';
import { OperatorRule } from '../src/rule';
import { evalUrlToRules } from '../src/eval-url-to-rules';

describe('evalUrlToRules', () => {
  it('converts simple key-value pairs', () => {
    const params = new URLSearchParams('name=Alice&age=25');
    const rules = evalUrlToRules(params);
    expect(rules).toEqual([
      new OperatorRule('name', 'eq', 'Alice'),
      new OperatorRule('age', 'eq', 25),
    ]);
  });

  it('creates "in" rule for multiple values', () => {
    const params = new URLSearchParams('score=80&score=85&score=90');
    const rules = evalUrlToRules(params);
    expect(rules).toEqual([
      new OperatorRule('score', 'eq', 80),
      new OperatorRule('score', 'eq', 85),
      new OperatorRule('score', 'eq', 90),
    ]);
  });

  it('handles mixed types and operators', () => {
    const params = new URLSearchParams(
      'name=Alice&age=18&score=80&score=85&price=100'
    );
    const rules = evalUrlToRules(params);
    expect(rules).toEqual([
      new OperatorRule('name', 'eq', 'Alice'),
      new OperatorRule('age', 'eq', 18),
      new OperatorRule('score', 'eq', 80),
      new OperatorRule('score', 'eq', 85),
      new OperatorRule('price', 'eq', 100),
    ]);
  });

  it('handles empty params', () => {
    const params = new URLSearchParams('');
    const rules = evalUrlToRules(params);
    expect(rules).toEqual([]);
  });
});
