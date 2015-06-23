// Type definitions for java 0.5.4
// Project: https://github.com/joeferner/java
// Definitions by: Jim Lloyd <https://github.com/jimlloyd>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts" />

declare module 'java' {
  var Java: Java.NodeAPI;
  export = Java;
}

declare module JavaAsyncOptions {
  // Promisify must be defined outside of the Java module, because inside the module
  // Function may be redefined to be the interface for java.util.function.Function.
  interface Promisify {
    (funct: Function, receiver?: any): Function;
  }
}

declare module Java {
  // Node-java has special handling for methods that return long or java.lang.Long,
  // returning a Javascript Number but with an additional property longValue.
  interface longValue_t extends Number {
    longValue: string;
  }

  // Node-java can automatically coerce a javascript string into a java.lang.String.
  // This special type alias allows to declare that possiblity to Typescript.
  export type string_t = string | java.lang.String;

  // Java methods that take java.lang.Object parameters implicitly will take a java.lang.String.
  // But string_t is not sufficient for this case, we need object_t.
  export type object_t = java.lang.Object | string | boolean | number | longValue_t;

  // Java methods that take long or java.lang.Long parameters may take javascript numbers,
  // longValue_t (see above) or java.lang.Long.
  // This special type alias allows to declare that possiblity to Typescript.
  export type long_t = number | longValue_t | java.lang.Long;

  // Handling of other primitive numeric types is simpler, as there is no loss of precision.
  export type boolean_t = boolean | java.lang.Boolean;
  export type short_t = number | java.lang.Short;
  export type integer_t = number | java.lang.Integer;
  export type double_t = number | java.lang.Double;
  export type float_t = number | java.lang.Float;
  export type number_t = number | java.lang.Number;

  export interface array_t<T> extends java.lang.Object {
    // This is an opaque type for a java array_t T[];
    // Use Java.newArray<T>(className, [...]) to create wherever a Java method expects a T[],
    // most notably for vararg parameteters.
    __dummy: T;
  }

  export type object_array_t = array_t<java.lang.Object> | object_t[];

  export interface Callback<T> {
    (err?: Error, result?: T): void;
  }

  interface AsyncOptions {
    syncSuffix: string;
    asyncSuffix?: string;
    promiseSuffix?: string;
    promisify?: JavaAsyncOptions.Promisify;
  }

  // *NodeAPI* declares methods & members exported by the node java module.
  interface NodeAPI {
    classpath: string[];
    asyncOptions: AsyncOptions;
    callMethod(instance: any, className: string, methodName: string, args: any[], callback: Callback<any>): void;
    callMethodSync(instance: any, className: string, methodName: string, ...args: any[]): any;
    callStaticMethodSync(className: string, methodName: string, ...args: any[]): any;
    instanceOf(javaObject: any, className: string): boolean;
    registerClient(before: (cb: Callback<void>) => void, after?: (cb: Callback<void>) => void): void;
    registerClientP(beforeP: () => Promise<void>, afterP?: () => Promise<void>): void;
    ensureJvm(done: Callback<void>): void;
    ensureJvm(): Promise<void>;

    newShort(val: number): java.lang.Short;
    newLong(val: number): java.lang.Long;
    newFloat(val: number): java.lang.Float;
    newDouble(val: number): java.lang.Double;


    newArray(className: 'java.lang.Boolean', arg: boolean_t[]): array_t<java.lang.Boolean>;
    newArray(className: 'java.lang.Double', arg: double_t[]): array_t<java.lang.Double>;
    newArray(className: 'java.lang.Enum', arg: Enum[]): array_t<java.lang.Enum>;
    newArray(className: 'java.lang.Float', arg: float_t[]): array_t<java.lang.Float>;
    newArray(className: 'java.lang.Integer', arg: integer_t[]): array_t<java.lang.Integer>;
    newArray(className: 'java.lang.Long', arg: long_t[]): array_t<java.lang.Long>;
    newArray(className: 'java.lang.Number', arg: number_t[]): array_t<java.lang.Number>;
    newArray(className: 'java.lang.Object', arg: object_t[]): array_t<java.lang.Object>;
    newArray(className: 'java.lang.Short', arg: short_t[]): array_t<java.lang.Short>;
    newArray(className: 'java.lang.String', arg: string_t[]): array_t<java.lang.String>;
    newArray<T>(className: string, arg: any[]): array_t<T>;

    import(className: 'java.lang.Boolean'): java.lang.Boolean.Static;
    import(className: 'java.lang.Double'): java.lang.Double.Static;
    import(className: 'java.lang.Enum'): java.lang.Enum.Static;
    import(className: 'java.lang.Float'): java.lang.Float.Static;
    import(className: 'java.lang.Integer'): java.lang.Integer.Static;
    import(className: 'java.lang.Long'): java.lang.Long.Static;
    import(className: 'java.lang.Number'): java.lang.Number.Static;
    import(className: 'java.lang.Object'): java.lang.Object.Static;
    import(className: 'java.lang.Short'): java.lang.Short.Static;
    import(className: 'java.lang.String'): java.lang.String.Static;
    import(className: string): any;

    newInstance(className: 'java.lang.Boolean', arg0: string_t, cb: Callback<boolean>): void;
    newInstance(className: 'java.lang.Boolean', arg0: boolean_t, cb: Callback<boolean>): void;
    newInstance(className: 'java.lang.Double', arg0: string_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Double', arg0: double_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Float', arg0: string_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Float', arg0: float_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Float', arg0: double_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Integer', arg0: string_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Integer', arg0: integer_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Long', arg0: string_t, cb: Callback<longValue_t>): void;
    newInstance(className: 'java.lang.Long', arg0: long_t, cb: Callback<longValue_t>): void;
    newInstance(className: 'java.lang.Number', cb: Callback<number>): void;
    newInstance(className: 'java.lang.Object', cb: Callback<object_t>): void;
    newInstance(className: 'java.lang.Short', arg0: string_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.Short', arg0: short_t, cb: Callback<number>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: object_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: string_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: integer_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: array_t<integer_t>, arg1: integer_t, arg2: integer_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: object_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: string_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: string_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', arg0: object_array_t, cb: Callback<string>): void;
    newInstance(className: 'java.lang.String', cb: Callback<string>): void;
    newInstance(className: string, ...args: any[]): void;

    newInstanceSync(className: 'java.lang.Boolean', arg0: string_t): boolean;
    newInstanceSync(className: 'java.lang.Boolean', arg0: boolean_t): boolean;
    newInstanceSync(className: 'java.lang.Double', arg0: string_t): number;
    newInstanceSync(className: 'java.lang.Double', arg0: double_t): number;
    newInstanceSync(className: 'java.lang.Float', arg0: string_t): number;
    newInstanceSync(className: 'java.lang.Float', arg0: float_t): number;
    newInstanceSync(className: 'java.lang.Float', arg0: double_t): number;
    newInstanceSync(className: 'java.lang.Integer', arg0: string_t): number;
    newInstanceSync(className: 'java.lang.Integer', arg0: integer_t): number;
    newInstanceSync(className: 'java.lang.Long', arg0: string_t): longValue_t;
    newInstanceSync(className: 'java.lang.Long', arg0: long_t): longValue_t;
    newInstanceSync(className: 'java.lang.Number'): number;
    newInstanceSync(className: 'java.lang.Object'): object_t;
    newInstanceSync(className: 'java.lang.Short', arg0: string_t): number;
    newInstanceSync(className: 'java.lang.Short', arg0: short_t): number;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: object_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: string_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: integer_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: array_t<integer_t>, arg1: integer_t, arg2: integer_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: object_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: string_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: string_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t): string;
    newInstanceSync(className: 'java.lang.String', arg0: object_array_t): string;
    newInstanceSync(className: 'java.lang.String'): string;
    newInstanceSync(className: string, ...args: any[]): any;

