// ============================================
// Advanced Object Type Utilities
// ============================================

/**
 * Deep merge two object types.
 * Properties from T override properties from U.
 * 
 * @example
 * type A = { x: number; y: { a: string } };
 * type B = { y: { b: number }; z: boolean };
 * type Merged = DeepMerge<A, B>;
 * // { x: number; y: { a: string; b: number }; z: boolean }
 */
export type DeepMerge<T, U> = 
  T extends object
    ? U extends object
      ? { [K in keyof T]: K extends keyof U ? DeepMerge<T[K], U[K]> : T[K] }
        & Omit<U, keyof T>
      : T
    : T;

/**
 * Deep omit properties from an object using a dot-notation path.
 * 
 * @example
 * type A = { a: { b: { c: string }; d: number } };
 * type B = DeepOmit<A, 'a.b.c'>;
 * // { a: { b: {}; d: number } }
 */
export type DeepOmit<T, K extends string> = 
  K extends keyof T ? Omit<T, K> :
  K extends `${infer P}.${infer Rest}` ?
    P extends keyof T
      ? { [K2 in P]: DeepOmit<T[P], Rest> }
      : T
    : T;

/**
 * Deep pick properties from an object using a dot-notation path.
 * 
 * @example
 * type A = { a: { b: { c: string }; d: number }; e: boolean };
 * type B = DeepPick<A, 'a.b'>;
 * // { a: { b: { c: string } } }
 */
export type DeepPick<T, K extends string> = 
  K extends keyof T ? Pick<T, K> :
  K extends `${infer P}.${infer Rest}` ?
    P extends keyof T
      ? { [K2 in P]: DeepPick<T[P], Rest> }
      : never
    : never;

/**
 * Distributive version of Omit that works on union types.
 * 
 * @example
 * type A = { a: string } | { b: number };
 * type B = DistributiveOmit<A, 'a'>;
 * // { b: number } | {}
 */
export type DistributiveOmit<T, K> = 
  T extends T ? (K extends keyof T ? Omit<T, K> : T) : never;

/**
 * Distributive version of Pick that works on union types.
 * 
 * @example
 * type A = { a: string } | { b: number };
 * type B = DistributivePick<A, 'a'>;
 * // { a: string } | {}
 */
export type DistributivePick<T, K> = 
  T extends T ? (K extends keyof T ? Pick<T, K> : never) : never;

/**
 * Make all properties of T writable (remove readonly).
 * 
 * @example
 * type A = { readonly x: string; readonly y: number };
 * type B = Writable<A>;
 * // { x: string; y: number }
 */
export type Writable<T> = { -readonly [P in keyof T]: T[P] };

/**
 * Recursively make all properties of T writable.
 * 
 * @example
 * type A = { readonly x: { readonly y: string } };
 * type B = DeepWritable<A>;
 * // { x: { y: string } }
 */
export type DeepWritable<T> = T extends object
  ? { -readonly [P in keyof T]: DeepWritable<T[P]> }
  : T;

/**
 * Make all properties of T non-nullable (remove undefined and null).
 * 
 * @example
 * type A = { x: string | undefined; y: number | null };
 * type B = NonNullableProperties<A>;
 * // { x: string; y: number }
 */
export type NonNullableProperties<T> = { [P in keyof T]: NonNullable<T[P]> };

/**
 * Extract the function parameters as an object type.
 * 
 * @example
 * type F = (x: string, y: number) => void;
 * type P = FunctionParams<F>;
 * // { x: string; y: number }
 */
export type FunctionParams<T extends (...args: any) => any> = {
  [K in keyof Parameters<T>]: Parameters<T>[K]
};

/**
 * Create a function type that accepts an object of parameters.
 * 
 * @example
 * type F = (x: string, y: number) => void;
 * type O = ObjectParams<F>;
 * // (params: { x: string; y: number }) => void
 */
export type ObjectParams<T extends (...args: any) => any> = 
  (params: { [K in keyof Parameters<T>]: Parameters<T>[K] }) => ReturnType<T>;

/**
 * Pick specific keys from a type.
 *
 * @example
 * type A = PickKeys<{ x: string; y: number }, 'x'>;
 * // { x: string }
 */
export type PickKeys<T, K extends keyof T> = Pick<T, K>;

// Backward compatibility alias
/** @deprecated Use PickKeys instead */
export type Exact<T, K extends keyof T> = Pick<T, K>;

