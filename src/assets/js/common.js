import axios from "axios";
import echarts from "echarts";

axios.defaults.withCredentials=true;//让ajax携带cookie

const common = {};

// console.log(axios);

common.install = function(Vue,options){
  Vue.prototype.$axios = axios;
  Vue.prototype.$echarts = echarts;
  Vue.prototype.$removeWhiteSpace = function removeWhiteSpace(elem){
    let el = elem || document,
        cur = el.firstChild,
        temp,
        reg = /\S/;
    while(null != cur){
      temp = cur.nextSibling;
      if( 3 === cur.nodeType && !reg.test(cur.nodeValue) ){
        el.removeChild(cur);
      }else if( 1 === cur.nodeType ){
        removeWhiteSpace(cur);
      }
      cur = temp;
    }
  };
};

export default common;