// Type definitions for node-storm v0.0.1
// Project: https://github.com/RallySoftware/node-storm
// Definitions by: Matt Frantz <https://github.com/mhfrantz>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../q/Q.d.ts"/>
/// <reference path="../through/through.d.ts"/>

declare module "node-storm" {

  import Q = require('q');
  import through = require('through');

  module storm {

    export interface Collector {
      context(): TopologyContext;
      ack(data: Data, skipAckMessage?: boolean): void;
      emit(tuple: Tuple, options?: EmitOptions): Q.Promise<void>;
      fail(data: Data): void;
      log(msg: string): void;
      debug(msg: string): void;
      sync(): void;
      end(): void;
    }

    export interface TopologyContext {
      pidDir(): string;
      config(key: string): any;
      componentId(): string;
      taskId(): string;
      downstreamTasks(streamId: string): string[];
      upstreamTasks(streamId: string): string[];
    }

    export interface Data {
      id: any;
    }

    export interface Tuple {
    }

    export interface EmitOptions {
    }

    export interface Component<T> {
      declareStream(streamId: string, direct?: boolean, fields?: string[]): T;
      declareOutputFields(fields: string[]): T;
    }

    export interface Task<T> extends Component<T>, through.ThroughStream {
      collector: Collector;
    }

    export interface Bolt extends Task<Bolt> {}

    export interface Spout extends Task<Spout> {}

    // "this" points to a Collector.
    export interface BoltFunction {
      (data: Tuple): void;
    }

    // "this" points to a Collector.
    export interface SpoutFunction {
      (sync: Sync): void;
    }

    export interface Sync {
      (): void;
    }

    export function bolt(process: BoltFunction): Bolt;

    export function spout(nextTuple: SpoutFunction): Spout;

    export interface InputDeclarer {
      allGrouping(componentId: string, streamId: string): InputDeclarer;
      directGrouping(componentId: string, streamId: string): InputDeclarer;
      fieldsGrouping(componentId: string, fields: string[], streamId: string): InputDeclarer;
      globalGrouping(componentId: string, streamId: string): InputDeclarer;
      localOrShuffleGrouping(componentId: string, streamId: string): InputDeclarer;
      noneGrouping(componentId: string, streamId: string): InputDeclarer;
      shuffleGrouping(componentId: string, streamId: string): InputDeclarer;
    }

    export interface IdMap<T> {
      [id: string]: T;
    }

    export interface StateSpoutSpec {
      // TODO
    }

    export interface TopologySpec {
      bolts: IdMap<Bolt>;
      spouts: IdMap<Spout>;
      state_spouts: IdMap<StateSpoutSpec>;
    }

    export interface TopologyBuilder {
      setBolt(id: string, bolt: Bolt, parallelismHint?: number): InputDeclarer;
      setSpout(id: string, spout: Spout, parallelismHint?: number): void;
      createTopology(): TopologySpec;
    }

    export function topologybuilder(): TopologyBuilder;

    export interface SubmitCallback {
      (err: Error, topologyName: string): void;
    }

    export interface SubmitOptions {
    }

    export function submit(topology: TopologySpec, options: SubmitOptions, callback: SubmitCallback): void;
    export function submit(topology: TopologySpec, options: SubmitOptions): Q.Promise<void>;
  }

  export = storm;
}
