// Type definitions for cucumber 0.4.7
// Project: https://github.com/cucumber/cucumber-js
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module cucumber {

  // TODO: Is there a way to put type safety on the interface of the "this" object in a step definitions file?

  export interface StepCallback {
    (error?: string): void;
    pending(): void;
  }

  export interface Scenario {
    getName(): string;
  }

  export interface DataTable<Row> {
    hashes(): Row[];
  }

  // TODO: More of this interface

}
