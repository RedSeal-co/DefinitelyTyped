///<reference path="gremlin-v3.d.ts"/>

import Gremlin = require('gremlin-v3');

var gremlin: Gremlin = new Gremlin();
var java: Gremlin.Java = gremlin.java;

function newTinkerGraph(): Gremlin.GraphWrapper {
  var javaGraph: any = java.callStaticMethodSync('com.tinkerpop.gremlin.tinkergraph.structure.TinkerGraph', 'open');
  var graph: Gremlin.GraphWrapper = gremlin.wrap(javaGraph);
  return graph;
}

var graph = newTinkerGraph();
var traversal: Gremlin.TraversalWrapper = graph.V().as('v').has('foo', 'bar');

traversal.toArray()
  .then((array: any[]): void => {
    array.forEach((elem: any): void => { console.log(elem); });
  });

// simplifyVertexProperties
graph.V().toArray()
  .then((vertices: Gremlin.VertexWrapper[]): void => {
    var simplified: any[] = vertices.map((v: Gremlin.VertexWrapper): any => {
      return Gremlin.VertexWrapper.simplifyVertexProperties(v.toJSON());
    })
  });

// GraphSON API
var graphsonPath: string = 'graph.json';
graph.saveGraphSONSync(graphsonPath);
var graph2 = newTinkerGraph();
graph2.loadGraphSONSync(graphsonPath);

// select
graph.V().select();
graph.V().select('one');
graph.V().select('one', 'two');

// subgraph
graph.E().subgraph('{ it -> it.property("foo").isPresent() }')
  .then((sg: Gremlin.GraphWrapper): void => {
    sg.saveGraphSONSync('subgraph.json');
  });

// TODO: more tests
