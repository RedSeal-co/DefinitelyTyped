
///<reference path="netmask.d.ts" />

import netmask = require('netmask');

var address: string = '127.0.0.1';

var nm = new netmask.Netmask(address, '255.255.255.0');
