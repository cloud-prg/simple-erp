"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Window.Vue = _vue["default"];

_vue["default"].use(_vuex["default"]);

var vStore = new _vuex["default"].Store({
  state: {
    deleteCustomerSql: "123"
  },
  mutations: {},
  actions: {},
  modules: {}
});
var _default = vStore;
exports["default"] = _default;