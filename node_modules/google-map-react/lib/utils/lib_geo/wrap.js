"use strict";

exports.__esModule = true;
exports.wrap = wrap;

function wrap(n, min, max) {
  var d = max - min;
  return n === max ? n : ((n - min) % d + d) % d + min;
}