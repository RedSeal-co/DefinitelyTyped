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
var chooseOptions: Gremlin.ChooseOptions = {};
chooseOptions['foo'] = __.in();
chooseOptions['bar'] = __.out();
chooseOptions['baz'] = __.both();
graph.V().choose('{ it -> it.get().value("name") }', chooseOptions);
graph.V().choose(gremlin.newJavaScriptLambda<any, string, any>('it.get().value("name")'), chooseOptions);
var optionMap = new gremlin.HashMap();
optionMap.putSync(3, __.in());
optionMap.putSync(4, __.out());
optionMap.putSync(5, __.both());
graph.V().choose('{ it -> it.get().value("foo").length() }', optionMap);
graph.V().choose(gremlin.newJavaScriptLambda<any, number, any>('it.get().value("foo").length()'), optionMap);

// filter
graph.V().filter('{ it -> it.get().value("foo") == "bar" }');
graph.V().filter(gremlin.newJavaScriptLambda('it.get().value("foo") == "bar"'));

// sack, withSack
graph.V().withSack('{ -> 1.0f }').sack();
graph.V().withSack('{ -> [:] }', '{ m -> m.clone() }').out().out()
  .sack('{ m, v -> m[v.value("name")] = v.value("lang"); m }').sack();

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
