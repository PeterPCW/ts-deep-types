// ============================================
// Advanced String Type Utilities
// ============================================

import type { Trim, KebabCase } from './string';

/**
 * Convert the first character of a string to lowercase.
 * 
 * @example
 * type Lower = Uncapitalize<'Hello'>; // 'hello'
 * type Lower2 = Uncapitalize<'API'>; // 'aPI'
 */
export type Uncapitalize<S extends string> = 
  S extends `${infer P}${infer R}` ? `${Lowercase<P>}${R}` : S;

/**
 * Capitalize the first letter of each word in a string.
 * 
 * @example
 * type Title = CapitalizeWords<'hello world'>; // 'Hello World'
 * type Title2 = CapitalizeWords<'react-typescript-utils'>; // 'React Typescript Utils'
 */
export type CapitalizeWords<S extends string, Prev extends string = ''> = 
  S extends `${infer Word}${infer Rest}`
    ? Word extends ''
      ? CapitalizeWords<Rest, ' '>
      : Prev extends ' ' | ''
        ? `${Capitalize<Word>}${CapitalizeWords<Rest, ' '>}`
        : `${Prev}${Capitalize<Word>}${CapitalizeWords<Rest, ' '>}`
    : S;

/**
 * Convert a string to Title Case (each word capitalized, spaces normalized).
 * 
 * @example
 * type Title = TitleCase<'hello-world_v2 utils'>; // 'Hello World V2 Utils'
 */
export type TitleCase<S extends string> = CapitalizeWords<Trim<S>>;

/**
 * Convert a string to SCREAMING_SNAKE_CASE.
 * Simplified version using KebabCase.
 */
export type ScreamingSnakeCase<S extends string> = 
  Uppercase<KebabCase<S>> extends `${infer P}-${infer R}`
    ? `${Uppercase<P>}_${ScreamingSnakeCase<R>}`
    : Uppercase<KebabCase<S>>;

/**
 * Split a string into a tuple of characters.
 * 
 * @example
 * type Chars = Split<'hello'>; // ['h', 'e', 'l', 'l', 'o']
 */
export type Split<S extends string, Sep extends string = ''> = 
  Sep extends ''
    ? S extends `${infer H}${infer T}` ? [H, ...Split<T, Sep>] : S extends '' ? [] : [S]
    : S extends `${infer H}${Sep}${infer T}` ? [H, ...Split<T, Sep>] : [S];

/**
 * Join an array of strings into a single string.
 * 
 * @example
 * type Joined = Join<['hello', 'world'], ' '>; // 'hello world'
 */
export type Join<A extends readonly string[], Sep extends string = ''> = 
  A extends readonly [infer F extends string, ...infer R extends readonly string[]]
    ? R extends readonly []
      ? F
      : `${F}${Sep}${Join<R, Sep>}`
    : A extends readonly []
      ? ''
      : never;

/**
 * Extract the file extension from a string path.
 * 
 * @example
 * type Ext = FileExtension<'file.ts'>; // '.ts'
 * type Ext2 = FileExtension<'path/to/file.min.js'>; // '.js'
 */
export type FileExtension<S extends string> = 
  S extends `${infer _}.${infer E}` ? `.${E}` : never;

/**
 * Extract the base name from a file path (without extension).
 * 
 * @example
 * type Base = Basename<'path/to/file.ts'>; // 'file'
 */
export type Basename<S extends string> = 
  S extends `${infer Dir}/${infer Base}`
    ? Basename<Base>
    : S extends `${infer Base}.${infer _}`
      ? Base
      : S;

/**
 * Extract the directory path from a string path.
 * 
 * @example
 * type Dir = Dirname<'path/to/file.ts'>; // 'path/to'
 */
export type Dirname<S extends string> = 
  S extends `${infer Dir}/${infer _}` ? Dir : '.';

/**
 * Check if a string starts with a prefix.
 * 
 * @example
 * type Starts = StartsWith<'hello world', 'hello'>; // true
 * type Starts2 = StartsWith<'hello world', 'world'>; // false
 */
export type StartsWith<S extends string, Prefix extends string> = 
  S extends `${Prefix}${infer _}` ? true : false;

/**
 * Check if a string ends with a suffix.
 * 
 * @example
 * type Ends = EndsWith<'hello world', 'world'>; // true
 * type Ends2 = EndsWith<'hello world', 'hello'>; // false
 */
export type EndsWith<S extends string, Suffix extends string> = 
  S extends `${infer _}${Suffix}` ? true : false;

/**
 * Remove a prefix from a string.
 * 
 * @example
 * type Removed = RemovePrefix<'hello world', 'hello '>; // 'world'
 */
export type RemovePrefix<S extends string, Prefix extends string> = 
  S extends `${Prefix}${infer R}` ? R : S;

/**
 * Remove a suffix from a string.
 * 
 * @example
 * type Removed = RemoveSuffix<'hello world', ' world'>; // 'hello'
 */
export type RemoveSuffix<S extends string, Suffix extends string> = 
  S extends `${infer R}${Suffix}` ? R : S;

/**
 * Reverse a string.
 * 
 * @example
 * type Reversed = Reverse<'hello'>; // 'olleh'
 */
export type Reverse<S extends string> = 
  S extends `${infer H}${infer T}` ? `${Reverse<T>}${H}` : '';

/**
 * Pad a string on the left.
 * 
 * @example
 * type Padded = PadLeft<'5', 3, '0'>; // '005'
 */
export type PadLeft<S extends string, Length extends number, Pad extends string = ' '> = 
  S extends `${infer H}${infer T}`
    ? H extends string
      ? Length extends H['length'] ? S : `${Pad}${PadLeft<T, Length, Pad>}`
      : never
    : never;

/**
 * Pad a string on the right.
 * 
 * @example
 * type Padded = PadRight<'hello', 10, ' '>; // 'hello     '
 */
export type PadRight<S extends string, Length extends number, Pad extends string = ' '> = 
  S extends `${infer H}${infer T}`
    ? H extends string
      ? Length extends H['length'] ? S : `${H}${PadRight<T, Length, Pad>}`
      : never
    : never;
