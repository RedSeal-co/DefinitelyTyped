///<reference path="gremlin-v3.d.ts"/>

import Gremlin = require('gremlin-v3');

var gremlin: Gremlin = new Gremlin();
var java: Gremlin.Java = gremlin.java;

var javaGraph: any = java.callStaticMethodSync('com.tinkerpop.gremlin.tinkergraph.structure.TinkerGraph', 'open');
var graph: Gremlin.GraphWrapper = gremlin.wrap(javaGraph);

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

// TODO: more tests
