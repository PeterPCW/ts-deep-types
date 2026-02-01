// ============================================
// TypeScript Utils - Main Export
// ============================================

/**
 * TypeScript Utility Library
 *
 * A comprehensive collection of type-safe utility types for TypeScript.
 * Includes deep types, string manipulation, function helpers, and more.
 *
 * @example
 * import { DeepPartial, CamelCase, Parameters } from 'ts-deep-types';
 *
 * // Deep types
 * type PartialConfig = DeepPartial<{ database: { host: string; port: number; } }>;
 *
 * // String types
 * type CamelStr = CamelCase<'hello_world'>; // 'helloWorld'
 *
 * // Function types
 * type FnParams = Parameters<(a: string, b: number) => void>; // [string, number]
 */

// Re-export all types
export * from './types/index';

// Type guards and validation helpers
export type {
  IsAny,
  IsNever,
  IsUnknown,
  IsUnion,
  IsTuple,
  IsArray,
  IsPlainObject,
  IsFunction,
  IsConstructor
} from './guards';

// Object utilities
export type {
  KeysOfType,
  ValueOf,
  EntryOf,
  NumericKeysOf,
  StringKeysOf,
  RequiredKeys,
  OptionalKeys,
  ReadonlyKeys,
  WritableKeys,
  OwnProperties,
  ObjectLength,
  NoIndexSignature
} from './object';

// Array utilities
export type {
  ElementType,
  FlattenArray,
  UniqueArray,
  ArrayLength,
  FirstElement,
  LastElement,
  Tail,
  Init,
  Push,
  Unshift,
  Repeat,
  Reverse,
  Includes,
  At
} from './array';

// Promise utilities
export type {
  PromiseResult,
  PromiseState,
  Asyncify,
  Syncify,
  MaybePromise,
  IsPromise,
  UnwrapPromise,
  PromiseRejection,
  PromiseResults
} from './promise';

// Pattern utility types
export type {
  SetState,
  GetState,
  Reducer,
  ReducerState,
  ReducerAction,
  Dispatch,
  DispatchWithGetState,
  RefCallback,
  MutableRef,
  ReadonlyRef,
  Effect,
  Deps,
  EqualityFn,
  HOC,
  RenderFn,
  Slots,
  Result,
  AsyncResult,
  Loading,
  Action,
  Thunk,
  EffectPattern,
  QueueItem,
  CacheEntry,
  Subscription,
  Observer,
  Observable,
  Listener,
  Emitter,
  Factory,
  Builder,
  Adapter,
  Mapper,
  Validator,
  Parser,
  Serializer,
  Repository,
  Service,
  Controller,
  Middleware,
  MemoizedFn,
  Debounced,
  Throttled,
  EventHandlerFn,
  Bound,
  PartialLeft,
  PartialRight,
  FunctionalUpdate,
  Try,
  Either,
  Maybe,
  Optional,
  Nullable,
  AsyncIterableResult,
  IterableResult,
  Stream,
  Command,
  Strategy,
  StateMachine,
  Decorator,
  ProxyHandler,
  Mixin,
  Plugin,
  Extension,
  FeatureFlag,
  Config,
  Logger,
  Metrics,
} from './types/react';
