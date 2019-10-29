"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("babel-polyfill");

var _base = _interopRequireDefault(require("./js/base.js"));

var _timer = _interopRequireDefault(require("./js/timer.js"));

var _calculate = _interopRequireDefault(require("./js/calculate.js"));

var _interface = _interopRequireDefault(require("./js/interface.js"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lottery = function Lottery() {
  _classCallCheck(this, Lottery);
};

var _default = Lottery;
exports["default"] = _default;