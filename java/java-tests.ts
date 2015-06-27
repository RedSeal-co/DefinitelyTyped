///<reference path="java.d.ts"/>
///<reference path="../bluebird/bluebird.d.ts"/>

import java = require('java');
import BluePromise = require('bluebird');

java.asyncOptions = {
  syncSuffix: 'Sync',
  asyncSuffix: '',
  promiseSuffix: 'P',
  promisify: BluePromise.promisify
};

java.registerClientP((): Promise<void> => {
  return BluePromise.resolve();
});

java.ensureJvm()
  .then(() => {

    // java.d.ts does not declare any Java types.
    // We can import a  java class, but we don't know the shape of the class here, so must use any
    var Boolean: any = java.import('java.lang.Boolean');
  });
