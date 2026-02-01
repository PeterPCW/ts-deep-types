# Type Guards

Type guard utilities for compile-time type checking.

## IsAny

Checks if type T is exactly `any`.

```typescript
type IsAny<T> = 0 extends (1 & T) ? true : false;
```

**Example:**
```typescript
type A = IsAny<any>;      // true
type B = IsAny<unknown>;  // false
type C = IsAny<string>;   // false
```

## IsNever

Checks if type T is exactly `never`.

```typescript
type IsNever<T> = [T] extends [never] ? true : false;
```

**Example:**
```typescript
type A = IsNever<never>;      // true
type B = IsNever<unknown>;    // false
type C = IsNever<string>;     // false
```

## IsUnknown

Checks if type T is exactly `unknown`.

```typescript
type IsUnknown<T> = unknown extends T ? (T extends unknown ? true : false) : false;
```

**Example:**
```typescript
type A = IsUnknown<unknown>;  // true
type B = IsUnknown<any>;      // false
```

## IsUnion

Checks if type T is a union type.

```typescript
type IsUnion<T> = ...
```

**Example:**
```typescript
type A = IsUnion<string>;           // false
type B = IsUnion<string | number>;  // true
```

## IsTuple

Checks if type T is a tuple.

```typescript
type IsTuple<T> = ...
```

**Example:**
```typescript
type A = IsTuple<string[]>;     // false
type B = IsTuple<[string, number]>;  // true
```

## IsArray

Checks if type T is an array (not tuple).

```typescript
type IsArray<T> = ...
```

**Example:**
```typescript
type A = IsArray<number[]>;     // true
type B = IsArray<[number, string]>;  // false
```

## IsPlainObject

Checks if type T is a plain object.

```typescript
type IsPlainObject<T> = ...
```

**Example:**
```typescript
type A = IsPlainObject<{ a: 1 }>;           // true
type B = IsPlainObject<{ length: 1 }>;      // false (array-like)
type C = IsPlainObject<[]>;                 // false
```

## IsFunction

Checks if type T is a function.

```typescript
type IsFunction<T> = T extends Function ? true : false;
```

**Example:**
```typescript
type A = IsFunction<() => void>;  // true
type B = IsFunction<string>;      // false
```

## IsConstructor

Checks if type T is a class constructor.

```typescript
type IsConstructor<T> = T extends new (...args: any) => any ? true : false;
```

**Example:**
```typescript
type A = IsConstructor<typeof String>;    // true
type B = IsConstructor<() => void>;       // false
```
