// Type definitions for Gremlin-Graphviz 1.1.0
// Project: https://github.com/mhfrantz/gremlin-graphviz
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../bluebird/bluebird.d.ts"/>
/// <reference path="../graphviz/graphviz.d.ts"/>
/// <reference path="../ts-tinkerpop/ts-tinkerpop.d.ts"/>

declare module 'gremlin-graphviz' {

  import BluePromise = require('bluebird');
  import graphviz = require('graphviz');
  import TP = require('ts-tinkerpop');

  function makeGraph(gremlinGraph: makeGraph.GremlinGraph, opts?: makeGraph.Options): BluePromise<makeGraph.GraphvizGraph>;

  module makeGraph {

    type GremlinGraph = Java.Graph;
    type GraphvizGraph = graphviz.Graph;

    interface VertexIdFunction {
      (vertex: Java.Vertex): string;
    }

    interface Options {
      graphName?: string;
      vertexId?: VertexIdFunction;
      TP?: TP.Static;
    }

    module util {

      // *assertVertexId*: Check whether we have a valid vertex ID.
      function assertVertexId(id: any): void;

      // *getVertexId*: Extract the vertex ID from a Gremlin vertex.
      var getVertexId: VertexIdFunction;

      // *vertexAttributeGetter*: Returns a vertex ID function that extracts a specific
      // attribute.
      function vertexAttributeGetter(attributeName: string): VertexIdFunction;

      // *getEdgeLabel*: Extract the label from a Gremlin edge.
      function getEdgeLabel(edge: Java.Edge): string;

    }
  }

  export = makeGraph;
}
