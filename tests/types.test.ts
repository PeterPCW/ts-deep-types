// ============================================
// TypeScript Utils - Test Suite
// ============================================

import { describe, expectTypeOf, test } from 'vitest'
import {
  // Core types
  DeepPartial,
  DeepRequired,
  DeepReadonly,
  PickDeep,
  OmitDeep,
  Merge,
  UnionToIntersection,
  LastInUnion,
  FirstInUnion,
  ExcludeNever,
  // String types
  CamelCase,
  KebabCase,
  SnakeCase,
  PascalCase,
  Trim,
  WordCount,
  Brand,
  StringEnum,
  RequiredBy,
  ReadonlyBy,
  OptionalBy,
  // Function types
  Parameters,
  ReturnType,
  ConstructorParameters,
  InstanceType,
  ThisParameterType,
  OmitThisParameter,
  BoundThis,
  AsyncReturnType,
  PartialParameters,
  PartialParametersAtLeast,
  LastParameter,
  FirstParameter,
  NoParameters,
  ObjectParameters,
  // Guard types
  IsAny,
  IsNever,
  IsUnknown,
  IsUnion,
  IsTuple,
  IsArray,
  IsPlainObject,
  IsFunction,
  IsConstructor,
  // Object types
  KeysOfType,
  ValueOf,
  EntryOf,
  NumericKeysOf,
  StringKeysOf,
  ObjectLength,
  RequiredKeys,
  OptionalKeys,
  ReadonlyKeys,
  WritableKeys,
  OwnProperties,
  InheritedProperties,
  NoIndexSignature,
  // Array types
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
  ReadonlyArray,
  Includes,
  At,
  // Promise types
  PromiseResult,
  PromiseState,
  Asyncify,
  Syncify,
  MaybePromise,
  AsyncValue,
  IsPromise,
  UnwrapPromise,
  PromiseRejection,
  DelayedPromise,
  PromiseResults,
} from '../src'

describe('Core Types', () => {
  test('DeepPartial', () => {
    type Input = { a: string; b: { c: number; d: boolean } }
    type Output = DeepPartial<Input>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      a?: string | undefined
      b?: { c?: number | undefined; d?: boolean | undefined } | undefined
    }>()
  })

  test('DeepRequired', () => {
    type Input = { a?: string; b?: { c?: number } }
    type Output = DeepRequired<Input>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      a: string
      b: { c: number }
    }>()
  })

  test('DeepReadonly', () => {
    type Input = { a: string; b: { c: number } }
    type Output = DeepReadonly<Input>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      readonly a: string
      readonly b: { readonly c: number }
    }>()
  })

  test('PickDeep', () => {
    type Input = { a: { b: { c: string } } }
    type Output = PickDeep<Input, 'a.b.c'>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      a: { b: { c: string } }
    }>()
  })

  test('OmitDeep', () => {
    type Input = { a: { b: string; c: number } }
    type Output = OmitDeep<Input, 'a.b'>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      a: { c: number }
    }>()
  })

  test('Merge', () => {
    type A = { x: string }
    type B = { y: number }
    type Output = Merge<A, B>
    
    expectTypeOf<Output>().toEqualTypeOf<{
      x: string
      y: number
    }>()
  })

  test('UnionToIntersection', () => {
    type Union = { a: 1 } | { b: 2 }
    type Output = UnionToIntersection<Union>
    
    expectTypeOf<Output>().toEqualTypeOf<{ a: 1 } & { b: 2 }>()
  })

  test('LastInUnion', () => {
    type Output = LastInUnion<'a' | 'b' | 'c'>
    expectTypeOf<Output>().toEqualTypeOf<'c'>()
  })

  test('FirstInUnion', () => {
    type Output = FirstInUnion<'a' | 'b' | 'c'>
    expectTypeOf<Output>().toEqualTypeOf<'a'>()
  })

  test('ExcludeNever', () => {
    type Output = ExcludeNever<'a' | never | 'b' | never>
    expectTypeOf<Output>().toEqualTypeOf<'a' | 'b'>()
  })
})

