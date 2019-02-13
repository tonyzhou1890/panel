import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import common from "./assets/js/common.js";
import panel from "./components/panel.vue";
import css from "./assets/style/base.less";
import icon from "./assets/source/font/iconfont.css";

Vue.use(Router);
Vue.use(common);

import debounce from 'lodash/debounce'
Vue.prototype._ = {debounce}
// console.log(Vue);
var vue = new Vue({
  el: '#app',
  components: {
    panel
  }
});