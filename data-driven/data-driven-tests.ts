/// <reference path="data-driven.d.ts"/>
/// <reference path="../mocha/mocha.d.ts"/>
/// <reference path="../node/node.d.ts"/>

import assert = require('assert');
import data_driven = require('data-driven');

describe('Array', (): void => {
  describe('#indexOf()', (): void => {
    data_driven([{value: 0},{value: 5},{value: -2}],(): void => {
      it('should return -1 when the value is not present when searching for {value}', function(ctx: any) {
        assert.equal(-1, [1,2,3].indexOf(ctx.value));
      });
    });
  });
});
