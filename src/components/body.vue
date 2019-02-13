<template>
  <div class="main ova">
    <div class="tab fl">
      <ul>
        <li>
          <router-link to="summary"><p>概要</p></router-link>
        </li>
        <li>
          <router-link to="detail1"><p>详情1</p></router-link>
        </li>
        <li>
          <router-link to="detail2"><p>详情2</p></router-link>
        </li>
        <li>
          <router-link to="detail3"><p>详情3</p></router-link>
        </li>
        <li>
          <router-link to="detail4"><p>详情4</p></router-link>
        </li>
        <li>
          <router-link to="detail5"><p>echcarts+百度地图</p></router-link>
        </li>
        <li>
          <router-link to="detail6"><p>echcarts+百度地图(层级显示)</p></router-link>
        </li>
      </ul>
    </div>
    <div class="content fl">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import summary from "./summary.vue"
import detail1 from "./detail1.vue"
import detailTwo from "./detailTwo.vue"
import detailThree from "./detailThree.vue"
import detailFour from "./detailFour.vue"
import detailFive from "./detailFive.vue"
import detailSix from "./detailSix.vue"
import Router from "vue-router"
const routes = [
  {
    path: '/',
    redirect: '/summary'
  },
  {
    path: '/summary',
    component: summary
  },
  {
    path: '/detail1',
    component: detail1
  },
  {
    path: '/detail2',
    component: detailTwo
  },
  {
    path: '/detail3',
    component: detailThree
  },
  {
    path: '/detail4',
    component: detailFour
  },
  {
    path: '/detail5',
    component: detailFive
  },
  {
    path: '/detail6',
    component: detailSix
  }
];

const router = new Router({
  routes
});
export default {
  router

}
</script>


<style lang="less" scoped>
@bgc: #373d41;
@color: white;
.main {
  width: 100%;
  .tab {
    width: 15%;
    ul {
      margin: 0;
      li {
        background-color: @bgc;
        color: @color;
        height: 30px;
        line-height: 30px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        &:hover, > a.router-link-active p{
          background-color: @color;
          color: @bgc;
        }
        p {
          width: 100%;
          height: 100%;
          margin: 0;
        }
      }
    }
  }
  .content {
    width: 85%;
    background-color: #fff;
  }
}
</style>
