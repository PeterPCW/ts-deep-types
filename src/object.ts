// ============================================
// Object Type Utilities
// ============================================

/**
 * Get the keys of T whose values are assignable to type U.
 * 
 * @example
 * type User = { name: string; age: number; active: boolean };
 * type StringKeys = KeysOfType<User, string>; // 'name'
 * type NumberKeys = KeysOfType<User, number>; // 'age'
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Get the union of all value types in T.
 * 
 * @example
 * type User = { name: string; age: number; active: boolean };
 * type Values = ValueOf<User>; // string | number | boolean
 */
export type ValueOf<T> = T[keyof T];

/**
 * Get the union of key-value pairs as a tuple type.
 * 
 * @example
 * type User = { name: string; age: number };
 * type Entries = EntryOf<User>; 
 * // [ 'name', string ] | [ 'age', number ]
 */
export type EntryOf<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

/**
 * Create a type with only the numeric keys of T.
 * 
 * @example
 * type Arr = { 0: string; 1: number; name: string };
 * type NumericKeys = NumericKeysOf<Arr>; // '0' | '1'
 */
export type NumericKeysOf<T> = {
  [K in keyof T]: K extends `${number}` ? K : never;
}[keyof T];

/**
 * Create a type with only the string keys of T.
 * 
 * @example
 * type Obj = { name: string; age: number; 0: string };
 * type StringKeys = StringKeysOf<Obj>; // 'name' | 'age'
 */
export type StringKeysOf<T> = {
  [K in keyof T]: K extends string ? (K extends `${number}` ? never : K) : never;
}[keyof T];

/**
 * Get the length of an object type (number of keys).
 * 
 * @example
 * type User = { name: string; age: number };
 * type Len = ObjectLength<User>; // 2
 */
export type ObjectLength<T> = keyof T extends infer K
  ? K extends keyof any
    ? number
    : never
  : never;

/**
 * Create a type that makes only the specified keys required.
 * 
 * @example
 * type PartialUser = { name?: string; age?: number; email?: string };
 * type RequiredNameAndAge = RequiredKeys<PartialUser, 'name' | 'age'>;
 * // { name: string; age: number; email?: string; }
 */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Create a type that makes only the specified keys optional.
 * 
 * @example
 * type FullUser = { name: string; age: number; email: string };
 * type OptionalAge = OptionalKeys<FullUser, 'age'>;
 * // { name: string; age?: number; email: string; }
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Create a type that makes only the specified keys readonly.
 * 
 * @example
 * type MutableUser = { name: string; age: number };
 * type ReadonlyName = ReadonlyKeys<MutableUser, 'name'>;
 * // { readonly name: string; age: number; }
 */
export type ReadonlyKeys<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * Create a type that makes only the specified keys writable (not readonly).
 * 
 * @example
 * type ReadonlyUser = { readonly name: string; readonly age: number };
 * type WritableAge = WritableKeys<ReadonlyUser, 'age'>;
 * // { readonly name: string; age: number; }
 */
export type WritableKeys<T, K extends keyof T> = 
  Omit<T, K> & { -readonly [P in K]: T[P] };

/**
 * Create a type with only the own properties of T (not inherited).
 *
 * @example
 * class Base { x: string; }
 * class Child extends Base { y: number; }
 * type OwnProps = OwnProperties<Child>; // { y: number }
 */
export type OwnProperties<T> = {
  [P in keyof T]: T[P]
};

/**
 * Create a type that excludes the index signature from T.
 *
 * @example
 * type WithIndex = { [key: string]: string; name: string; age: number };
 * type NoIndex = NoIndexSignature<WithIndex>; // { name: string; age: number; }
 */
export type NoIndexSignature<T> = {
  [K in keyof T as string extends K ? never : K]: T[K];
};
