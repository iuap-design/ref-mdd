"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getMeta = getMeta;

var _axios = _interopRequireDefault(require("axios"));

function getMeta(url) {
  return (0, _axios.default)({
    timeout: 8000,
    method: 'get',
    url: url,
    params: {
      r: Math.random()
    }
  });
}