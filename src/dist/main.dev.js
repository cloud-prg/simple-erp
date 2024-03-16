"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _axios = _interopRequireDefault(require("axios"));

require("./utils/rem");

require("element-ui/lib/theme-chalk/index.css");

var _index2 = _interopRequireDefault(require("./element-ui/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//element-ui样式引入
//element-ui文件夹下
// import element from "element-ui"
_vue["default"].use(_index2["default"]);

_vue["default"].prototype.$http = _axios["default"];
_vue["default"].config.productionTip = false;

_vue["default"].mixin({});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");