describe('String Types', () => {
  test('CamelCase', () => {
    expectTypeOf<CamelCase<'hello_world'>>().toEqualTypeOf<'helloWorld'>()
    expectTypeOf<CamelCase<'hello-world'>>().toEqualTypeOf<'helloWorld'>()
    expectTypeOf<CamelCase<'Hello World'>>().toEqualTypeOf<'helloWorld'>()
  })

  test('KebabCase', () => {
    expectTypeOf<KebabCase<'helloWorld'>>().toEqualTypeOf<'hello-world'>()
    expectTypeOf<KebabCase<'HelloWorld'>>().toEqualTypeOf<'hello-world'>()
  })

  test('SnakeCase', () => {
    expectTypeOf<SnakeCase<'helloWorld'>>().toEqualTypeOf<'hello_world'>()
  })

  test('PascalCase', () => {
    expectTypeOf<PascalCase<'hello_world'>>().toEqualTypeOf<'HelloWorld'>()
  })

  test('Trim', () => {
    expectTypeOf<Trim<'  hello  '>>().toEqualTypeOf<'hello'>()
  })

  test('WordCount', () => {
    expectTypeOf<WordCount<'hello world'>>().toEqualTypeOf<2>()
    expectTypeOf<WordCount<'one two three'>>().toEqualTypeOf<3>()
  })
})

describe('Function Types', () => {
  test('Parameters', () => {
    type Fn = (a: string, b: number) => void
    expectTypeOf<Parameters<Fn>>().toEqualTypeOf<[string, number]>()
  })

  test('ReturnType', () => {
    type Fn = (x: number) => string
    expectTypeOf<ReturnType<Fn>>().toEqualTypeOf<string>()
  })

  test('ConstructorParameters', () => {
    class Test {
      constructor(a: string, b: number) {}
    }
    expectTypeOf<ConstructorParameters<typeof Test>>().toEqualTypeOf<[string, number]>()
  })

  test('ThisParameterType', () => {
    type Fn = (this: Window, x: number) => void
    expectTypeOf<ThisParameterType<Fn>>().toEqualTypeOf<Window>()
  })

  test('OmitThisParameter', () => {
    type Fn = (this: Window, x: number) => void
    type Output = OmitThisParameter<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => void>()
  })

  test('AsyncReturnType', () => {
    type Fn = (x: number) => string
    type Output = AsyncReturnType<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => Promise<string>>()
  })

  test('PartialParameters', () => {
    type Fn = (a: string, b: number) => void
    type Output = PartialParameters<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(a?: string, b?: number) => void>()
  })

  test('LastParameter', () => {
    type Fn = (a: string, b: number) => boolean
    expectTypeOf<LastParameter<Fn>>().toEqualTypeOf<number>()
  })

  test('FirstParameter', () => {
    type Fn = (a: string, b: number) => boolean
    expectTypeOf<FirstParameter<Fn>>().toEqualTypeOf<string>()
  })

  test('NoParameters', () => {
    type Fn = (x: number, y: string) => void
    type Output = NoParameters<Fn>
    expectTypeOf<Output>().toEqualTypeOf<() => void>()
  })
})

describe('Guard Types', () => {
  test('IsAny', () => {
    expectTypeOf<IsAny<any>>().toEqualTypeOf<true>()
    expectTypeOf<IsAny<unknown>>().toEqualTypeOf<false>()
    expectTypeOf<IsAny<string>>().toEqualTypeOf<false>()
  })

  test('IsNever', () => {
    expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()
    expectTypeOf<IsNever<unknown>>().toEqualTypeOf<false>()
  })

  test('IsUnknown', () => {
    expectTypeOf<IsUnknown<unknown>>().toEqualTypeOf<true>()
    expectTypeOf<IsUnknown<any>>().toEqualTypeOf<false>()
  })

  test('IsUnion', () => {
    expectTypeOf<IsUnion<string>>().toEqualTypeOf<false>()
    expectTypeOf<IsUnion<string | number>>().toEqualTypeOf<true>()
  })

  test('IsArray', () => {
    expectTypeOf<IsArray<string[]>>().toEqualTypeOf<true>()
    expectTypeOf<IsArray<[string, number]>>().toEqualTypeOf<false>()
  })
})

