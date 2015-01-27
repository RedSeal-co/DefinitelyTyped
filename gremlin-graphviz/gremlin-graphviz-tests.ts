///<reference path="gremlin-graphviz.d.ts"/>
///<reference path="../graphviz/graphviz.d.ts"/>
///<reference path="../gremlin-v3/gremlin-v3.d.ts"/>
///<reference path="../node/node.d.ts"/>

import fs = require('fs');
import graphviz = require('graphviz');
import gremlinGraphviz = require('gremlin-graphviz');
import Gremlin = require('gremlin-v3');

var gremlin = new Gremlin();
var TinkerFactory: any = gremlin.java.import('com.tinkerpop.gremlin.tinkergraph.structure.TinkerFactory');
var gremlinGraph: Gremlin.GraphWrapper = gremlin.wrap(TinkerFactory.createClassicSync());

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