    newInstancePromise(className: 'java.lang.Boolean', arg0: string_t): Promise<boolean>;
    newInstancePromise(className: 'java.lang.Boolean', arg0: boolean_t): Promise<boolean>;
    newInstancePromise(className: 'java.lang.Double', arg0: string_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Double', arg0: double_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Float', arg0: string_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Float', arg0: float_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Float', arg0: double_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Integer', arg0: string_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Integer', arg0: integer_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Long', arg0: string_t): Promise<longValue_t>;
    newInstancePromise(className: 'java.lang.Long', arg0: long_t): Promise<longValue_t>;
    newInstancePromise(className: 'java.lang.Number'): Promise<number>;
    newInstancePromise(className: 'java.lang.Object'): Promise<object_t>;
    newInstancePromise(className: 'java.lang.Short', arg0: string_t): Promise<number>;
    newInstancePromise(className: 'java.lang.Short', arg0: short_t): Promise<number>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: object_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: string_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: integer_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: array_t<integer_t>, arg1: integer_t, arg2: integer_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t, arg2: integer_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: object_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: string_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t, arg1: integer_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: string_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String', arg0: object_array_t): Promise<string>;
    newInstancePromise(className: 'java.lang.String'): Promise<string>;
    newInstancePromise(className: string, ...args: any[]): Promise<any>;
  }

  export import Boolean = java.lang.Boolean;
  export import Double = java.lang.Double;
  export import Enum = java.lang.Enum;
  export import Float = java.lang.Float;
  export import Integer = java.lang.Integer;
  export import Long = java.lang.Long;
  export import Object = java.lang.Object;
  export import Short = java.lang.Short;
  export import String = java.lang.String;

  export module java.lang {
    export interface Boolean extends Java.java.lang.Object {
      // public boolean java.lang.Boolean.booleanValue()
      booleanValue(): boolean;
      booleanValueP(): Promise<boolean>;
      // public int java.lang.Boolean.compareTo(java.lang.Boolean)
      compareTo(arg0: boolean_t): number;
      compareToP(arg0: boolean_t): Promise<number>;
      // public int java.lang.Boolean.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Boolean {
      export interface Static {
        new (arg0: string_t): java.lang.Boolean;
        new (arg0: boolean_t): java.lang.Boolean;
        // public static int java.lang.Boolean.compare(boolean,boolean)
        compare(arg0: boolean_t, arg1: boolean_t): number;
        compareP(arg0: boolean_t, arg1: boolean_t): Promise<number>;
        // public static boolean java.lang.Boolean.getBoolean(java.lang.String)
        getBoolean(arg0: string_t): boolean;
        getBooleanP(arg0: string_t): Promise<boolean>;
        // public static int java.lang.Boolean.hashCode(boolean)
        hashCode(arg0: boolean_t): number;
        hashCodeP(arg0: boolean_t): Promise<number>;
        // public static boolean java.lang.Boolean.logicalAnd(boolean,boolean)
        logicalAnd(arg0: boolean_t, arg1: boolean_t): boolean;
        logicalAndP(arg0: boolean_t, arg1: boolean_t): Promise<boolean>;
        // public static boolean java.lang.Boolean.logicalOr(boolean,boolean)
        logicalOr(arg0: boolean_t, arg1: boolean_t): boolean;
        logicalOrP(arg0: boolean_t, arg1: boolean_t): Promise<boolean>;
        // public static boolean java.lang.Boolean.logicalXor(boolean,boolean)
        logicalXor(arg0: boolean_t, arg1: boolean_t): boolean;
        logicalXorP(arg0: boolean_t, arg1: boolean_t): Promise<boolean>;
        // public static boolean java.lang.Boolean.parseBoolean(java.lang.String)
        parseBoolean(arg0: string_t): boolean;
        parseBooleanP(arg0: string_t): Promise<boolean>;
        // public static java.lang.String java.lang.Boolean.toString(boolean)
        toString(arg0: boolean_t): string;
        toStringP(arg0: boolean_t): Promise<string>;
        // public static java.lang.Boolean java.lang.Boolean.valueOf(java.lang.String)
        valueOf(arg0: string_t): boolean;
        valueOfP(arg0: string_t): Promise<boolean>;
        // public static java.lang.Boolean java.lang.Boolean.valueOf(boolean)
        valueOf(arg0: boolean_t): boolean;
        valueOfP(arg0: boolean_t): Promise<boolean>;
        TRUE: boolean;
        FALSE: boolean;
        TYPE: object_t;
      }
    }
  }