describe('Object Types', () => {
  test('KeysOfType', () => {
    type Input = { a: string; b: number; c: string }
    type Output = KeysOfType<Input, string>
    expectTypeOf<Output>().toEqualTypeOf<'a' | 'c'>()
  })

  test('ValueOf', () => {
    type Input = { a: string; b: number }
    type Output = ValueOf<Input>
    expectTypeOf<Output>().toEqualTypeOf<string | number>()
  })

  test('EntryOf', () => {
    type Input = { a: string; b: number }
    type Output = EntryOf<Input>
    expectTypeOf<Output>().toEqualTypeOf<['a', string] | ['b', number]>()
  })
})

describe('Array Types', () => {
  test('ElementType', () => {
    expectTypeOf<ElementType<string[]>>().toEqualTypeOf<string>()
    expectTypeOf<ElementType<[string, number]>>().toEqualTypeOf<string | number>()
  })

  test('FlattenArray', () => {
    expectTypeOf<FlattenArray<[[1, 2], [3, 4]]>>().toEqualTypeOf<[1, 2] | [3, 4]>()
  })

  test('UniqueArray', () => {
    expectTypeOf<UniqueArray<[1, 2, 1, 3]>>().toEqualTypeOf<1 | 2 | 3>()
  })

  test('ArrayLength', () => {
    expectTypeOf<ArrayLength<[1, 2, 3]>>().toEqualTypeOf<3>()
    expectTypeOf<ArrayLength<[]>>().toEqualTypeOf<0>()
  })

  test('FirstElement', () => {
    expectTypeOf<FirstElement<[string, number]>>().toEqualTypeOf<string>()
  })

  test('LastElement', () => {
    expectTypeOf<LastElement<[string, number]>>().toEqualTypeOf<number>()
  })

  test('Tail', () => {
    expectTypeOf<Tail<[string, number, boolean]>>().toEqualTypeOf<[number, boolean]>()
  })

  test('Init', () => {
    expectTypeOf<Init<[string, number, boolean]>>().toEqualTypeOf<[string, number]>()
  })

  test('Push', () => {
    expectTypeOf<Push<[string, number], boolean>>().toEqualTypeOf<[string, number, boolean]>()
  })

  test('Unshift', () => {
    expectTypeOf<Unshift<[string, number], boolean>>().toEqualTypeOf<[boolean, string, number]>()
  })

  test('Repeat', () => {
    expectTypeOf<Repeat<string, 3>>().toEqualTypeOf<[string, string, string]>()
  })

  test('Reverse', () => {
    expectTypeOf<Reverse<[1, 2, 3]>>().toEqualTypeOf<[3, 2, 1]>()
  })

  test('Includes', () => {
    expectTypeOf<Includes<[1, 2, 3], 2>>().toEqualTypeOf<true>()
    expectTypeOf<Includes<[1, 2, 3], 4>>().toEqualTypeOf<false>()
  })
})

describe('Promise Types', () => {
  test('PromiseResult', () => {
    expectTypeOf<PromiseResult<Promise<string>>>().toEqualTypeOf<string>()
  })

  test('PromiseState', () => {
    expectTypeOf<PromiseState<Promise<string>>>().toEqualTypeOf<'fulfilled'>()
  })

  test('Asyncify', () => {
    type Fn = (x: number) => string
    type Output = Asyncify<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => Promise<string>>()
  })

  test('IsPromise', () => {
    expectTypeOf<IsPromise<Promise<string>>>().toEqualTypeOf<true>()
    expectTypeOf<IsPromise<string>>().toEqualTypeOf<false>()
  })

  test('UnwrapPromise', () => {
    expectTypeOf<UnwrapPromise<Promise<string>>>().toEqualTypeOf<string>()
    expectTypeOf<UnwrapPromise<string>>().toEqualTypeOf<string>()
  })

  test('PromiseResults', () => {
    expectTypeOf<PromiseResults<[Promise<string>, Promise<number>]>>()
      .toEqualTypeOf<[string, number]>()
  })
})

// ============================================
// Advanced String Type Tests
// ============================================

