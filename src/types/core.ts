// ============================================
// Core Type Utilities - Deep Types
// ============================================

/**
 * Make all properties in T optional recursively.
 * Useful for nested configuration objects.
 * 
 * @example
 * type UserConfig = {
 *   name: string;
 *   address: {
 *     street: string;
 *     city: string;
 *   };
 * };
 * 
 * type PartialUser = DeepPartial<UserConfig>;
 * // { name?: string; address?: { street?: string; city?: string; } }
 */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/**
 * Make all properties in T required recursively.
 * Useful for validating fully populated objects.
 * 
 * @example
 * type PartialConfig = {
 *   name?: string;
 *   settings?: {
 *     theme?: string;
 *     notifications?: boolean;
 *   };
 * };
 * 
 * type FullConfig = DeepRequired<PartialConfig>;
 * // { name: string; settings: { theme: string; notifications: boolean; } }
 */
export type DeepRequired<T> = T extends object
  ? { [P in keyof T]-?: DeepRequired<T[P]> }
  : T;

/**
 * Make all properties in T readonly recursively.
 * Useful for immutable data structures.
 * 
 * @example
 * type User = {
 *   name: string;
 *   roles: { name: string; permissions: string[] }[];
 * };
 * 
 * type ImmutableUser = DeepReadonly<User>;
 * // { readonly name: string; readonly roles: readonly { readonly name: string; readonly permissions: readonly string[]; }[]; }
 */
export type DeepReadonly<T> = T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

/**
 * Pick nested properties from T using a dot-notation path.
 * More ergonomic than multiple Pick operations.
 * 
 * @example
 * type Config = {
 *   database: {
 *     connection: {
 *       host: string;
 *       port: number;
 *     };
 *   };
 * };
 * 
 * type HostOnly = PickDeep<Config, 'database.connection.host'>;
 * // { database: { connection: { host: string; } } }
 */
export type PickDeep<T, K extends string> = 
  K extends keyof T ? Pick<T, K> :
  K extends `${infer P}.${infer Rest}` ? 
    P extends keyof T 
      ? { [K2 in P]: PickDeep<T[P], Rest> }
      : never
    : never;

/**
 * Omit nested properties from T using a dot-notation path.
 * More ergonomic than deeply nested Omit operations.
 * 
 * @example
 * type Config = {
 *   database: {
 *     host: string;
 *     port: number;
 *     password: string;
 *   };
 * };
 * 
 * type SafeConfig = OmitDeep<Config, 'database.password'>;
 * // { database: { host: string; port: number; } }
 */
export type OmitDeep<T, K extends string> = 
  K extends keyof T ? Omit<T, K> :
  K extends `${infer P}.${infer Rest}` ?
    P extends keyof T
      ? { [K2 in P]: OmitDeep<T[P], Rest> }
      : T
    : T;

/**
 * Merge two object types into one.
 * Properties from T override properties from U if they share keys.
 * 
 * @example
 * type Base = { id: string; createdAt: Date };
 * type User = { name: string; email: string };
 * 
 * type UserWithBase = Merge<Base, User>;
 * // { id: string; createdAt: Date; name: string; email: string; }
 */
export type Merge<T, U> = Omit<T, keyof U> & U;

/**
 * Convert a union type to an intersection type.
 * @credit type-fest
 * 
 * @example
 * type Union = { a: 1 } | { b: 2 };
 * type Intersection = UnionToIntersection<Union>;
 * // { a: 1 } & { b: 2 }
 */
export type UnionToIntersection<U> = 
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

/**
 * Get the last type in a union.
 * 
 * @example
 * type Last = LastInUnion<'a' | 'b' | 'c'>; // 'c'
 */
export type LastInUnion<U> = 
  UnionToIntersection<U extends any ? (x: U) => void : never> extends (x: infer I) => void ? I : never;

/**
 * Get the first type in a union.
 * 
 * @example
 * type First = FirstInUnion<'a' | 'b' | 'c'>; // 'a'
 */
export type FirstInUnion<U> = 
  U extends U ? (x: U) => void extends (x: infer I) => void ? I : never : never;

/**
 * Filter out never types from a union.
 * 
 * @example
 * type Filtered = ExcludeNever<'a' | never | 'b' | never>; // 'a' | 'b'
 */
export type ExcludeNever<T> = 
  [T] extends [never] ? never : T;
