import Vue from "vue/dist/vue.js";
import Router from "vue-router";
import common from "./assets/js/common.js";
import panel from "./components/panel.vue";
import css from "./assets/style/base.less";
import icon from "./assets/source/font/iconfont.css";
import VueAMap from 'vue-amap';
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

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