import {
  Uncapitalize,
  CapitalizeWords,
  TitleCase,
  ScreamingSnakeCase,
  Split,
  Join,
  FileExtension,
  Basename,
  Dirname,
  StartsWith,
  EndsWith,
  RemovePrefix,
  RemoveSuffix,
  Reverse,
  PadLeft,
  PadRight,
} from '../src'

describe('Advanced String Types', () => {
  test('Uncapitalize', () => {
    expectTypeOf<Uncapitalize<'Hello'>>().toEqualTypeOf<'hello'>()
    expectTypeOf<Uncapitalize<'API'>>().toEqualTypeOf<'aPI'>()
  })

  test('CapitalizeWords', () => {
    expectTypeOf<CapitalizeWords<'hello world'>>().toEqualTypeOf<'Hello World'>()
    expectTypeOf<CapitalizeWords<'react-typescript-utils'>>().toEqualTypeOf<'React Typescript Utils'>()
  })

  test('TitleCase', () => {
    expectTypeOf<TitleCase<'hello-world_v2 utils'>>().toEqualTypeOf<'Hello World V2 Utils'>()
  })

  test('ScreamingSnakeCase', () => {
    expectTypeOf<ScreamingSnakeCase<'helloWorld'>>().toEqualTypeOf<'HELLO_WORLD'>()
    expectTypeOf<ScreamingSnakeCase<'hello-world_v2'>>().toEqualTypeOf<'HELLO_WORLD_V2'>()
  })

  test('Split', () => {
    expectTypeOf<Split<'hello'>>().toEqualTypeOf<['h', 'e', 'l', 'l', 'o']>()
    expectTypeOf<Split<'a,b,c', ','>>().toEqualTypeOf<['a', 'b', 'c']>()
  })

  test('Join', () => {
    expectTypeOf<Join<['hello', 'world'], ' '>>().toEqualTypeOf<'hello world'>()
    expectTypeOf<Join<['a', 'b', 'c'], ','>>().toEqualTypeOf<'a,b,c'>()
  })

  test('FileExtension', () => {
    expectTypeOf<FileExtension<'file.ts'>>().toEqualTypeOf<'.ts'>()
    expectTypeOf<FileExtension<'path/to/file.min.js'>>().toEqualTypeOf<'.js'>()
  })

  test('Basename', () => {
    expectTypeOf<Basename<'path/to/file.ts'>>().toEqualTypeOf<'file'>()
  })

  test('Dirname', () => {
    expectTypeOf<Dirname<'path/to/file.ts'>>().toEqualTypeOf<'path/to'>()
  })

  test('StartsWith', () => {
    expectTypeOf<StartsWith<'hello world', 'hello'>>().toEqualTypeOf<true>()
    expectTypeOf<StartsWith<'hello world', 'world'>>().toEqualTypeOf<false>()
  })

  test('EndsWith', () => {
    expectTypeOf<EndsWith<'hello world', 'world'>>().toEqualTypeOf<true>()
    expectTypeOf<EndsWith<'hello world', 'hello'>>().toEqualTypeOf<false>()
  })

  test('RemovePrefix', () => {
    expectTypeOf<RemovePrefix<'hello world', 'hello '>>().toEqualTypeOf<'world'>()
  })

  test('RemoveSuffix', () => {
    expectTypeOf<RemoveSuffix<'hello world', ' world'>>().toEqualTypeOf<'hello'>()
  })

  test('Reverse', () => {
    expectTypeOf<Reverse<'hello'>>().toEqualTypeOf<'olleh'>()
  })
})

// ============================================
// Advanced Object Type Tests
// ============================================

import {
  DeepMerge,
  DeepOmit,
  DeepPick,
  DistributiveOmit,
  DistributivePick,
  Writable,
  DeepWritable,
  NonNullableProperties,
  FunctionParams,
  ObjectParams,
  Exact,
  MarkOptional,
  MarkRequired,
  OwnProperties,
  HasKey,
  Update,
  RequiredAll,
  OptionalKeysOf,
  RequiredKeysOf,
  ReadonlyKeysOf,
  WritableKeysOf,
} from '../src'

