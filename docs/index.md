# TypeScript Utils

A comprehensive collection of **type-safe utility types** for TypeScript. Includes deep types, string manipulation, function helpers, type guards, and more.

## Features

- 🚀 **Zero Runtime** - 100% type-level utilities
- 📦 **Tree-shakeable** - Import only what you need
- 🔒 **Type-safe** - Full TypeScript strict mode support
- 📚 **Well-documented** - Comprehensive API reference

## Quick Start

```bash
npm install ts-deep-types
```

```typescript
import { DeepPartial, CamelCase, Parameters } from 'ts-deep-types';

// Deep types
type Config = {
  database: {
    host: string;
    port: number;
  };
};

type PartialConfig = DeepPartial<Config>;
// { database?: { host?: string; port?: number; } }

// String manipulation
type CamelStr = CamelCase<'hello_world'>; // 'helloWorld'

// Function helpers
type Fn = (a: string, b: number) => void;
type FnParams = Parameters<Fn>; // [string, number]
```

## Categories

| Category | Description |
|----------|-------------|
| [Core Types](/api/core) | DeepPartial, Merge, PickDeep, UnionToIntersection |
| [String Types](/api/string) | CamelCase, KebabCase, SnakeCase, PascalCase |
| [Function Types](/api/function) | Parameters, ReturnType, ThisParameterType |
| [Type Guards](/api/guards) | IsAny, IsNever, IsUnknown, IsUnion |
| [Object Types](/api/object) | KeysOfType, ValueOf, EntryOf, RequiredKeys |
| [Array Types](/api/array) | ElementType, FlattenArray, UniqueArray |
| [Promise Types](/api/promise) | PromiseResult, PromiseState, UnwrapPromise |

## License

MIT
