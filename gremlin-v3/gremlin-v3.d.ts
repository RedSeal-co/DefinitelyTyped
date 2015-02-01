// Type definitions for gremlin-v3 0.0.13
// Project: https://github.com/jimlloyd/gremlin-v3
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../q/Q.d.ts" />

declare module 'gremlin-v3' {

  // ## Gremlin
  class Gremlin {
    constructor();

    java: Gremlin.Java;

    T: Gremlin.GremlinT;

    isType(object: any, javaType: string): boolean;

    newGroovyLambda<T, U, V>(groovy: string): Gremlin.Lambda<T, U, V>;
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
    // Represent GroovyLambda or ScriptEngineLambda, which implement multiple functional interfaces.
    // We would like to extend Consumer, BiConsumer, and TriConsumer, but TypeScript 1.3 disallows this.
    interface Lambda<T, U, V> extends Function<T, U>, Predicate<T>, Supplier<T> {
      acceptSync(t: T): void;
      acceptSync(t: T, u: U): void;
      acceptSync(t: T, u: U, v: V): void;
    }

    // ## TraversalWrapper
    class TraversalWrapper {
      gremlin: Gremlin;

      addInE(edgeLabel: string, stepLabel: string, opts?: any): TraversalWrapper;
      as(stepLabel: string): TraversalWrapper;
      back(stepLabel: string): TraversalWrapper;
      by(propertyName: string): TraversalWrapper;
      filter(predicate: Predicate<any>): TraversalWrapper;
      has(property: string): TraversalWrapper;
      has(property: string, value: string): TraversalWrapper;
      inject(...args: any[]): TraversalWrapper;
      inV(): TraversalWrapper;
      order(): TraversalWrapper;
      out(edgeLabel: string): TraversalWrapper;
      outV(): TraversalWrapper;
      select(): TraversalWrapper;
      select(...labels: string[]): TraversalWrapper;
      subgraph(groovyEdgePredicate: string): Q.Promise<GraphWrapper>;
      unfold(): TraversalWrapper;
      values(propertyName: string): TraversalWrapper;
      values(propertyNames: string[]): TraversalWrapper;

      asJSONSync(): any[];
      forEach<T>(process: (t: T) => void): Q.Promise<void>;
      iterate(): Q.Promise<GraphWrapper>;
      toArray(): Q.Promise<any[]>;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }

    // ## PropertyMap
    interface PropertyMap {
      [s: string]: any;
    }

    // ## GraphWrapper
    class GraphWrapper {
      saveGraphSONSync(graphsonPath: string): void;
      loadGraphSONSync(graphsonPath: string): void;

      V(): TraversalWrapper;
      E(): TraversalWrapper;

      addVertex(properties?: PropertyMap): Q.Promise<VertexWrapper>;

      toJSON(): any;
    }

    // ## EdgeWrapper
    class EdgeWrapper {
      toStringSync(): string;
      toJSON(): any;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }

    // ## VertexWrapper
    class VertexWrapper {
      static simplifyVertexProperties(v: VertexWrapper): any;

      addEdge(edgeLabel: string, inVertex: VertexWrapper, properties?: PropertyMap): Q.Promise<EdgeWrapper>;
      values(propertyNames: string[]): Q.Promise<PropertyMap>;

      toJSON(): any;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }
  }  // module Gremlin

  export = Gremlin;
}
