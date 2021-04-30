/*
 * Unit Test
 * Karma
 * Mocha
 * 
 * npm install mocha
 * 
 * References:
 * https://www.digitalocean.com/community/tutorials/how-to-test-a-node-js-module-with-mocha-and-assert
 */
const lib = require('./lib');
var assert = require('assert');

assert.equal(lib.add(1,1), 2, "fail");
assert.equal(lib.subtract(1,1), 2, "fail");