// ============================================
// Promise Type Utilities
// ============================================

/**
 * Get the resolved type of a Promise.
 * 
 * @example
 * type Resolved = PromiseResult<Promise<string>>; // string
 * type Resolved2 = PromiseResult<Promise<{ id: number }>>; // { id: number }
 */
export type PromiseResult<T extends Promise<any>> = 
  T extends Promise<infer R> ? R : never;

/**
 * Get the state of a Promise: 'pending', 'fulfilled', or 'rejected'.
 * 
 * @example
 * type Pending = PromiseState<Promise<never>>; // 'pending'
 * type Fulfilled = PromiseState<Promise<string>>; // 'fulfilled'
 */
export type PromiseState<T extends Promise<any>> = 
  T extends Promise<infer R> 
    ? R extends never 
      ? 'pending' 
      : 'fulfilled' 
    : 'rejected';

/**
 * Convert a synchronous function to an async function.
 * 
 * @example
 * type SyncFn = (x: number) => string;
 * type AsyncFn = Asyncify<SyncFn>; // (x: number) => Promise<string>
 */
export type Asyncify<T extends (...args: any) => any> = 
  (...args: Parameters<T>) => Promise<ReturnType<T>>;

/**
 * Convert an async function to a synchronous function that returns the Promise type.
 * 
 * @example
 * type AsyncFn = (x: number) => Promise<string>;
 * type SyncFn = Syncify<AsyncFn>; // (x: number) => Promise<string>
 */
export type Syncify<T extends (...args: any) => Promise<any>> = 
  (...args: Parameters<T>) => ReturnType<T>;

/**
 * Create a Promise type that resolves to type T.
 * 
 * @example
 * type MaybePromise<T> = MaybePromise<string>; // string | Promise<string>
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * Create a value that could be either the value or a Promise of the value.
 * 
 * @example
 * type AsyncValue = AsyncValue<number>; // number | Promise<number>
 */
export type AsyncValue<T> = T | Promise<T>;

/**
 * Check if type T is a Promise or PromiseLike.
 * 
 * @example
 * type Test1 = IsPromise<Promise<string>>; // true
 * type Test2 = IsPromise<string>; // false
 * type Test3 = IsPromise<PromiseLike<number>>; // true
 */
export type IsPromise<T> = 
  T extends PromiseLike<any> ? true : false;

/**
 * Unwrap a Promise or return the type as-is if not a Promise.
 * 
 * @example
 * type Unwrapped = UnwrapPromise<Promise<string>>; // string
 * type Raw = UnwrapPromise<string>; // string
 */
export type UnwrapPromise<T> = 
  T extends PromiseLike<infer U> ? U : T;

/**
 * Get the rejection type of a Promise (or never if it doesn't reject).
 * Note: JavaScript Promises don't have a type-level rejection type,
 * so this returns 'never' for standard Promises.
 * 
 * @example
 * type Rejection = PromiseRejection<Promise<string>>; // never
 */
export type PromiseRejection<T extends Promise<any>> = never;

/**
 * Create a Promise that resolves after a delay (type-level only).
 * 
 * @example
 * type Delayed = DelayedPromise<string, 100>; // Promise<string>
 */
export type DelayedPromise<T, DelayMs extends number = 0> = 
  DelayMs extends 0 
    ? Promise<T> 
    : Promise<T>;

/**
 * Get the result type of a Promise.rts() call.
 * 
 * @example
 * type Results = PromiseResults<[Promise<string>, Promise<number>]>;
 * // [string, number]
 */
export type PromiseResults<T extends readonly PromiseLike<any>[]> = 
  { [K in keyof T]: T[K] extends PromiseLike<infer R> ? R : never };
