<template>
  <div class="summary">
    <div class="s-main">
      <div class="overview">
        <p class="title">综述</p>
        <div>
          <div>
            <div class="sub-title">
              <p>实例</p>
            </div>
            <div class="info">
              <div>
                <p>总数量</p>
                <p class="text-primary">0</p>
              </div>
              <div>
                <p>运行中</p>
                <p class="text-success">0</p>
              </div>
              <div><a>
                <p>即将过期</p>
                <p class="text-danger">0</p></a>
              </div>
              <div><a>
                <p>已过期</p>
                <p class="text-danger">0</p></a>
              </div>
            </div>
          </div>
          <div>
            <div class="sub-title">
              <p>快照</p>
            </div>
            <div class="info">
              <div>
                <p>快照容量</p>
                <p class="text-primary">0<span>GB</span></p>
              </div>
              <div>
                <p>总数量</p>
                <p class="text-primary">0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="safe">
        <p class="title">安全概览</p>
        <div>
          <div class="safe-icon fl por">
            <img src="../assets/source/image/safe.png">
            <span>云服务器：<span class="safe-info text-success">正常</span></span>
          </div>
          <div class="safe-status fr por">
            <span><i class="iconfont">&#xe50c;</i>DDoS防护</span>
            <span><i class="iconfont">&#xe50c;</i>主机防护</span>
            <span><i class="iconfont">&#xe50c;</i>应用防火墙</span>
            <span><i class="iconfont">&#xe50c;</i>安全体检</span>
          </div>
        </div>
      </div>
      <div class="source">
        <p class="title">我的资源</p>
        <div>
          <ul class="source-list">
            <li class="source-li" v-for="(item,index) in 10" :key="index">
              <div class="source-area">
                <div class="source-head">
                  <span class="source-title">亚太区域</span><i class="iconfont fr">&#xe618;</i>
                </div>
                <div class="source-body">
                  <div class="product fl">
                    <a>
                      <p>云服务器<span class="text-primary">0</span></p>
                    </a>
                  </div>
                  <div class="status fl">
                    <ul>
                      <li><a><p>运行中<span class="text-primary">0</span></p></a></li>
                      <li><a><p>近期创建<span class="text-success">0</span></p></a></li>
                      <li><a><p>即将过期<span class="text-danger">0</span></p></a></li>
                      <li><a><p>已过期<span class="text-success">0</span></p></a></li>
                    </ul>
                  </div>
                </div>
                <div class="box-line"></div>
                <div class="source-footer ova">
                  <div><p>磁盘&emsp;0</p></div>
                  <div><p>快照&emsp;0GB/0</p></div>
                  <div><p>镜像&emsp;0</p></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="sidebar"></div>
  </div>
</template>

<style lang="less" scoped>
@bgc: rgb(247,247,247);
@lightBlue: rgb(27,136,194);
@lightGray: rgb(247,247,248);
@borderGray: lightgray;
@lightGray-:#ccc;
@colorGray: rgb(135,135,134);
.summary {
  width: 100%;
  padding: 10px;
  .s-main {
    width: 75%;
    .title {
      font-size: 12px;
      border-left: 2px solid @lightBlue; 
      padding-left: 10px;
    }
    .overview {
      .sub-title {
        font-size: 12px;
        text-align: center;
        background-color: @lightGray;
        overflow: auto;
      }
      .info {
        padding: 3px 0;
        text-align: center;
        div {
          display: inline-block;
          width: 24%;
          text-align: center;
          border-right: 1px solid @borderGray;
          &:last-child {
            border-right: none;
          }
          p {
            margin: 0;
          }
          p:first-child {
            font-size: 14px;
          }
          p:last-child {
            font-size: 30px;
          }
          a {
            cursor: pointer;
            color: #06c;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      > div > div{
        display: inline-block;
        border: 1px solid @borderGray;
      }
      > div > div:first-child {
        width: 55%;
      }
      > div > div:last-child {
        width: 43%;
        float: right;
        .info {
          div:first-child {
            width: 59%;
            span {
              color: @lightGray-;
              font-size: 24px;
              margin-left: 6px;
            }
          }
          div:last-child {
            width: 39%;
          }
        }
      }
    }
    .safe {
      > div {
        height: 65px;
        background-color: @lightGray;
        font-size: 12px;
        > div:first-child {
          margin-left: 37px;
          > span {
            position: relative;
            top: -26px;
          }
        }
        .safe-status {
          top: 26px;
          span {
            margin-right: 120px;
            &:last-child {
              margin-right: 100px;
            }
          }

          i {
            margin-right: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .source {
      > div {
        > ul {
          > li {
            width: 50%;
            padding: 0 10px 20px 0;
            float: left;
            &:nth-child(2n){
              padding: 0 0 20px 10px;
            }
            > div {
              border: 1px solid @lightGray-;
              .source-head {
                height: 35px;
                line-height: 35px;
                padding: 0 10px;
                font-size: 12px;
                background-color: @lightGray;
                
              }
              .source-body {
                overflow: auto;
                padding: 10px;
                > div {
                  width: 50%;
                }
                .product {
                  > a {
                    display: table-cell;
                    height: 112px;
                    vertical-align: middle;
                    span {
                      font-size: 26px;
                      margin-left: 20px;
                    }
                  }
                }
                .status {
                  ul {
                    border-left: 1px dotted @lightGray-;
                  }
                  li {
                    height: 28px;
                    line-height: 28px;
                    font-size: 14px;
                    position: relative;
                    margin-left: 50px;
                    a {
                      cursor: pointer;
                      &:hover {
                        background-color: @lightGray;
                      }
                    }
                    p {
                      margin: 0;
                      display: inline-block;
                      padding: 0 5px;
                      span {
                        margin-left: 10px;
                      }
                    }
                    &::after{
                      position: absolute;
                      left: -20px;
                      top: 8px;
                      content: '';
                      width: 6px;
                      height: 6px;
                      border-radius: 50%;
                      background-color: orange;
                      border: 3px solid yellow;
                    }
                  }
                }
              }
              .box-line {
                margin: 0 10px;
                border-bottom: 1px dotted @lightGray-;
              }
              .source-footer {
                > div {
                  width: 33.33333333%;
                  height: 40px;
                  padding: 10px;
                  float: left;
                  &:hover {
                    background: @lightGray-;
                  }
                  p {
                    font-size: 14px;
                    margin: 0;
                    color: @colorGray;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1600px){
  .summary {
    .s-main {
      .safe {
        > div {
          .safe-status {
            span {
              margin-right: 70px;
              &:last-child {
                margin-right: 50px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