  export module java.lang {
    export interface Double extends Java.java.lang.Number {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public int java.lang.Double.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public int java.lang.Double.compareTo(java.lang.Double)
      compareTo(arg0: double_t): number;
      compareToP(arg0: double_t): Promise<number>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public boolean java.lang.Double.isInfinite()
      isInfinite(): boolean;
      isInfiniteP(): Promise<boolean>;
      // public boolean java.lang.Double.isNaN()
      isNaN(): boolean;
      isNaNP(): Promise<boolean>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Double {
      export interface Static {
        new (arg0: string_t): java.lang.Double;
        new (arg0: double_t): java.lang.Double;
        // public static int java.lang.Double.compare(double,double)
        compare(arg0: double_t, arg1: double_t): number;
        compareP(arg0: double_t, arg1: double_t): Promise<number>;
        // public static long java.lang.Double.doubleToLongBits(double)
        doubleToLongBits(arg0: double_t): longValue_t;
        doubleToLongBitsP(arg0: double_t): Promise<longValue_t>;
        // public static native long java.lang.Double.doubleToRawLongBits(double)
        doubleToRawLongBits(arg0: double_t): longValue_t;
        doubleToRawLongBitsP(arg0: double_t): Promise<longValue_t>;
        // public static int java.lang.Double.hashCode(double)
        hashCode(arg0: double_t): number;
        hashCodeP(arg0: double_t): Promise<number>;
        // public static boolean java.lang.Double.isFinite(double)
        isFinite(arg0: double_t): boolean;
        isFiniteP(arg0: double_t): Promise<boolean>;
        // public static boolean java.lang.Double.isInfinite(double)
        isInfinite(arg0: double_t): boolean;
        isInfiniteP(arg0: double_t): Promise<boolean>;
        // public static boolean java.lang.Double.isNaN(double)
        isNaN(arg0: double_t): boolean;
        isNaNP(arg0: double_t): Promise<boolean>;
        // public static native double java.lang.Double.longBitsToDouble(long)
        longBitsToDouble(arg0: long_t): number;
        longBitsToDoubleP(arg0: long_t): Promise<number>;
        // public static double java.lang.Double.max(double,double)
        max(arg0: double_t, arg1: double_t): number;
        maxP(arg0: double_t, arg1: double_t): Promise<number>;
        // public static double java.lang.Double.min(double,double)
        min(arg0: double_t, arg1: double_t): number;
        minP(arg0: double_t, arg1: double_t): Promise<number>;
        // public static double java.lang.Double.parseDouble(java.lang.String) throws java.lang.NumberFormatException
        parseDouble(arg0: string_t): number;
        parseDoubleP(arg0: string_t): Promise<number>;
        // public static double java.lang.Double.sum(double,double)
        sum(arg0: double_t, arg1: double_t): number;
        sumP(arg0: double_t, arg1: double_t): Promise<number>;
        // public static java.lang.String java.lang.Double.toHexString(double)
        toHexString(arg0: double_t): string;
        toHexStringP(arg0: double_t): Promise<string>;
        // public static java.lang.String java.lang.Double.toString(double)
        toString(arg0: double_t): string;
        toStringP(arg0: double_t): Promise<string>;
        // public static java.lang.Double java.lang.Double.valueOf(java.lang.String) throws java.lang.NumberFormatException
        valueOf(arg0: string_t): number;
        valueOfP(arg0: string_t): Promise<number>;
        // public static java.lang.Double java.lang.Double.valueOf(double)
        valueOf(arg0: double_t): number;
        valueOfP(arg0: double_t): Promise<number>;
        POSITIVE_INFINITY: number;
        NEGATIVE_INFINITY: number;
        NaN: number;
        MAX_VALUE: number;
        MIN_NORMAL: number;
        MIN_VALUE: number;
        MAX_EXPONENT: number;
        MIN_EXPONENT: number;
        SIZE: number;
        BYTES: number;
        TYPE: object_t;
      }
    }
  }

  export module java.lang {
    export interface Enum extends Java.java.lang.Object {
      // public int java.lang.Enum.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public final int java.lang.Enum.compareTo(E)
      compareTo(arg0: Enum): number;
      compareToP(arg0: Enum): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public final java.lang.Class<E> java.lang.Enum.getDeclaringClass()
      getDeclaringClass(): object_t;
      getDeclaringClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public final java.lang.String java.lang.Enum.name()
      name(): string;
      nameP(): Promise<string>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public final int java.lang.Enum.ordinal()
      ordinal(): number;
      ordinalP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Enum {
      export interface Static {
        // public static <T> T java.lang.Enum.valueOf(java.lang.Class<T>,java.lang.String)
        valueOf(arg0: object_t, arg1: string_t): Enum;
        valueOfP(arg0: object_t, arg1: string_t): Promise<Enum>;
      }
    }
  }

  export module java.lang {
    export interface Float extends Java.java.lang.Number {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public int java.lang.Float.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public int java.lang.Float.compareTo(java.lang.Float)
      compareTo(arg0: float_t): number;
      compareToP(arg0: float_t): Promise<number>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public boolean java.lang.Float.isInfinite()
      isInfinite(): boolean;
      isInfiniteP(): Promise<boolean>;
      // public boolean java.lang.Float.isNaN()
      isNaN(): boolean;
      isNaNP(): Promise<boolean>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Float {
      export interface Static {
        new (arg0: string_t): java.lang.Float;
        new (arg0: float_t): java.lang.Float;
        new (arg0: double_t): java.lang.Float;
        // public static int java.lang.Float.compare(float,float)
        compare(arg0: float_t, arg1: float_t): number;
        compareP(arg0: float_t, arg1: float_t): Promise<number>;
        // public static int java.lang.Float.floatToIntBits(float)
        floatToIntBits(arg0: float_t): number;
        floatToIntBitsP(arg0: float_t): Promise<number>;
        // public static native int java.lang.Float.floatToRawIntBits(float)
        floatToRawIntBits(arg0: float_t): number;
        floatToRawIntBitsP(arg0: float_t): Promise<number>;
        // public static int java.lang.Float.hashCode(float)
        hashCode(arg0: float_t): number;
        hashCodeP(arg0: float_t): Promise<number>;
        // public static native float java.lang.Float.intBitsToFloat(int)
        intBitsToFloat(arg0: integer_t): number;
        intBitsToFloatP(arg0: integer_t): Promise<number>;
        // public static boolean java.lang.Float.isFinite(float)
        isFinite(arg0: float_t): boolean;
        isFiniteP(arg0: float_t): Promise<boolean>;
        // public static boolean java.lang.Float.isInfinite(float)
        isInfinite(arg0: float_t): boolean;
        isInfiniteP(arg0: float_t): Promise<boolean>;
        // public static boolean java.lang.Float.isNaN(float)
        isNaN(arg0: float_t): boolean;
        isNaNP(arg0: float_t): Promise<boolean>;
        // public static float java.lang.Float.max(float,float)
        max(arg0: float_t, arg1: float_t): number;
        maxP(arg0: float_t, arg1: float_t): Promise<number>;
        // public static float java.lang.Float.min(float,float)
        min(arg0: float_t, arg1: float_t): number;
        minP(arg0: float_t, arg1: float_t): Promise<number>;
        // public static float java.lang.Float.parseFloat(java.lang.String) throws java.lang.NumberFormatException
        parseFloat(arg0: string_t): number;
        parseFloatP(arg0: string_t): Promise<number>;
        // public static float java.lang.Float.sum(float,float)
        sum(arg0: float_t, arg1: float_t): number;
        sumP(arg0: float_t, arg1: float_t): Promise<number>;
        // public static java.lang.String java.lang.Float.toHexString(float)
        toHexString(arg0: float_t): string;
        toHexStringP(arg0: float_t): Promise<string>;
        // public static java.lang.String java.lang.Float.toString(float)
        toString(arg0: float_t): string;
        toStringP(arg0: float_t): Promise<string>;
        // public static java.lang.Float java.lang.Float.valueOf(java.lang.String) throws java.lang.NumberFormatException
        valueOf(arg0: string_t): number;
        valueOfP(arg0: string_t): Promise<number>;
        // public static java.lang.Float java.lang.Float.valueOf(float)
        valueOf(arg0: float_t): number;
        valueOfP(arg0: float_t): Promise<number>;
        POSITIVE_INFINITY: number;
        NEGATIVE_INFINITY: number;
        NaN: number;
        MAX_VALUE: number;
        MIN_NORMAL: number;
        MIN_VALUE: number;
        MAX_EXPONENT: number;
        MIN_EXPONENT: number;
        SIZE: number;
        BYTES: number;
        TYPE: object_t;
      }
    }
  }