describe('Advanced Object Types', () => {
  test('DeepMerge', () => {
    type A = { x: number; y: { a: string } }
    type B = { y: { b: number }; z: boolean }
    type Output = DeepMerge<A, B>
    expectTypeOf<Output>().toEqualTypeOf<{
      x: number
      y: { a: string; b: number }
      z: boolean
    }>()
  })

  test('DeepOmit', () => {
    type Input = { a: { b: { c: string }; d: number } }
    type Output = DeepOmit<Input, 'a.b.c'>
    expectTypeOf<Output>().toEqualTypeOf<{ a: { b: {}; d: number } }>()
  })

  test('DeepPick', () => {
    type Input = { a: { b: { c: string }; d: number }; e: boolean }
    type Output = DeepPick<Input, 'a.b'>
    expectTypeOf<Output>().toEqualTypeOf<{ a: { b: { c: string } } }>()
  })

  test('DistributiveOmit', () => {
    type Union = { a: string } | { b: number }
    type Output = DistributiveOmit<Union, 'a'>
    expectTypeOf<Output>().toEqualTypeOf<{ b: number } | {}>()
  })

  test('DistributivePick', () => {
    type Union = { a: string } | { b: number }
    type Output = DistributivePick<Union, 'a'>
    expectTypeOf<Output>().toEqualTypeOf<{ a: string } | {}>()
  })

  test('Writable', () => {
    type Input = { readonly x: string; readonly y: number }
    type Output = Writable<Input>
    expectTypeOf<Output>().toEqualTypeOf<{ x: string; y: number }>()
  })

  test('DeepWritable', () => {
    type Input = { readonly x: { readonly y: string } }
    type Output = DeepWritable<Input>
    expectTypeOf<Output>().toEqualTypeOf<{ x: { y: string } }>()
  })

  test('NonNullableProperties', () => {
    type Input = { x: string | undefined; y: number | null }
    type Output = NonNullableProperties<Input>
    expectTypeOf<Output>().toEqualTypeOf<{ x: string; y: number }>()
  })

  test('FunctionParams', () => {
    type Fn = (x: string, y: number) => void
    type Output = FunctionParams<Fn>
    expectTypeOf<Output>().toEqualTypeOf<{ 0: string; 1: number }>()
  })

  test('OwnProperties', () => {
    class Test { x = 1 }
    type Output = OwnProperties<Test>
    expectTypeOf<Output>().toEqualTypeOf<{ x: number }>()
  })

  test('MarkOptional', () => {
    type Input = { x: string; y?: number }
    type Output = MarkOptional<Input, 'y'>
    expectTypeOf<Output>().toEqualTypeOf<{ x: string; y?: number }>()
  })

  test('MarkRequired', () => {
    type Input = { x: string; y?: number }
    type Output = MarkRequired<Input, 'y'>
    expectTypeOf<Output>().toEqualTypeOf<{ x: string; y: number }>()
  })

  test('Update', () => {
    type Input = { x: string; y: number }
    type Output = Update<Input, { x: number }>
    expectTypeOf<Output>().toEqualTypeOf<{ x: number; y: number }>()
  })

  test('RequiredAll', () => {
    type Input = { x: string; y?: number }
    type Output = RequiredAll<Input>
    expectTypeOf<Output>().toEqualTypeOf<{ x: string; y: number }>()
  })

  test('OptionalKeysOf', () => {
    type Input = { x: string; y?: number }
    expectTypeOf<OptionalKeysOf<Input>>().toEqualTypeOf<'y'>()
  })

  test('RequiredKeysOf', () => {
    type Input = { x: string; y?: number }
    expectTypeOf<RequiredKeysOf<Input>>().toEqualTypeOf<'x'>()
  })
})

// ============================================
// Advanced Function Type Tests
// ============================================

import {
  AnyFunction,
  AsyncFunction,
  Noop,
  Predicate,
  Unary,
  Binary,
  Variadic,
  Curried,
  DebounceFunction,
  ThrottleFunction,
  EventHandler,
  Callback,
  SideEffect,
  Silent,
  Memoized,
  Constructor,
  Instance,
  ConstructorParams,
  ThisType,
  BoundThis,
  PartialParametersAtLeast,
  ObjectParameters,
  PositionalParameters,
  SyncReturnType,
} from '../src'

