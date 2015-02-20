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

// ## Graph
// ### newGroovyLambda
var groovyLambda: Gremlin.Lambda<number, string, boolean>
  = gremlin.newGroovyLambda<number, string, boolean>('{ a, b, c -> a + b + c }');
// ### importGroovy
gremlin.importGroovy('some.path.to.a.package.MyClass');
// ### newJavaScriptLambda
var javaScriptLambda: Gremlin.Lambda<number, string, boolean>
  = gremlin.newJavaScriptLambda<number, string, boolean>('a + b + c');

var traversal: Gremlin.TraversalWrapper = graph.V().as('v').has('foo', 'bar');

// clone
var clone: Gremlin.TraversalWrapper = traversal.clone();

// toArray
traversal.toArray()
  .then((array: any[]): void => {
    array.forEach((elem: any): void => { console.log(elem); });
  });

// hasNext/next
function iterate(traversal: Gremlin.TraversalWrapper, process: (elem: any) => void): void {
  traversal.hasNext()
    .then((hasNext: boolean): void => {
      if (hasNext) {
        traversal.next()
          .then(process)
          .then((): void => { iterate(traversal, process); });
      }
    });
}

// simplifyVertexProperties
graph.V().toArray()
  .then((vertices: Gremlin.VertexWrapper[]): void => {
    var simplified: any[] = vertices.map((v: Gremlin.VertexWrapper): any => {
      return Gremlin.VertexWrapper.simplifyVertexProperties(v.toJSON());
    })
  });

// GraphSON API
// ... sync
{
  var graphsonPath: string = 'graph.json';
  graph.saveGraphSONSync(graphsonPath);
  graph.savePrettyGraphSONSync(graphsonPath);
  var graph2 = newTinkerGraph();
  graph2.loadGraphSONSync(graphsonPath);
}
// ... callback
graph.saveGraphSON(graphsonPath, (err: Error, graph: Gremlin.GraphWrapper) => {
  var graph2 = newTinkerGraph();
  graph2.loadGraphSON(graphsonPath, (err: Error, graph2: Gremlin.GraphWrapper) => {
    console.log('done');
  })
});
graph.savePrettyGraphSON(graphsonPath, (err: Error, graph: Gremlin.GraphWrapper) => {
  var graph2 = newTinkerGraph();
  graph2.loadGraphSON(graphsonPath, (err: Error, graph2: Gremlin.GraphWrapper) => {
    console.log('done');
  })
});
// ... promise
graph.saveGraphSON(graphsonPath)
  .then((graph: Gremlin.GraphWrapper): Q.Promise<Gremlin.GraphWrapper> => {
    var graph2 = newTinkerGraph();
    return graph2.loadGraphSON(graphsonPath);
  });
graph.savePrettyGraphSON(graphsonPath)
  .then((graph: Gremlin.GraphWrapper): Q.Promise<Gremlin.GraphWrapper> => {
    var graph2 = newTinkerGraph();
    return graph2.loadGraphSON(graphsonPath);
  });

// choose
var __ = gremlin.__;
graph.V().choose('{ it -> it.get().value("foo").length() < 5 }', __.out(), __.in());
graph.V().choose(gremlin.newJavaScriptLambda<any, boolean, any>('it.get().value("foo").length() < 5'),
                 __.out(), __.in());
graph.V().choose('{ it -> it.get().value("name") }')
  .option('foo', __.in())
  .option('bar', __.out())
  .option(__.both());  // default option
graph.V().choose(gremlin.newJavaScriptLambda<any, string, any>('it.get().value("name")'))
  .option('foo', __.in())
  .option('bar', __.out())
  .option(__.both());  // default option
graph.V().choose('{ it -> it.get().value("foo").length() }')
  .option(3, __.in())
  .option(4, __.out())
  .option(5, __.both());
graph.V().choose(gremlin.newJavaScriptLambda<any, number, any>('it.get().value("foo").length()'))
  .option(3, __.in())
  .option(4, __.out())
  .option(5, __.both());

