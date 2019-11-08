"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var a = 2;
console.log(a);

_axios["default"].post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(function (response) {
  console.log(response);
})["catch"](function (error) {
  console.log(error);
});