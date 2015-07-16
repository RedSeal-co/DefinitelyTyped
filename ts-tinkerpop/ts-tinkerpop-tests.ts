///<reference path="ts-tinkerpop.d.ts"/>

import TP = require('ts-tinkerpop');
import Java = TP.Java;

TP.initialize();

var ArrayList: Java.ArrayList.Static = TP.autoImport('ArrayList');

var graph: Java.TinkerGraph = TP.TinkerGraph.open();

