// Type definitions for cucumber 0.4.7
// Project: https://github.com/cucumber/cucumber-js
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module cucumber {

  // TODO: Is there a way to put type safety on the interface of the "this" object in a step definitions file?

  export interface StepCallback {
    (error?: string | Error, result?: any): void;
    pending(reason?: any): void;
    fail(failureReason?: Error): void;

    // This signature should not be necessary, it is equivalent to the first signature above in the degenerate case.
    // We include it because otherwise bluebird Promise.done(callback) will not accept a StepCallback.
    (value: void): void;
  }

  export interface Scenario {
    getName(): string;
    getUri(): string;
  }

  export interface DataTable<Row> {
    hashes(): Row[];
  }

  // TODO: More of this interface

}
