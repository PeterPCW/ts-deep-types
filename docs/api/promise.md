# Promise Types

Promise and async type utilities.

## PromiseResult

Gets the resolved type of a Promise.

```typescript
type PromiseResult<T extends Promise<any>> = T extends Promise<infer R> ? R : never;
```

**Example:**
```typescript
type A = PromiseResult<Promise<string>>;             // string
type B = PromiseResult<Promise<{ id: number }>>;    // { id: number }
```

## PromiseState

Gets the state of a Promise as a literal type.

```typescript
type PromiseState<T extends Promise<any>> = ...
```

**Example:**
```typescript
type A = PromiseState<Promise<never>>;      // 'pending'
type B = PromiseState<Promise<string>>;     // 'fulfilled'
type C = PromiseState<string>;              // 'rejected'
```

## Asyncify

Converts a sync function to async.

```typescript
type Asyncify<T extends (...args: any) => any> = (...args: Parameters<T>) => Promise<ReturnType<T>>;
```

**Example:**
```typescript
type Fn = (x: number) => string;
type AsyncFn = Asyncify<Fn>;
// (x: number) => Promise<string>
```

## Syncify

Converts an async function to sync (returns Promise type).

```typescript
type Syncify<T extends (...args: any) => Promise<any>> = ...
```

## MaybePromise

Creates a type that can be a value or Promise.

```typescript
type MaybePromise<T> = T | Promise<T>;
```

**Example:**
```typescript
type A = MaybePromise<string>;       // string | Promise<string>
type B = MaybePromise<number>;       // number | Promise<number>
```

## AsyncValue

Alias for MaybePromise.

```typescript
type AsyncValue<T> = T | Promise<T>;
```

## IsPromise

Checks if type T is a Promise or PromiseLike.

```typescript
type IsPromise<T> = T extends PromiseLike<any> ? true : false;
```

**Example:**
```typescript
type A = IsPromise<Promise<string>>;     // true
type B = IsPromise<string>;              // false
type C = IsPromise<PromiseLike<number>>; // true
```

## UnwrapPromise

Unwraps a Promise or returns the type as-is.

```typescript
type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T;
```

**Example:**
```typescript
type A = UnwrapPromise<Promise<string>>;  // string
type B = UnwrapPromise<string>;           // string
```

## PromiseRejection

Gets the rejection type (always `never` for standard Promises).

```typescript
type PromiseRejection<T extends Promise<any>> = never;
```

## PromiseResults

Gets resolved types of an array of Promises.

```typescript
type PromiseResults<T extends readonly PromiseLike<any>[]> = ...
```

**Example:**
```typescript
type Promises = [Promise<string>, Promise<number>];
type Results = PromiseResults<Promises>;  // [string, number]
```
