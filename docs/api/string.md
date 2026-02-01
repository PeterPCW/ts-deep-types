# String Types

String manipulation and transformation utilities.

## CamelCase

Converts strings to camelCase.

```typescript
type CamelCase<S extends string> = ...
```

**Example:**
```typescript
type A = CamelCase<'hello_world'>;      // 'helloWorld'
type B = CamelCase<'HTTP_REQUEST'>;     // 'httpRequest'
type C = CamelCase<'user_id_and_name'>; // 'userIdAndName'
```

## KebabCase

Converts strings to kebab-case.

```typescript
type KebabCase<S extends string> = ...
```

**Example:**
```typescript
type A = KebabCase<'helloWorld'>;   // 'hello-world'
type B = KebabCase<'UserName'>;     // 'user-name'
```

## SnakeCase

Converts strings to snake_case.

```typescript
type SnakeCase<S extends string> = ...
```

**Example:**
```typescript
type A = SnakeCase<'helloWorld'>;   // 'hello_world'
type B = SnakeCase<'UserName'>;     // 'user_name'
```

## PascalCase

Converts strings to PascalCase.

```typescript
type PascalCase<S extends string> = ...
```

**Example:**
```typescript
type A = PascalCase<'hello_world'>; // 'HelloWorld'
type B = PascalCase<'http_request'>; // 'HttpRequest'
```

## Trim

Removes whitespace from both ends of a string.

```typescript
type Trim<S extends string> = ...
```

## WordCount

Counts words in a string.

```typescript
type WordCount<S extends string> = ...
```

## Brand

Creates a branded/nominal type.

```typescript
type Brand<T, B extends string> = T & { __brand: B };
```

## StringEnum

Creates a string enum type.

```typescript
type StringEnum<T extends string> = T;
```

## RequiredBy

Makes specific keys required.

```typescript
type RequiredBy<T, K extends keyof T> = ...
```

## ReadonlyBy

Makes specific keys readonly.

```typescript
type ReadonlyBy<T, K extends keyof T> = ...
```

## OptionalBy

Makes specific keys optional.

```typescript
type OptionalBy<T, K extends keyof T> = ...
```
