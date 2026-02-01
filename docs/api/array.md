# Array Types

Array and tuple manipulation utilities.

## ElementType

Gets the element type of an array.

```typescript
type ElementType<T extends readonly any[]> = ...
```

**Example:**
```typescript
type Numbers = number[];
type Element = ElementType<Numbers>;  // number
```

## FlattenArray

Flattens a nested array type.

```typescript
type FlattenArray<T> = ...
```

**Example:**
```typescript
type Nested = number[][][];
type Flat = FlattenArray<Nested>;  // number[]
```

## UniqueArray

Removes duplicate types from a tuple.

```typescript
type UniqueArray<T extends readonly any[]> = ...
```

**Example:**
```typescript
type WithDupes = [1, 2, 2, 3, 3, 3];
type Unique = UniqueArray<WithDupes>;  // [1, 2, 3]
```

## ArrayLength

Gets the length of a tuple type.

```typescript
type ArrayLength<T extends readonly any[]> = ...
```

## FirstElement

Gets the first element of a tuple.

```typescript
type FirstElement<T extends readonly any[]> = ...
```

**Example:**
```typescript
type Tuple = [string, number, boolean];
type First = FirstElement<Tuple>;  // string
```

## LastElement

Gets the last element of a tuple.

```typescript
type LastElement<T extends readonly any[]> = ...
```

## Tail

Gets all elements except the first.

```typescript
type Tail<T extends readonly any[]> = ...
```

## Init

Gets all elements except the last.

```typescript
type Init<T extends readonly any[]> = ...
```

## Push

Adds elements to the end of a tuple.

```typescript
type Push<T extends readonly any[], V> = ...
```

## Unshift

Adds elements to the beginning of a tuple.

```typescript
type Unshift<T extends readonly any[], V> = ...
```

## Repeat

Creates a tuple with repeated elements.

```typescript
type Repeat<T, N extends number> = ...
```

## Reverse

Reverses a tuple.

```typescript
type Reverse<T extends readonly any[]> = ...
```

## Includes

Checks if a type includes a value.

```typescript
type Includes<T extends readonly any[], V> = ...
```

## At

Gets element at index.

```typescript
type At<T extends readonly any[], I extends number> = ...
```
