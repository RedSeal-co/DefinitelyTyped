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

java.ensureJvm()
  .then(() => {
    var Boolean: Java.Boolean.Static = java.import('java.lang.Boolean');
    var String: Java.String.Static = java.import('java.lang.String');

    var b: Java.boolean_t = new Boolean(false);
    var s: Java.string_t = new String('hello');
  });
