"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _MTLComponent = _interopRequireDefault(require("./MTLComponent"));

// 顶层对象
var MTLCore = {
  MTLComponent: _MTLComponent.default // MTLModel,

};
window.MTLCore = MTLCore;
var _default = MTLCore;
exports.default = _default;