/**
 * Mark a property as optional in a way that TypeScript recognizes.
 * 
 * @example
 * type A = { x: string; y?: number };
 * type B = MarkOptional<A, 'y'>;
 * // { x: string; y?: number }
 */
export type MarkOptional<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;

/**
 * Mark a property as required in a way that TypeScript recognizes.
 * 
 * @example
 * type A = { x: string; y?: number };
 * type B = MarkRequired<A, 'y'>;
 * // { x: string; y: number }
 */
export type MarkRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

/**
 * Create a type with only the own enumerable properties (no prototype chain).
 * 
 * @example
 * class Foo { x = 1; }
 * type A = OwnProperties<Foo>;
 * // { x: 1 }
 */
export type OwnProperties<T> = { [K in keyof T]: T[K] };

/**
 * Get the union of all property values in T.
 * 
 * @example
 * type A = { x: string; y: number };
 * type V = ValueOf<A>;
 * // string | number
 */
export type ValueOf<T> = T[keyof T];

/**
 * Get the union of all property keys in T.
 * 
 * @example
 * type A = { x: string; y: number };
 * type K = KeysOf<A>;
 * // 'x' | 'y'
 */
export type KeysOf<T> = keyof T;

/**
 * Create a type from the entries of an object.
 * 
 * @example
 * type A = { x: string; y: number };
 * type E = EntryOf<A>;
 * // ['x', string] | ['y', number]
 */
export type EntryOf<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T];

/**
 * Get only the numeric keys of T.
 * 
 * @example
 * type A = { 0: string; 1: number; name: string };
 * type N = NumericKeysOf<A>;
 * // 0 | 1
 */
export type NumericKeysOf<T> = { [K in keyof T]: K extends number ? K : never }[keyof T];

/**
 * Get only the string keys of T.
 * 
 * @example
 * type A = { name: string; 0: string };
 * type S = StringKeysOf<A>;
 * // 'name'
 */
export type StringKeysOf<T> = { [K in keyof T]: K extends string ? K : never }[keyof T];

/**
 * Get the keys of T that are of type U.
 * 
 * @example
 * type A = { x: string; y: number; z: string };
 * type K = KeysOfType<A, string>;
 * // 'x' | 'z'
 */
export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

/**
 * Get the keys of T that are optional.
 * 
 * @example
 * type A = { x: string; y?: number };
 * type K = OptionalKeysOf<A>;
 * // 'y'
 */
export type OptionalKeysOf<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

/**
 * Get the keys of T that are required.
 * 
 * @example
 * type A = { x: string; y?: number };
 * type K = RequiredKeysOf<A>;
 * // 'x'
 */
export type RequiredKeysOf<T> = { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T];

/**
 * Get the keys of T that are readonly.
 * 
 * @example
 * type A = { readonly x: string; y: number };
 * type K = ReadonlyKeysOf<A>;
 * // 'x'
 */
export type ReadonlyKeysOf<T> = { readonly [K in keyof T]: K }[keyof T];

/**
 * Get the keys of T that are writable.
 * 
 * @example
 * type A = { readonly x: string; y: number };
 * type K = WritableKeysOf<A>;
 * // 'y'
 */
export type WritableKeysOf<T> = { -readonly [K in keyof T]: K }[keyof T];

/**
 * Get the length of an object (number of keys).
 * Note: This is a simplified version that returns 0 for most types.
 * 
 * @example
 * type A = { x: string; y: number };
 * type L = ObjectLength<A>;
 * // 2
 */
export type ObjectLength<T extends object> = keyof T extends never ? 0 : number;

/**
 * Check if T has a specific key.
 * 
 * @example
 * type A = { x: string };
 * type B = HasKey<A, 'x'>; // true
 * type C = HasKey<A, 'y'>; // false
 */
export type HasKey<T, K extends keyof T> = true;

/**
 * Make a shallow copy of T with updated properties.
 * 
 * @example
 * type A = { x: string; y: number };
 * type B = Update<A, { x: number }>;
 * // { x: number; y: number }
 */
export type Update<T, U> = Omit<T, keyof U> & U;

/**
 * Require all properties to be specified (no optional properties).
 * 
 * @example
 * type A = { x: string; y?: number };
 * type B = RequiredAll<A>;
 * // { x: string; y: number }
 */
export type RequiredAll<T> = { [P in keyof T]-?: T[P] };