describe('Advanced Function Types', () => {
  test('AnyFunction', () => {
    const fn: AnyFunction = (a: string, b: number) => true
    expectTypeOf(fn).toBeFunction()
  })

  test('AsyncFunction', () => {
    const fn: AsyncFunction<[string], boolean> = async (a: string) => true
    expectTypeOf(fn).toEqualTypeOf<(a: string) => Promise<boolean>>()
  })

  test('Noop', () => {
    const fn: Noop = () => {}
    expectTypeOf(fn).toEqualTypeOf<() => void>()
  })

  test('Predicate', () => {
    const isString: Predicate<string> = (value): value is string => typeof value === 'string'
    expectTypeOf(isString).toEqualTypeOf<(value: unknown) => value is string>()
  })

  test('Unary', () => {
    const double: Unary<number, number> = (x) => x * 2
    expectTypeOf(double).toEqualTypeOf<(arg: number) => number>()
  })

  test('Binary', () => {
    const add: Binary<number, number, number> = (a, b) => a + b
    expectTypeOf(add).toEqualTypeOf<(first: number, second: number) => number>()
  })

  test('SideEffect', () => {
    type Fn = (x: number) => string
    type Output = SideEffect<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => void>()
  })

  test('Silent', () => {
    type Fn = (x: number) => string
    type Output = Silent<Fn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => string | undefined>()
  })

  test('Constructor', () => {
    class Test {}
    type Ctor = Constructor<Test>
    expectTypeOf<Ctor>().toEqualTypeOf<new (...args: any[]) => Test>()
  })

  test('ConstructorParams', () => {
    class Test {
      constructor(a: string, b: number) {}
    }
    expectTypeOf<ConstructorParams<typeof Test>>().toEqualTypeOf<[string, number]>()
  })

  test('Instance', () => {
    class Test {}
    type I = Instance<typeof Test>
    expectTypeOf<I>().toEqualTypeOf<Test>()
  })

  test('SyncReturnType', () => {
    type AsyncFn = (x: number) => Promise<string>
    type Output = SyncReturnType<AsyncFn>
    expectTypeOf<Output>().toEqualTypeOf<(x: number) => string>()
  })
})

// ============================================
// Pattern Type Tests
// ============================================

import {
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
  Pipe,
  Compose,
  Curried,
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
} from '../src'

