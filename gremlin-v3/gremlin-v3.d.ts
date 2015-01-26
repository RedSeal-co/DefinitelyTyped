// Type definitions for gremlin-v3 0.0.10
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

    // ## TraversalWrapper
    interface TraversalWrapper {
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
      select(labels: string[]): TraversalWrapper;
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
    interface GraphWrapper {
      loadGraphSONSync(graphsonPath: string): void;

      V(): TraversalWrapper;
      E(): TraversalWrapper;

      addVertex(properties?: PropertyMap): Q.Promise<VertexWrapper>;

      toJSON(): string;
    }

    // ## EdgeWrapper
    interface EdgeWrapper {
      toStringSync(): string;
      toJSON(): string;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }

    // ## VertexWrapper
    class VertexWrapper {
      static simplifyVertexProperties(v: VertexWrapper): any;

      addEdge(edgeLabel: string, inVertex: VertexWrapper, properties?: PropertyMap): Q.Promise<EdgeWrapper>;
      values(propertyNames: string[]): Q.Promise<PropertyMap>;

      toJSON(): string;

      // Expose the underlying Java object for debugging/hacking.
      unwrap(): any;
    }
  }  // module Gremlin

  export = Gremlin;
}
