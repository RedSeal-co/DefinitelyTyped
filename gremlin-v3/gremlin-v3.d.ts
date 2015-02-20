// Type definitions for gremlin-v3 0.0.21
// Project: https://github.com/jimlloyd/gremlin-v3
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../q/Q.d.ts" />

declare module 'gremlin-v3' {

  // ## Gremlin
  class Gremlin {
    constructor();

    java: Gremlin.Java;

    HashMap: Gremlin.MapStatic<any, any>;

    T: Gremlin.GremlinT;

    __: Gremlin.TraversalWrapper;

    isType(object: any, javaType: string): boolean;

    newGroovyLambda<T, U, V>(groovy: string): Gremlin.Lambda<T, U, V>;
    importGroovy(javaClassOrPkg: string): void;
    newJavaScriptLambda<T, U, V>(javascript: string): Gremlin.Lambda<T, U, V>;

    wrap(javaObject: any): Gremlin.GraphWrapper;
    wrapTraversal(javaObject: any): Gremlin.TraversalWrapper;
    wrapVertex(javaObject: any): Gremlin.VertexWrapper;
    wrapEdge(javaObject: any): Gremlin.EdgeWrapper;

    getEngine(): Gremlin.GremlinGroovyScriptEngine;
  }

  module Gremlin {

    // ## Java
    // This is the node-java interface, as much of it as we need to declare.
    interface Java {
      callStaticMethodSync(className: string, methodName: string): any;

      // The Java 'import' statement must be told what type of class is being imported.
      import<T>(className: string): T;
    }

    // ## GremlinT
    // com.tinkerpop.gremlin.process.T
    interface GremlinT {
      label: string;
      id: string;
      key: string;
      value: string;
    }

    // ## Set
    // java.util.Set
    interface Set<T> {
      addSync(t: T): void;
      clearSync(): void;
      cloneSync(): Set<T>;
      containsSync(t: T): boolean;
      isEmptySync(): boolean;
      removeSync(t: T): boolean;
      sizeSync(): number;
    }

    // ## Map
    // java.util.Map
    interface Map<K, V> {
      putSync(key: K, value: V): void;
    }

    // ## MapStatic
    // Static interface to any java.util.Map implementation
    interface MapStatic<K, V> {
      new(): Map<K, V>;
    }

    // ## GremlinGroovyScriptEngine
    // com.tinkerpop.gremlin.groovy.jsr223.GremlinGroovyScriptEngine
    interface GremlinGroovyScriptEngine {
      addImportsSync(imports: Set<string>): void;
      useSync(groupId: string, artifactId: string, version: string): void;
      evalSync(script: string): any;
      putSync(symbol: string, value: any): void;
    }

    // ## BiConsumer
    // Represent any java.util.function.BiConsumer;
    interface BiConsumer<T, U> {
      acceptSync(t: T, u: U): void;
    }

    // ## Consumer
    // Represent any java.util.function.Consumer;
    interface Consumer<T> {
      acceptSync(t: T): void;
    }

    // ## Function
    // Represent any java.util.function.Function;
    interface Function<T, U> {
      applySync(t: T): U;
    }

    // ## UnaryOperator
    // Represent any java.util.function.UnaryOperator;
    interface UnaryOperator<T> extends Function<T, T> {
    }

    // ## BiFunction
    // Represent any java.util.function.BiFunction;
    interface BiFunction<T, U, V> {
      applySync(t: T, u: U): V;
    }

    // ## BinaryOperator
    // Represent any java.util.function.BinaryOperator;
    interface BinaryOperator<T> extends BiFunction<T, T, T> {
    }

    // ## Predicate
    // Represent any java.util.function.Predicate
    interface Predicate<T> {
      testSync(t: T): boolean;
      negateSync(): Predicate<T>;
      andSync(other: Predicate<T>): Predicate<T>;
      orSync(other: Predicate<T>): Predicate<T>;
    }

    // ## PredicateStatic
    // Static interface to java.util.function.Predicate
    interface PredicateStatic<T> {
      isEqualSync(targetRef: T): Predicate<T>;
    }

    // ## Supplier
    // Represent any java.util.function.Supplier
    interface Supplier<T> {
      getSync(): T;
    }

    // ## TriConsumer
    // Represent any com.tinkerpop.gremlin.util.function.TriConsumer
    interface TriConsumer<T, U, V> {
      acceptSync(t: T, u: U, v: V): void;
    }

    // ## Lambda
    // Represent GroovyLambda or ScriptEngineLambda, which implement multiple functional interfaces.  We would also
    // like to extend UnaryOperator, BinaryOperator, Consumer, BiConsumer, and TriConsumer, but TypeScript 1.3
    // disallows this.
    interface Lambda<T, U, V> extends Function<T, U>, Predicate<T>, Supplier<T> {
      acceptSync(t: T): void;
      acceptSync(t: T, u: U): void;
      acceptSync(t: T, u: U, v: V): void;
    }

    // ## ChooseOptions
    // Options passed to two-arg form of TraversalWrapper.choose.
    interface ChooseOptions {
      [key: string]: TraversalWrapper;
    }

    // ## TraversalWrapper
    class TraversalWrapper {
      gremlin: Gremlin;

      clone(): TraversalWrapper;

