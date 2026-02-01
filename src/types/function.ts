// ============================================
// Function Type Utilities
// ============================================

/**
 * Get the constructor parameters of a class type.
 *
 * @example
 * class User { constructor(name: string, age: number) {} }
 * type CtorParams = ConstructorParameters<typeof User>; // [string, number]
 */
export type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

/**
 * Get the instance type of a class constructor.
 *
 * @example
 * class User { name: string; }
 * type Instance = InstanceType<typeof User>; // User
 */
export type InstanceType<T extends new (...args: any) => any> =
  T extends new (...args: any) => infer R ? R : never;

/**
 * Get the `this` parameter type of a function.
 *
 * @example
 * type Fn = (this: Window, x: number) => void;
 * type ThisType = ThisParameterType<Fn>; // Window
 */
export type ThisParameterType<T> =
  T extends (this: infer This, ...args: any[]) => any ? This : unknown;

/**
 * Get the first parameter type of a function.
 *
 * @example
 * type Fn = (a: string, b: number) => boolean;
 * type FirstParam = FirstParameter<Fn>; // string
 */
export type FirstParameter<T extends (...args: any) => any> =
  T extends (...args: infer P) => any
    ? P extends [infer F, ...any[]] ? F : never
    : never;

/**
 * Get the last parameter type of a function.
 *
 * @example
 * type Fn = (a: string, b: number) => boolean;
 * type LastParam = LastParameter<Fn>; // number
 */
export type LastParameter<T extends (...args: any) => any> =
  T extends (...args: infer P) => any
    ? P extends [...any, infer L] ? L : never
    : never;

/**
 * Create a parameterless function from a function that takes arguments.
 * Useful for debounced/throttled functions.
 *
 * @example
 * type Fn = (x: number, y: string) => void;
 * type NoArgs = NoParameters<Fn>; // () => void
 */
export type NoParameters<T extends (...args: any) => any> =
  T extends (...args: any) => infer R ? () => R : never;
