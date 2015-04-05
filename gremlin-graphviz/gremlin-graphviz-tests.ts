///<reference path="gremlin-graphviz.d.ts"/>
///<reference path="../graphviz/graphviz.d.ts"/>
///<reference path="../node/node.d.ts"/>
///<reference path="../ts-tinkerpop/ts-tinkerpop.d.ts"/>

import fs = require('fs');
import graphviz = require('graphviz');
import gremlinGraphviz = require('gremlin-graphviz');
import TP = require('ts-tinkerpop');

var gremlinGraph: Java.Graph = TP.TinkerFactory.createClassic();

// Create a Graphviz graph (promise) representing the Gremlin graph.
gremlinGraphviz(gremlinGraph).
  then((graphvizGraph: graphviz.Graph): void => {

    // Create a dot representation (synchronous).
    var dotGraph: string = graphvizGraph.to_dot();

    // Create a force-directed graph PNG (async).
    graphvizGraph.use = 'fdp';
    graphvizGraph.output('png', (data: string): void => {

      // Save it as a file.
      fs.writeFileSync('graph.png', data);

    }, (code: number, stdout: string, stderr: string): void => {
      // If something goes wrong with the 'fdp' command...
      throw new Error('fdp failed: ' + stderr);
    });
  });

// Option to provide an alternate graph name.
gremlinGraphviz(gremlinGraph, { graphName: 'AlternateGraphName' });

// Option to provide an alternate vertex ID function.
var alternateVertexId: gremlinGraphviz.VertexIdFunction = gremlinGraphviz.util.vertexAttributeGetter('name');
gremlinGraphviz(gremlinGraph, { vertexId: alternateVertexId });

// The default vertex ID function can be specified explicitly.
gremlinGraphviz(gremlinGraph, { vertexId: gremlinGraphviz.util.getVertexId });

// Option to provide the ts-tinkerpop module.
gremlinGraphviz(gremlinGraph, { TP: TP });