      addInE(edgeLabel: string, stepLabel: string, opts?: any): TraversalWrapper;
      as(stepLabel: string): TraversalWrapper;
      back(stepLabel: string): TraversalWrapper;
      both(...edgeLabels: string[]): TraversalWrapper;
      bothE(...edgeLabels: string[]): TraversalWrapper;
      bothV(): TraversalWrapper;
      by(): TraversalWrapper;
      by(propertyName: string): TraversalWrapper;
      by(functionProjection: Function<any, any>): TraversalWrapper;
      cap(...sideEffectKeys: string[]): TraversalWrapper;
      choose(groovyPredicate: string, trueOption: TraversalWrapper, falseOption: TraversalWrapper): TraversalWrapper;
      choose(chooser: Predicate<any>, trueOption: TraversalWrapper, falseOption: TraversalWrapper): TraversalWrapper;
      choose(groovyFunction: string): TraversalWrapper;
      choose(chooser: Function<any, any>): TraversalWrapper;
      dedup(): TraversalWrapper;
      filter(groovyPredicate: string): TraversalWrapper;
      filter(predicate: Predicate<any>): TraversalWrapper;
      has(property: string): TraversalWrapper;
      has(property: string, value: string): TraversalWrapper;
      in(...edgeLabels: string[]): TraversalWrapper;
      inE(...edgeLabels: string[]): TraversalWrapper;
      inject(...args: any[]): TraversalWrapper;
      inV(): TraversalWrapper;
      option(pickToken: any, traversalOption: TraversalWrapper): TraversalWrapper;
      option(traversalOption: TraversalWrapper): TraversalWrapper;
      order(): TraversalWrapper;
      otherV(): TraversalWrapper;
      out(...edgeLabels: string[]): TraversalWrapper;
      outE(...edgeLabels: string[]): TraversalWrapper;
      outV(): TraversalWrapper;
      path(): TraversalWrapper;
      repeat(repeatTraversal: TraversalWrapper): TraversalWrapper;
      sack(): TraversalWrapper;
      sack(groovy: string): TraversalWrapper;
      sack(sackFunction: BiFunction<any, any, any>): TraversalWrapper;
      sack(groovy: string, elementPropertyKey: string): TraversalWrapper;
      sack(sackOperator: BinaryOperator<any>, elementPropertyKey: string): TraversalWrapper;
      select(): TraversalWrapper;
      select(...labels: string[]): TraversalWrapper;
      sideEffect(groovyConsumer: string): TraversalWrapper;
      sideEffect(consumer: Consumer<any>): TraversalWrapper;
      store(sideEffectKey?: string): TraversalWrapper;
      subgraph(sideEffectKey?: string): TraversalWrapper;
      times(maxLoops: number): TraversalWrapper;
      unfold(): TraversalWrapper;
      until(groovyPredicate: string): TraversalWrapper;
      until(predicate: Predicate<any>): TraversalWrapper;
      until(traversal: TraversalWrapper): TraversalWrapper;
      values(propertyName: string): TraversalWrapper;
      values(propertyNames: string[]): TraversalWrapper;
      withSack(groovyInitialValue: string, groovySplitOperator?: string): TraversalWrapper;
      withSack<T>(initialValue: Supplier<T>, splitOperator?: UnaryOperator<T>): TraversalWrapper;

      asJSONSync(): any[];
      forEach<T>(process: (t: T) => void): Q.Promise<void>;
      iterate(): Q.Promise<GraphWrapper>;
      toArray(): Q.Promise<any[]>;
      next(): Q.Promise<any>;
      hasNext(): Q.Promise<boolean>;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }

    // ## PropertyMap
    interface PropertyMap {
      [s: string]: any;
    }

    // ## GraphWrapper
    class GraphWrapper {
      // GraphSON (sync)
      saveGraphSONSync(graphsonPath: string): GraphWrapper;
      savePrettyGraphSONSync(graphsonPath: string): GraphWrapper;
      loadGraphSONSync(graphsonPath: string): GraphWrapper;
      // GraphSON (callback)
      saveGraphSON(graphsonPath: string, callback: (err: Error, graph: GraphWrapper) => any): void;
      savePrettyGraphSON(graphsonPath: string, callback: (err: Error, graph: GraphWrapper) => any): void;
      loadGraphSON(graphsonPath: string, callback: (err: Error, graph: GraphWrapper) => any): void;
      // GraphSON (promise)
      saveGraphSON(graphsonPath: string): Q.Promise<GraphWrapper>;
      savePrettyGraphSON(graphsonPath: string): Q.Promise<GraphWrapper>;
      loadGraphSON(graphsonPath: string): Q.Promise<GraphWrapper>;

      V(...vertexIds: any[]): TraversalWrapper;
      E(...edgeIds: any[]): TraversalWrapper;

      addVertex(properties?: PropertyMap): Q.Promise<VertexWrapper>;

      toJSON(): any;
    }

    // ## ElementWrapper
    class ElementWrapper {
      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;

      getId(): any;

      value(key: string): Q.Promise<any>;
      valueSync(key: string): any;
      values(propertyNames: string[]): Q.Promise<PropertyMap>;
      setProperty(key: string, value: any): Q.Promise<any>;
      setProperties(properties: PropertyMap): Q.Promise<void>;
      removeProperty(key: string): Q.Promise<void>;
      removeProperties(keys: string[]): Q.Promise<void>;

      remove(): Q.Promise<void>;

      jsonStringifySync(): string;
      toJSON(): any;

      toString(): Q.Promise<string>;
      toStringSync(): string;
    }

    // ## EdgeWrapper
    class EdgeWrapper extends ElementWrapper {
      getLabel(): string;
    }

    // ## VertexWrapper
    class VertexWrapper extends ElementWrapper {
      static simplifyVertexProperties(v: VertexWrapper): any;

      addEdge(edgeLabel: string, inVertex: VertexWrapper, properties?: PropertyMap): Q.Promise<EdgeWrapper>;
    }
  }  // module Gremlin

  export = Gremlin;
}
