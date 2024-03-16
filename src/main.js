import Vue from "vue";
import App from "./App.vue";
import registeComponent from './components'
import router from "./router";
import store from "./store";
import axios from "axios";
import "./utils/rem";
import "element-ui/lib/theme-chalk/index.css"; //element-ui样式引入
import element from "./element-ui/index"; //element-ui文件夹下
// import element from "element-ui"
Vue.use(element);

axios.defaults.baseURL = 'http://www.jiujiuwarehouse.com:3000'

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.mixin({});

registeComponent(Vue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