  export module java.lang {
    export interface Integer extends Java.java.lang.Number {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public int java.lang.Integer.compareTo(java.lang.Integer)
      compareTo(arg0: integer_t): number;
      compareToP(arg0: integer_t): Promise<number>;
      // public int java.lang.Integer.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Integer {
      export interface Static {
        new (arg0: string_t): java.lang.Integer;
        new (arg0: integer_t): java.lang.Integer;
        // public static int java.lang.Integer.bitCount(int)
        bitCount(arg0: integer_t): number;
        bitCountP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.compare(int,int)
        compare(arg0: integer_t, arg1: integer_t): number;
        compareP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.compareUnsigned(int,int)
        compareUnsigned(arg0: integer_t, arg1: integer_t): number;
        compareUnsignedP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.decode(java.lang.String) throws java.lang.NumberFormatException
        decode(arg0: string_t): number;
        decodeP(arg0: string_t): Promise<number>;
        // public static int java.lang.Integer.divideUnsigned(int,int)
        divideUnsigned(arg0: integer_t, arg1: integer_t): number;
        divideUnsignedP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.getInteger(java.lang.String,java.lang.Integer)
        getInteger(arg0: string_t, arg1: integer_t): number;
        getIntegerP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.getInteger(java.lang.String,int)
        getInteger(arg0: string_t, arg1: integer_t): number;
        getIntegerP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.getInteger(java.lang.String)
        getInteger(arg0: string_t): number;
        getIntegerP(arg0: string_t): Promise<number>;
        // public static int java.lang.Integer.hashCode(int)
        hashCode(arg0: integer_t): number;
        hashCodeP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.highestOneBit(int)
        highestOneBit(arg0: integer_t): number;
        highestOneBitP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.lowestOneBit(int)
        lowestOneBit(arg0: integer_t): number;
        lowestOneBitP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.max(int,int)
        max(arg0: integer_t, arg1: integer_t): number;
        maxP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.min(int,int)
        min(arg0: integer_t, arg1: integer_t): number;
        minP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.numberOfLeadingZeros(int)
        numberOfLeadingZeros(arg0: integer_t): number;
        numberOfLeadingZerosP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.numberOfTrailingZeros(int)
        numberOfTrailingZeros(arg0: integer_t): number;
        numberOfTrailingZerosP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.parseInt(java.lang.String,int) throws java.lang.NumberFormatException
        parseInt(arg0: string_t, arg1: integer_t): number;
        parseIntP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.parseInt(java.lang.String) throws java.lang.NumberFormatException
        parseInt(arg0: string_t): number;
        parseIntP(arg0: string_t): Promise<number>;
        // public static int java.lang.Integer.parseUnsignedInt(java.lang.String,int) throws java.lang.NumberFormatException
        parseUnsignedInt(arg0: string_t, arg1: integer_t): number;
        parseUnsignedIntP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.parseUnsignedInt(java.lang.String) throws java.lang.NumberFormatException
        parseUnsignedInt(arg0: string_t): number;
        parseUnsignedIntP(arg0: string_t): Promise<number>;
        // public static int java.lang.Integer.remainderUnsigned(int,int)
        remainderUnsigned(arg0: integer_t, arg1: integer_t): number;
        remainderUnsignedP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.reverse(int)
        reverse(arg0: integer_t): number;
        reverseP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.reverseBytes(int)
        reverseBytes(arg0: integer_t): number;
        reverseBytesP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.rotateLeft(int,int)
        rotateLeft(arg0: integer_t, arg1: integer_t): number;
        rotateLeftP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.rotateRight(int,int)
        rotateRight(arg0: integer_t, arg1: integer_t): number;
        rotateRightP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static int java.lang.Integer.signum(int)
        signum(arg0: integer_t): number;
        signumP(arg0: integer_t): Promise<number>;
        // public static int java.lang.Integer.sum(int,int)
        sum(arg0: integer_t, arg1: integer_t): number;
        sumP(arg0: integer_t, arg1: integer_t): Promise<number>;
        // public static java.lang.String java.lang.Integer.toBinaryString(int)
        toBinaryString(arg0: integer_t): string;
        toBinaryStringP(arg0: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Integer.toHexString(int)
        toHexString(arg0: integer_t): string;
        toHexStringP(arg0: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Integer.toOctalString(int)
        toOctalString(arg0: integer_t): string;
        toOctalStringP(arg0: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Integer.toString(int,int)
        toString(arg0: integer_t, arg1: integer_t): string;
        toStringP(arg0: integer_t, arg1: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Integer.toString(int)
        toString(arg0: integer_t): string;
        toStringP(arg0: integer_t): Promise<string>;
        // public static long java.lang.Integer.toUnsignedLong(int)
        toUnsignedLong(arg0: integer_t): longValue_t;
        toUnsignedLongP(arg0: integer_t): Promise<longValue_t>;
        // public static java.lang.String java.lang.Integer.toUnsignedString(int,int)
        toUnsignedString(arg0: integer_t, arg1: integer_t): string;
        toUnsignedStringP(arg0: integer_t, arg1: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Integer.toUnsignedString(int)
        toUnsignedString(arg0: integer_t): string;
        toUnsignedStringP(arg0: integer_t): Promise<string>;
        // public static java.lang.Integer java.lang.Integer.valueOf(java.lang.String,int) throws java.lang.NumberFormatException
        valueOf(arg0: string_t, arg1: integer_t): number;
        valueOfP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.valueOf(java.lang.String) throws java.lang.NumberFormatException
        valueOf(arg0: string_t): number;
        valueOfP(arg0: string_t): Promise<number>;
        // public static java.lang.Integer java.lang.Integer.valueOf(int)
        valueOf(arg0: integer_t): number;
        valueOfP(arg0: integer_t): Promise<number>;
        MIN_VALUE: number;
        MAX_VALUE: number;
        TYPE: object_t;
        SIZE: number;
        BYTES: number;
      }
    }
  }

  export module java.lang {
    export interface Long extends Java.java.lang.Number {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public int java.lang.Long.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public int java.lang.Long.compareTo(java.lang.Long)
      compareTo(arg0: long_t): number;
      compareToP(arg0: long_t): Promise<number>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Long {
      export interface Static {
        new (arg0: string_t): java.lang.Long;
        new (arg0: long_t): java.lang.Long;
        // public static int java.lang.Long.bitCount(long)
        bitCount(arg0: long_t): number;
        bitCountP(arg0: long_t): Promise<number>;
        // public static int java.lang.Long.compare(long,long)
        compare(arg0: long_t, arg1: long_t): number;
        compareP(arg0: long_t, arg1: long_t): Promise<number>;
        // public static int java.lang.Long.compareUnsigned(long,long)
        compareUnsigned(arg0: long_t, arg1: long_t): number;
        compareUnsignedP(arg0: long_t, arg1: long_t): Promise<number>;
        // public static java.lang.Long java.lang.Long.decode(java.lang.String) throws java.lang.NumberFormatException
        decode(arg0: string_t): longValue_t;
        decodeP(arg0: string_t): Promise<longValue_t>;
        // public static long java.lang.Long.divideUnsigned(long,long)
        divideUnsigned(arg0: long_t, arg1: long_t): longValue_t;
        divideUnsignedP(arg0: long_t, arg1: long_t): Promise<longValue_t>;
        // public static java.lang.Long java.lang.Long.getLong(java.lang.String,java.lang.Long)
        getLong(arg0: string_t, arg1: long_t): longValue_t;
        getLongP(arg0: string_t, arg1: long_t): Promise<longValue_t>;
        // public static java.lang.Long java.lang.Long.getLong(java.lang.String,long)
        getLong(arg0: string_t, arg1: long_t): longValue_t;
        getLongP(arg0: string_t, arg1: long_t): Promise<longValue_t>;
        // public static java.lang.Long java.lang.Long.getLong(java.lang.String)
        getLong(arg0: string_t): longValue_t;
        getLongP(arg0: string_t): Promise<longValue_t>;
        // public static int java.lang.Long.hashCode(long)
        hashCode(arg0: long_t): number;
        hashCodeP(arg0: long_t): Promise<number>;
        // public static long java.lang.Long.highestOneBit(long)
        highestOneBit(arg0: long_t): longValue_t;
        highestOneBitP(arg0: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.lowestOneBit(long)
        lowestOneBit(arg0: long_t): longValue_t;
        lowestOneBitP(arg0: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.max(long,long)
        max(arg0: long_t, arg1: long_t): longValue_t;
        maxP(arg0: long_t, arg1: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.min(long,long)
        min(arg0: long_t, arg1: long_t): longValue_t;
        minP(arg0: long_t, arg1: long_t): Promise<longValue_t>;
        // public static int java.lang.Long.numberOfLeadingZeros(long)
        numberOfLeadingZeros(arg0: long_t): number;
        numberOfLeadingZerosP(arg0: long_t): Promise<number>;
        // public static int java.lang.Long.numberOfTrailingZeros(long)
        numberOfTrailingZeros(arg0: long_t): number;
        numberOfTrailingZerosP(arg0: long_t): Promise<number>;
        // public static long java.lang.Long.parseLong(java.lang.String,int) throws java.lang.NumberFormatException
        parseLong(arg0: string_t, arg1: integer_t): longValue_t;
        parseLongP(arg0: string_t, arg1: integer_t): Promise<longValue_t>;
        // public static long java.lang.Long.parseLong(java.lang.String) throws java.lang.NumberFormatException
        parseLong(arg0: string_t): longValue_t;
        parseLongP(arg0: string_t): Promise<longValue_t>;
        // public static long java.lang.Long.parseUnsignedLong(java.lang.String,int) throws java.lang.NumberFormatException
        parseUnsignedLong(arg0: string_t, arg1: integer_t): longValue_t;
        parseUnsignedLongP(arg0: string_t, arg1: integer_t): Promise<longValue_t>;
        // public static long java.lang.Long.parseUnsignedLong(java.lang.String) throws java.lang.NumberFormatException
        parseUnsignedLong(arg0: string_t): longValue_t;
        parseUnsignedLongP(arg0: string_t): Promise<longValue_t>;
        // public static long java.lang.Long.remainderUnsigned(long,long)
        remainderUnsigned(arg0: long_t, arg1: long_t): longValue_t;
        remainderUnsignedP(arg0: long_t, arg1: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.reverse(long)
        reverse(arg0: long_t): longValue_t;
        reverseP(arg0: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.reverseBytes(long)
        reverseBytes(arg0: long_t): longValue_t;
        reverseBytesP(arg0: long_t): Promise<longValue_t>;
        // public static long java.lang.Long.rotateLeft(long,int)
        rotateLeft(arg0: long_t, arg1: integer_t): longValue_t;
        rotateLeftP(arg0: long_t, arg1: integer_t): Promise<longValue_t>;
        // public static long java.lang.Long.rotateRight(long,int)
        rotateRight(arg0: long_t, arg1: integer_t): longValue_t;
        rotateRightP(arg0: long_t, arg1: integer_t): Promise<longValue_t>;
        // public static int java.lang.Long.signum(long)
        signum(arg0: long_t): number;
        signumP(arg0: long_t): Promise<number>;
        // public static long java.lang.Long.sum(long,long)
        sum(arg0: long_t, arg1: long_t): longValue_t;
        sumP(arg0: long_t, arg1: long_t): Promise<longValue_t>;
        // public static java.lang.String java.lang.Long.toBinaryString(long)
        toBinaryString(arg0: long_t): string;
        toBinaryStringP(arg0: long_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toHexString(long)
        toHexString(arg0: long_t): string;
        toHexStringP(arg0: long_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toOctalString(long)
        toOctalString(arg0: long_t): string;
        toOctalStringP(arg0: long_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toString(long,int)
        toString(arg0: long_t, arg1: integer_t): string;
        toStringP(arg0: long_t, arg1: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toString(long)
        toString(arg0: long_t): string;
        toStringP(arg0: long_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toUnsignedString(long,int)
        toUnsignedString(arg0: long_t, arg1: integer_t): string;
        toUnsignedStringP(arg0: long_t, arg1: integer_t): Promise<string>;
        // public static java.lang.String java.lang.Long.toUnsignedString(long)
        toUnsignedString(arg0: long_t): string;
        toUnsignedStringP(arg0: long_t): Promise<string>;
        // public static java.lang.Long java.lang.Long.valueOf(java.lang.String,int) throws java.lang.NumberFormatException
        valueOf(arg0: string_t, arg1: integer_t): longValue_t;
        valueOfP(arg0: string_t, arg1: integer_t): Promise<longValue_t>;
        // public static java.lang.Long java.lang.Long.valueOf(java.lang.String) throws java.lang.NumberFormatException
        valueOf(arg0: string_t): longValue_t;
        valueOfP(arg0: string_t): Promise<longValue_t>;
        // public static java.lang.Long java.lang.Long.valueOf(long)
        valueOf(arg0: long_t): longValue_t;
        valueOfP(arg0: long_t): Promise<longValue_t>;
        MIN_VALUE: longValue_t;
        MAX_VALUE: longValue_t;
        TYPE: object_t;
        SIZE: number;
        BYTES: number;
      }
    }
  }

  export module java.lang {
    export interface Number extends Java.java.lang.Object {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Number {
      export interface Static {
        new (): java.lang.Number;
      }
    }
  }

  export module java.lang {
    export interface Object  {
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Object {
      export interface Static {
        new (): java.lang.Object;
      }
    }
  }

  export module java.lang {
    export interface Short extends Java.java.lang.Number {
      // public byte java.lang.Number.byteValue()
      byteValue(): object_t;
      byteValueP(): Promise<object_t>;
      // public int java.lang.Short.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public int java.lang.Short.compareTo(java.lang.Short)
      compareTo(arg0: short_t): number;
      compareToP(arg0: short_t): Promise<number>;
      // public abstract double java.lang.Number.doubleValue()
      doubleValue(): number;
      doubleValueP(): Promise<number>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public abstract float java.lang.Number.floatValue()
      floatValue(): number;
      floatValueP(): Promise<number>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public abstract int java.lang.Number.intValue()
      intValue(): number;
      intValueP(): Promise<number>;
      // public abstract long java.lang.Number.longValue()
      longValue(): longValue_t;
      longValueP(): Promise<longValue_t>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public short java.lang.Number.shortValue()
      shortValue(): number;
      shortValueP(): Promise<number>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module Short {
      export interface Static {
        new (arg0: string_t): java.lang.Short;
        new (arg0: short_t): java.lang.Short;
        // public static int java.lang.Short.compare(short,short)
        compare(arg0: short_t, arg1: short_t): number;
        compareP(arg0: short_t, arg1: short_t): Promise<number>;
        // public static java.lang.Short java.lang.Short.decode(java.lang.String) throws java.lang.NumberFormatException
        decode(arg0: string_t): number;
        decodeP(arg0: string_t): Promise<number>;
        // public static int java.lang.Short.hashCode(short)
        hashCode(arg0: short_t): number;
        hashCodeP(arg0: short_t): Promise<number>;
        // public static short java.lang.Short.parseShort(java.lang.String,int) throws java.lang.NumberFormatException
        parseShort(arg0: string_t, arg1: integer_t): number;
        parseShortP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static short java.lang.Short.parseShort(java.lang.String) throws java.lang.NumberFormatException
        parseShort(arg0: string_t): number;
        parseShortP(arg0: string_t): Promise<number>;
        // public static short java.lang.Short.reverseBytes(short)
        reverseBytes(arg0: short_t): number;
        reverseBytesP(arg0: short_t): Promise<number>;
        // public static java.lang.String java.lang.Short.toString(short)
        toString(arg0: short_t): string;
        toStringP(arg0: short_t): Promise<string>;
        // public static int java.lang.Short.toUnsignedInt(short)
        toUnsignedInt(arg0: short_t): number;
        toUnsignedIntP(arg0: short_t): Promise<number>;
        // public static long java.lang.Short.toUnsignedLong(short)
        toUnsignedLong(arg0: short_t): longValue_t;
        toUnsignedLongP(arg0: short_t): Promise<longValue_t>;
        // public static java.lang.Short java.lang.Short.valueOf(java.lang.String,int) throws java.lang.NumberFormatException
        valueOf(arg0: string_t, arg1: integer_t): number;
        valueOfP(arg0: string_t, arg1: integer_t): Promise<number>;
        // public static java.lang.Short java.lang.Short.valueOf(java.lang.String) throws java.lang.NumberFormatException
        valueOf(arg0: string_t): number;
        valueOfP(arg0: string_t): Promise<number>;
        // public static java.lang.Short java.lang.Short.valueOf(short)
        valueOf(arg0: short_t): number;
        valueOfP(arg0: short_t): Promise<number>;
        MIN_VALUE: number;
        MAX_VALUE: number;
        TYPE: object_t;
        SIZE: number;
        BYTES: number;
      }
    }
  }

  export module java.lang {
    export interface String extends Java.java.lang.Object {
      // public char java.lang.String.charAt(int)
      charAt(arg0: integer_t): object_t;
      charAtP(arg0: integer_t): Promise<object_t>;
      // public default java.util.stream.IntStream java.lang.CharSequence.chars()
      chars(): object_t;
      charsP(): Promise<object_t>;
      // public int java.lang.String.codePointAt(int)
      codePointAt(arg0: integer_t): number;
      codePointAtP(arg0: integer_t): Promise<number>;
      // public int java.lang.String.codePointBefore(int)
      codePointBefore(arg0: integer_t): number;
      codePointBeforeP(arg0: integer_t): Promise<number>;
      // public int java.lang.String.codePointCount(int,int)
      codePointCount(arg0: integer_t, arg1: integer_t): number;
      codePointCountP(arg0: integer_t, arg1: integer_t): Promise<number>;
      // public default java.util.stream.IntStream java.lang.CharSequence.codePoints()
      codePoints(): object_t;
      codePointsP(): Promise<object_t>;
      // public int java.lang.String.compareTo(java.lang.String)
      compareTo(arg0: string_t): number;
      compareToP(arg0: string_t): Promise<number>;
      // public int java.lang.String.compareTo(java.lang.Object)
      compareTo(arg0: object_t): number;
      compareToP(arg0: object_t): Promise<number>;
      // public int java.lang.String.compareToIgnoreCase(java.lang.String)
      compareToIgnoreCase(arg0: string_t): number;
      compareToIgnoreCaseP(arg0: string_t): Promise<number>;
      // public java.lang.String java.lang.String.concat(java.lang.String)
      concat(arg0: string_t): string;
      concatP(arg0: string_t): Promise<string>;
      // public boolean java.lang.String.contains(java.lang.CharSequence)
      contains(arg0: object_t): boolean;
      containsP(arg0: object_t): Promise<boolean>;
      // public boolean java.lang.String.contentEquals(java.lang.StringBuffer)
      contentEquals(arg0: object_t): boolean;
      contentEqualsP(arg0: object_t): Promise<boolean>;
      // public boolean java.lang.String.contentEquals(java.lang.CharSequence)
      contentEquals(arg0: object_t): boolean;
      contentEqualsP(arg0: object_t): Promise<boolean>;
      // public boolean java.lang.String.endsWith(java.lang.String)
      endsWith(arg0: string_t): boolean;
      endsWithP(arg0: string_t): Promise<boolean>;
      // public boolean java.lang.Object.equals(java.lang.Object)
      equals(arg0: object_t): boolean;
      equalsP(arg0: object_t): Promise<boolean>;
      // public boolean java.lang.String.equalsIgnoreCase(java.lang.String)
      equalsIgnoreCase(arg0: string_t): boolean;
      equalsIgnoreCaseP(arg0: string_t): Promise<boolean>;
      // public void java.lang.String.getBytes(int,int,byte[],int)
      getBytes(arg0: integer_t, arg1: integer_t, arg2: object_array_t, arg3: integer_t): void;
      getBytesP(arg0: integer_t, arg1: integer_t, arg2: object_array_t, arg3: integer_t): Promise<void>;
      // public byte[] java.lang.String.getBytes(java.nio.charset.Charset)
      getBytes(arg0: object_t): object_t[];
      getBytesP(arg0: object_t): Promise<object_t[]>;
      // public byte[] java.lang.String.getBytes(java.lang.String) throws java.io.UnsupportedEncodingException
      getBytes(arg0: string_t): object_t[];
      getBytesP(arg0: string_t): Promise<object_t[]>;
      // public byte[] java.lang.String.getBytes()
      getBytes(): object_t[];
      getBytesP(): Promise<object_t[]>;
      // public void java.lang.String.getChars(int,int,char[],int)
      getChars(arg0: integer_t, arg1: integer_t, arg2: object_array_t, arg3: integer_t): void;
      getCharsP(arg0: integer_t, arg1: integer_t, arg2: object_array_t, arg3: integer_t): Promise<void>;
      // public final native java.lang.Class<?> java.lang.Object.getClass()
      getClass(): object_t;
      getClassP(): Promise<object_t>;
      // public native int java.lang.Object.hashCode()
      hashCode(): number;
      hashCodeP(): Promise<number>;
      // public int java.lang.String.indexOf(java.lang.String,int)
      indexOf(arg0: string_t, arg1: integer_t): number;
      indexOfP(arg0: string_t, arg1: integer_t): Promise<number>;
      // public int java.lang.String.indexOf(int,int)
      indexOf(arg0: integer_t, arg1: integer_t): number;
      indexOfP(arg0: integer_t, arg1: integer_t): Promise<number>;
      // public int java.lang.String.indexOf(java.lang.String)
      indexOf(arg0: string_t): number;
      indexOfP(arg0: string_t): Promise<number>;
      // public int java.lang.String.indexOf(int)
      indexOf(arg0: integer_t): number;
      indexOfP(arg0: integer_t): Promise<number>;
      // public native java.lang.String java.lang.String.intern()
      intern(): string;
      internP(): Promise<string>;
      // public boolean java.lang.String.isEmpty()
      isEmpty(): boolean;
      isEmptyP(): Promise<boolean>;
      // public int java.lang.String.lastIndexOf(java.lang.String,int)
      lastIndexOf(arg0: string_t, arg1: integer_t): number;
      lastIndexOfP(arg0: string_t, arg1: integer_t): Promise<number>;
      // public int java.lang.String.lastIndexOf(int,int)
      lastIndexOf(arg0: integer_t, arg1: integer_t): number;
      lastIndexOfP(arg0: integer_t, arg1: integer_t): Promise<number>;
      // public int java.lang.String.lastIndexOf(java.lang.String)
      lastIndexOf(arg0: string_t): number;
      lastIndexOfP(arg0: string_t): Promise<number>;
      // public int java.lang.String.lastIndexOf(int)
      lastIndexOf(arg0: integer_t): number;
      lastIndexOfP(arg0: integer_t): Promise<number>;
      // public int java.lang.String.length()
      length(): number;
      lengthP(): Promise<number>;
      // public boolean java.lang.String.matches(java.lang.String)
      matches(arg0: string_t): boolean;
      matchesP(arg0: string_t): Promise<boolean>;
      // public final native void java.lang.Object.notify()
      notify(): void;
      notifyP(): Promise<void>;
      // public final native void java.lang.Object.notifyAll()
      notifyAll(): void;
      notifyAllP(): Promise<void>;
      // public int java.lang.String.offsetByCodePoints(int,int)
      offsetByCodePoints(arg0: integer_t, arg1: integer_t): number;
      offsetByCodePointsP(arg0: integer_t, arg1: integer_t): Promise<number>;
      // public boolean java.lang.String.regionMatches(boolean,int,java.lang.String,int,int)
      regionMatches(arg0: boolean_t, arg1: integer_t, arg2: string_t, arg3: integer_t, arg4: integer_t): boolean;
      regionMatchesP(arg0: boolean_t, arg1: integer_t, arg2: string_t, arg3: integer_t, arg4: integer_t): Promise<boolean>;
      // public boolean java.lang.String.regionMatches(int,java.lang.String,int,int)
      regionMatches(arg0: integer_t, arg1: string_t, arg2: integer_t, arg3: integer_t): boolean;
      regionMatchesP(arg0: integer_t, arg1: string_t, arg2: integer_t, arg3: integer_t): Promise<boolean>;
      // public java.lang.String java.lang.String.replace(java.lang.CharSequence,java.lang.CharSequence)
      replace(arg0: object_t, arg1: object_t): string;
      replaceP(arg0: object_t, arg1: object_t): Promise<string>;
      // public java.lang.String java.lang.String.replace(char,char)
      replace(arg0: object_t, arg1: object_t): string;
      replaceP(arg0: object_t, arg1: object_t): Promise<string>;
      // public java.lang.String java.lang.String.replaceAll(java.lang.String,java.lang.String)
      replaceAll(arg0: string_t, arg1: string_t): string;
      replaceAllP(arg0: string_t, arg1: string_t): Promise<string>;
      // public java.lang.String java.lang.String.replaceFirst(java.lang.String,java.lang.String)
      replaceFirst(arg0: string_t, arg1: string_t): string;
      replaceFirstP(arg0: string_t, arg1: string_t): Promise<string>;
      // public java.lang.String[] java.lang.String.split(java.lang.String,int)
      split(arg0: string_t, arg1: integer_t): string[];
      splitP(arg0: string_t, arg1: integer_t): Promise<string[]>;
      // public java.lang.String[] java.lang.String.split(java.lang.String)
      split(arg0: string_t): string[];
      splitP(arg0: string_t): Promise<string[]>;
      // public boolean java.lang.String.startsWith(java.lang.String,int)
      startsWith(arg0: string_t, arg1: integer_t): boolean;
      startsWithP(arg0: string_t, arg1: integer_t): Promise<boolean>;
      // public boolean java.lang.String.startsWith(java.lang.String)
      startsWith(arg0: string_t): boolean;
      startsWithP(arg0: string_t): Promise<boolean>;
      // public java.lang.CharSequence java.lang.String.subSequence(int,int)
      subSequence(arg0: integer_t, arg1: integer_t): object_t;
      subSequenceP(arg0: integer_t, arg1: integer_t): Promise<object_t>;
      // public java.lang.String java.lang.String.substring(int,int)
      substring(arg0: integer_t, arg1: integer_t): string;
      substringP(arg0: integer_t, arg1: integer_t): Promise<string>;
      // public java.lang.String java.lang.String.substring(int)
      substring(arg0: integer_t): string;
      substringP(arg0: integer_t): Promise<string>;
      // public char[] java.lang.String.toCharArray()
      toCharArray(): object_t[];
      toCharArrayP(): Promise<object_t[]>;
      // public java.lang.String java.lang.String.toLowerCase(java.util.Locale)
      toLowerCase(arg0: object_t): string;
      toLowerCaseP(arg0: object_t): Promise<string>;
      // public java.lang.String java.lang.String.toLowerCase()
      toLowerCase(): string;
      toLowerCaseP(): Promise<string>;
      // public java.lang.String java.lang.Object.toString()
      toString(): string;
      toStringP(): Promise<string>;
      // public java.lang.String java.lang.String.toUpperCase(java.util.Locale)
      toUpperCase(arg0: object_t): string;
      toUpperCaseP(arg0: object_t): Promise<string>;
      // public java.lang.String java.lang.String.toUpperCase()
      toUpperCase(): string;
      toUpperCaseP(): Promise<string>;
      // public java.lang.String java.lang.String.trim()
      trim(): string;
      trimP(): Promise<string>;
      // public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
      wait(arg0: long_t, arg1: integer_t): void;
      waitP(arg0: long_t, arg1: integer_t): Promise<void>;
      // public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
      wait(arg0: long_t): void;
      waitP(arg0: long_t): Promise<void>;
      // public final void java.lang.Object.wait() throws java.lang.InterruptedException
      wait(): void;
      waitP(): Promise<void>;
    }
    export module String {
      export interface Static {
        new (arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: object_t): java.lang.String;
        new (arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: string_t): java.lang.String;
        new (arg0: object_array_t, arg1: integer_t, arg2: integer_t, arg3: integer_t): java.lang.String;
        new (arg0: array_t<integer_t>, arg1: integer_t, arg2: integer_t): java.lang.String;
        new (arg0: object_array_t, arg1: integer_t, arg2: integer_t): java.lang.String;
        new (arg0: object_array_t, arg1: integer_t, arg2: integer_t): java.lang.String;
        new (arg0: object_array_t, arg1: object_t): java.lang.String;
        new (arg0: object_array_t, arg1: string_t): java.lang.String;
        new (arg0: object_array_t, arg1: integer_t): java.lang.String;
        new (arg0: object_t): java.lang.String;
        new (arg0: object_t): java.lang.String;
        new (arg0: string_t): java.lang.String;
        new (arg0: object_array_t): java.lang.String;
        new (arg0: object_array_t): java.lang.String;
        new (): java.lang.String;
        // public static java.lang.String java.lang.String.copyValueOf(char[],int,int)
        copyValueOf(arg0: object_array_t, arg1: integer_t, arg2: integer_t): string;
        copyValueOfP(arg0: object_array_t, arg1: integer_t, arg2: integer_t): Promise<string>;
        // public static java.lang.String java.lang.String.copyValueOf(char[])
        copyValueOf(arg0: object_array_t): string;
        copyValueOfP(arg0: object_array_t): Promise<string>;
        // public static java.lang.String java.lang.String.format(java.util.Locale,java.lang.String,java.lang.Object...)
        format(arg0: object_t, arg1: string_t, ...arg2: object_t[]): string;
        format(arg0: object_t, arg1: string_t, arg2: object_array_t): string;
        formatP(arg0: object_t, arg1: string_t, ...arg2: object_t[]): Promise<string>;
        formatP(arg0: object_t, arg1: string_t, arg2: object_array_t): Promise<string>;
        // public static java.lang.String java.lang.String.format(java.lang.String,java.lang.Object...)
        format(arg0: string_t, ...arg1: object_t[]): string;
        format(arg0: string_t, arg1: object_array_t): string;
        formatP(arg0: string_t, ...arg1: object_t[]): Promise<string>;
        formatP(arg0: string_t, arg1: object_array_t): Promise<string>;
        // public static java.lang.String java.lang.String.join(java.lang.CharSequence,java.lang.CharSequence...)
        join(arg0: object_t, ...arg1: object_t[]): string;
        join(arg0: object_t, arg1: object_array_t): string;
        joinP(arg0: object_t, ...arg1: object_t[]): Promise<string>;
        joinP(arg0: object_t, arg1: object_array_t): Promise<string>;
        // public static java.lang.String java.lang.String.join(java.lang.CharSequence,java.lang.Iterable<? extends java.lang.CharSequence>)
        join(arg0: object_t, arg1: object_t): string;
        joinP(arg0: object_t, arg1: object_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(char[],int,int)
        valueOf(arg0: object_array_t, arg1: integer_t, arg2: integer_t): string;
        valueOfP(arg0: object_array_t, arg1: integer_t, arg2: integer_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(java.lang.Object)
        valueOf(arg0: object_t): string;
        valueOfP(arg0: object_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(char[])
        valueOf(arg0: object_array_t): string;
        valueOfP(arg0: object_array_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(boolean)
        valueOf(arg0: boolean_t): string;
        valueOfP(arg0: boolean_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(long)
        valueOf(arg0: long_t): string;
        valueOfP(arg0: long_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(int)
        valueOf(arg0: integer_t): string;
        valueOfP(arg0: integer_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(float)
        valueOf(arg0: float_t): string;
        valueOfP(arg0: float_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(double)
        valueOf(arg0: double_t): string;
        valueOfP(arg0: double_t): Promise<string>;
        // public static java.lang.String java.lang.String.valueOf(char)
        valueOf(arg0: object_t): string;
        valueOfP(arg0: object_t): Promise<string>;
        CASE_INSENSITIVE_ORDER: object_t;
      }
    }
  }

}
