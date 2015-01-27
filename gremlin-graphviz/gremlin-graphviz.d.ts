// Type definitions for Gremlin-Graphviz 1.0.0
// Project: https://github.com/mhfrantz/gremlin-graphviz
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../gremlin-v3/gremlin-v3.d.ts"/>
/// <reference path="../graphviz/graphviz.d.ts"/>
/// <reference path="../q/Q.d.ts"/>

declare module 'gremlin-graphviz' {

  import graphviz = require('graphviz');
  import Gremlin = require('gremlin-v3');
  import Q = require('q');

  function makeGraph(gremlinGraph: makeGraph.GremlinGraph, opts?: any): Q.Promise<makeGraph.GraphvizGraph>;

  module makeGraph {

    interface GremlinGraph extends Gremlin.GraphWrapper {}
    interface GraphvizGraph extends graphviz.Graph {}

  }

  export = makeGraph;
}