describe('Pattern Types', () => {
  test('SetState type', () => {
    type SetNumberState = SetState<number>
    expectTypeOf<SetNumberState>().toEqualTypeOf<(value: number | ((prev: number) => number)) => void>()
  })

  test('GetState type', () => {
    type GetNumber = GetState<number>
    expectTypeOf<GetNumber>().toEqualTypeOf<() => number>()
  })

  test('Reducer type', () => {
    type CounterReducer = Reducer<number, { type: 'increment' | 'decrement' }>
    expectTypeOf<CounterReducer>().toEqualTypeOf<(state: number, action: { type: 'increment' | 'decrement' }) => number>()
  })

  test('ReducerState extracts state', () => {
    type R = Reducer<string, Action<'set', string>>
    type S = ReducerState<R>
    expectTypeOf<S>().toEqualTypeOf<string>()
  })

  test('ReducerAction extracts action', () => {
    type R = Reducer<string, Action<'set', string>>
    type A = ReducerAction<R>
    expectTypeOf<A>().toEqualTypeOf<Action<'set', string>>()
  })

  test('Dispatch type', () => {
    type MyDispatch = Dispatch<{ type: 'reset' }>
    expectTypeOf<MyDispatch>().toEqualTypeOf<(action: { type: 'reset' }) => void>()
  })

  test('RefCallback type', () => {
    type InputRefCallback = RefCallback<HTMLInputElement>
    expectTypeOf<InputRefCallback>().toEqualTypeOf<(node: HTMLInputElement | null) => void>()
  })

  test('MutableRef type', () => {
    type Ref<T> = MutableRef<T>
    expectTypeOf<Ref<number>>().toEqualTypeOf<{ current: number }>()
  })

  test('ReadonlyRef type', () => {
    type Ref<T> = ReadonlyRef<T>
    expectTypeOf<Ref<number>>().toEqualTypeOf<{ readonly current: number }>()
  })

  test('Effect type', () => {
    type CleanupEffect = Effect
    expectTypeOf<CleanupEffect>().toEqualTypeOf<() => void | (() => void)>()
  })

  test('Result type', () => {
    type ApiResult<T> = Result<T>
    expectTypeOf<ApiResult<string>>().toEqualTypeOf<{
      loading: boolean
      data: string | null
      error: Error | null
    }>()
  })

  test('AsyncResult type', () => {
    type ApiResult<T> = AsyncResult<T>
    expectTypeOf<ApiResult<string>>().toEqualTypeOf<{
      loading: boolean
      data: string | null
      error: Error | null
      execute: () => Promise<string>
    }>()
  })

  test('Action type', () => {
    type Increment = Action<'increment'>
    expectTypeOf<Increment>().toEqualTypeOf<{ type: 'increment' }>()
    
    type SetValue = Action<'set', number>
    expectTypeOf<SetValue>().toEqualTypeOf<{ type: 'set'; payload: number }>()
  })

  test('Thunk type', () => {
    type MyThunk = Thunk<string, Action<'set', string>, { count: number }>
    expectTypeOf<MyThunk>().toEqualTypeOf<(dispatch: Dispatch<Action<'set', string>>, getState: () => { count: number }) => string>()
  })

  test('Try type', () => {
    type Result<T> = Try<T, Error>
    expectTypeOf<Result<string>>().toEqualTypeOf<
      | { success: true; value: string }
      | { success: false; error: Error }
    >()
  })

  test('Either type', () => {
    type EitherType = Either<'left', 'right'>
    expectTypeOf<EitherType>().toEqualTypeOf<
      | { type: 'left'; value: 'left' }
      | { type: 'right'; value: 'right' }
    >()
  })

  test('Maybe type', () => {
    type OptionalValue = Maybe<string>
    expectTypeOf<OptionalValue>().toEqualTypeOf<string | null | undefined>()
  })

  test('Optional type', () => {
    type OptionalValue = Optional<string>
    expectTypeOf<OptionalValue>().toEqualTypeOf<string | undefined>()
  })

  test('Nullable type', () => {
    type NullableValue = Nullable<string>
    expectTypeOf<NullableValue>().toEqualTypeOf<string | null>()
  })

  test('Command type', () => {
    type MyCommand = Command<string>
    expectTypeOf<MyCommand>().toEqualTypeOf<{
      execute: () => string
      undo?: () => void
      redo?: () => void
    }>()
  })

  test('Strategy type', () => {
    type MyStrategy = Strategy<number, string>
    expectTypeOf<MyStrategy>().toEqualTypeOf<{
      execute: (input: number) => string
      setStrategy: (strategy: Strategy<number, string>) => void
    }>()
  })

  test('StateMachine type', () => {
    type MyMachine = StateMachine<'idle' | 'running', 'start' | 'stop'>
    expectTypeOf<MyMachine>().toEqualTypeOf<{
      state: 'idle' | 'running'
      event: (event: 'start' | 'stop', context?: undefined) => void
      transition: (to: 'idle' | 'running') => void
    }>()
  })

  test('FeatureFlag type', () => {
    type Flag = FeatureFlag<boolean>
    expectTypeOf<Flag>().toEqualTypeOf<{
      enabled: boolean
      toggle: () => void
      set: (value: boolean) => void
    }>()
  })

  test('Logger type', () => {
    type MyLogger = Logger
    expectTypeOf<MyLogger>().toEqualTypeOf<{
      debug: (...args: unknown[]) => void
      info: (...args: unknown[]) => void
      warn: (...args: unknown[]) => void
      error: (...args: unknown[]) => void
    }>()
  })

  test('Metrics type', () => {
    type MyMetrics = Metrics
    expectTypeOf<MyMetrics>().toEqualTypeOf<{
      increment: (name: string, value?: number) => void
      gauge: (name: string, value: number) => void
      timing: (name: string, value: number) => void
      histogram: (name: string, value: number, tags?: Record<string, string>) => void
    }>()
  })
})
