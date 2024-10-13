import { Operator, OperatorValue, OperatorRuleLiteral } from './types';

/**
 * Represents a complete rule with a left operand, operator, and right operand.
 */
export class OperatorRule {
  /**
   * @param {string} left - The left operand, typically a key in the context object
   * @param {Operator} operator - The operator to apply
   * @param {OperatorValue} right - The right operand, can be a literal value or a key in the context object
   */
  constructor(
    public left: OperatorValue,
    public operator: Operator,
    public right: OperatorValue | OperatorValue[],
  ) {}

  /**
   * Creates an OperatorRule instance from a plain object.
   *
   * @param {Object} obj - The object to create the OperatorRule from
   * @returns {OperatorRule} A new OperatorRule instance
   */
  static fromObject(obj: OperatorRuleLiteral): OperatorRule {
    return new OperatorRule(obj.left, obj.operator, obj.right);
  }

  /**
   * Converts the OperatorRule instance to a plain object.
   *
   * @returns {Object} A plain object representation of the OperatorRule
   */
  toObject(): OperatorRuleLiteral {
    return {
      left: this.left,
      operator: this.operator,
      right: this.right,
    };
  }
}
