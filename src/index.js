import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import common from "./assets/js/common.js";
import axios from "axios";
import panel from "./components/panel.vue";
import css from "./assets/style/base.less";
import icon from "./assets/source/font/iconfont.css";

Vue.use(Router);
Vue.use(common);
console.log(Vue);
new Vue({
  el: '#app',
  components: {
    panel
  }
});