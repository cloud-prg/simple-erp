"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _login = _interopRequireDefault(require("../views/login.vue"));

var _welcome = _interopRequireDefault(require("../views/welcome.vue"));

var _payCenter = _interopRequireDefault(require("../views/payCenter.vue"));

var _productCome = _interopRequireDefault(require("../views/productManage/productCome"));

var _productList = _interopRequireDefault(require("../views/productManage/productList"));

var _productOut = _interopRequireDefault(require("../views/productManage/productOut"));

var _productOutList = _interopRequireDefault(require("../views/productManage/productOutList"));

var _boxCome = _interopRequireDefault(require("../views/boxManage/boxCome"));

var _boxList = _interopRequireDefault(require("../views/boxManage/boxList"));

var _boxOut = _interopRequireDefault(require("../views/boxManage/boxOut"));

var _boxOutList = _interopRequireDefault(require("../views/boxManage/boxOutList"));

var _cusProductList = _interopRequireDefault(require("../views/customer/cusProductList"));

var _onlyReadProductCome = _interopRequireDefault(require("../views/customer/onlyRead/onlyReadProductCome"));

var _onlyReadProductList = _interopRequireDefault(require("../views/customer/onlyRead/onlyReadProductList"));

var _onlyReadBoxCome = _interopRequireDefault(require("../views/customer/onlyRead/onlyReadBoxCome"));

var _onlyReadBoxList = _interopRequireDefault(require("../views/customer/onlyRead/onlyReadBoxList"));

var _onlyReadOutRecord = _interopRequireDefault(require("../views/customer/onlyRead/onlyReadOutRecord"));

var _possessSystem = _interopRequireDefault(require("../views/possessSystem/possessSystem"));

var _orderCenter = _interopRequireDefault(require("../views/orderCenter/orderCenter"));

var _customerManage = _interopRequireDefault(require("../views/customerManage/customerManage"));

var _outRecord = _interopRequireDefault(require("../views/outRecord"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import ProductOrderCenter from '../views/orderCenter/productOrderCenter'
// import BoxOrderCenter from '../views/orderCenter/boxOrderCenter'
_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "Login",
  component: _login["default"]
}, {
  path: "/home",
  name: "Home",
  component: _Home["default"],
  children: [{
    path: "/",
    component: _welcome["default"]
  }, {
    path: "/payCenter",
    component: _payCenter["default"]
  }, // {
  //   path: "/productOrderCenter",
  //   component: ProductOrderCenter,
  // },
  // {
  //   path: "/boxOrderCenter",
  //   component: BoxOrderCenter,
  // },
  {
    path: "/orderCenter",
    component: _orderCenter["default"]
  }, {
    path: "/productCome",
    component: _productCome["default"]
  }, {
    path: "/productList",
    component: _productList["default"]
  }, {
    path: "/productOut",
    component: _productOut["default"]
  }, {
    path: "/productOutList",
    component: _productOutList["default"]
  }, {
    path: "/boxCome",
    component: _boxCome["default"]
  }, {
    path: "/boxList",
    component: _boxList["default"]
  }, {
    path: "/boxOut",
    component: _boxOut["default"]
  }, {
    path: "/boxOutList",
    component: _boxOutList["default"]
  }, {
    path: "/possessSystem",
    component: _possessSystem["default"]
  }, {
    path: "/customerManage",
    component: _customerManage["default"]
  }, {
    path: "/outRecord",
    component: _outRecord["default"]
  }, {
    path: "/cusProductList",
    component: _cusProductList["default"]
  }, {
    path: "/onlyReadProductCome",
    component: _onlyReadProductCome["default"]
  }, {
    path: "/onlyReadProductList",
    component: _onlyReadProductList["default"]
  }, {
    path: "/onlyReadBoxCome",
    component: _onlyReadBoxCome["default"]
  }, {
    path: "/onlyReadBoxList",
    component: _onlyReadBoxList["default"]
  }, {
    path: "/onlyReadOutRecord",
    component: _onlyReadOutRecord["default"]
  }]
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;