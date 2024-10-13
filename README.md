# @kerrickchan/ioperator

`@kerrickchan/ioperator` is a flexible and extensible TypeScript library for evaluating rules against a given context. It supports both string-based and object-based rule definitions, making it versatile for various use cases.

## Features

- String-based rule evaluation
- Object-based rule evaluation
- Support for multiple operators: eq, ne, gt, gte, lt, lte, in, nin
- Extensible operator system
- Type-safe implementation
- Comprehensive test suite

## Installation

```bash
npm install @kerrickchan/ioperator
```

## Usage

### String-based Rule Evaluation

```typescript
import { evaluateStringRule } from '@kerrickchan/ioperator';

const context = {
  age: 25,
  name: "Alice",
  scores: [80, 85, 90]
};

console.log(evaluateStringRule('age gte 18', context)); // true
console.log(evaluateStringRule('name eq "Bob"', context)); // false
console.log(evaluateStringRule('85 in scores', context)); // true
```

### Object-based Rule Evaluation

```typescript
import { evaluateObjectRule, createRule } from '@kerrickchan/ioperator';

const context = {
  age: 25,
  name: "Alice",
  scores: [80, 85, 90]
};

const rule1 = createRule('age', 'gte', 18);
const rule2 = createRule('name', 'eq', "Bob");
const rule3 = createRule('85', 'in', 'scores');

console.log(evaluateObjectRule(rule1, context)); // true
console.log(evaluateObjectRule(rule2, context)); // false
console.log(evaluateObjectRule(rule3, context)); // true
```

## Supported Operators

- `eq`: Equal to
- `ne`: Not equal to
- `gt`: Greater than
- `gte`: Greater than or equal to
- `lt`: Less than
- `lte`: Less than or equal to
- `in`: In (checks if a value is in an array)
- `nin`: Not in (checks if a value is not in an array)

## Extending Operators

You can extend the system with custom operators by modifying the `operator.ts` file:

```typescript
// Add your custom operator function
const customOperator: Comparator = (a, b) => {
  // Your custom logic here
};

// Add it to the operators object
export const operators: Record<Operator, Comparator> = {
  // ... existing operators
  customOp: customOperator
};
```

Remember to also update the `Operator` type in `type.ts`.

## Testing

The project includes a comprehensive test suite. To run the tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## About

`@kerrickchan/ioperator` is maintained by Kerrick Chan. For more information or to report issues, please visit the [GitHub repository](https://github.com/kerrickchan/ioperator).
```

This README has been updated to reflect that the package is scoped under `@kerrickchan/ioperator`. The key changes are:

1. Updated the title and introduction to mention `@kerrickchan/ioperator`.
2. Changed the installation command to use the scoped package name.
3. Updated all import statements in the usage examples to use `@kerrickchan/ioperator`.
4. Added an "About" section at the end, mentioning that you (Kerrick Chan) maintain the package and providing a link to the GitHub repository.

You may want to customize the GitHub repository link and any other specific details about your project. This README now clearly communicates that this is a scoped package under your namespace and provides all the necessary information for users to understand, install, and use your library.
