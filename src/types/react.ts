// ============================================
// Pattern Utility Types
// ============================================

// Generic utility types inspired by common patterns (React, Redux, etc.)
// Only types that don't overlap with advanced-function.ts

/**
 * SetState pattern type for state management.
 * 
 * @example
 * type SetState<T> = (value: T | ((prev: T) => T)) => void;
 */
export type SetState<T> = (value: T | ((prev: T) => T)) => void;

/**
 * GetState pattern type for state management.
 * 
 * @example
 * type GetState<T> = () => T;
 */
export type GetState<T> = () => T;

/**
 * Reducer pattern type.
 * 
 * @example
 * type Reducer<S, A> = (state: S, action: A) => S;
 */
export type Reducer<S, A> = (state: S, action: A) => S;

/**
 * Reducer state type.
 */
export type ReducerState<R extends Reducer<any, any>> = 
  R extends Reducer<infer S, any> ? S : never;

/**
 * Reducer action type.
 */
export type ReducerAction<R extends Reducer<any, any>> = 
  R extends Reducer<any, infer A> ? A : never;

/**
 * Dispatch function for reducers.
 */
export type Dispatch<A> = (action: A) => void;

/**
 * Dispatch with state getter ( thunk-like pattern).
 */
export type DispatchWithGetState<A, S> = (action: A | ((getState: () => S) => A)) => void;

/**
 * Ref callback pattern.
 * 
 * @example
 * type RefCallback<T> = (node: T | null) => void;
 */
export type RefCallback<T> = (node: T | null) => void;

/**
 * Mutable ref object pattern.
 */
export type MutableRef<T> = {
  current: T;
};

/**
 * Readonly ref object pattern.
 */
export type ReadonlyRef<T> = {
  readonly current: T;
};

/**
 * Effect callback pattern for cleanup.
 * 
 * @example
 * type Effect = () => void | (() => void);
 */
export type Effect = () => void | (() => void);

/**
 * Dependency list pattern.
 */
export type Deps = readonly unknown[];

/**
 * Equality comparison function.
 * 
 * @example
 * const shallowEqual: EqualityFn = (a, b) => a === b;
 */
export type EqualityFn<T> = (prev: T | undefined, next: T) => boolean;

/**
 * HOC (Higher Order Function) pattern type.
 * 
 * @example
 * type WithLoading<Props> = (fn: (props: Props) => any) => (props: Props & { loading: boolean }) => any;
 */
export type HOC<Wrapped, HOCProps = {}> = 
  (fn: Wrapped) => (...args: any[]) => any;

/**
 * Render prop pattern type.
 * 
 * @example
 * type RenderFn<T> = (state: T) => unknown;
 */
export type RenderFn<T> = (state: T) => unknown;

/**
 * Slot pattern type for compound components.
 */
export type Slots<T extends Record<string, unknown>> = {
  [K in keyof T]?: unknown;
};

/**
 * Result pattern type for async operations.
 * 
 * @example
 * type Result<T> = { loading: boolean; data: T | null; error: Error | null };
 */
export type Result<T> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

/**
 * Async result with execute function.
 * 
 * @example
 * type AsyncResult<T> = Result<T> & { execute: () => Promise<T> };
 */
export type AsyncResult<T> = Result<T> & {
  execute: () => Promise<T>;
};

/**
 * Loading state pattern.
 */
export type Loading<T = void> = {
  loading: boolean;
  data: T | null;
  error: Error | null;
};

/**
 * Action pattern for state machines/redux.
 * 
 * @example
 * type Action<T extends string, P> = { type: T; payload: P };
 */
export type Action<T extends string, P = never> = 
  P extends never 
    ? { type: T }
    : { type: T; payload: P };

/**
 * Thunk pattern for async actions.
 * 
 * @example
 * type Thunk<R = void> = (dispatch: Dispatch<any>, getState: () => any) => R;
 */
export type Thunk<R = void, A = any, S = any> = 
  (dispatch: Dispatch<A>, getState: () => S) => R;

