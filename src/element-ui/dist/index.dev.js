"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _elementUi = require("element-ui");

var element = {
  install: function install(Vue) {
    Vue.use(_elementUi.Autocomplete);
    Vue.use(_elementUi.Loading);
    Vue.use(_elementUi.BreadcrumbItem);
    Vue.use(_elementUi.Breadcrumb);
    Vue.use(_elementUi.Select);
    Vue.use(_elementUi.Option);
    Vue.use(_elementUi.CarouselItem);
    Vue.use(_elementUi.Link);
    Vue.use(_elementUi.Carousel);
    Vue.use(_elementUi.Divider);
    Vue.use(_elementUi.Input);
    Vue.use(_elementUi.InputNumber);
    Vue.use(_elementUi.Radio);
    Vue.use(_elementUi.Dialog);
    Vue.use(_elementUi.Row);
    Vue.use(_elementUi.Col);
    Vue.use(_elementUi.Checkbox);
    Vue.use(_elementUi.Progress);
    Vue.use(_elementUi.DatePicker);
    Vue.use(_elementUi.Upload);
    Vue.use(_elementUi.Rate);
    Vue.use(_elementUi.Form);
    Vue.use(_elementUi.FormItem);
    Vue.use(_elementUi.Table);
    Vue.use(_elementUi.TableColumn);
    Vue.use(_elementUi.Button);
    Vue.use(_elementUi.Progress);
    Vue.use(_elementUi.Pagination);
    Vue.use(_elementUi.Avatar);
    Vue.use(_elementUi.Alert);
    Vue.use(_elementUi.Rate);
    Vue.use(_elementUi.Menu);
    Vue.use(_elementUi.MenuItem);
    Vue.use(_elementUi.MenuItemGroup);
    Vue.use(_elementUi.Submenu);
    Vue.use(_elementUi.RadioGroup);
    Vue.use(_elementUi.RadioButton);
    Vue.prototype.$message = _elementUi.Message;
    Vue.prototype.$confirm = _elementUi.MessageBox.confirm;
    Vue.prototype.$alert = _elementUi.MessageBox.alert;
    Vue.prototype.$notify = _elementUi.Notification;
  }
};
var _default = element;
exports["default"] = _default;