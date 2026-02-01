# Getting Started

## Basic Usage

Import and use types directly in your TypeScript code:

```typescript
import { DeepPartial, CamelCase, KeysOfType } from 'ts-deep-types';

// Deep Partial - makes all nested properties optional
interface User {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type PartialUser = DeepPartial<User>;
// Result: { name?: string; address?: { street?: string; city?: string; } }
```

## String Manipulation

Transform string types between different cases:

```typescript
import { CamelCase, KebabCase, SnakeCase, PascalCase } from 'ts-deep-types';

type CamelHelloWorld = CamelCase<'hello_world'>;  // 'helloWorld'
type KebabHelloWorld = KebabCase<'helloWorld'>;   // 'hello-world'
type SnakeHelloWorld = SnakeCase<'helloWorld'>;   // 'hello_world'
type PascalHelloWorld = PascalCase<'hello_world'>; // 'HelloWorld'
```

## Type Guards

Validate types at compile time:

```typescript
import { IsAny, IsNever, IsUnion } from 'ts-deep-types';

type Test1 = IsAny<any>;                    // true
type Test2 = IsAny<unknown>;                // false
type Test3 = IsNever<never>;                // true
type Test4 = IsUnion<string>;               // false
type Test5 = IsUnion<string | number>;      // true
```
