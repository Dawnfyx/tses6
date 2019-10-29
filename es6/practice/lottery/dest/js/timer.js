"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Time =
/*#__PURE__*/
function () {
  function Time() {
    _classCallCheck(this, Time);
  }

  _createClass(Time, [{
    key: "countdown",
    value: function countdown(end, update, handle) {
      var now = new Date().getTime();
      var self = this;

      if (now - end > 0) {
        handle.call(self);
      }
    }
  }]);

  return Time;
}();

var _default = Timer;
exports["default"] = _default;