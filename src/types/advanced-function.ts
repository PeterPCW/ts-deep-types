// ============================================
// Advanced Function Type Utilities
// ============================================

/**
 * Accept any function type.
 */
export type AnyFunction = (...args: any[]) => any;

/**
 * Accept any async function type.
 */
export type AsyncFunction<A extends any[] = any[], R = any> = (...args: A) => Promise<R>;

/**
 * A no-op function that returns undefined.
 * 
 * @example
 * const noop: Noop = () => {};
 */
export type Noop = () => void;

/**
 * A no-op async function.
 */
export type AsyncNoop = () => Promise<void>;

/**
 * A predicate function that returns a boolean.
 * 
 * @example
 * const isNumber: Predicate<number> = (x): x is number => typeof x === 'number';
 */
export type Predicate<T> = (value: unknown) => value is T;

/**
 * A unary function (takes one argument).
 * 
 * @example
 * const double: Unary<number, number> = (x) => x * 2;
 */
export type Unary<T, R> = (arg: T) => R;

/**
 * A binary function (takes two arguments).
 */
export type Binary<T, U, R> = (first: T, second: U) => R;

/**
 * A variadic function (takes any number of arguments).
 */
export type Variadic<T, R> = (...args: T[]) => R;

/**
 * Convert a function to a curried version.
 * 
 * @example
 * type F = (a: string, b: number, c: boolean) => void;
 * type C = Curried<F>;
 * // (a: string) => (b: number) => (c: boolean) => void
 */
export type Curried<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? A extends [infer F, ...infer Rest]
      ? (arg: F) => Curried<(...args: Rest) => R>
      : () => R
    : never;

/**
 * Function composition - compose multiple functions into one.
 * 
 * @example
 * type F = Compose<[(x: number) => string, (x: string) => boolean]>;
 * // (x: number) => boolean
 */
export type Compose<F extends AnyFunction[]> = 
  F extends [infer F1 extends AnyFunction, ...infer Rest extends AnyFunction[]]
    ? Rest extends []
      ? F1
      : (x: Parameters<F1>[0]) => ReturnType<Compose<Rest>>
    : never;

/**
 * Pipe function - left-to-right function composition.
 * 
 * @example
 * type F = Pipe<[(x: number) => string, (x: string) => boolean]>;
 * // (x: number) => boolean
 */
export type Pipe<F extends AnyFunction[]> = 
  F extends [infer F1 extends AnyFunction, ...infer Rest extends AnyFunction[]]
    ? Rest extends []
      ? F1
      : (...args: Parameters<F1>) => Pipe<Rest> extends AnyFunction ? ReturnType<Pipe<Rest>> : never
    : never;

/**
 * Debounced function type.
 * 
 * @example
 * type DebouncedFn = DebounceFunction<(x: number) => void>;
 */
export type DebounceFunction<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => void
    : never;

/**
 * Throttled function type.
 */
export type ThrottleFunction<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => void
    : never;

/**
 * Event handler function type.
 */
export type EventHandler<T = Event> = (event: T) => void;

/**
 * Async event handler function type.
 */
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

/**
 * Callback function type.
 */
export type Callback<T = void> = (error?: Error | null, result?: T) => void;

/**
 * Higher-order function result type.
 */
export type HoF<T extends AnyFunction, R extends AnyFunction> = (fn: T) => R;

/**
 * Wrap a function to handle promises.
 * 
 * @example
 * type F = (x: number) => string;
 * type W = AsyncWrapper<F>;
 * // (x: number) => Promise<string>
 */
export type AsyncWrapper<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => R extends Promise<any> ? R : Promise<R>
    : never;

/**
 * Convert a synchronous function to return void instead of its return value.
 * 
 * @example
 * type F = (x: number) => string;
 * type V = SideEffect<F>;
 * // (x: number) => void
 */
export type SideEffect<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => void
    : never;

/**
 * Wrap a function to ignore errors.
 * 
 * @example
 * type F = (x: number) => string;
 * type S = Silent<F>;
 * // (x: number) => string | undefined
 */
export type Silent<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => R | undefined
    : never;

/**
 * Create a function that calls the original function once and caches the result.
 * 
 * @example
 * type F = (x: number) => string;
 * type M = Memoized<F>;
 * // (x: number) => string
 */
export type Memoized<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : never;

/**
 * A constructor function type.
 */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * A class instance type.
 */
export type Instance<T> = T extends new (...args: any[]) => infer R ? R : never;

/**
 * Extract constructor parameters.
 */
