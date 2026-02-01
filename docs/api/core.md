# Core Types

Deep type manipulation utilities.

## DeepPartial

Makes all properties of T optional recursively.

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

**Example:**
```typescript
type Config = { database: { host: string; port: number } };
type PartialConfig = DeepPartial<Config>;
// { database?: { host?: string; port?: number } }
```

## DeepRequired

Makes all properties of T required recursively (removes optional).

```typescript
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
```

## DeepReadonly

Makes all properties of T readonly recursively.

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

## PickDeep

Picks nested properties using dot notation.

```typescript
type PickDeep<T, K extends string> = ...
```

**Example:**
```typescript
type Config = { database: { host: string; port: number } };
type Host = PickDeep<Config, 'database.host'>;  // { host: string }
```

## OmitDeep

Omits nested properties using dot notation.

```typescript
type OmitDeep<T, K extends string> = ...
```

## Merge

Intersects two object types.

```typescript
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A ? A[K] : K extends keyof B ? B[K] : never;
};
```

## UnionToIntersection

Converts a union type to an intersection type.

```typescript
type UnionToIntersection<U> = ...
```

**Example:**
```typescript
type Union = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union>;
// { a: string } & { b: number }
```

## LastInUnion

Gets the last type in a union.

```typescript
type LastInUnion<U> = ...
```

## FirstInUnion

Gets the first type in a union.

```typescript
type FirstInUnion<U> = ...
```

## ExcludeNever

Excludes never from a type.

```typescript
type ExcludeNever<T> = ...
```
