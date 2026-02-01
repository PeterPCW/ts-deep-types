# Object Types

Object property and key manipulation utilities.

## KeysOfType

Gets keys of T whose values are assignable to type U.

```typescript
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
```

**Example:**
```typescript
interface User {
  name: string;
  age: number;
  active: boolean;
}

type StringKeys = KeysOfType<User, string>;    // 'name'
type NumberKeys = KeysOfType<User, number>;    // 'age'
```

## ValueOf

Gets union of all value types in T.

```typescript
type ValueOf<T> = T[keyof T];
```

**Example:**
```typescript
interface User {
  name: string;
  age: number;
}

type Values = ValueOf<User>;  // string | number
```

## EntryOf

Gets key-value pairs as a tuple union.

```typescript
type EntryOf<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
```

**Example:**
```typescript
interface User {
  name: string;
  age: number;
}

type Entries = EntryOf<User>;
// ['name', string] | ['age', number]
```

## NumericKeysOf

Gets only numeric keys.

```typescript
type NumericKeysOf<T> = ...
```

## StringKeysOf

Gets only string keys (excluding numeric).

```typescript
type StringKeysOf<T> = ...
```

## ObjectLength

Gets the number of keys in an object type.

```typescript
type ObjectLength<T> = ...
```

## RequiredKeys

Gets keys that are required.

```typescript
type RequiredKeys<T, K extends keyof T> = ...
```

## OptionalKeys

Gets keys that are optional.

```typescript
type OptionalKeys<T, K extends keyof T> = ...
```

## ReadonlyKeys

Makes specific keys readonly.

```typescript
type ReadonlyKeys<T, K extends keyof T> = ...
```

## WritableKeys

Makes specific keys writable (removes readonly).

```typescript
type WritableKeys<T, K extends keyof T> = ...
```

## OwnProperties

Gets only own properties (not inherited).

```typescript
type OwnProperties<T> = ...
```

## InheritedProperties

Gets only inherited properties.

```typescript
type InheritedProperties<T> = ...
```

## NoIndexSignature

Removes index signature from T.

```typescript
type NoIndexSignature<T> = ...
```
