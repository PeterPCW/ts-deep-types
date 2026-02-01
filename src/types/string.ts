// ============================================
// String Type Utilities
// ============================================

/**
 * Convert a string to camelCase.
 * 
 * @example
 * type Camel = CamelCase<'hello_world'>; // 'helloWorld'
 * type Camel2 = CamelCase<'hello-world'>; // 'helloWorld'
 * type Camel3 = CamelCase<'Hello World'>; // 'helloWorld'
 */
export type CamelCase<S extends string> = 
  S extends `${infer P}_${infer R}` ? `${P}${Capitalize<CamelCase<R>>}` :
  S extends `${infer P}-${infer R}` ? `${P}${Capitalize<CamelCase<R>>}` :
  S extends `${infer P} ${infer R}` ? `${P}${Capitalize<CamelCase<R>>}` :
  S;

/**
 * Convert a string to kebab-case.
 * 
 * @example
 * type Kebab = KebabCase<'helloWorld'>; // 'hello-world'
 * type Kebab2 = KebabCase<'HelloWorld'>; // 'hello-world'
 */
export type KebabCase<S extends string> = 
  S extends `${infer P}${infer R}` ?
    P extends Lowercase<P> 
      ? R extends `${infer Q}${infer T}`
        ? `${P}${KebabCase<`${Uppercase<Q>}${T}`>}`
        : S
      : `${Lowercase<P>}${KebabCase<R>}`
    : S;

/**
 * Convert a string to snake_case.
 * 
 * @example
 * type Snake = SnakeCase<'helloWorld'>; // 'hello_world'
 * type Snake2 = SnakeCase<'HelloWorld'>; // 'hello_world'
 */
export type SnakeCase<S extends string> = 
  S extends `${infer P}${infer R}` ?
    P extends Uppercase<P>
      ? R extends `${infer Q}${infer T}`
        ? `_${Lowercase<P>}${SnakeCase<`${Uppercase<Q>}${T}`>}`
        : `_${Lowercase<P>}${SnakeCase<R>}`
      : `${P}${SnakeCase<R>}`
    : S;

/**
 * Convert a string to PascalCase.
 * 
 * @example
 * type Pascal = PascalCase<'hello_world'>; // 'HelloWorld'
 * type Pascal2 = PascalCase<'hello-world'>; // 'HelloWorld'
 */
export type PascalCase<S extends string> = 
  S extends `${infer P}_${infer R}` ? `${Capitalize<P>}${PascalCase<R>}` :
  S extends `${infer P}-${infer R}` ? `${Capitalize<P>}${PascalCase<R>}` :
  S extends `${infer P} ${infer R}` ? `${Capitalize<P>}${PascalCase<R>}` :
  S extends `${infer P}${infer R}` ? `${Uppercase<P>}${R}` :
  S;

/**
 * Trim whitespace from both ends of a string type.
 * 
 * @example
 * type Trimmed = Trim<'  hello  '>; // 'hello'
 */
export type Trim<S extends string> = 
  S extends ` ${infer R}` ? Trim<R> :
  S extends `${infer L} ` ? Trim<L> :
  S;

/**
 * Count the number of words in a string.
 * Returns a number type.
 * 
 * @example
 * type Count = WordCount<'hello world'>; // 2
 * type Count2 = WordCount<'one two three'>; // 3
 */
export type WordCount<S extends string, W extends any[] = []> = 
  Trim<S> extends `${infer W1} ${infer W2}` 
    ? WordCount<W2, [...W, W1]> 
    : Trim<S> extends '' 
      ? W['length'] 
      : [...W, Trim<S>]['length'];

/**
 * Convert a string literal to a template literal type.
 * Useful for creating branded string types.
 * 
 * @example
 * type Brand<T, B> = T & { __brand: B };
 * type UserId = Brand<string, 'UserId'>;
 */
export type Brand<T, B extends string> = T & { __brand: B };

/**
 * Create a string enum type from a tuple of strings.
 * 
 * @example
 * type Direction = StringEnum<['up', 'down', 'left', 'right']>;
 * // 'up' | 'down' | 'left' | 'right'
 */
export type StringEnum<T extends readonly string[]> = T[number];

/**
 * Make specific properties of T required while keeping others optional.
 * 
 * @example
 * type PartialUser = { name?: string; email?: string; age?: number };
 * type RequiredName = RequiredBy<PartialUser, 'name'>;
 * // { name: string; email?: string; age?: number; }
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Make specific properties of T readonly.
 * 
 * @example
 * type MutableUser = { name: string; age: number };
 * type ReadonlyName = ReadonlyBy<MutableUser, 'name'>;
 * // { readonly name: string; age: number; }
 */
export type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

/**
 * Make specific properties of T optional.
 * 
 * @example
 * type RequiredUser = { name: string; age: number; email: string };
 * type OptionalName = OptionalBy<RequiredUser, 'name'>;
 * // { name?: string; age: number; email: string; }
 */
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
