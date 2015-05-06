/// <reference path="node-storm.d.ts"/>

import storm = require('node-storm');

// Define a spout
var myspout: storm.Spout = storm.spout(
  function (sync: storm.Sync): void {
    // "this" points to a Collector.
    var self: storm.Collector = this;

    // For an unreliable emit:
    var fieldValue1: string;
    var fieldValue2: number;
    self.emit([fieldValue1, fieldValue2]);

    // For a reliable emit:
    self.emit([fieldValue1, fieldValue2], {id: 'some unique id'});

    // Tell storm we're done emitting tuples for now
    sync();
  })
  .declareOutputFields(['field1', 'field2']) // declare output fields
  .on('fail', function(data) {
    // Handle tuple failure
  })
  .on('ack', function(data) {
    // Handle tuple acknowledgement
  });

// Define a bolt
var mybolt: storm.Bolt = storm.bolt(
  function (data: storm.Tuple): void {
    // "this" points to a Collector.
    var self: storm.Collector = this;

    // Emit some stuff
    self.emit([fieldValue1]);

    // Anchoring
    self.emit([fieldValue1], {anchors: [data.id]});

    // Emit direct
    self.emit([fieldValue1], {stream: 'streamid', task: 9});

    // Retrieving the task(s) a tuple was sent to
    self.emit([fieldValue1]).then((tasks: string[]): void => {
      // tasks is an array of task ids
    });

    // Log a message
    self.log('something interesting happened');

    // Acknowledge the tuple
    self.ack(data);

    // Or fail the tuple
    self.fail(data);
  })
  .declareOutputFields(['field1'])               // declare output fields
  .declareStream('streamid', false, ['field1']); // optionally declare another output stream

// Build a topology
var builder: storm.TopologyBuilder = storm.topologybuilder();
builder.setSpout('spoutid', myspout);
builder.setBolt('boltid', mybolt, 8).shuffleGrouping('spoutid');
var topology: storm.TopologySpec = builder.createTopology();

// Submit the topology
var options: storm.SubmitOptions = {
  // name: 'optional... the default name is the name of the topology script',
  nimbus: 'host:port',
  config: { 'topology.debug': true }
};

// Submit async with callback
storm.submit(topology, options, (err: Error, topologyName: string): void => {
  // Handle error or submission success
});

// Submit async with promise
storm.submit(topologu, options)
  .then((topologyName: string) => console.log('Topology submitted: ' + topologyName))
  .catch((err: Error) => console.error('Unable to submit topology: ' + err.toString()));
