# ts-deep-types

**A comprehensive collection of type-safe utility types for TypeScript.**

[![NPM Package](https://img.shields.io/npm/v/ts-deep-types.svg)](https://www.npmjs.com/package/ts-deep-types)
[![NPM Downloads](https://img.shields.io/npm/dm/ts-deep-types.svg)](https://www.npmjs.com/package/ts-deep-types)
[![License](https://img.shields.io/npm/l/ts-deep-types.svg)](LICENSE)

---

## What It Does

Provides missing TypeScript utility types that should exist in the standard library but don't:

- **Deep types** — Recursive transformations on nested objects
- **String types** — Case conversion (camelCase, snake_case, kebab-case)
- **Function types** — Parameter/return type extraction
- **Type guards** — Runtime type checking
- **Object utilities** — Key/value manipulation

---

## Installation

```bash
# npm
npm install ts-deep-types

# pnpm
pnpm add ts-deep-types

# yarn
yarn add ts-deep-types
```

---

## Usage

```typescript
import { DeepPartial, CamelCase, Parameters, IsAny } from 'ts-deep-types'

// Deep types
type PartialConfig = DeepPartial<{
  database: { host: string; port: number }
}>
// { database?: { host?: string; port?: number } | undefined }

// String types
type CamelStr = CamelCase<'hello_world'>
// 'helloWorld'

// Function types
type FnParams = Parameters<(a: string, b: number) => void>
// [string, number]

// Type guards
type TestAny = IsAny<any>      // true
type TestNever = IsAny<never>   // false
```

---

## Features

### Core Types
- `DeepPartial` - Recursive partial types
- `DeepRequired` - Recursive required types
- `DeepReadonly` - Deep readonly for nested objects
- `PickDeep` - Deep pick with nested paths
- `OmitDeep` - Deep omit with nested paths
- `Merge` - Merge two object types
- `UnionToIntersection` - Convert union to intersection

### String Types
- `CamelCase` - Convert to camelCase
- `KebabCase` - Convert to kebab-case
- `SnakeCase` - Convert to snake_case
- `PascalCase` - Convert to PascalCase
- `Trim` - Trim strings in templates

### Function Types
- `Parameters` - Function parameters
- `ReturnType` - Return type
- `ThisParameterType` - `this` parameter type
- `AsyncReturnType` - Async version of ReturnType

### Type Guards
- `IsAny` - Check if type is `any`
- `IsNever` - Check if type is `never`
- `IsUnknown` - Check if type is `unknown`
- `IsUnion` - Check if type is a union
- `IsTuple` - Check if type is a tuple
- `IsArray` - Check if type is an array
- `IsPlainObject` - Check if type is a plain object
- `IsFunction` - Check if type is a function
- `IsConstructor` - Check if type is a constructor

### Object Utilities
- `KeysOfType` - Keys matching a type
- `ValueOf` - Values of a union type
- `EntryOf` - Key-value entries
- `RequiredKeys` - Keys that are required
- `OptionalKeys` - Keys that are optional
- `ReadonlyKeys` - Keys that are readonly
- `WritableKeys` - Keys that are mutable

---

## Why ts-deep-types?

TypeScript's standard utility types (`Partial`, `Pick`, `Omit`) only work at one level. When you need recursive transformations, you're on your own.

**ts-deep-types** provides the missing utilities:

```typescript
// Standard library (one level)
type A = Partial<{ a: { b: { c: string } } }>
// { a?: { b?: { c?: string } } | undefined } | undefined

// ts-deep-types (recursive)
type B = DeepPartial<{ a: { b: { c: string } } }>
// { a?: { b?: { c?: string } } | undefined } | undefined }
// All levels are partial!
```

---

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build for production
pnpm build
```

---

## License

MIT © Peter W.

---

## Contributing

Issues and PRs welcome!
