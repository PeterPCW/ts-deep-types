# Usage Examples

## Deep Types

### DeepPartial

Makes all nested properties optional:

```typescript
interface Config {
  database: {
    host: string;
    port: number;
    options: {
      timeout: number;
      ssl: boolean;
    };
  };
}

type PartialConfig = DeepPartial<Config>;
// Result:
// {
//   database?: {
//     host?: string;
//     port?: number;
//     options?: {
//       timeout?: number;
//       ssl?: boolean;
//     };
//   };
// }
```

### DeepRequired

Makes all nested properties required (opposite of DeepPartial):

```typescript
type RequiredConfig = DeepRequired<PartialConfig>;
// All properties are now required
```

### Merge

Intersects two object types into one:

```typescript
type A = { a: string; x: number };
type B = { b: boolean; x: string };

type Merged = Merge<A, B>;
// { a: string; b: boolean; x: number | string }
```

## String Types

### CamelCase

Converts strings to camelCase:

```typescript
type Result1 = CamelCase<'hello_world'>;        // 'helloWorld'
type Result2 = CamelCase<'HTTP_REQUEST'>;       // 'httpRequest'
type Result3 = CamelCase<'user_id_and_name'>;   // 'userIdAndName'
```

### KebabCase

Converts strings to kebab-case:

```typescript
type Result1 = KebabCase<'helloWorld'>;         // 'hello-world'
type Result2 = KebabCase<'UserName'>;           // 'user-name'
```

## Function Types

### Parameters

Extract function parameter types as a tuple:

```typescript
type Fn = (a: string, b: number, c: boolean) => void;
type Params = Parameters<Fn>;  // [string, number, boolean]
```

### ReturnType

Extract function return type:

```typescript
type Fn = (x: number) => string;
type Return = ReturnType<Fn>;  // string
```

### AsyncReturnType

Convert sync function to async:

```typescript
type SyncFn = (x: number) => string;
type AsyncFn = AsyncReturnType<SyncFn>;
// (x: number) => Promise<string>
```

## Object Types

### KeysOfType

Get keys whose values match a type:

```typescript
interface User {
  name: string;
  age: number;
  active: boolean;
}

type StringKeys = KeysOfType<User, string>;     // 'name'
type NumberKeys = KeysOfType<User, number>;     // 'age'
type BooleanKeys = KeysOfType<User, boolean>;   // 'active'
```

### ValueOf

Get union of all value types:

```typescript
interface User {
  name: string;
  age: number;
}

type Values = ValueOf<User>;  // string | number
```

### EntryOf

Get key-value pairs as a union:

```typescript
interface User {
  name: string;
  age: number;
}

type Entries = EntryOf<User>;
// ['name', string] | ['age', number]
```

## Array Types

### ElementType

Get array element type:

```typescript
type Numbers = number[];
type Element = ElementType<Numbers>;  // number
```

### UniqueArray

Remove duplicates from tuple:

```typescript
type Duplicates = [1, 2, 2, 3, 3, 3];
type Unique = UniqueArray<Duplicates>;  // [1, 2, 3]
```

## Promise Types

### PromiseResult

Extract resolved type:

```typescript
type Result = PromiseResult<Promise<string>>;  // string
type Result2 = PromiseResult<Promise<{ id: number }>>;  // { id: number }
```

### PromiseState

Get promise state type:

```typescript
type Pending = PromiseState<Promise<never>>;      // 'pending'
type Fulfilled = PromiseState<Promise<string>>;   // 'fulfilled'
```

### UnwrapPromise

Unwrap or return as-is:

```typescript
type Unwrapped = UnwrapPromise<Promise<string>>;  // string
type Raw = UnwrapPromise<string>;                 // string
```
