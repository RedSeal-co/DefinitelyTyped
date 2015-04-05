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

  function makeGraph(gremlinGraph: makeGraph.GremlinGraph, opts?: any): BluePromise<makeGraph.GraphvizGraph>;

  module makeGraph {

    type GremlinGraph = Java.Graph;
    type GraphvizGraph = graphviz.Graph;

  }

  export = makeGraph;
}
