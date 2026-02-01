// ============================================
// Array Type Utilities
// ============================================

/**
 * Get the element type of an array.
 * 
 * @example
 * type Str = ElementType<string[]>; // string
 * type Num = ElementType<[string, number, boolean]>; // string | number | boolean
 */
export type ElementType<T extends readonly any[]> = 
  T extends readonly (infer E)[] ? E : never;

/**
 * Flatten a nested array type one level.
 * 
 * @example
 * type Flat = FlattenArray<[[1, 2], [3, 4]]>; // [1, 2, 3, 4]
 * type Flat2 = FlattenArray<[1, [2, 3], [[4]]]>; // 1 | [2, 3] | [[4]]
 */
export type FlattenArray<T extends readonly any[]> = 
  T extends readonly (infer E)[] 
    ? E extends readonly any[] 
      ? E 
      : T extends readonly [infer F, ...infer R] 
        ? F extends readonly any[]
          ? [...FlattenArray<F>, ...FlattenArray<R>]
          : [F, ...FlattenArray<R>]
        : []
    : never;

/**
 * Create an array type with unique element types (union-based).
 * Note: Full tuple deduplication requires branded types in TypeScript.
 * 
 * @example
 * type Unique = UniqueArray<[1, 2, 1, 3, 2]>; // number[]
 * type UniqueStr = UniqueArray<['a', 'b', 'a', 'c']>; // string[]
 */
export type UniqueArray<T extends readonly any[]> = 
  T extends readonly (infer E)[] ? E[] : never;

/**
 * Get the length of an array type as a number literal.
 * 
 * @example
 * type Len = ArrayLength<[1, 2, 3]>; // 3
 * type Empty = ArrayLength<[]>; // 0
 */
export type ArrayLength<T extends readonly any[]> = 
  T extends { readonly length: infer L } ? L : never;

/**
 * Get the first element type of an array.
 * 
 * @example
 * type First = FirstElement<[string, number, boolean]>; // string
 * type Empty = FirstElement<[]>; // never
 */
export type FirstElement<T extends readonly any[]> = 
  T extends readonly [infer F, ...any[]] ? F : never;

/**
 * Get the last element type of an array.
 * 
 * @example
 * type Last = LastElement<[string, number, boolean]>; // boolean
 * type Empty = LastElement<[]>; // never
 */
export type LastElement<T extends readonly any[]> = 
  T extends readonly [...any[], infer L] ? L : never;

/**
 * Get all elements except the first of an array.
 * 
 * @example
 * type Tail = Tail<[string, number, boolean]>; // [number, boolean]
 * type Empty = Tail<[]>; // []
 */
export type Tail<T extends readonly any[]> = 
  T extends readonly [any, ...infer R] ? R : [];

/**
 * Get all elements except the last of an array.
 * 
 * @example
 * type Init = Init<[string, number, boolean]>; // [string, number]
 * type Empty = Init<[]>; // []
 */
export type Init<T extends readonly any[]> = 
  T extends readonly [...infer I, any] ? I : [];

/**
 * Push an element type to an array type.
 * 
 * @example
 * type Pushed = Push<[string, number], boolean>; // [string, number, boolean]
 */
export type Push<T extends readonly any[], E> = 
  [...T, E];

/**
 * Unshift an element type to an array type.
 * 
 * @example
 * type Unshifted = Unshift<[string, number], boolean>; // [boolean, string, number]
 */
export type Unshift<T extends readonly any[], E> = 
  [E, ...T];

/**
 * Create a tuple type of type T repeated N times.
 * 
 * @example
 * type Triplet = Repeat<number, 3>; // [number, number, number]
 * type Empty = Repeat<string, 0>; // []
 */
export type Repeat<T, N extends number, R extends readonly any[] = []> = 
  R['length'] extends N ? R : Repeat<T, N, [...R, T]>;

/**
 * Reverse the order of an array type.
 * 
 * @example
 * type Reversed = Reverse<[1, 2, 3]>; // [3, 2, 1]
 */
export type Reverse<T extends readonly any[]> = 
  T extends readonly [infer F, ...infer R] 
    ? [...Reverse<R>, F] 
    : [];

/**
 * Create a readonly version of an array type.
 * 
 * @example
 * type ReadonlyArr = ReadonlyArray<number[]>; // readonly number[]
 */
export type ReadonlyArray<T extends readonly any[]> = 
  T extends readonly (infer E)[] ? readonly E[] : never;

/**
 * Check if an array type includes a specific element.
 * 
 * @example
 * type HasOne = Includes<[1, 2, 3], 2>; // true
 * type HasFour = Includes<[1, 2, 3], 4>; // false
 */
export type Includes<T extends readonly any[], U> = 
  T extends readonly [infer F, ...infer R] 
    ? F extends U 
      ? true 
      : Includes<R, U> 
    : false;

/**
 * Get the type of the element at index I in array type T.
 * 
 * @example
 * type AtIndex = At<[string, number, boolean], 1>; // number
 */
export type At<T extends readonly any[], I extends number> = 
  T extends readonly [infer F, ...infer R] 
    ? I extends 0 
      ? F 
      : At<R, I>
    : never;
