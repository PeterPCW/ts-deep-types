# Function Types

Function parameter and return type utilities.

## Parameters

Gets the parameter types of a function as a tuple.

```typescript
type Parameters<T extends (...args: any) => any> = ...
```

**Example:**
```typescript
type Fn = (a: string, b: number) => void;
type Params = Parameters<Fn>;  // [string, number]
```

## ReturnType

Gets the return type of a function.

```typescript
type ReturnType<T extends (...args: any) => any> = ...
```

**Example:**
```typescript
type Fn = (x: number) => string;
type Return = ReturnType<Fn>;  // string
```

## ConstructorParameters

Gets the constructor parameters of a class.

```typescript
type ConstructorParameters<T extends new (...args: any) => any> = ...
```

## InstanceType

Gets the instance type of a class.

```typescript
type InstanceType<T extends new (...args: any) => any> = ...
```

## ThisParameterType

Gets the `this` parameter type of a function.

```typescript
type ThisParameterType<T> = unknown;
```

## OmitThisParameter

Removes the `this` parameter from a function.

```typescript
type OmitThisParameter<T extends (...args: any) => any> = ...
```

## AsyncReturnType

Converts a sync function to async.

```typescript
type AsyncReturnType<T extends (...args: any) => any> = ...
```

**Example:**
```typescript
type Fn = (x: number) => string;
type AsyncFn = AsyncReturnType<Fn>;
// (x: number) => Promise<string>
```

## PartialParameters

Makes all parameters optional.

```typescript
type PartialParameters<T extends (...args: any) => any> = ...
```

## LastParameter

Gets the last parameter type.

```typescript
type LastParameter<T extends (...args: any) => any> = never;
```

## FirstParameter

Gets the first parameter type.

```typescript
type FirstParameter<T extends (...args: any) => any> = unknown;
```

## NoParameters

Creates a parameterless function.

```typescript
type NoParameters<T extends (...args: any) => any> = ...
```

## ObjectParameters

Converts parameters to a single object.

```typescript
type ObjectParameters<T extends (...args: any) => any> = ...
```
