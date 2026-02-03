
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model BackgroundPack
 * 
 */
export type BackgroundPack = $Result.DefaultSelection<Prisma.$BackgroundPackPayload>
/**
 * Model SiteSettings
 * 
 */
export type SiteSettings = $Result.DefaultSelection<Prisma.$SiteSettingsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  InProgress: 'InProgress',
  CompleteMaintained: 'CompleteMaintained',
  CompleteUnmaintained: 'CompleteUnmaintained',
  Planned: 'Planned'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.backgroundPack`: Exposes CRUD operations for the **BackgroundPack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BackgroundPacks
    * const backgroundPacks = await prisma.backgroundPack.findMany()
    * ```
    */
  get backgroundPack(): Prisma.BackgroundPackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteSettings`: Exposes CRUD operations for the **SiteSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteSettings
    * const siteSettings = await prisma.siteSettings.findMany()
    * ```
    */
  get siteSettings(): Prisma.SiteSettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    BackgroundPack: 'BackgroundPack',
    SiteSettings: 'SiteSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "backgroundPack" | "siteSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      BackgroundPack: {
        payload: Prisma.$BackgroundPackPayload<ExtArgs>
        fields: Prisma.BackgroundPackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BackgroundPackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BackgroundPackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          findFirst: {
            args: Prisma.BackgroundPackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BackgroundPackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          findMany: {
            args: Prisma.BackgroundPackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>[]
          }
          create: {
            args: Prisma.BackgroundPackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          createMany: {
            args: Prisma.BackgroundPackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BackgroundPackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>[]
          }
          delete: {
            args: Prisma.BackgroundPackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          update: {
            args: Prisma.BackgroundPackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          deleteMany: {
            args: Prisma.BackgroundPackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BackgroundPackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BackgroundPackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>[]
          }
          upsert: {
            args: Prisma.BackgroundPackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BackgroundPackPayload>
          }
          aggregate: {
            args: Prisma.BackgroundPackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBackgroundPack>
          }
          groupBy: {
            args: Prisma.BackgroundPackGroupByArgs<ExtArgs>
            result: $Utils.Optional<BackgroundPackGroupByOutputType>[]
          }
          count: {
            args: Prisma.BackgroundPackCountArgs<ExtArgs>
            result: $Utils.Optional<BackgroundPackCountAggregateOutputType> | number
          }
        }
      }
      SiteSettings: {
        payload: Prisma.$SiteSettingsPayload<ExtArgs>
        fields: Prisma.SiteSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          findFirst: {
            args: Prisma.SiteSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          findMany: {
            args: Prisma.SiteSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[]
          }
          create: {
            args: Prisma.SiteSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          createMany: {
            args: Prisma.SiteSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[]
          }
          delete: {
            args: Prisma.SiteSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          update: {
            args: Prisma.SiteSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          deleteMany: {
            args: Prisma.SiteSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>[]
          }
          upsert: {
            args: Prisma.SiteSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingsPayload>
          }
          aggregate: {
            args: Prisma.SiteSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteSettings>
          }
          groupBy: {
            args: Prisma.SiteSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    backgroundPack?: BackgroundPackOmit
    siteSettings?: SiteSettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BackgroundPackCountOutputType
   */

  export type BackgroundPackCountOutputType = {
    siteSettings: number
  }

  export type BackgroundPackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siteSettings?: boolean | BackgroundPackCountOutputTypeCountSiteSettingsArgs
  }

  // Custom InputTypes
  /**
   * BackgroundPackCountOutputType without action
   */
  export type BackgroundPackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPackCountOutputType
     */
    select?: BackgroundPackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BackgroundPackCountOutputType without action
   */
  export type BackgroundPackCountOutputTypeCountSiteSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    name: string | null
    status: $Enums.Status | null
    description: string | null
    overviewText: string | null
    overviewImage1: string | null
    overviewImage2: string | null
    overviewImage3: string | null
    link: string | null
    gitHubLink: string | null
    isActive: boolean | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
    status: $Enums.Status | null
    description: string | null
    overviewText: string | null
    overviewImage1: string | null
    overviewImage2: string | null
    overviewImage3: string | null
    link: string | null
    gitHubLink: string | null
    isActive: boolean | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    status: number
    description: number
    overviewText: number
    overviewImage1: number
    overviewImage2: number
    overviewImage3: number
    link: number
    gitHubLink: number
    isActive: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    status?: true
    description?: true
    overviewText?: true
    overviewImage1?: true
    overviewImage2?: true
    overviewImage3?: true
    link?: true
    gitHubLink?: true
    isActive?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    status?: true
    description?: true
    overviewText?: true
    overviewImage1?: true
    overviewImage2?: true
    overviewImage3?: true
    link?: true
    gitHubLink?: true
    isActive?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    status?: true
    description?: true
    overviewText?: true
    overviewImage1?: true
    overviewImage2?: true
    overviewImage3?: true
    link?: true
    gitHubLink?: true
    isActive?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    name: string
    status: $Enums.Status
    description: string | null
    overviewText: string | null
    overviewImage1: string | null
    overviewImage2: string | null
    overviewImage3: string | null
    link: string | null
    gitHubLink: string | null
    isActive: boolean
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    description?: boolean
    overviewText?: boolean
    overviewImage1?: boolean
    overviewImage2?: boolean
    overviewImage3?: boolean
    link?: boolean
    gitHubLink?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    description?: boolean
    overviewText?: boolean
    overviewImage1?: boolean
    overviewImage2?: boolean
    overviewImage3?: boolean
    link?: boolean
    gitHubLink?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    status?: boolean
    description?: boolean
    overviewText?: boolean
    overviewImage1?: boolean
    overviewImage2?: boolean
    overviewImage3?: boolean
    link?: boolean
    gitHubLink?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    status?: boolean
    description?: boolean
    overviewText?: boolean
    overviewImage1?: boolean
    overviewImage2?: boolean
    overviewImage3?: boolean
    link?: boolean
    gitHubLink?: boolean
    isActive?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "status" | "description" | "overviewText" | "overviewImage1" | "overviewImage2" | "overviewImage3" | "link" | "gitHubLink" | "isActive", ExtArgs["result"]["project"]>

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      status: $Enums.Status
      description: string | null
      overviewText: string | null
      overviewImage1: string | null
      overviewImage2: string | null
      overviewImage3: string | null
      link: string | null
      gitHubLink: string | null
      isActive: boolean
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly name: FieldRef<"Project", 'String'>
    readonly status: FieldRef<"Project", 'Status'>
    readonly description: FieldRef<"Project", 'String'>
    readonly overviewText: FieldRef<"Project", 'String'>
    readonly overviewImage1: FieldRef<"Project", 'String'>
    readonly overviewImage2: FieldRef<"Project", 'String'>
    readonly overviewImage3: FieldRef<"Project", 'String'>
    readonly link: FieldRef<"Project", 'String'>
    readonly gitHubLink: FieldRef<"Project", 'String'>
    readonly isActive: FieldRef<"Project", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
  }


  /**
   * Model BackgroundPack
   */

  export type AggregateBackgroundPack = {
    _count: BackgroundPackCountAggregateOutputType | null
    _min: BackgroundPackMinAggregateOutputType | null
    _max: BackgroundPackMaxAggregateOutputType | null
  }

  export type BackgroundPackMinAggregateOutputType = {
    id: string | null
    name: string | null
    version: string | null
    entryUrl: string | null
    manifestUrl: string | null
    previewUrl: string | null
    interactive: boolean | null
    allowExternal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BackgroundPackMaxAggregateOutputType = {
    id: string | null
    name: string | null
    version: string | null
    entryUrl: string | null
    manifestUrl: string | null
    previewUrl: string | null
    interactive: boolean | null
    allowExternal: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BackgroundPackCountAggregateOutputType = {
    id: number
    name: number
    version: number
    entryUrl: number
    manifestUrl: number
    previewUrl: number
    interactive: number
    allowExternal: number
    manifest: number
    uploadedBlobUrls: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BackgroundPackMinAggregateInputType = {
    id?: true
    name?: true
    version?: true
    entryUrl?: true
    manifestUrl?: true
    previewUrl?: true
    interactive?: true
    allowExternal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BackgroundPackMaxAggregateInputType = {
    id?: true
    name?: true
    version?: true
    entryUrl?: true
    manifestUrl?: true
    previewUrl?: true
    interactive?: true
    allowExternal?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BackgroundPackCountAggregateInputType = {
    id?: true
    name?: true
    version?: true
    entryUrl?: true
    manifestUrl?: true
    previewUrl?: true
    interactive?: true
    allowExternal?: true
    manifest?: true
    uploadedBlobUrls?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BackgroundPackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackgroundPack to aggregate.
     */
    where?: BackgroundPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundPacks to fetch.
     */
    orderBy?: BackgroundPackOrderByWithRelationInput | BackgroundPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BackgroundPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BackgroundPacks
    **/
    _count?: true | BackgroundPackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BackgroundPackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BackgroundPackMaxAggregateInputType
  }

  export type GetBackgroundPackAggregateType<T extends BackgroundPackAggregateArgs> = {
        [P in keyof T & keyof AggregateBackgroundPack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBackgroundPack[P]>
      : GetScalarType<T[P], AggregateBackgroundPack[P]>
  }




  export type BackgroundPackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BackgroundPackWhereInput
    orderBy?: BackgroundPackOrderByWithAggregationInput | BackgroundPackOrderByWithAggregationInput[]
    by: BackgroundPackScalarFieldEnum[] | BackgroundPackScalarFieldEnum
    having?: BackgroundPackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BackgroundPackCountAggregateInputType | true
    _min?: BackgroundPackMinAggregateInputType
    _max?: BackgroundPackMaxAggregateInputType
  }

  export type BackgroundPackGroupByOutputType = {
    id: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl: string | null
    interactive: boolean
    allowExternal: boolean
    manifest: JsonValue
    uploadedBlobUrls: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: BackgroundPackCountAggregateOutputType | null
    _min: BackgroundPackMinAggregateOutputType | null
    _max: BackgroundPackMaxAggregateOutputType | null
  }

  type GetBackgroundPackGroupByPayload<T extends BackgroundPackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BackgroundPackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BackgroundPackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BackgroundPackGroupByOutputType[P]>
            : GetScalarType<T[P], BackgroundPackGroupByOutputType[P]>
        }
      >
    >


  export type BackgroundPackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    version?: boolean
    entryUrl?: boolean
    manifestUrl?: boolean
    previewUrl?: boolean
    interactive?: boolean
    allowExternal?: boolean
    manifest?: boolean
    uploadedBlobUrls?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siteSettings?: boolean | BackgroundPack$siteSettingsArgs<ExtArgs>
    _count?: boolean | BackgroundPackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["backgroundPack"]>

  export type BackgroundPackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    version?: boolean
    entryUrl?: boolean
    manifestUrl?: boolean
    previewUrl?: boolean
    interactive?: boolean
    allowExternal?: boolean
    manifest?: boolean
    uploadedBlobUrls?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["backgroundPack"]>

  export type BackgroundPackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    version?: boolean
    entryUrl?: boolean
    manifestUrl?: boolean
    previewUrl?: boolean
    interactive?: boolean
    allowExternal?: boolean
    manifest?: boolean
    uploadedBlobUrls?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["backgroundPack"]>

  export type BackgroundPackSelectScalar = {
    id?: boolean
    name?: boolean
    version?: boolean
    entryUrl?: boolean
    manifestUrl?: boolean
    previewUrl?: boolean
    interactive?: boolean
    allowExternal?: boolean
    manifest?: boolean
    uploadedBlobUrls?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BackgroundPackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "version" | "entryUrl" | "manifestUrl" | "previewUrl" | "interactive" | "allowExternal" | "manifest" | "uploadedBlobUrls" | "createdAt" | "updatedAt", ExtArgs["result"]["backgroundPack"]>
  export type BackgroundPackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siteSettings?: boolean | BackgroundPack$siteSettingsArgs<ExtArgs>
    _count?: boolean | BackgroundPackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BackgroundPackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BackgroundPackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BackgroundPackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BackgroundPack"
    objects: {
      siteSettings: Prisma.$SiteSettingsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      version: string
      entryUrl: string
      manifestUrl: string
      previewUrl: string | null
      interactive: boolean
      allowExternal: boolean
      manifest: Prisma.JsonValue
      uploadedBlobUrls: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["backgroundPack"]>
    composites: {}
  }

  type BackgroundPackGetPayload<S extends boolean | null | undefined | BackgroundPackDefaultArgs> = $Result.GetResult<Prisma.$BackgroundPackPayload, S>

  type BackgroundPackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BackgroundPackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BackgroundPackCountAggregateInputType | true
    }

  export interface BackgroundPackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BackgroundPack'], meta: { name: 'BackgroundPack' } }
    /**
     * Find zero or one BackgroundPack that matches the filter.
     * @param {BackgroundPackFindUniqueArgs} args - Arguments to find a BackgroundPack
     * @example
     * // Get one BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BackgroundPackFindUniqueArgs>(args: SelectSubset<T, BackgroundPackFindUniqueArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BackgroundPack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BackgroundPackFindUniqueOrThrowArgs} args - Arguments to find a BackgroundPack
     * @example
     * // Get one BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BackgroundPackFindUniqueOrThrowArgs>(args: SelectSubset<T, BackgroundPackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BackgroundPack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackFindFirstArgs} args - Arguments to find a BackgroundPack
     * @example
     * // Get one BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BackgroundPackFindFirstArgs>(args?: SelectSubset<T, BackgroundPackFindFirstArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BackgroundPack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackFindFirstOrThrowArgs} args - Arguments to find a BackgroundPack
     * @example
     * // Get one BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BackgroundPackFindFirstOrThrowArgs>(args?: SelectSubset<T, BackgroundPackFindFirstOrThrowArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BackgroundPacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BackgroundPacks
     * const backgroundPacks = await prisma.backgroundPack.findMany()
     * 
     * // Get first 10 BackgroundPacks
     * const backgroundPacks = await prisma.backgroundPack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const backgroundPackWithIdOnly = await prisma.backgroundPack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BackgroundPackFindManyArgs>(args?: SelectSubset<T, BackgroundPackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BackgroundPack.
     * @param {BackgroundPackCreateArgs} args - Arguments to create a BackgroundPack.
     * @example
     * // Create one BackgroundPack
     * const BackgroundPack = await prisma.backgroundPack.create({
     *   data: {
     *     // ... data to create a BackgroundPack
     *   }
     * })
     * 
     */
    create<T extends BackgroundPackCreateArgs>(args: SelectSubset<T, BackgroundPackCreateArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BackgroundPacks.
     * @param {BackgroundPackCreateManyArgs} args - Arguments to create many BackgroundPacks.
     * @example
     * // Create many BackgroundPacks
     * const backgroundPack = await prisma.backgroundPack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BackgroundPackCreateManyArgs>(args?: SelectSubset<T, BackgroundPackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BackgroundPacks and returns the data saved in the database.
     * @param {BackgroundPackCreateManyAndReturnArgs} args - Arguments to create many BackgroundPacks.
     * @example
     * // Create many BackgroundPacks
     * const backgroundPack = await prisma.backgroundPack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BackgroundPacks and only return the `id`
     * const backgroundPackWithIdOnly = await prisma.backgroundPack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BackgroundPackCreateManyAndReturnArgs>(args?: SelectSubset<T, BackgroundPackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BackgroundPack.
     * @param {BackgroundPackDeleteArgs} args - Arguments to delete one BackgroundPack.
     * @example
     * // Delete one BackgroundPack
     * const BackgroundPack = await prisma.backgroundPack.delete({
     *   where: {
     *     // ... filter to delete one BackgroundPack
     *   }
     * })
     * 
     */
    delete<T extends BackgroundPackDeleteArgs>(args: SelectSubset<T, BackgroundPackDeleteArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BackgroundPack.
     * @param {BackgroundPackUpdateArgs} args - Arguments to update one BackgroundPack.
     * @example
     * // Update one BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BackgroundPackUpdateArgs>(args: SelectSubset<T, BackgroundPackUpdateArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BackgroundPacks.
     * @param {BackgroundPackDeleteManyArgs} args - Arguments to filter BackgroundPacks to delete.
     * @example
     * // Delete a few BackgroundPacks
     * const { count } = await prisma.backgroundPack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BackgroundPackDeleteManyArgs>(args?: SelectSubset<T, BackgroundPackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackgroundPacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BackgroundPacks
     * const backgroundPack = await prisma.backgroundPack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BackgroundPackUpdateManyArgs>(args: SelectSubset<T, BackgroundPackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BackgroundPacks and returns the data updated in the database.
     * @param {BackgroundPackUpdateManyAndReturnArgs} args - Arguments to update many BackgroundPacks.
     * @example
     * // Update many BackgroundPacks
     * const backgroundPack = await prisma.backgroundPack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BackgroundPacks and only return the `id`
     * const backgroundPackWithIdOnly = await prisma.backgroundPack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BackgroundPackUpdateManyAndReturnArgs>(args: SelectSubset<T, BackgroundPackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BackgroundPack.
     * @param {BackgroundPackUpsertArgs} args - Arguments to update or create a BackgroundPack.
     * @example
     * // Update or create a BackgroundPack
     * const backgroundPack = await prisma.backgroundPack.upsert({
     *   create: {
     *     // ... data to create a BackgroundPack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BackgroundPack we want to update
     *   }
     * })
     */
    upsert<T extends BackgroundPackUpsertArgs>(args: SelectSubset<T, BackgroundPackUpsertArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BackgroundPacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackCountArgs} args - Arguments to filter BackgroundPacks to count.
     * @example
     * // Count the number of BackgroundPacks
     * const count = await prisma.backgroundPack.count({
     *   where: {
     *     // ... the filter for the BackgroundPacks we want to count
     *   }
     * })
    **/
    count<T extends BackgroundPackCountArgs>(
      args?: Subset<T, BackgroundPackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BackgroundPackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BackgroundPack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BackgroundPackAggregateArgs>(args: Subset<T, BackgroundPackAggregateArgs>): Prisma.PrismaPromise<GetBackgroundPackAggregateType<T>>

    /**
     * Group by BackgroundPack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BackgroundPackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BackgroundPackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BackgroundPackGroupByArgs['orderBy'] }
        : { orderBy?: BackgroundPackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BackgroundPackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBackgroundPackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BackgroundPack model
   */
  readonly fields: BackgroundPackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BackgroundPack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BackgroundPackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siteSettings<T extends BackgroundPack$siteSettingsArgs<ExtArgs> = {}>(args?: Subset<T, BackgroundPack$siteSettingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BackgroundPack model
   */
  interface BackgroundPackFieldRefs {
    readonly id: FieldRef<"BackgroundPack", 'String'>
    readonly name: FieldRef<"BackgroundPack", 'String'>
    readonly version: FieldRef<"BackgroundPack", 'String'>
    readonly entryUrl: FieldRef<"BackgroundPack", 'String'>
    readonly manifestUrl: FieldRef<"BackgroundPack", 'String'>
    readonly previewUrl: FieldRef<"BackgroundPack", 'String'>
    readonly interactive: FieldRef<"BackgroundPack", 'Boolean'>
    readonly allowExternal: FieldRef<"BackgroundPack", 'Boolean'>
    readonly manifest: FieldRef<"BackgroundPack", 'Json'>
    readonly uploadedBlobUrls: FieldRef<"BackgroundPack", 'Json'>
    readonly createdAt: FieldRef<"BackgroundPack", 'DateTime'>
    readonly updatedAt: FieldRef<"BackgroundPack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BackgroundPack findUnique
   */
  export type BackgroundPackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundPack to fetch.
     */
    where: BackgroundPackWhereUniqueInput
  }

  /**
   * BackgroundPack findUniqueOrThrow
   */
  export type BackgroundPackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundPack to fetch.
     */
    where: BackgroundPackWhereUniqueInput
  }

  /**
   * BackgroundPack findFirst
   */
  export type BackgroundPackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundPack to fetch.
     */
    where?: BackgroundPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundPacks to fetch.
     */
    orderBy?: BackgroundPackOrderByWithRelationInput | BackgroundPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackgroundPacks.
     */
    cursor?: BackgroundPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackgroundPacks.
     */
    distinct?: BackgroundPackScalarFieldEnum | BackgroundPackScalarFieldEnum[]
  }

  /**
   * BackgroundPack findFirstOrThrow
   */
  export type BackgroundPackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundPack to fetch.
     */
    where?: BackgroundPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundPacks to fetch.
     */
    orderBy?: BackgroundPackOrderByWithRelationInput | BackgroundPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BackgroundPacks.
     */
    cursor?: BackgroundPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundPacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BackgroundPacks.
     */
    distinct?: BackgroundPackScalarFieldEnum | BackgroundPackScalarFieldEnum[]
  }

  /**
   * BackgroundPack findMany
   */
  export type BackgroundPackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter, which BackgroundPacks to fetch.
     */
    where?: BackgroundPackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BackgroundPacks to fetch.
     */
    orderBy?: BackgroundPackOrderByWithRelationInput | BackgroundPackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BackgroundPacks.
     */
    cursor?: BackgroundPackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BackgroundPacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BackgroundPacks.
     */
    skip?: number
    distinct?: BackgroundPackScalarFieldEnum | BackgroundPackScalarFieldEnum[]
  }

  /**
   * BackgroundPack create
   */
  export type BackgroundPackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * The data needed to create a BackgroundPack.
     */
    data: XOR<BackgroundPackCreateInput, BackgroundPackUncheckedCreateInput>
  }

  /**
   * BackgroundPack createMany
   */
  export type BackgroundPackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BackgroundPacks.
     */
    data: BackgroundPackCreateManyInput | BackgroundPackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackgroundPack createManyAndReturn
   */
  export type BackgroundPackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * The data used to create many BackgroundPacks.
     */
    data: BackgroundPackCreateManyInput | BackgroundPackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BackgroundPack update
   */
  export type BackgroundPackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * The data needed to update a BackgroundPack.
     */
    data: XOR<BackgroundPackUpdateInput, BackgroundPackUncheckedUpdateInput>
    /**
     * Choose, which BackgroundPack to update.
     */
    where: BackgroundPackWhereUniqueInput
  }

  /**
   * BackgroundPack updateMany
   */
  export type BackgroundPackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BackgroundPacks.
     */
    data: XOR<BackgroundPackUpdateManyMutationInput, BackgroundPackUncheckedUpdateManyInput>
    /**
     * Filter which BackgroundPacks to update
     */
    where?: BackgroundPackWhereInput
    /**
     * Limit how many BackgroundPacks to update.
     */
    limit?: number
  }

  /**
   * BackgroundPack updateManyAndReturn
   */
  export type BackgroundPackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * The data used to update BackgroundPacks.
     */
    data: XOR<BackgroundPackUpdateManyMutationInput, BackgroundPackUncheckedUpdateManyInput>
    /**
     * Filter which BackgroundPacks to update
     */
    where?: BackgroundPackWhereInput
    /**
     * Limit how many BackgroundPacks to update.
     */
    limit?: number
  }

  /**
   * BackgroundPack upsert
   */
  export type BackgroundPackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * The filter to search for the BackgroundPack to update in case it exists.
     */
    where: BackgroundPackWhereUniqueInput
    /**
     * In case the BackgroundPack found by the `where` argument doesn't exist, create a new BackgroundPack with this data.
     */
    create: XOR<BackgroundPackCreateInput, BackgroundPackUncheckedCreateInput>
    /**
     * In case the BackgroundPack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BackgroundPackUpdateInput, BackgroundPackUncheckedUpdateInput>
  }

  /**
   * BackgroundPack delete
   */
  export type BackgroundPackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    /**
     * Filter which BackgroundPack to delete.
     */
    where: BackgroundPackWhereUniqueInput
  }

  /**
   * BackgroundPack deleteMany
   */
  export type BackgroundPackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BackgroundPacks to delete
     */
    where?: BackgroundPackWhereInput
    /**
     * Limit how many BackgroundPacks to delete.
     */
    limit?: number
  }

  /**
   * BackgroundPack.siteSettings
   */
  export type BackgroundPack$siteSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    where?: SiteSettingsWhereInput
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    cursor?: SiteSettingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * BackgroundPack without action
   */
  export type BackgroundPackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
  }


  /**
   * Model SiteSettings
   */

  export type AggregateSiteSettings = {
    _count: SiteSettingsCountAggregateOutputType | null
    _avg: SiteSettingsAvgAggregateOutputType | null
    _sum: SiteSettingsSumAggregateOutputType | null
    _min: SiteSettingsMinAggregateOutputType | null
    _max: SiteSettingsMaxAggregateOutputType | null
  }

  export type SiteSettingsAvgAggregateOutputType = {
    id: number | null
  }

  export type SiteSettingsSumAggregateOutputType = {
    id: number | null
  }

  export type SiteSettingsMinAggregateOutputType = {
    id: number | null
    enableBackground: boolean | null
    enableChatbot: boolean | null
    enableContactForm: boolean | null
    activeBackgroundPackId: string | null
    backgroundQuality: string | null
    reducedMotionOverride: boolean | null
    siteTitle: string | null
    tagline: string | null
    aboutContent: string | null
    avatarImageUrl: string | null
    logoImageUrl: string | null
  }

  export type SiteSettingsMaxAggregateOutputType = {
    id: number | null
    enableBackground: boolean | null
    enableChatbot: boolean | null
    enableContactForm: boolean | null
    activeBackgroundPackId: string | null
    backgroundQuality: string | null
    reducedMotionOverride: boolean | null
    siteTitle: string | null
    tagline: string | null
    aboutContent: string | null
    avatarImageUrl: string | null
    logoImageUrl: string | null
  }

  export type SiteSettingsCountAggregateOutputType = {
    id: number
    enableBackground: number
    enableChatbot: number
    enableContactForm: number
    activeBackgroundPackId: number
    backgroundConfig: number
    backgroundQuality: number
    reducedMotionOverride: number
    siteTitle: number
    tagline: number
    aboutContent: number
    avatarImageUrl: number
    logoImageUrl: number
    _all: number
  }


  export type SiteSettingsAvgAggregateInputType = {
    id?: true
  }

  export type SiteSettingsSumAggregateInputType = {
    id?: true
  }

  export type SiteSettingsMinAggregateInputType = {
    id?: true
    enableBackground?: true
    enableChatbot?: true
    enableContactForm?: true
    activeBackgroundPackId?: true
    backgroundQuality?: true
    reducedMotionOverride?: true
    siteTitle?: true
    tagline?: true
    aboutContent?: true
    avatarImageUrl?: true
    logoImageUrl?: true
  }

  export type SiteSettingsMaxAggregateInputType = {
    id?: true
    enableBackground?: true
    enableChatbot?: true
    enableContactForm?: true
    activeBackgroundPackId?: true
    backgroundQuality?: true
    reducedMotionOverride?: true
    siteTitle?: true
    tagline?: true
    aboutContent?: true
    avatarImageUrl?: true
    logoImageUrl?: true
  }

  export type SiteSettingsCountAggregateInputType = {
    id?: true
    enableBackground?: true
    enableChatbot?: true
    enableContactForm?: true
    activeBackgroundPackId?: true
    backgroundConfig?: true
    backgroundQuality?: true
    reducedMotionOverride?: true
    siteTitle?: true
    tagline?: true
    aboutContent?: true
    avatarImageUrl?: true
    logoImageUrl?: true
    _all?: true
  }

  export type SiteSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to aggregate.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteSettings
    **/
    _count?: true | SiteSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SiteSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SiteSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteSettingsMaxAggregateInputType
  }

  export type GetSiteSettingsAggregateType<T extends SiteSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteSettings[P]>
      : GetScalarType<T[P], AggregateSiteSettings[P]>
  }




  export type SiteSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingsWhereInput
    orderBy?: SiteSettingsOrderByWithAggregationInput | SiteSettingsOrderByWithAggregationInput[]
    by: SiteSettingsScalarFieldEnum[] | SiteSettingsScalarFieldEnum
    having?: SiteSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteSettingsCountAggregateInputType | true
    _avg?: SiteSettingsAvgAggregateInputType
    _sum?: SiteSettingsSumAggregateInputType
    _min?: SiteSettingsMinAggregateInputType
    _max?: SiteSettingsMaxAggregateInputType
  }

  export type SiteSettingsGroupByOutputType = {
    id: number
    enableBackground: boolean
    enableChatbot: boolean
    enableContactForm: boolean
    activeBackgroundPackId: string | null
    backgroundConfig: JsonValue
    backgroundQuality: string
    reducedMotionOverride: boolean | null
    siteTitle: string
    tagline: string
    aboutContent: string
    avatarImageUrl: string | null
    logoImageUrl: string | null
    _count: SiteSettingsCountAggregateOutputType | null
    _avg: SiteSettingsAvgAggregateOutputType | null
    _sum: SiteSettingsSumAggregateOutputType | null
    _min: SiteSettingsMinAggregateOutputType | null
    _max: SiteSettingsMaxAggregateOutputType | null
  }

  type GetSiteSettingsGroupByPayload<T extends SiteSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SiteSettingsGroupByOutputType[P]>
        }
      >
    >


  export type SiteSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: boolean
    backgroundConfig?: boolean
    backgroundQuality?: boolean
    reducedMotionOverride?: boolean
    siteTitle?: boolean
    tagline?: boolean
    aboutContent?: boolean
    avatarImageUrl?: boolean
    logoImageUrl?: boolean
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }, ExtArgs["result"]["siteSettings"]>

  export type SiteSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: boolean
    backgroundConfig?: boolean
    backgroundQuality?: boolean
    reducedMotionOverride?: boolean
    siteTitle?: boolean
    tagline?: boolean
    aboutContent?: boolean
    avatarImageUrl?: boolean
    logoImageUrl?: boolean
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }, ExtArgs["result"]["siteSettings"]>

  export type SiteSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: boolean
    backgroundConfig?: boolean
    backgroundQuality?: boolean
    reducedMotionOverride?: boolean
    siteTitle?: boolean
    tagline?: boolean
    aboutContent?: boolean
    avatarImageUrl?: boolean
    logoImageUrl?: boolean
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }, ExtArgs["result"]["siteSettings"]>

  export type SiteSettingsSelectScalar = {
    id?: boolean
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: boolean
    backgroundConfig?: boolean
    backgroundQuality?: boolean
    reducedMotionOverride?: boolean
    siteTitle?: boolean
    tagline?: boolean
    aboutContent?: boolean
    avatarImageUrl?: boolean
    logoImageUrl?: boolean
  }

  export type SiteSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "enableBackground" | "enableChatbot" | "enableContactForm" | "activeBackgroundPackId" | "backgroundConfig" | "backgroundQuality" | "reducedMotionOverride" | "siteTitle" | "tagline" | "aboutContent" | "avatarImageUrl" | "logoImageUrl", ExtArgs["result"]["siteSettings"]>
  export type SiteSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }
  export type SiteSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }
  export type SiteSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeBackgroundPack?: boolean | SiteSettings$activeBackgroundPackArgs<ExtArgs>
  }

  export type $SiteSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteSettings"
    objects: {
      activeBackgroundPack: Prisma.$BackgroundPackPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      enableBackground: boolean
      enableChatbot: boolean
      enableContactForm: boolean
      activeBackgroundPackId: string | null
      backgroundConfig: Prisma.JsonValue
      backgroundQuality: string
      reducedMotionOverride: boolean | null
      siteTitle: string
      tagline: string
      aboutContent: string
      avatarImageUrl: string | null
      logoImageUrl: string | null
    }, ExtArgs["result"]["siteSettings"]>
    composites: {}
  }

  type SiteSettingsGetPayload<S extends boolean | null | undefined | SiteSettingsDefaultArgs> = $Result.GetResult<Prisma.$SiteSettingsPayload, S>

  type SiteSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteSettingsCountAggregateInputType | true
    }

  export interface SiteSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteSettings'], meta: { name: 'SiteSettings' } }
    /**
     * Find zero or one SiteSettings that matches the filter.
     * @param {SiteSettingsFindUniqueArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteSettingsFindUniqueArgs>(args: SelectSubset<T, SiteSettingsFindUniqueArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteSettingsFindUniqueOrThrowArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindFirstArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteSettingsFindFirstArgs>(args?: SelectSubset<T, SiteSettingsFindFirstArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindFirstOrThrowArgs} args - Arguments to find a SiteSettings
     * @example
     * // Get one SiteSettings
     * const siteSettings = await prisma.siteSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteSettings
     * const siteSettings = await prisma.siteSettings.findMany()
     * 
     * // Get first 10 SiteSettings
     * const siteSettings = await prisma.siteSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteSettingsWithIdOnly = await prisma.siteSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteSettingsFindManyArgs>(args?: SelectSubset<T, SiteSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteSettings.
     * @param {SiteSettingsCreateArgs} args - Arguments to create a SiteSettings.
     * @example
     * // Create one SiteSettings
     * const SiteSettings = await prisma.siteSettings.create({
     *   data: {
     *     // ... data to create a SiteSettings
     *   }
     * })
     * 
     */
    create<T extends SiteSettingsCreateArgs>(args: SelectSubset<T, SiteSettingsCreateArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteSettings.
     * @param {SiteSettingsCreateManyArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSettings = await prisma.siteSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteSettingsCreateManyArgs>(args?: SelectSubset<T, SiteSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteSettings and returns the data saved in the database.
     * @param {SiteSettingsCreateManyAndReturnArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSettings = await prisma.siteSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteSettings and only return the `id`
     * const siteSettingsWithIdOnly = await prisma.siteSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteSettings.
     * @param {SiteSettingsDeleteArgs} args - Arguments to delete one SiteSettings.
     * @example
     * // Delete one SiteSettings
     * const SiteSettings = await prisma.siteSettings.delete({
     *   where: {
     *     // ... filter to delete one SiteSettings
     *   }
     * })
     * 
     */
    delete<T extends SiteSettingsDeleteArgs>(args: SelectSubset<T, SiteSettingsDeleteArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteSettings.
     * @param {SiteSettingsUpdateArgs} args - Arguments to update one SiteSettings.
     * @example
     * // Update one SiteSettings
     * const siteSettings = await prisma.siteSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteSettingsUpdateArgs>(args: SelectSubset<T, SiteSettingsUpdateArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteSettings.
     * @param {SiteSettingsDeleteManyArgs} args - Arguments to filter SiteSettings to delete.
     * @example
     * // Delete a few SiteSettings
     * const { count } = await prisma.siteSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteSettingsDeleteManyArgs>(args?: SelectSubset<T, SiteSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteSettings
     * const siteSettings = await prisma.siteSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteSettingsUpdateManyArgs>(args: SelectSubset<T, SiteSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings and returns the data updated in the database.
     * @param {SiteSettingsUpdateManyAndReturnArgs} args - Arguments to update many SiteSettings.
     * @example
     * // Update many SiteSettings
     * const siteSettings = await prisma.siteSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteSettings and only return the `id`
     * const siteSettingsWithIdOnly = await prisma.siteSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteSettings.
     * @param {SiteSettingsUpsertArgs} args - Arguments to update or create a SiteSettings.
     * @example
     * // Update or create a SiteSettings
     * const siteSettings = await prisma.siteSettings.upsert({
     *   create: {
     *     // ... data to create a SiteSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteSettings we want to update
     *   }
     * })
     */
    upsert<T extends SiteSettingsUpsertArgs>(args: SelectSubset<T, SiteSettingsUpsertArgs<ExtArgs>>): Prisma__SiteSettingsClient<$Result.GetResult<Prisma.$SiteSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsCountArgs} args - Arguments to filter SiteSettings to count.
     * @example
     * // Count the number of SiteSettings
     * const count = await prisma.siteSettings.count({
     *   where: {
     *     // ... the filter for the SiteSettings we want to count
     *   }
     * })
    **/
    count<T extends SiteSettingsCountArgs>(
      args?: Subset<T, SiteSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteSettingsAggregateArgs>(args: Subset<T, SiteSettingsAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingsAggregateType<T>>

    /**
     * Group by SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteSettingsGroupByArgs['orderBy'] }
        : { orderBy?: SiteSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteSettings model
   */
  readonly fields: SiteSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activeBackgroundPack<T extends SiteSettings$activeBackgroundPackArgs<ExtArgs> = {}>(args?: Subset<T, SiteSettings$activeBackgroundPackArgs<ExtArgs>>): Prisma__BackgroundPackClient<$Result.GetResult<Prisma.$BackgroundPackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteSettings model
   */
  interface SiteSettingsFieldRefs {
    readonly id: FieldRef<"SiteSettings", 'Int'>
    readonly enableBackground: FieldRef<"SiteSettings", 'Boolean'>
    readonly enableChatbot: FieldRef<"SiteSettings", 'Boolean'>
    readonly enableContactForm: FieldRef<"SiteSettings", 'Boolean'>
    readonly activeBackgroundPackId: FieldRef<"SiteSettings", 'String'>
    readonly backgroundConfig: FieldRef<"SiteSettings", 'Json'>
    readonly backgroundQuality: FieldRef<"SiteSettings", 'String'>
    readonly reducedMotionOverride: FieldRef<"SiteSettings", 'Boolean'>
    readonly siteTitle: FieldRef<"SiteSettings", 'String'>
    readonly tagline: FieldRef<"SiteSettings", 'String'>
    readonly aboutContent: FieldRef<"SiteSettings", 'String'>
    readonly avatarImageUrl: FieldRef<"SiteSettings", 'String'>
    readonly logoImageUrl: FieldRef<"SiteSettings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SiteSettings findUnique
   */
  export type SiteSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings findUniqueOrThrow
   */
  export type SiteSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings findFirst
   */
  export type SiteSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings findFirstOrThrow
   */
  export type SiteSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings findMany
   */
  export type SiteSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingsOrderByWithRelationInput | SiteSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteSettings.
     */
    cursor?: SiteSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    distinct?: SiteSettingsScalarFieldEnum | SiteSettingsScalarFieldEnum[]
  }

  /**
   * SiteSettings create
   */
  export type SiteSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a SiteSettings.
     */
    data?: XOR<SiteSettingsCreateInput, SiteSettingsUncheckedCreateInput>
  }

  /**
   * SiteSettings createMany
   */
  export type SiteSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingsCreateManyInput | SiteSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteSettings createManyAndReturn
   */
  export type SiteSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingsCreateManyInput | SiteSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteSettings update
   */
  export type SiteSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a SiteSettings.
     */
    data: XOR<SiteSettingsUpdateInput, SiteSettingsUncheckedUpdateInput>
    /**
     * Choose, which SiteSettings to update.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings updateMany
   */
  export type SiteSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingsUpdateManyMutationInput, SiteSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingsWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSettings updateManyAndReturn
   */
  export type SiteSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingsUpdateManyMutationInput, SiteSettingsUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingsWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteSettings upsert
   */
  export type SiteSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the SiteSettings to update in case it exists.
     */
    where: SiteSettingsWhereUniqueInput
    /**
     * In case the SiteSettings found by the `where` argument doesn't exist, create a new SiteSettings with this data.
     */
    create: XOR<SiteSettingsCreateInput, SiteSettingsUncheckedCreateInput>
    /**
     * In case the SiteSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteSettingsUpdateInput, SiteSettingsUncheckedUpdateInput>
  }

  /**
   * SiteSettings delete
   */
  export type SiteSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
    /**
     * Filter which SiteSettings to delete.
     */
    where: SiteSettingsWhereUniqueInput
  }

  /**
   * SiteSettings deleteMany
   */
  export type SiteSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to delete
     */
    where?: SiteSettingsWhereInput
    /**
     * Limit how many SiteSettings to delete.
     */
    limit?: number
  }

  /**
   * SiteSettings.activeBackgroundPack
   */
  export type SiteSettings$activeBackgroundPackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BackgroundPack
     */
    select?: BackgroundPackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BackgroundPack
     */
    omit?: BackgroundPackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BackgroundPackInclude<ExtArgs> | null
    where?: BackgroundPackWhereInput
  }

  /**
   * SiteSettings without action
   */
  export type SiteSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSettings
     */
    select?: SiteSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSettings
     */
    omit?: SiteSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteSettingsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    status: 'status',
    description: 'description',
    overviewText: 'overviewText',
    overviewImage1: 'overviewImage1',
    overviewImage2: 'overviewImage2',
    overviewImage3: 'overviewImage3',
    link: 'link',
    gitHubLink: 'gitHubLink',
    isActive: 'isActive'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const BackgroundPackScalarFieldEnum: {
    id: 'id',
    name: 'name',
    version: 'version',
    entryUrl: 'entryUrl',
    manifestUrl: 'manifestUrl',
    previewUrl: 'previewUrl',
    interactive: 'interactive',
    allowExternal: 'allowExternal',
    manifest: 'manifest',
    uploadedBlobUrls: 'uploadedBlobUrls',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BackgroundPackScalarFieldEnum = (typeof BackgroundPackScalarFieldEnum)[keyof typeof BackgroundPackScalarFieldEnum]


  export const SiteSettingsScalarFieldEnum: {
    id: 'id',
    enableBackground: 'enableBackground',
    enableChatbot: 'enableChatbot',
    enableContactForm: 'enableContactForm',
    activeBackgroundPackId: 'activeBackgroundPackId',
    backgroundConfig: 'backgroundConfig',
    backgroundQuality: 'backgroundQuality',
    reducedMotionOverride: 'reducedMotionOverride',
    siteTitle: 'siteTitle',
    tagline: 'tagline',
    aboutContent: 'aboutContent',
    avatarImageUrl: 'avatarImageUrl',
    logoImageUrl: 'logoImageUrl'
  };

  export type SiteSettingsScalarFieldEnum = (typeof SiteSettingsScalarFieldEnum)[keyof typeof SiteSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    name?: StringFilter<"Project"> | string
    status?: EnumStatusFilter<"Project"> | $Enums.Status
    description?: StringNullableFilter<"Project"> | string | null
    overviewText?: StringNullableFilter<"Project"> | string | null
    overviewImage1?: StringNullableFilter<"Project"> | string | null
    overviewImage2?: StringNullableFilter<"Project"> | string | null
    overviewImage3?: StringNullableFilter<"Project"> | string | null
    link?: StringNullableFilter<"Project"> | string | null
    gitHubLink?: StringNullableFilter<"Project"> | string | null
    isActive?: BoolFilter<"Project"> | boolean
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    overviewText?: SortOrderInput | SortOrder
    overviewImage1?: SortOrderInput | SortOrder
    overviewImage2?: SortOrderInput | SortOrder
    overviewImage3?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    gitHubLink?: SortOrderInput | SortOrder
    isActive?: SortOrder
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    status?: EnumStatusFilter<"Project"> | $Enums.Status
    description?: StringNullableFilter<"Project"> | string | null
    overviewText?: StringNullableFilter<"Project"> | string | null
    overviewImage1?: StringNullableFilter<"Project"> | string | null
    overviewImage2?: StringNullableFilter<"Project"> | string | null
    overviewImage3?: StringNullableFilter<"Project"> | string | null
    link?: StringNullableFilter<"Project"> | string | null
    gitHubLink?: StringNullableFilter<"Project"> | string | null
    isActive?: BoolFilter<"Project"> | boolean
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    description?: SortOrderInput | SortOrder
    overviewText?: SortOrderInput | SortOrder
    overviewImage1?: SortOrderInput | SortOrder
    overviewImage2?: SortOrderInput | SortOrder
    overviewImage3?: SortOrderInput | SortOrder
    link?: SortOrderInput | SortOrder
    gitHubLink?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    name?: StringWithAggregatesFilter<"Project"> | string
    status?: EnumStatusWithAggregatesFilter<"Project"> | $Enums.Status
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    overviewText?: StringNullableWithAggregatesFilter<"Project"> | string | null
    overviewImage1?: StringNullableWithAggregatesFilter<"Project"> | string | null
    overviewImage2?: StringNullableWithAggregatesFilter<"Project"> | string | null
    overviewImage3?: StringNullableWithAggregatesFilter<"Project"> | string | null
    link?: StringNullableWithAggregatesFilter<"Project"> | string | null
    gitHubLink?: StringNullableWithAggregatesFilter<"Project"> | string | null
    isActive?: BoolWithAggregatesFilter<"Project"> | boolean
  }

  export type BackgroundPackWhereInput = {
    AND?: BackgroundPackWhereInput | BackgroundPackWhereInput[]
    OR?: BackgroundPackWhereInput[]
    NOT?: BackgroundPackWhereInput | BackgroundPackWhereInput[]
    id?: StringFilter<"BackgroundPack"> | string
    name?: StringFilter<"BackgroundPack"> | string
    version?: StringFilter<"BackgroundPack"> | string
    entryUrl?: StringFilter<"BackgroundPack"> | string
    manifestUrl?: StringFilter<"BackgroundPack"> | string
    previewUrl?: StringNullableFilter<"BackgroundPack"> | string | null
    interactive?: BoolFilter<"BackgroundPack"> | boolean
    allowExternal?: BoolFilter<"BackgroundPack"> | boolean
    manifest?: JsonFilter<"BackgroundPack">
    uploadedBlobUrls?: JsonFilter<"BackgroundPack">
    createdAt?: DateTimeFilter<"BackgroundPack"> | Date | string
    updatedAt?: DateTimeFilter<"BackgroundPack"> | Date | string
    siteSettings?: SiteSettingsListRelationFilter
  }

  export type BackgroundPackOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    entryUrl?: SortOrder
    manifestUrl?: SortOrder
    previewUrl?: SortOrderInput | SortOrder
    interactive?: SortOrder
    allowExternal?: SortOrder
    manifest?: SortOrder
    uploadedBlobUrls?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siteSettings?: SiteSettingsOrderByRelationAggregateInput
  }

  export type BackgroundPackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BackgroundPackWhereInput | BackgroundPackWhereInput[]
    OR?: BackgroundPackWhereInput[]
    NOT?: BackgroundPackWhereInput | BackgroundPackWhereInput[]
    name?: StringFilter<"BackgroundPack"> | string
    version?: StringFilter<"BackgroundPack"> | string
    entryUrl?: StringFilter<"BackgroundPack"> | string
    manifestUrl?: StringFilter<"BackgroundPack"> | string
    previewUrl?: StringNullableFilter<"BackgroundPack"> | string | null
    interactive?: BoolFilter<"BackgroundPack"> | boolean
    allowExternal?: BoolFilter<"BackgroundPack"> | boolean
    manifest?: JsonFilter<"BackgroundPack">
    uploadedBlobUrls?: JsonFilter<"BackgroundPack">
    createdAt?: DateTimeFilter<"BackgroundPack"> | Date | string
    updatedAt?: DateTimeFilter<"BackgroundPack"> | Date | string
    siteSettings?: SiteSettingsListRelationFilter
  }, "id">

  export type BackgroundPackOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    entryUrl?: SortOrder
    manifestUrl?: SortOrder
    previewUrl?: SortOrderInput | SortOrder
    interactive?: SortOrder
    allowExternal?: SortOrder
    manifest?: SortOrder
    uploadedBlobUrls?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BackgroundPackCountOrderByAggregateInput
    _max?: BackgroundPackMaxOrderByAggregateInput
    _min?: BackgroundPackMinOrderByAggregateInput
  }

  export type BackgroundPackScalarWhereWithAggregatesInput = {
    AND?: BackgroundPackScalarWhereWithAggregatesInput | BackgroundPackScalarWhereWithAggregatesInput[]
    OR?: BackgroundPackScalarWhereWithAggregatesInput[]
    NOT?: BackgroundPackScalarWhereWithAggregatesInput | BackgroundPackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BackgroundPack"> | string
    name?: StringWithAggregatesFilter<"BackgroundPack"> | string
    version?: StringWithAggregatesFilter<"BackgroundPack"> | string
    entryUrl?: StringWithAggregatesFilter<"BackgroundPack"> | string
    manifestUrl?: StringWithAggregatesFilter<"BackgroundPack"> | string
    previewUrl?: StringNullableWithAggregatesFilter<"BackgroundPack"> | string | null
    interactive?: BoolWithAggregatesFilter<"BackgroundPack"> | boolean
    allowExternal?: BoolWithAggregatesFilter<"BackgroundPack"> | boolean
    manifest?: JsonWithAggregatesFilter<"BackgroundPack">
    uploadedBlobUrls?: JsonWithAggregatesFilter<"BackgroundPack">
    createdAt?: DateTimeWithAggregatesFilter<"BackgroundPack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BackgroundPack"> | Date | string
  }

  export type SiteSettingsWhereInput = {
    AND?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    OR?: SiteSettingsWhereInput[]
    NOT?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    id?: IntFilter<"SiteSettings"> | number
    enableBackground?: BoolFilter<"SiteSettings"> | boolean
    enableChatbot?: BoolFilter<"SiteSettings"> | boolean
    enableContactForm?: BoolFilter<"SiteSettings"> | boolean
    activeBackgroundPackId?: StringNullableFilter<"SiteSettings"> | string | null
    backgroundConfig?: JsonFilter<"SiteSettings">
    backgroundQuality?: StringFilter<"SiteSettings"> | string
    reducedMotionOverride?: BoolNullableFilter<"SiteSettings"> | boolean | null
    siteTitle?: StringFilter<"SiteSettings"> | string
    tagline?: StringFilter<"SiteSettings"> | string
    aboutContent?: StringFilter<"SiteSettings"> | string
    avatarImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
    logoImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
    activeBackgroundPack?: XOR<BackgroundPackNullableScalarRelationFilter, BackgroundPackWhereInput> | null
  }

  export type SiteSettingsOrderByWithRelationInput = {
    id?: SortOrder
    enableBackground?: SortOrder
    enableChatbot?: SortOrder
    enableContactForm?: SortOrder
    activeBackgroundPackId?: SortOrderInput | SortOrder
    backgroundConfig?: SortOrder
    backgroundQuality?: SortOrder
    reducedMotionOverride?: SortOrderInput | SortOrder
    siteTitle?: SortOrder
    tagline?: SortOrder
    aboutContent?: SortOrder
    avatarImageUrl?: SortOrderInput | SortOrder
    logoImageUrl?: SortOrderInput | SortOrder
    activeBackgroundPack?: BackgroundPackOrderByWithRelationInput
  }

  export type SiteSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    OR?: SiteSettingsWhereInput[]
    NOT?: SiteSettingsWhereInput | SiteSettingsWhereInput[]
    enableBackground?: BoolFilter<"SiteSettings"> | boolean
    enableChatbot?: BoolFilter<"SiteSettings"> | boolean
    enableContactForm?: BoolFilter<"SiteSettings"> | boolean
    activeBackgroundPackId?: StringNullableFilter<"SiteSettings"> | string | null
    backgroundConfig?: JsonFilter<"SiteSettings">
    backgroundQuality?: StringFilter<"SiteSettings"> | string
    reducedMotionOverride?: BoolNullableFilter<"SiteSettings"> | boolean | null
    siteTitle?: StringFilter<"SiteSettings"> | string
    tagline?: StringFilter<"SiteSettings"> | string
    aboutContent?: StringFilter<"SiteSettings"> | string
    avatarImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
    logoImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
    activeBackgroundPack?: XOR<BackgroundPackNullableScalarRelationFilter, BackgroundPackWhereInput> | null
  }, "id">

  export type SiteSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    enableBackground?: SortOrder
    enableChatbot?: SortOrder
    enableContactForm?: SortOrder
    activeBackgroundPackId?: SortOrderInput | SortOrder
    backgroundConfig?: SortOrder
    backgroundQuality?: SortOrder
    reducedMotionOverride?: SortOrderInput | SortOrder
    siteTitle?: SortOrder
    tagline?: SortOrder
    aboutContent?: SortOrder
    avatarImageUrl?: SortOrderInput | SortOrder
    logoImageUrl?: SortOrderInput | SortOrder
    _count?: SiteSettingsCountOrderByAggregateInput
    _avg?: SiteSettingsAvgOrderByAggregateInput
    _max?: SiteSettingsMaxOrderByAggregateInput
    _min?: SiteSettingsMinOrderByAggregateInput
    _sum?: SiteSettingsSumOrderByAggregateInput
  }

  export type SiteSettingsScalarWhereWithAggregatesInput = {
    AND?: SiteSettingsScalarWhereWithAggregatesInput | SiteSettingsScalarWhereWithAggregatesInput[]
    OR?: SiteSettingsScalarWhereWithAggregatesInput[]
    NOT?: SiteSettingsScalarWhereWithAggregatesInput | SiteSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SiteSettings"> | number
    enableBackground?: BoolWithAggregatesFilter<"SiteSettings"> | boolean
    enableChatbot?: BoolWithAggregatesFilter<"SiteSettings"> | boolean
    enableContactForm?: BoolWithAggregatesFilter<"SiteSettings"> | boolean
    activeBackgroundPackId?: StringNullableWithAggregatesFilter<"SiteSettings"> | string | null
    backgroundConfig?: JsonWithAggregatesFilter<"SiteSettings">
    backgroundQuality?: StringWithAggregatesFilter<"SiteSettings"> | string
    reducedMotionOverride?: BoolNullableWithAggregatesFilter<"SiteSettings"> | boolean | null
    siteTitle?: StringWithAggregatesFilter<"SiteSettings"> | string
    tagline?: StringWithAggregatesFilter<"SiteSettings"> | string
    aboutContent?: StringWithAggregatesFilter<"SiteSettings"> | string
    avatarImageUrl?: StringNullableWithAggregatesFilter<"SiteSettings"> | string | null
    logoImageUrl?: StringNullableWithAggregatesFilter<"SiteSettings"> | string | null
  }

  export type ProjectCreateInput = {
    name: string
    status: $Enums.Status
    description?: string | null
    overviewText?: string | null
    overviewImage1?: string | null
    overviewImage2?: string | null
    overviewImage3?: string | null
    link?: string | null
    gitHubLink?: string | null
    isActive?: boolean
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    name: string
    status: $Enums.Status
    description?: string | null
    overviewText?: string | null
    overviewImage1?: string | null
    overviewImage2?: string | null
    overviewImage3?: string | null
    link?: string | null
    gitHubLink?: string | null
    isActive?: boolean
  }

  export type ProjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    description?: NullableStringFieldUpdateOperationsInput | string | null
    overviewText?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage1?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage2?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage3?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    gitHubLink?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    description?: NullableStringFieldUpdateOperationsInput | string | null
    overviewText?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage1?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage2?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage3?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    gitHubLink?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectCreateManyInput = {
    id?: number
    name: string
    status: $Enums.Status
    description?: string | null
    overviewText?: string | null
    overviewImage1?: string | null
    overviewImage2?: string | null
    overviewImage3?: string | null
    link?: string | null
    gitHubLink?: string | null
    isActive?: boolean
  }

  export type ProjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    description?: NullableStringFieldUpdateOperationsInput | string | null
    overviewText?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage1?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage2?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage3?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    gitHubLink?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    description?: NullableStringFieldUpdateOperationsInput | string | null
    overviewText?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage1?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage2?: NullableStringFieldUpdateOperationsInput | string | null
    overviewImage3?: NullableStringFieldUpdateOperationsInput | string | null
    link?: NullableStringFieldUpdateOperationsInput | string | null
    gitHubLink?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BackgroundPackCreateInput = {
    id?: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl?: string | null
    interactive?: boolean
    allowExternal?: boolean
    manifest: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siteSettings?: SiteSettingsCreateNestedManyWithoutActiveBackgroundPackInput
  }

  export type BackgroundPackUncheckedCreateInput = {
    id?: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl?: string | null
    interactive?: boolean
    allowExternal?: boolean
    manifest: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siteSettings?: SiteSettingsUncheckedCreateNestedManyWithoutActiveBackgroundPackInput
  }

  export type BackgroundPackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siteSettings?: SiteSettingsUpdateManyWithoutActiveBackgroundPackNestedInput
  }

  export type BackgroundPackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siteSettings?: SiteSettingsUncheckedUpdateManyWithoutActiveBackgroundPackNestedInput
  }

  export type BackgroundPackCreateManyInput = {
    id?: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl?: string | null
    interactive?: boolean
    allowExternal?: boolean
    manifest: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundPackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundPackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingsCreateInput = {
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
    activeBackgroundPack?: BackgroundPackCreateNestedOneWithoutSiteSettingsInput
  }

  export type SiteSettingsUncheckedCreateInput = {
    id?: number
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: string | null
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
  }

  export type SiteSettingsUpdateInput = {
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    activeBackgroundPack?: BackgroundPackUpdateOneWithoutSiteSettingsNestedInput
  }

  export type SiteSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    activeBackgroundPackId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SiteSettingsCreateManyInput = {
    id?: number
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    activeBackgroundPackId?: string | null
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
  }

  export type SiteSettingsUpdateManyMutationInput = {
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SiteSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    activeBackgroundPackId?: NullableStringFieldUpdateOperationsInput | string | null
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    description?: SortOrder
    overviewText?: SortOrder
    overviewImage1?: SortOrder
    overviewImage2?: SortOrder
    overviewImage3?: SortOrder
    link?: SortOrder
    gitHubLink?: SortOrder
    isActive?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    description?: SortOrder
    overviewText?: SortOrder
    overviewImage1?: SortOrder
    overviewImage2?: SortOrder
    overviewImage3?: SortOrder
    link?: SortOrder
    gitHubLink?: SortOrder
    isActive?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    status?: SortOrder
    description?: SortOrder
    overviewText?: SortOrder
    overviewImage1?: SortOrder
    overviewImage2?: SortOrder
    overviewImage3?: SortOrder
    link?: SortOrder
    gitHubLink?: SortOrder
    isActive?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SiteSettingsListRelationFilter = {
    every?: SiteSettingsWhereInput
    some?: SiteSettingsWhereInput
    none?: SiteSettingsWhereInput
  }

  export type SiteSettingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BackgroundPackCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    entryUrl?: SortOrder
    manifestUrl?: SortOrder
    previewUrl?: SortOrder
    interactive?: SortOrder
    allowExternal?: SortOrder
    manifest?: SortOrder
    uploadedBlobUrls?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BackgroundPackMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    entryUrl?: SortOrder
    manifestUrl?: SortOrder
    previewUrl?: SortOrder
    interactive?: SortOrder
    allowExternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BackgroundPackMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    version?: SortOrder
    entryUrl?: SortOrder
    manifestUrl?: SortOrder
    previewUrl?: SortOrder
    interactive?: SortOrder
    allowExternal?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BackgroundPackNullableScalarRelationFilter = {
    is?: BackgroundPackWhereInput | null
    isNot?: BackgroundPackWhereInput | null
  }

  export type SiteSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    enableBackground?: SortOrder
    enableChatbot?: SortOrder
    enableContactForm?: SortOrder
    activeBackgroundPackId?: SortOrder
    backgroundConfig?: SortOrder
    backgroundQuality?: SortOrder
    reducedMotionOverride?: SortOrder
    siteTitle?: SortOrder
    tagline?: SortOrder
    aboutContent?: SortOrder
    avatarImageUrl?: SortOrder
    logoImageUrl?: SortOrder
  }

  export type SiteSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SiteSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    enableBackground?: SortOrder
    enableChatbot?: SortOrder
    enableContactForm?: SortOrder
    activeBackgroundPackId?: SortOrder
    backgroundQuality?: SortOrder
    reducedMotionOverride?: SortOrder
    siteTitle?: SortOrder
    tagline?: SortOrder
    aboutContent?: SortOrder
    avatarImageUrl?: SortOrder
    logoImageUrl?: SortOrder
  }

  export type SiteSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    enableBackground?: SortOrder
    enableChatbot?: SortOrder
    enableContactForm?: SortOrder
    activeBackgroundPackId?: SortOrder
    backgroundQuality?: SortOrder
    reducedMotionOverride?: SortOrder
    siteTitle?: SortOrder
    tagline?: SortOrder
    aboutContent?: SortOrder
    avatarImageUrl?: SortOrder
    logoImageUrl?: SortOrder
  }

  export type SiteSettingsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SiteSettingsCreateNestedManyWithoutActiveBackgroundPackInput = {
    create?: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput> | SiteSettingsCreateWithoutActiveBackgroundPackInput[] | SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput[]
    connectOrCreate?: SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput | SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput[]
    createMany?: SiteSettingsCreateManyActiveBackgroundPackInputEnvelope
    connect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
  }

  export type SiteSettingsUncheckedCreateNestedManyWithoutActiveBackgroundPackInput = {
    create?: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput> | SiteSettingsCreateWithoutActiveBackgroundPackInput[] | SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput[]
    connectOrCreate?: SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput | SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput[]
    createMany?: SiteSettingsCreateManyActiveBackgroundPackInputEnvelope
    connect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SiteSettingsUpdateManyWithoutActiveBackgroundPackNestedInput = {
    create?: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput> | SiteSettingsCreateWithoutActiveBackgroundPackInput[] | SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput[]
    connectOrCreate?: SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput | SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput[]
    upsert?: SiteSettingsUpsertWithWhereUniqueWithoutActiveBackgroundPackInput | SiteSettingsUpsertWithWhereUniqueWithoutActiveBackgroundPackInput[]
    createMany?: SiteSettingsCreateManyActiveBackgroundPackInputEnvelope
    set?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    disconnect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    delete?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    connect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    update?: SiteSettingsUpdateWithWhereUniqueWithoutActiveBackgroundPackInput | SiteSettingsUpdateWithWhereUniqueWithoutActiveBackgroundPackInput[]
    updateMany?: SiteSettingsUpdateManyWithWhereWithoutActiveBackgroundPackInput | SiteSettingsUpdateManyWithWhereWithoutActiveBackgroundPackInput[]
    deleteMany?: SiteSettingsScalarWhereInput | SiteSettingsScalarWhereInput[]
  }

  export type SiteSettingsUncheckedUpdateManyWithoutActiveBackgroundPackNestedInput = {
    create?: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput> | SiteSettingsCreateWithoutActiveBackgroundPackInput[] | SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput[]
    connectOrCreate?: SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput | SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput[]
    upsert?: SiteSettingsUpsertWithWhereUniqueWithoutActiveBackgroundPackInput | SiteSettingsUpsertWithWhereUniqueWithoutActiveBackgroundPackInput[]
    createMany?: SiteSettingsCreateManyActiveBackgroundPackInputEnvelope
    set?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    disconnect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    delete?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    connect?: SiteSettingsWhereUniqueInput | SiteSettingsWhereUniqueInput[]
    update?: SiteSettingsUpdateWithWhereUniqueWithoutActiveBackgroundPackInput | SiteSettingsUpdateWithWhereUniqueWithoutActiveBackgroundPackInput[]
    updateMany?: SiteSettingsUpdateManyWithWhereWithoutActiveBackgroundPackInput | SiteSettingsUpdateManyWithWhereWithoutActiveBackgroundPackInput[]
    deleteMany?: SiteSettingsScalarWhereInput | SiteSettingsScalarWhereInput[]
  }

  export type BackgroundPackCreateNestedOneWithoutSiteSettingsInput = {
    create?: XOR<BackgroundPackCreateWithoutSiteSettingsInput, BackgroundPackUncheckedCreateWithoutSiteSettingsInput>
    connectOrCreate?: BackgroundPackCreateOrConnectWithoutSiteSettingsInput
    connect?: BackgroundPackWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type BackgroundPackUpdateOneWithoutSiteSettingsNestedInput = {
    create?: XOR<BackgroundPackCreateWithoutSiteSettingsInput, BackgroundPackUncheckedCreateWithoutSiteSettingsInput>
    connectOrCreate?: BackgroundPackCreateOrConnectWithoutSiteSettingsInput
    upsert?: BackgroundPackUpsertWithoutSiteSettingsInput
    disconnect?: BackgroundPackWhereInput | boolean
    delete?: BackgroundPackWhereInput | boolean
    connect?: BackgroundPackWhereUniqueInput
    update?: XOR<XOR<BackgroundPackUpdateToOneWithWhereWithoutSiteSettingsInput, BackgroundPackUpdateWithoutSiteSettingsInput>, BackgroundPackUncheckedUpdateWithoutSiteSettingsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type SiteSettingsCreateWithoutActiveBackgroundPackInput = {
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
  }

  export type SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput = {
    id?: number
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
  }

  export type SiteSettingsCreateOrConnectWithoutActiveBackgroundPackInput = {
    where: SiteSettingsWhereUniqueInput
    create: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput>
  }

  export type SiteSettingsCreateManyActiveBackgroundPackInputEnvelope = {
    data: SiteSettingsCreateManyActiveBackgroundPackInput | SiteSettingsCreateManyActiveBackgroundPackInput[]
    skipDuplicates?: boolean
  }

  export type SiteSettingsUpsertWithWhereUniqueWithoutActiveBackgroundPackInput = {
    where: SiteSettingsWhereUniqueInput
    update: XOR<SiteSettingsUpdateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedUpdateWithoutActiveBackgroundPackInput>
    create: XOR<SiteSettingsCreateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedCreateWithoutActiveBackgroundPackInput>
  }

  export type SiteSettingsUpdateWithWhereUniqueWithoutActiveBackgroundPackInput = {
    where: SiteSettingsWhereUniqueInput
    data: XOR<SiteSettingsUpdateWithoutActiveBackgroundPackInput, SiteSettingsUncheckedUpdateWithoutActiveBackgroundPackInput>
  }

  export type SiteSettingsUpdateManyWithWhereWithoutActiveBackgroundPackInput = {
    where: SiteSettingsScalarWhereInput
    data: XOR<SiteSettingsUpdateManyMutationInput, SiteSettingsUncheckedUpdateManyWithoutActiveBackgroundPackInput>
  }

  export type SiteSettingsScalarWhereInput = {
    AND?: SiteSettingsScalarWhereInput | SiteSettingsScalarWhereInput[]
    OR?: SiteSettingsScalarWhereInput[]
    NOT?: SiteSettingsScalarWhereInput | SiteSettingsScalarWhereInput[]
    id?: IntFilter<"SiteSettings"> | number
    enableBackground?: BoolFilter<"SiteSettings"> | boolean
    enableChatbot?: BoolFilter<"SiteSettings"> | boolean
    enableContactForm?: BoolFilter<"SiteSettings"> | boolean
    activeBackgroundPackId?: StringNullableFilter<"SiteSettings"> | string | null
    backgroundConfig?: JsonFilter<"SiteSettings">
    backgroundQuality?: StringFilter<"SiteSettings"> | string
    reducedMotionOverride?: BoolNullableFilter<"SiteSettings"> | boolean | null
    siteTitle?: StringFilter<"SiteSettings"> | string
    tagline?: StringFilter<"SiteSettings"> | string
    aboutContent?: StringFilter<"SiteSettings"> | string
    avatarImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
    logoImageUrl?: StringNullableFilter<"SiteSettings"> | string | null
  }

  export type BackgroundPackCreateWithoutSiteSettingsInput = {
    id?: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl?: string | null
    interactive?: boolean
    allowExternal?: boolean
    manifest: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundPackUncheckedCreateWithoutSiteSettingsInput = {
    id?: string
    name: string
    version: string
    entryUrl: string
    manifestUrl: string
    previewUrl?: string | null
    interactive?: boolean
    allowExternal?: boolean
    manifest: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BackgroundPackCreateOrConnectWithoutSiteSettingsInput = {
    where: BackgroundPackWhereUniqueInput
    create: XOR<BackgroundPackCreateWithoutSiteSettingsInput, BackgroundPackUncheckedCreateWithoutSiteSettingsInput>
  }

  export type BackgroundPackUpsertWithoutSiteSettingsInput = {
    update: XOR<BackgroundPackUpdateWithoutSiteSettingsInput, BackgroundPackUncheckedUpdateWithoutSiteSettingsInput>
    create: XOR<BackgroundPackCreateWithoutSiteSettingsInput, BackgroundPackUncheckedCreateWithoutSiteSettingsInput>
    where?: BackgroundPackWhereInput
  }

  export type BackgroundPackUpdateToOneWithWhereWithoutSiteSettingsInput = {
    where?: BackgroundPackWhereInput
    data: XOR<BackgroundPackUpdateWithoutSiteSettingsInput, BackgroundPackUncheckedUpdateWithoutSiteSettingsInput>
  }

  export type BackgroundPackUpdateWithoutSiteSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BackgroundPackUncheckedUpdateWithoutSiteSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    version?: StringFieldUpdateOperationsInput | string
    entryUrl?: StringFieldUpdateOperationsInput | string
    manifestUrl?: StringFieldUpdateOperationsInput | string
    previewUrl?: NullableStringFieldUpdateOperationsInput | string | null
    interactive?: BoolFieldUpdateOperationsInput | boolean
    allowExternal?: BoolFieldUpdateOperationsInput | boolean
    manifest?: JsonNullValueInput | InputJsonValue
    uploadedBlobUrls?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingsCreateManyActiveBackgroundPackInput = {
    id?: number
    enableBackground?: boolean
    enableChatbot?: boolean
    enableContactForm?: boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: string
    reducedMotionOverride?: boolean | null
    siteTitle?: string
    tagline?: string
    aboutContent?: string
    avatarImageUrl?: string | null
    logoImageUrl?: string | null
  }

  export type SiteSettingsUpdateWithoutActiveBackgroundPackInput = {
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SiteSettingsUncheckedUpdateWithoutActiveBackgroundPackInput = {
    id?: IntFieldUpdateOperationsInput | number
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SiteSettingsUncheckedUpdateManyWithoutActiveBackgroundPackInput = {
    id?: IntFieldUpdateOperationsInput | number
    enableBackground?: BoolFieldUpdateOperationsInput | boolean
    enableChatbot?: BoolFieldUpdateOperationsInput | boolean
    enableContactForm?: BoolFieldUpdateOperationsInput | boolean
    backgroundConfig?: JsonNullValueInput | InputJsonValue
    backgroundQuality?: StringFieldUpdateOperationsInput | string
    reducedMotionOverride?: NullableBoolFieldUpdateOperationsInput | boolean | null
    siteTitle?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    aboutContent?: StringFieldUpdateOperationsInput | string
    avatarImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    logoImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}