export type ConstructorParams<T extends Constructor> = 
  T extends new (...args: infer P) => any ? P : never;

/**
 * Extract the type of `this` from a function.
 * 
 * @example
 * type F = (this: Window, x: number) => void;
 * type T = ThisType<F>; // Window
 */
export type ThisType<T extends AnyFunction> = 
  T extends (this: infer This, ...args: infer A) => infer R
    ? This
    : never;

/**
 * Remove `this` parameter from a function type.
 * 
 * @example
 * type F = (this: Window, x: number) => void;
 * type G = OmitThisParameter<F>;
 * // (x: number) => void
 */
export type OmitThisParameter<T extends AnyFunction> = 
  T extends (this: any, ...args: infer A) => infer R
    ? (...args: A) => R
    : T;

/**
 * Extract `this` parameter type from a function.
 * 
 * @example
 * type F = (this: Window, x: number) => void;
 * type T = ThisParameterType<F>; // Window
 */
export type ThisParameterType<T extends AnyFunction> = 
  T extends (this: infer This, ...args: any[]) => any ? This : unknown;

/**
 * Bind `this` context to a function.
 * 
 * @example
 * type F = (this: Window, x: number) => void;
 * type B = BoundThis<F, Document>;
 * // (x: number) => void
 */
export type BoundThis<T extends AnyFunction, This> = 
  OmitThisParameter<T> & { bind(thisArg: This): BoundThis<T, This> };

/**
 * Make all parameters of a function optional.
 * 
 * @example
 * type F = (a: string, b: number) => void;
 * type P = PartialParameters<F>;
 * // (a?: string, b?: number) => void
 */
export type PartialParameters<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: { [K in keyof A]?: A[K] }) => R
    : never;

/**
 * Make the first N parameters of a function required, and the rest optional.
 * 
 * @example
 * type F = (a: string, b: number, c: boolean) => void;
 * type P = PartialParametersAtLeast<F, 2>;
 * // (a: string, b: number, c?: boolean) => void
 */
export type PartialParametersAtLeast<T extends AnyFunction, N extends number> = 
  T extends (...args: infer A) => infer R
    ? A extends [...Required: infer RequiredPart, ...Optional: infer OptionalPart]
      ? RequiredPart['length'] extends N
        ? (...args: [...RequiredPart, ...{ [K in keyof OptionalPart]?: OptionalPart[K] }]) => R
        : T
      : T
    : never;

/**
 * Extract the first parameter type from a function.
 * 
 * @example
 * type F = (a: string, b: number) => void;
 * type P = FirstParameter<F>; // string
 */
export type FirstParameter<T extends AnyFunction> = 
  T extends (...args: [infer P, ...any[]]) => any ? P : never;

/**
 * Extract the last parameter type from a function.
 * 
 * @example
 * type F = (a: string, b: number) => void;
 * type P = LastParameter<F>; // number
 */
export type LastParameter<T extends AnyFunction> = 
  T extends (...args: [...any[], infer P]) => any ? P : never;

/**
 * Create a parameterless function from a function.
 * 
 * @example
 * type F = (a: string, b: number) => void;
 * type N = NoParameters<F>;
 * // () => void
 */
export type NoParameters<T extends AnyFunction> = 
  T extends (...args: any[]) => infer R ? () => R : never;

/**
 * Convert a function that takes positional arguments to one that takes an object.
 * 
 * @example
 * type F = (x: string, y: number) => void;
 * type O = ObjectParameters<F>;
 * // (params: { x: string; y: number }) => void
 */
export type ObjectParameters<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (params: { [K in keyof A]: A[K] }) => R
    : never;

/**
 * Convert a function that takes an object to one that takes positional arguments.
 * 
 * @example
 * type F = (params: { x: string; y: number }) => void;
 * type O = PositionalParameters<F>;
 * // (x: string, y: number) => void
 */
export type PositionalParameters<T extends AnyFunction> = 
  T extends (params: infer A) => infer R
    ? A extends object
      ? (...args: [keyof A] extends never ? [] : any[]) => R
      : T
    : T;

/**
 * Create an async version of a sync function.
 * 
 * @example
 * type F = (x: number) => string;
 * type A = AsyncReturnType<F>;
 * // (x: number) => Promise<string>
 */
export type AsyncReturnType<T extends AnyFunction> = 
  T extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : never;

/**
 * Create a sync version of an async function.
 * 
 * @example
 * type A = (x: number) => Promise<string>;
 * type F = SyncReturnType<A>;
 * // (x: number) => string
 */
export type SyncReturnType<T extends AnyFunction> = 
  T extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => R
    : T;
