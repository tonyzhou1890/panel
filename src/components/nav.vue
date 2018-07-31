<template>
  <nav>
    <div class="fl">
      <div class="control por">
        <p>管理控制台</p>
      </div>
      <div class="product por">
        <p @click="showProducts = !showProducts">产品和服务<span :class="showProducts ? 'r' : ''">▲</span></p>
        <div class="products poa" v-show="showProducts">
          <ul>
            <li>ECS</li>
            <li>VPS</li>
            <li>云存储</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="fr">
      <div class="searchbox por">
        <div class="searcharea ova">
          <input type="text" placeholder="搜索"><i class="iconfont">&#xe502;</i>
        </div>
      </div>
      <div class="info por">
        <div class="icon">
          <i class="iconfont">&#xf0017;</i>
          <span class="info-number" v-text="infoNumber"></span>
        </div>
        <div class="infos poa">
          <ul>
            <li
              v-for="(item,index) in info"
              :key="index"
              v-show="index"
            >
              <a target="_blank"><p class="title" v-text="item.title">新消息</p></a>
              <p class="time" v-text="item.time">2018-09-11 11:12:11</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="cost por">
        <p>费用</p>
      </div>
      <div class="bill por">
        <p>工单</p>
      </div>
      <div class="record por">
        <p>备案</p>
      </div>
      <div class="firm por">
        <p>企业</p>
      </div>
      <div class="lang por">
        <p>简体中文</p>
      </div>
      <div class="photo por"><img src="../assets/source/image/头像.JPG"></div>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      showProducts: false,
      info: [
        {
          title: null,
          time: null
        }
      ]
    }
  },
  computed: {
    infoNumber(){
      return this.info.length - 1;
    }
  },
  methods: {
    
  },
  created(){
    this.$axios.get("../src/assets/source/text/info.json").then((response) => {
      console.log(response.data);
      this.info = [{
        title: '新消息',
        time: '2018'
      }].concat(response.data.info);
    })
  }
}
</script>


<style lang="less" scoped>
@bgc: #373d41;
@lightBlack: rgb(88, 97, 104);
@lightGray: rgb(173,174,176);
@bgc2: orange;
@hbgc: #333;
@color: white;
nav {
  width: 100%;
  height: 50px;
  background-color: @bgc;
  color: @color;
  font-size: 12px;
  > div {
    height: 50px;
    line-height: 50px;
    > div {
      line-height: normal;
      display: inline-block;
      height: 50px;
      line-height: 50px;
      vertical-align: top;
      cursor: pointer;
      padding: 0 12px;
      > p {
        margin: 0;
      }
    }
    .control, .product, .cost, .bill, .record, .firm, .lang {
      &:hover {
        background-color: @hbgc;
      }
    }
    .product {
      > p span {
        margin-left: 4px;
        transform: rotate(180deg);
        display: inline-block;
        transition: all .4s;
        &.r {
          transform: rotate(0deg);
        }
      }
      .products {
        width: 100%;
        background-color: @hbgc;
        margin-left: -12px;
        // display: none;
        ul {
          margin: 0;
          li {
            padding: 10px;
            line-height: normal;
          }
        }
      }
    }
    .searchbox {
      .searcharea {
        background-color: @lightBlack;
        color: @lightGray;
        height: 20px;
        line-height: normal;
        margin-top: 15px;
        &:hover {
          input {
            width: 250px;
          }
        }
      }
      input {
        border: 0;
        outline: 0;
        width: 150px;
        transition: all .8s;
        background-color: @lightBlack;
        color: @lightGray;
        vertical-align: middle;
        padding-left: 5px;
        &::-webkit-input-placeholder{
            color:@lightGray;
        }
        &::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:@lightGray;
        }
        &:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:@lightGray;
        }
        &:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:@lightGray;
        }
      }
      i {
        width: 30px;
        height: 14px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 14px;
        border-left: 1px solid gray;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .info {
      .info-number {
        background-color: @bgc2;
        border-radius: 5px;
        padding: 0 3px;
      }
      .infos {
        width: 300px;
        // overflow: auto;
        border: 1px solid gray;
        border-top: none;
        border-bottom: none;
        line-height: normal;
        left: -120px;
        color: @hbgc;
        display: none;
        &::before {
          content: '';
          display: inline-block;
          width: 0px;
          height: 0;
          border: 10px solid @color;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          position: absolute;
          top: -20px;
          left: 140px;
        }
        ul {
          margin: 0;
          overflow: auto;
          max-height: 400px;
          li {
            padding: 10px;
            border-bottom: 1px solid gray;
            background-color: #eee;
            cursor: initial;
            a {
              color: rgb(12,81,196);
              cursor: pointer;
            }
          }
        }
      }
      &:hover .infos {
        display: block;
      }
    }
    .photo {
      > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-top: 5px;
      }
    }
  }
}


</style>
