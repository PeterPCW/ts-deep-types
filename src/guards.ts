// ============================================
// Type Guard Utilities
// ============================================

/**
 * Check if type T is exactly 'any'.
 * Returns true only for the any type, not for unknown or other types.
 * 
 * @example
 * type Test1 = IsAny<any>; // true
 * type Test2 = IsAny<unknown>; // false
 * type Test3 = IsAny<string>; // false
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false;

/**
 * Check if type T is exactly 'never'.
 * 
 * @example
 * type Test1 = IsNever<never>; // true
 * type Test2 = IsNever<unknown>; // false
 * type Test3 = IsNever<string>; // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Check if type T is exactly 'unknown'.
 * 
 * @example
 * type Test1 = IsUnknown<unknown>; // true
 * type Test2 = IsAny<any>; // false
 */
export type IsUnknown<T> = unknown extends T ? (T extends unknown ? true : false) : false;

/**
 * Check if type T is a union type.
 * 
 * @example
 * type Test1 = IsUnion<string>; // false
 * type Test2 = IsUnion<string | number>; // true
 */
export type IsUnion<T> = [T] extends [never] 
  ? false 
  : T extends T 
    ? [never] extends [T] 
      ? false 
      : true 
    : false;

/**
 * Check if type T is a tuple type.
 * 
 * @example
 * type Test1 = IsTuple<string[]>; // false
 * type Test2 = IsTuple<[string, number]>; // true
 */
export type IsTuple<T> = T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false;

/**
 * Check if type T is an array type (not a tuple).
 * 
 * @example
 * type Test1 = IsArray<number[]>; // true
 * type Test2 = IsArray<[number, string]>; // false
 */
export type IsArray<T> = T extends readonly any[]
  ? number extends T['length']
    ? true
    : false
  : false;

/**
 * Check if type T is a plain object (not an array, function, or class).
 * 
 * @example
 * type Test1 = IsPlainObject<{ a: 1 }>; // true
 * type Test2 = IsPlainObject<{ length: 1 }>; // false (array-like)
 */
export type IsPlainObject<T> = 
  T extends object 
    ? T extends Function 
      ? false 
      : T extends any[] 
        ? false 
        : T extends new (...args: any) => any 
          ? false 
          : keyof T extends symbol 
            ? false 
            : true 
    : false;

/**
 * Check if type T is a function.
 * 
 * @example
 * type Test1 = IsFunction<() => void>; // true
 * type Test2 = IsFunction<string>; // false
 */
export type IsFunction<T> = T extends Function ? true : false;

/**
 * Check if type T is a class constructor.
 * 
 * @example
 * type Test1 = IsConstructor<typeof String>; // true
 * type Test2 = IsConstructor<() => void>; // false
 */
export type IsConstructor<T> = 
  T extends new (...args: any) => any ? true : false;