/**
 * Effect pattern for side effects.
 */
export type EffectPattern = Generator<unknown, unknown, unknown>;

/**
 * Queue item pattern.
 */
export type QueueItem<T> = {
  id: string;
  data: T;
  priority?: number;
  timestamp: number;
};

/**
 * Cache entry pattern.
 */
export type CacheEntry<T> = {
  value: T;
  timestamp: number;
  expiresAt?: number;
};

/**
 * Subscription pattern.
 */
export type Subscription<T> = {
  unsubscribe: () => void;
  value?: T;
};

/**
 * Observer pattern.
 */
export type Observer<T> = {
  next: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
};

/**
 * Observable pattern.
 */
export type Observable<T> = {
  subscribe: (observer: Observer<T>) => Subscription<T>;
};

/**
 * Listener pattern.
 */
export type Listener<T> = (event: T) => void;

/**
 * Emitter pattern.
 */
export type Emitter<T> = {
  on: (listener: Listener<T>) => () => void;
  off: (listener: Listener<T>) => void;
  emit: (event: T) => void;
};

/**
 * Factory pattern.
 */
export type Factory<T, Args extends any[] = []> = 
  (...args: Args) => T;

/**
 * Builder pattern.
 */
export type Builder<T> = {
  build: () => T;
  set: <K extends keyof T>(key: K, value: T[K]) => Builder<T>;
};

/**
 * Adapter pattern.
 */
export type Adapter<Input, Output> = {
  adapt: (input: Input) => Output;
};

/**
 * Mapper pattern.
 */
export type Mapper<Input, Output> = {
  map: (input: Input) => Output;
};

/**
 * Validator pattern.
 */
export type Validator<T> = {
  validate: (value: unknown) => value is T;
  errors?: string[];
};

/**
 * Parser pattern.
 */
export type Parser<T, Input = string> = {
  parse: (input: Input) => T | null;
  serialize: (value: T) => Input;
};

/**
 * Serializer pattern.
 */
export type Serializer<T> = {
  serialize: (value: T) => string;
  deserialize: (serialized: string) => T | null;
};

/**
 * Repository pattern for data access.
 */
export type Repository<T, CreateInput = Partial<T>, UpdateInput = Partial<T>> = {
  findById: (id: string) => Promise<T | null>;
  findAll: (filter?: Partial<T>) => Promise<T[]>;
  create: (input: CreateInput) => Promise<T>;
  update: (id: string, input: UpdateInput) => Promise<T | null>;
  delete: (id: string) => Promise<boolean>;
};

/**
 * Service pattern.
 */
export type Service<T = unknown> = {
  execute: (input: T) => Promise<T>;
};

/**
 * Controller pattern.
 */
export type Controller<Input, Output> = {
  handle: (input: Input) => Promise<Output>;
};

/**
 * Middleware pattern.
 */
export type Middleware<Input, Output> = {
  process: (input: Input, next: (input: Input) => Promise<Output>) => Promise<Output>;
};

/**
 * Pipe pattern for value transformation.
 */
export type Pipe<A, B> = (value: A) => B;

/**
 * Compose pattern for function composition.
 */
export type Compose<A, B, C> = (value: A) => C;

/**
 * Curried function pattern (simpler version).
 */
export type Curried<A, R> = (arg: A) => R;

/**
 * Memoized function pattern with cache.
 */
export type MemoizedFn<F extends (...args: any[]) => any> = 
  & ((...args: Parameters<F>) => ReturnType<F>)
  & {
    cache: Map<string, ReturnType<F>>;
    clear: () => void;
  };

/**
 * Debounced function pattern.
 */
export type Debounced<F extends (...args: any[]) => any> = 
  & ((...args: Parameters<F>) => void)
  & {
    flush: () => ReturnType<F> | undefined;
    cancel: () => void;
  };

/**
 * Throttled function pattern.
 */
