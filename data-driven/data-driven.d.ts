// Type definitions for data-driven v1.2.0
// Project: https://github.com/fluentsoftware/data-driven
// Definitions by: Matt Frantz <https://github.com/mhfrantz/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'data-driven' {
  function data_driven(data: any[], fn: () => void): void;
  export = data_driven;
}