// dedup
graph.V().values('lang').dedup();
graph.V().values('name').dedup().by('{ it -> it.length() }');

// filter
graph.V().filter('{ it -> it.get().value("foo") == "bar" }');
graph.V().filter(gremlin.newJavaScriptLambda('it.get().value("foo") == "bar"'));

// path/by
graph.V().out().out().values('name').path();
graph.V().out().out().path().by('name').by('age');

// repeat/until/times
graph.V(1).repeat(__.out()).times(2).path();
graph.V().until(__.has('name', 'ripple')).repeat(__.out()).path();
graph.V().until('{ it -> it.get().value("name") == "ripple" }')
  .repeat(__.out()).path();
graph.V().until(gremlin.newJavaScriptLambda<any, boolean, any>('it.get().value("name") == "ripple"'))
  .repeat(__.out()).path();

// sack, withSack
graph.V().withSack('{ -> 1.0f }').sack();
graph.V().withSack('{ -> [:] }', '{ m -> m.clone() }').out().out()
  .sack('{ m, v -> m[v.value("name")] = v.value("lang"); m }').sack();

// select
graph.V().select();
graph.V().select('one');
graph.V().select('one', 'two');

// sideEffect
graph.V().out('knows').sideEffect('{ it -> System.out.println(it) }');

// store/cap
graph.V().store('a').out().store('b').cap('a', 'b');

// subgraph
graph.E().has(gremlin.T.label, 'knows').subgraph().next()
  .then((sg: Gremlin.GraphWrapper): void => {
    sg.saveGraphSONSync('subgraph.json');
  });
graph.V(3).repeat(__.inE().subgraph('sg').outV()).times(3).cap('sg');

// ## Vertex steps
// out, in, both, outE, inE, bothE, outV, inV, bothV, otherV
graph.V(4).outE();
graph.V(4).inE('knows');
graph.V(4).inE('created');
graph.V(4).bothE('knows', 'created', 'blah');
graph.V(4).bothE('knows', 'created', 'blah').otherV();
graph.V(4).both('knows', 'created', 'blah');
graph.V(4).outE().inV();
graph.V(4).out();
graph.V(4).inE().outV();
graph.V(4).inE().bothV();

// TODO: more tests

// ## Element
function testElement(e: Gremlin.ElementWrapper): void {
  var javaE: any = e.unwrap();

  var id: any = e.getId();

  e.value('foo').then((foo: any) => console.log('foo=', foo));

  var foo: any = e.valueSync('foo');

  e.values(['foo', 'bar', 'baz'])
    .then((values: Gremlin.PropertyMap): void => {
      var foo = values['foo'];
      var bar = values['bar'];
      var baz = values['baz'];
    });

  e.setProperty('two', 1 + 1).then((two: any) => console.log('Property is set: ', two));

  e.setProperties({one: 1, two: 2, three: 'trois'}).then(() => console.log('Properties are set'));

  e.removeProperty('foo').then(() => console.log('Property removed'));

  e.removeProperties(['one', 'two', 'three']).then(() => console.log('Properties removed'));

  e.remove().then(() => console.log('Element removed from graph'));

  console.log('Element = ', e.jsonStringifySync());

  var json: any = e.toJSON();
  console.log('foo = ', json.properties.foo);

  e.toString().then((s: string) => console.log('e = ', s));

  console.log('e = ', e.toStringSync());
}

// ## Edge
function testEdge(e: Gremlin.EdgeWrapper): void {
  var label: string = e.getLabel();
}

// ## Vertex
function testVertex(v1: Gremlin.VertexWrapper, v2: Gremlin.VertexWrapper): void {
  // simplifyVertexProperties tested above

  v1.addEdge('likes', v2);
  var edgeProperties: Gremlin.PropertyMap = {'one': 1, 'two': 2, 'three': 'trois'};
  v2.addEdge('hates', v1, edgeProperties).then((e: Gremlin.EdgeWrapper) => console.log('Edge created'));
}