export type Throttled<F extends (...args: any[]) => any> = 
  & ((...args: Parameters<F>) => void)
  & {
    flush: () => void;
    cancel: () => void;
  };

/**
 * Event handler pattern with options.
 */
export type EventHandlerFn<Event> = {
  (event: Event): void;
  once?: boolean;
  passive?: boolean;
};

/**
 * Bound function pattern.
 */
export type Bound<F extends (...args: any[]) => any> = 
  (...args: Parameters<F>) => ReturnType<F>;

/**
 * Partial function application.
 */
export type PartialLeft<A, B, R> = 
  (args: A) => (rest: B) => R;

/**
 * Partial function application from right.
 */
export type PartialRight<A, B, R> = 
  (rest: B) => (args: A) => R;

/**
 * Functional update pattern.
 */
export type FunctionalUpdate<T> = (prev: T) => T;

/**
 * Result type for operations that can fail.
 */
export type Try<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

/**
 * Either type for branching results.
 */
export type Either<L, R> = 
  | { type: 'left'; value: L }
  | { type: 'right'; value: R };

/**
 * Maybe type for optional values.
 */
export type Maybe<T> = T | null | undefined;

/**
 * Optional type with explicit undefined.
 */
export type Optional<T> = T | undefined;

/**
 * Nullable type.
 */
export type Nullable<T> = T | null;

/**
 * Async iterable result.
 */
export type AsyncIterableResult<T> = AsyncIterator<T> & {
  [Symbol.asyncIterator](): AsyncIterator<T>;
};

/**
 * Sync iterable result.
 */
export type IterableResult<T> = Iterator<T> & {
  [Symbol.iterator](): Iterator<T>;
};

/**
 * Stream result pattern.
 */
export type Stream<T> = {
  readable: AsyncIterableResult<T>;
  writable: WritableStream<T>;
};

/**
 * Command pattern.
 */
export type Command<T = unknown> = {
  execute: () => T;
  undo?: () => void;
  redo?: () => void;
};

/**
 * Strategy pattern.
 */
export type Strategy<T, R = void> = {
  execute: (input: T) => R;
  setStrategy: (strategy: Strategy<T, R>) => void;
};

/**
 * State machine pattern.
 */
export type StateMachine<S, E, C = undefined> = {
  state: S;
  event: (event: E, context?: C) => void;
  transition: (to: S) => void;
};

/**
 * Decorator pattern.
 */
export type Decorator<T> = (target: T, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;

/**
 * Proxy pattern.
 */
export type ProxyHandler<T> = {
  get: (target: T, prop: keyof T) => any;
  set: (target: T, prop: keyof T, value: any) => boolean;
  delete: (target: T, prop: keyof T) => boolean;
};

/**
 * Mixin pattern.
 */
export type Mixin<T extends abstract new (...args: any[]) => any> = 
  T extends abstract new (...args: infer A) => infer R 
    ? (...args: A) => R 
    : never;

/**
 * Plugin pattern.
 */
export type Plugin<T = unknown> = {
  install: (app: T) => void;
  uninstall?: (app: T) => void;
};

/**
 * Extension pattern.
 */
export type Extension<T extends Record<string, unknown>, K extends string> = {
  [key in K]: T;
};

/**
 * Feature flag pattern.
 */
export type FeatureFlag<T = boolean> = {
  enabled: T;
  toggle: () => void;
  set: (value: T) => void;
};

/**
 * Configuration pattern.
 */
export type Config<T extends Record<string, unknown>> = {
  get: <K extends keyof T>(key: K) => T[K];
  set: <K extends keyof T>(key: K, value: T[K]) => void;
  reset: (key?: keyof T) => void;
};

/**
 * Logger pattern.
 */
export type Logger = {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};

/**
 * Metrics pattern.
 */
export type Metrics = {
  increment: (name: string, value?: number) => void;
  gauge: (name: string, value: number) => void;
  timing: (name: string, value: number) => void;
  histogram: (name: string, value: number, tags?: Record<string, string>) => void;
};
