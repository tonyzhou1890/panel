<template>
  <div class="detail">
    <div class="stage">
      <div class="title">
        <h2>图1</h2>
      </div>
      <div class="chart chart-1" ref="geo_one"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图2</h2>
      </div>
      <div class="chart chart-2" ref="geo_two"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图3</h2>
      </div>
      <div class="chart chart-3" ref="geo_three"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图3-2</h2>
      </div>
      <div class="chart chart-3-2" ref="geo_three_two"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图4</h2>
      </div>
      <div class="chart chart-4" ref="geo_four"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图5</h2>
      </div>
      <div class="chart chart-5" ref="geo_five"></div>
    </div>
    <div class="stage">
      <div class="title">
        <h2>图6</h2>
      </div>
      <div class="chart chart-6" ref="baidu"></div>
    </div>
  </div>
</template>

<script>
import "../assets/data/china";
import baiduMap from "../assets/js/baidu_map";
const mapStyle = {
  styleJson: [
    {
      featureType: "water",
      elementType: "all",
      stylers: {
        color: "#044161"
      }
    },
    {
      featureType: "land",
      elementType: "all",
      stylers: {
        color: "#004981"
      }
    },
    {
      featureType: "boundary",
      elementType: "geometry",
      stylers: {
        color: "#064f85"
      }
    },
    {
      featureType: "railway",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry",
      stylers: {
        color: "#004981"
      }
    },
    {
      featureType: "highway",
      elementType: "geometry.fill",
      stylers: {
        color: "#005b96",
        lightness: 1
      }
    },
    {
      featureType: "highway",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry",
      stylers: {
        color: "#004981"
      }
    },
    {
      featureType: "arterial",
      elementType: "geometry.fill",
      stylers: {
        color: "#00508b"
      }
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "green",
      elementType: "all",
      stylers: {
        color: "#056197",
        visibility: "off"
      }
    },
    {
      featureType: "subway",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "manmade",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "local",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "arterial",
      elementType: "labels",
      stylers: {
        visibility: "off"
      }
    },
    {
      featureType: "boundary",
      elementType: "geometry.fill",
      stylers: {
        color: "#029fd4"
      }
    },
    {
      featureType: "building",
      elementType: "all",
      stylers: {
        color: "#1a5787"
      }
    },
    {
      featureType: "label",
      elementType: "all",
      stylers: {
        visibility: "off"
      }
    }
  ]
};
export default {
  data() {
    return {
      geoOne: [],
      geoTwo: [],
      geoThree: [],
      geoThreeTwo: [],
      geoFour: [],
      geoSix: []
    };
  },
  methods: {
    getGeoJSON(url) {
      return new Promise((resolve, reject) => {
        console.log("getHk");
        this.$axios
          .get(url)
          .then(data => {
            resolve(data);
          })
          .catch(e => {
            console.log(new Error(e));
          });
      });
    },
    drawHK() {
      let chart = this.$echarts.init(this.$refs.geo_one);
      chart.showLoading();
      this.getGeoJSON("./src/assets/data/HK.json")
        .then(data => {
          this.geoOne = data.data;
          chart.hideLoading();
          this.$echarts.registerMap("HK", this.geoOne);

          chart.setOption({
            title: {
              text: "香港18区人口密度 （2011）",
              subtext: "人口密度数据来自Wikipedia",
              sublink:
                "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c} (p / km2)"
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 800,
              max: 50000,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"]
              }
            },
            series: [
              {
                name: "香港18区人口密度",
                type: "map",
                mapType: "HK", // 自定义扩展图表类型
                roam: true,
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: [
                  { name: "中西区", value: 20057.34 },
                  { name: "湾仔", value: 15477.48 },
                  { name: "东区", value: 31686.1 },
                  { name: "南区", value: 6992.6 },
                  { name: "油尖旺", value: 44045.49 },
                  { name: "深水埗", value: 40689.64 },
                  { name: "九龙城", value: 37659.78 },
                  { name: "黄大仙", value: 45180.97 },
                  { name: "观塘", value: 55204.26 },
                  { name: "葵青", value: 21900.9 },
                  { name: "荃湾", value: 4918.26 },
                  { name: "屯门", value: 5881.84 },
                  { name: "元朗", value: 4178.01 },
                  { name: "北区", value: 2227.92 },
                  { name: "大埔", value: 2180.98 },
                  { name: "沙田", value: 9172.94 },
                  { name: "西贡", value: 3368 },
                  { name: "离岛", value: 806.98 }
                ],
                // 自定义名称映射
                nameMap: {
                  "Central and Western": "中西区",
                  Eastern: "东区",
                  Islands: "离岛",
                  "Kowloon City": "九龙城",
                  "Kwai Tsing": "葵青",
                  "Kwun Tong": "观塘",
                  North: "北区",
                  "Sai Kung": "西贡",
                  "Sha Tin": "沙田",
                  "Sham Shui Po": "深水埗",
                  Southern: "南区",
                  "Tai Po": "大埔",
                  "Tsuen Wan": "荃湾",
                  "Tuen Mun": "屯门",
                  "Wan Chai": "湾仔",
                  "Wong Tai Sin": "黄大仙",
                  "Yau Tsim Mong": "油尖旺",
                  "Yuen Long": "元朗"
                }
              }
            ]
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
    drawCM() {
      let chart = this.$echarts.init(this.$refs.geo_two);
      chart.showLoading();
      this.getGeoJSON("./src/assets/data/congming.json")
        .then(data => {
          this.geoTwo = data.data;
          chart.hideLoading();
          this.$echarts.registerMap("CM", this.geoTwo);

          chart.setOption({
            title: {
              text: "崇明",
              subtext: "测试"
            },
            tooltip: {},
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 800,
              max: 50000,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"]
              }
            },
            series: [
              {
                name: "崇明",
                type: "map",
                mapType: "CM", // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                data: [
                  { name: "崇明岛", value: 20057.34 },
                  { name: "长兴岛", value: 15477.48 }
                ],
                // 自定义名称映射
                nameMap: {
                  congming: "崇明岛",
                  changxing: "长兴岛"
                }
              }
            ]
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
    drawSH() {
      let chart = this.$echarts.init(this.$refs.geo_three);
      chart.showLoading();
      this.getGeoJSON("./src/assets/data/shanghai_2.json")
        .then(data => {
          this.geoThree = data.data;
          chart.hideLoading();
          this.$echarts.registerMap("SH", this.geoThree);

          chart.setOption({
            title: {
              text: "上海"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c} (台)"
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 800,
              max: 50000,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              seriesIndex: [1],
              inRange: {
                color: ["lightskyblue", "blue"]
              }
            },
            geo: {
              map: "SH",
              roam: true,
              scaleLimit: {
                min: 1,
                max: 5
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "rgba(0,0,0,0.4)"
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            series: [
              {
                type: "scatter",
                coordinateSystem: "geo",
                data: [
                  {
                    name: "天居玲珑湾",
                    value: [7734, 4442, 10000]
                  }
                ],
                symbolSize: 20,
                symbolRotate: 35,
                label: {
                  show: false
                },
                tooltip: {
                  trigger: "item",
                  formatter: params => {
                    return `${params.data.name}：${params.data.value[2]}台`;
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#F06C00"
                  }
                }
              },
              {
                name: "上海",
                type: "map",
                geoIndex: 0,
                data: [
                  { name: "崇明区", value: 20057.34 },
                  { name: "虹口区", value: 20057.34 },
                  { name: "嘉定区", value: 15477.48 },
                  { name: "闵行区", value: 31686.1 },
                  { name: "宝山区", value: 6992.6 },
                  { name: "长宁区", value: 44045.49 },
                  { name: "奉贤区", value: 40689.64 },
                  { name: "金山区", value: 37659.78 },
                  { name: "静安区", value: 45180.97 },
                  { name: "普陀区", value: 55204.26 },
                  { name: "青浦区", value: 21900.9 },
                  { name: "松江区", value: 4918.26 },
                  { name: "徐汇区", value: 5881.84 },
                  { name: "杨浦区", value: 4178.01 },
                  { name: "闸北区", value: 2227.92 },
                  { name: "黄浦区", value: 2180.98 },
                  { name: "浦东新区", value: 9172.94 }
                ],
                // 自定义名称映射
                nameMap: {
                  崇明区: "崇明区",
                  虹口区: "虹口区",
                  嘉定区: "嘉定区",
                  闵行区: "闵行区",
                  宝山区: "宝山区",
                  长宁区: "长宁区",
                  奉贤区: "奉贤区",
                  金山区: "金山区",
                  静安区: "静安区",
                  普陀区: "普陀区",
                  青浦区: "青浦区",
                  松江区: "松江区",
                  徐汇区: "徐汇区",
                  杨浦区: "杨浦区",
                  闸北区: "闸北区",
                  黄浦区: "黄浦区",
                  浦东新区: "浦东新区"
                }
              }
            ]
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
    drawSHA() {
      let chart = this.$echarts.init(this.$refs.geo_three_two);
      chart.showLoading();
      this.getGeoJSON("./src/assets/data/上海市.json")
        .then(data => {
          this.geoThreeTwo = data.data;
          chart.hideLoading();
          this.$echarts.registerMap("SHA", this.geoThreeTwo);

          chart.setOption({
            title: {
              text: "上海"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c} (台)"
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            // visualMap: {
            //   min: 800,
            //   max: 50000,
            //   text: ["High", "Low"],
            //   realtime: false,
            //   calculable: true,
            //   seriesIndex: [],
            //   inRange: {
            //     color: ["lightskyblue", "blue"]
            //   }
            // },
            geo: {
              map: "SHA",
              roam: true,
              scaleLimit: {
                min: 1,
                max: 5
              },
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: "rgba(255,255,255,0.7)"
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "rgba(33,33,33,.7)",
                  borderColor: "rgba(255, 255, 0, 0.4)",
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: null,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            series: [
              {
                type: "scatter",
                coordinateSystem: "geo",
                data: [
                  {
                    name: "天居玲珑湾",
                    value: [121.215146, 31.4087, 10000]
                  }
                ],
                symbolSize: 20,
                symbolRotate: 35,
                label: {
                  show: false
                },
                tooltip: {
                  trigger: "item",
                  formatter: params => {
                    return `${params.data.name}：${params.data.value[2]}台`;
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#F06C00"
                  }
                }
              },
              {
                name: "上海",
                type: "map",
                map: "SHA",
                geoIndex: 0,
                data: [
                  { name: "崇明区", value: 20057.34 },
                  { name: "虹口区", value: 20057.34 },
                  { name: "嘉定区", value: 15477.48 },
                  { name: "闵行区", value: 31686.1 },
                  { name: "宝山区", value: 6992.6 },
                  { name: "长宁区", value: 44045.49 },
                  { name: "奉贤区", value: 40689.64 },
                  { name: "金山区", value: 37659.78 },
                  { name: "静安区", value: 45180.97 },
                  { name: "普陀区", value: 55204.26 },
                  { name: "青浦区", value: 21900.9 },
                  { name: "松江区", value: 4918.26 },
                  { name: "徐汇区", value: 5881.84 },
                  { name: "杨浦区", value: 4178.01 },
                  { name: "闸北区", value: 2227.92 },
                  { name: "黄浦区", value: 2180.98 },
                  { name: "浦东新区", value: 9172.94 }
                ],
                // 自定义名称映射
                nameMap: {
                  崇明区: "崇明区",
                  虹口区: "虹口区",
                  嘉定区: "嘉定区",
                  闵行区: "闵行区",
                  宝山区: "宝山区",
                  长宁区: "长宁区",
                  奉贤区: "奉贤区",
                  金山区: "金山区",
                  静安区: "静安区",
                  普陀区: "普陀区",
                  青浦区: "青浦区",
                  松江区: "松江区",
                  徐汇区: "徐汇区",
                  杨浦区: "杨浦区",
                  闸北区: "闸北区",
                  黄浦区: "黄浦区",
                  浦东新区: "浦东新区"
                },
                label: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    areaColor: "orange",
                    borderColor: "#000",
                    borderWidth: 10
                  }
                }
              }
            ]
          });
          chart.on("click", params => {
            console.log(params);
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
    drawSZ() {
      let chart = this.$echarts.init(this.$refs.geo_four);
      chart.showLoading();
      this.getGeoJSON("./src/assets/data/suzhou_2.json")
        .then(data => {
          this.geoFour = data.data;
          chart.hideLoading();
          this.$echarts.registerMap("SZ", this.geoFour);

          chart.setOption({
            title: {
              text: "苏州"
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c} (台)"
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
              }
            },
            visualMap: {
              min: 800,
              max: 50000,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"]
              }
            },
            series: [
              {
                name: "苏州",
                type: "map",
                mapType: "SZ", // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
                center: ["50%", "50%"],
                radius: [300, 300],
                data: [
                  { name: "常熟市", value: 20057.34 },
                  { name: "虎丘区", value: 15477.48 },
                  { name: "昆山市", value: 31686.1 },
                  { name: "太仓市", value: 6992.6 },
                  { name: "吴江区", value: 44045.49 },
                  { name: "相城区", value: 40689.64 },
                  { name: "张家港市", value: 37659.78 },
                  { name: "吴中区", value: 45180.97 },
                  { name: "姑苏区", value: 55204.26 }
                ],
                // 自定义名称映射
                nameMap: {
                  常熟: "常熟市",
                  虎丘区: "虎丘区",
                  昆山: "昆山市",
                  太仓: "太仓市",
                  吴江区: "吴江区",
                  相城区: "相城区",
                  张家港: "张家港市",
                  吴中区: "吴中区",
                  姑苏区: "姑苏区"
                }
              }
            ]
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
    drawChinaAir() {
      let chart = this.$echarts.init(this.$refs.geo_five);
      var geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      };

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      let option = {
        backgroundColor: "#404a59",
        title: {
          text: "全国主要城市空气质量",
          subtext: "data from PM25.in",
          sublink: "http://www.pm25.in",
          x: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return params.name + " : " + params.value[2];
          }
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff"
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ["#50a3ba", "#eac736", "#d94e5d"]
          },
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#111"
            },
            emphasis: {
              areaColor: "#2a333d"
            }
          }
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData([
              { name: "海门", value: 9 },
              { name: "鄂尔多斯", value: 12 },
              { name: "招远", value: 12 },
              { name: "舟山", value: 12 },
              { name: "齐齐哈尔", value: 14 },
              { name: "盐城", value: 15 },
              { name: "赤峰", value: 16 },
              { name: "青岛", value: 18 },
              { name: "乳山", value: 18 },
              { name: "金昌", value: 19 },
              { name: "泉州", value: 21 },
              { name: "莱西", value: 21 },
              { name: "日照", value: 21 },
              { name: "胶南", value: 22 },
              { name: "南通", value: 23 },
              { name: "拉萨", value: 24 },
              { name: "云浮", value: 24 },
              { name: "梅州", value: 25 },
              { name: "文登", value: 25 },
              { name: "上海", value: 25 },
              { name: "攀枝花", value: 25 },
              { name: "威海", value: 25 },
              { name: "承德", value: 25 },
              { name: "厦门", value: 26 },
              { name: "汕尾", value: 26 },
              { name: "潮州", value: 26 },
              { name: "丹东", value: 27 },
              { name: "太仓", value: 27 },
              { name: "曲靖", value: 27 },
              { name: "烟台", value: 28 },
              { name: "福州", value: 29 },
              { name: "瓦房店", value: 30 },
              { name: "即墨", value: 30 },
              { name: "抚顺", value: 31 },
              { name: "玉溪", value: 31 },
              { name: "张家口", value: 31 },
              { name: "阳泉", value: 31 },
              { name: "莱州", value: 32 },
              { name: "湖州", value: 32 },
              { name: "汕头", value: 32 },
              { name: "昆山", value: 33 },
              { name: "宁波", value: 33 },
              { name: "湛江", value: 33 },
              { name: "揭阳", value: 34 },
              { name: "荣成", value: 34 },
              { name: "连云港", value: 35 },
              { name: "葫芦岛", value: 35 },
              { name: "常熟", value: 36 },
              { name: "东莞", value: 36 },
              { name: "河源", value: 36 },
              { name: "淮安", value: 36 },
              { name: "泰州", value: 36 },
              { name: "南宁", value: 37 },
              { name: "营口", value: 37 },
              { name: "惠州", value: 37 },
              { name: "江阴", value: 37 },
              { name: "蓬莱", value: 37 },
              { name: "韶关", value: 38 },
              { name: "嘉峪关", value: 38 },
              { name: "广州", value: 38 },
              { name: "延安", value: 38 },
              { name: "太原", value: 39 },
              { name: "清远", value: 39 },
              { name: "中山", value: 39 },
              { name: "昆明", value: 39 },
              { name: "寿光", value: 40 },
              { name: "盘锦", value: 40 },
              { name: "长治", value: 41 },
              { name: "深圳", value: 41 },
              { name: "珠海", value: 42 },
              { name: "宿迁", value: 43 },
              { name: "咸阳", value: 43 },
              { name: "铜川", value: 44 },
              { name: "平度", value: 44 },
              { name: "佛山", value: 44 },
              { name: "海口", value: 44 },
              { name: "江门", value: 45 },
              { name: "章丘", value: 45 },
              { name: "肇庆", value: 46 },
              { name: "大连", value: 47 },
              { name: "临汾", value: 47 },
              { name: "吴江", value: 47 },
              { name: "石嘴山", value: 49 },
              { name: "沈阳", value: 50 },
              { name: "苏州", value: 50 },
              { name: "茂名", value: 50 },
              { name: "嘉兴", value: 51 },
              { name: "长春", value: 51 },
              { name: "胶州", value: 52 },
              { name: "银川", value: 52 },
              { name: "张家港", value: 52 },
              { name: "三门峡", value: 53 },
              { name: "锦州", value: 54 },
              { name: "南昌", value: 54 },
              { name: "柳州", value: 54 },
              { name: "三亚", value: 54 },
              { name: "自贡", value: 56 },
              { name: "吉林", value: 56 },
              { name: "阳江", value: 57 },
              { name: "泸州", value: 57 },
              { name: "西宁", value: 57 },
              { name: "宜宾", value: 58 },
              { name: "呼和浩特", value: 58 },
              { name: "成都", value: 58 },
              { name: "大同", value: 58 },
              { name: "镇江", value: 59 },
              { name: "桂林", value: 59 },
              { name: "张家界", value: 59 },
              { name: "宜兴", value: 59 },
              { name: "北海", value: 60 },
              { name: "西安", value: 61 },
              { name: "金坛", value: 62 },
              { name: "东营", value: 62 },
              { name: "牡丹江", value: 63 },
              { name: "遵义", value: 63 },
              { name: "绍兴", value: 63 },
              { name: "扬州", value: 64 },
              { name: "常州", value: 64 },
              { name: "潍坊", value: 65 },
              { name: "重庆", value: 66 },
              { name: "台州", value: 67 },
              { name: "南京", value: 67 },
              { name: "滨州", value: 70 },
              { name: "贵阳", value: 71 },
              { name: "无锡", value: 71 },
              { name: "本溪", value: 71 },
              { name: "克拉玛依", value: 72 },
              { name: "渭南", value: 72 },
              { name: "马鞍山", value: 72 },
              { name: "宝鸡", value: 72 },
              { name: "焦作", value: 75 },
              { name: "句容", value: 75 },
              { name: "北京", value: 79 },
              { name: "徐州", value: 79 },
              { name: "衡水", value: 80 },
              { name: "包头", value: 80 },
              { name: "绵阳", value: 80 },
              { name: "乌鲁木齐", value: 84 },
              { name: "枣庄", value: 84 },
              { name: "杭州", value: 84 },
              { name: "淄博", value: 85 },
              { name: "鞍山", value: 86 },
              { name: "溧阳", value: 86 },
              { name: "库尔勒", value: 86 },
              { name: "安阳", value: 90 },
              { name: "开封", value: 90 },
              { name: "济南", value: 92 },
              { name: "德阳", value: 93 },
              { name: "温州", value: 95 },
              { name: "九江", value: 96 },
              { name: "邯郸", value: 98 },
              { name: "临安", value: 99 },
              { name: "兰州", value: 99 },
              { name: "沧州", value: 100 },
              { name: "临沂", value: 103 },
              { name: "南充", value: 104 },
              { name: "天津", value: 105 },
              { name: "富阳", value: 106 },
              { name: "泰安", value: 112 },
              { name: "诸暨", value: 112 },
              { name: "郑州", value: 113 },
              { name: "哈尔滨", value: 114 },
              { name: "聊城", value: 116 },
              { name: "芜湖", value: 117 },
              { name: "唐山", value: 119 },
              { name: "平顶山", value: 119 },
              { name: "邢台", value: 119 },
              { name: "德州", value: 120 },
              { name: "济宁", value: 120 },
              { name: "荆州", value: 127 },
              { name: "宜昌", value: 130 },
              { name: "义乌", value: 132 },
              { name: "丽水", value: 133 },
              { name: "洛阳", value: 134 },
              { name: "秦皇岛", value: 136 },
              { name: "株洲", value: 143 },
              { name: "石家庄", value: 147 },
              { name: "莱芜", value: 148 },
              { name: "常德", value: 152 },
              { name: "保定", value: 153 },
              { name: "湘潭", value: 154 },
              { name: "金华", value: 157 },
              { name: "岳阳", value: 169 },
              { name: "长沙", value: 175 },
              { name: "衢州", value: 177 },
              { name: "廊坊", value: 193 },
              { name: "菏泽", value: 194 },
              { name: "合肥", value: 229 },
              { name: "武汉", value: 273 },
              { name: "大庆", value: 279 }
            ]),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: "#fff",
                borderWidth: 1
              }
            }
          }
        ]
      };

      chart.setOption(option);
    },
    drawBaidu() {
      let chart = this.$echarts.init(this.$refs.baidu);
      var data = [
        { name: "海门", value: 9 },
        { name: "鄂尔多斯", value: 12 },
        { name: "招远", value: 12 },
        { name: "舟山", value: 12 },
        { name: "齐齐哈尔", value: 14 },
        { name: "盐城", value: 15 },
        { name: "赤峰", value: 16 },
        { name: "青岛", value: 18 },
        { name: "乳山", value: 18 },
        { name: "金昌", value: 19 },
        { name: "泉州", value: 21 },
        { name: "莱西", value: 21 },
        { name: "日照", value: 21 },
        { name: "胶南", value: 22 },
        { name: "南通", value: 23 },
        { name: "拉萨", value: 24 },
        { name: "云浮", value: 24 },
        { name: "梅州", value: 25 },
        { name: "文登", value: 25 },
        { name: "上海", value: 25 },
        { name: "攀枝花", value: 25 },
        { name: "威海", value: 25 },
        { name: "承德", value: 25 },
        { name: "厦门", value: 26 },
        { name: "汕尾", value: 26 },
        { name: "潮州", value: 26 },
        { name: "丹东", value: 27 },
        { name: "太仓", value: 27 },
        { name: "曲靖", value: 27 },
        { name: "烟台", value: 28 },
        { name: "福州", value: 29 },
        { name: "瓦房店", value: 30 },
        { name: "即墨", value: 30 },
        { name: "抚顺", value: 31 },
        { name: "玉溪", value: 31 },
        { name: "张家口", value: 31 },
        { name: "阳泉", value: 31 },
        { name: "莱州", value: 32 },
        { name: "湖州", value: 32 },
        { name: "汕头", value: 32 },
        { name: "昆山", value: 33 },
        { name: "宁波", value: 33 },
        { name: "湛江", value: 33 },
        { name: "揭阳", value: 34 },
        { name: "荣成", value: 34 },
        { name: "连云港", value: 35 },
        { name: "葫芦岛", value: 35 },
        { name: "常熟", value: 36 },
        { name: "东莞", value: 36 },
        { name: "河源", value: 36 },
        { name: "淮安", value: 36 },
        { name: "泰州", value: 36 },
        { name: "南宁", value: 37 },
        { name: "营口", value: 37 },
        { name: "惠州", value: 37 },
        { name: "江阴", value: 37 },
        { name: "蓬莱", value: 37 },
        { name: "韶关", value: 38 },
        { name: "嘉峪关", value: 38 },
        { name: "广州", value: 38 },
        { name: "延安", value: 38 },
        { name: "太原", value: 39 },
        { name: "清远", value: 39 },
        { name: "中山", value: 39 },
        { name: "昆明", value: 39 },
        { name: "寿光", value: 40 },
        { name: "盘锦", value: 40 },
        { name: "长治", value: 41 },
        { name: "深圳", value: 41 },
        { name: "珠海", value: 42 },
        { name: "宿迁", value: 43 },
        { name: "咸阳", value: 43 },
        { name: "铜川", value: 44 },
        { name: "平度", value: 44 },
        { name: "佛山", value: 44 },
        { name: "海口", value: 44 },
        { name: "江门", value: 45 },
        { name: "章丘", value: 45 },
        { name: "肇庆", value: 46 },
        { name: "大连", value: 47 },
        { name: "临汾", value: 47 },
        { name: "吴江", value: 47 },
        { name: "石嘴山", value: 49 },
        { name: "沈阳", value: 50 },
        { name: "苏州", value: 50 },
        { name: "茂名", value: 50 },
        { name: "嘉兴", value: 51 },
        { name: "长春", value: 51 },
        { name: "胶州", value: 52 },
        { name: "银川", value: 52 },
        { name: "张家港", value: 52 },
        { name: "三门峡", value: 53 },
        { name: "锦州", value: 54 },
        { name: "南昌", value: 54 },
        { name: "柳州", value: 54 },
        { name: "三亚", value: 54 },
        { name: "自贡", value: 56 },
        { name: "吉林", value: 56 },
        { name: "阳江", value: 57 },
        { name: "泸州", value: 57 },
        { name: "西宁", value: 57 },
        { name: "宜宾", value: 58 },
        { name: "呼和浩特", value: 58 },
        { name: "成都", value: 58 },
        { name: "大同", value: 58 },
        { name: "镇江", value: 59 },
        { name: "桂林", value: 59 },
        { name: "张家界", value: 59 },
        { name: "宜兴", value: 59 },
        { name: "北海", value: 60 },
        { name: "西安", value: 61 },
        { name: "金坛", value: 62 },
        { name: "东营", value: 62 },
        { name: "牡丹江", value: 63 },
        { name: "遵义", value: 63 },
        { name: "绍兴", value: 63 },
        { name: "扬州", value: 64 },
        { name: "常州", value: 64 },
        { name: "潍坊", value: 65 },
        { name: "重庆", value: 66 },
        { name: "台州", value: 67 },
        { name: "南京", value: 67 },
        { name: "滨州", value: 70 },
        { name: "贵阳", value: 71 },
        { name: "无锡", value: 71 },
        { name: "本溪", value: 71 },
        { name: "克拉玛依", value: 72 },
        { name: "渭南", value: 72 },
        { name: "马鞍山", value: 72 },
        { name: "宝鸡", value: 72 },
        { name: "焦作", value: 75 },
        { name: "句容", value: 75 },
        { name: "北京", value: 79 },
        { name: "徐州", value: 79 },
        { name: "衡水", value: 80 },
        { name: "包头", value: 80 },
        { name: "绵阳", value: 80 },
        { name: "乌鲁木齐", value: 84 },
        { name: "枣庄", value: 84 },
        { name: "杭州", value: 84 },
        { name: "淄博", value: 85 },
        { name: "鞍山", value: 86 },
        { name: "溧阳", value: 86 },
        { name: "库尔勒", value: 86 },
        { name: "安阳", value: 90 },
        { name: "开封", value: 90 },
        { name: "济南", value: 92 },
        { name: "德阳", value: 93 },
        { name: "温州", value: 95 },
        { name: "九江", value: 96 },
        { name: "邯郸", value: 98 },
        { name: "临安", value: 99 },
        { name: "兰州", value: 99 },
        { name: "沧州", value: 100 },
        { name: "临沂", value: 103 },
        { name: "南充", value: 104 },
        { name: "天津", value: 105 },
        { name: "富阳", value: 106 },
        { name: "泰安", value: 112 },
        { name: "诸暨", value: 112 },
        { name: "郑州", value: 113 },
        { name: "哈尔滨", value: 114 },
        { name: "聊城", value: 116 },
        { name: "芜湖", value: 117 },
        { name: "唐山", value: 119 },
        { name: "平顶山", value: 119 },
        { name: "邢台", value: 119 },
        { name: "德州", value: 120 },
        { name: "济宁", value: 120 },
        { name: "荆州", value: 127 },
        { name: "宜昌", value: 130 },
        { name: "义乌", value: 132 },
        { name: "丽水", value: 133 },
        { name: "洛阳", value: 134 },
        { name: "秦皇岛", value: 136 },
        { name: "株洲", value: 143 },
        { name: "石家庄", value: 147 },
        { name: "莱芜", value: 148 },
        { name: "常德", value: 152 },
        { name: "保定", value: 153 },
        { name: "湘潭", value: 154 },
        { name: "金华", value: 157 },
        { name: "岳阳", value: 169 },
        { name: "长沙", value: 175 },
        { name: "衢州", value: 177 },
        { name: "廊坊", value: 193 },
        { name: "菏泽", value: 194 },
        { name: "合肥", value: 229 },
        { name: "武汉", value: 273 },
        { name: "大庆", value: 279 }
      ];

      var geoCoordMap = {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        招远: [120.38, 37.35],
        舟山: [122.207216, 29.985295],
        齐齐哈尔: [123.97, 47.33],
        盐城: [120.13, 33.38],
        赤峰: [118.87, 42.28],
        青岛: [120.33, 36.07],
        乳山: [121.52, 36.89],
        金昌: [102.188043, 38.520089],
        泉州: [118.58, 24.93],
        莱西: [120.53, 36.86],
        日照: [119.46, 35.42],
        胶南: [119.97, 35.88],
        南通: [121.05, 32.08],
        拉萨: [91.11, 29.97],
        云浮: [112.02, 22.93],
        梅州: [116.1, 24.55],
        文登: [122.05, 37.2],
        上海: [121.48, 31.22],
        攀枝花: [101.718637, 26.582347],
        威海: [122.1, 37.5],
        承德: [117.93, 40.97],
        厦门: [118.1, 24.46],
        汕尾: [115.375279, 22.786211],
        潮州: [116.63, 23.68],
        丹东: [124.37, 40.13],
        太仓: [121.1, 31.45],
        曲靖: [103.79, 25.51],
        烟台: [121.39, 37.52],
        福州: [119.3, 26.08],
        瓦房店: [121.979603, 39.627114],
        即墨: [120.45, 36.38],
        抚顺: [123.97, 41.97],
        玉溪: [102.52, 24.35],
        张家口: [114.87, 40.82],
        阳泉: [113.57, 37.85],
        莱州: [119.942327, 37.177017],
        湖州: [120.1, 30.86],
        汕头: [116.69, 23.39],
        昆山: [120.95, 31.39],
        宁波: [121.56, 29.86],
        湛江: [110.359377, 21.270708],
        揭阳: [116.35, 23.55],
        荣成: [122.41, 37.16],
        连云港: [119.16, 34.59],
        葫芦岛: [120.836932, 40.711052],
        常熟: [120.74, 31.64],
        东莞: [113.75, 23.04],
        河源: [114.68, 23.73],
        淮安: [119.15, 33.5],
        泰州: [119.9, 32.49],
        南宁: [108.33, 22.84],
        营口: [122.18, 40.65],
        惠州: [114.4, 23.09],
        江阴: [120.26, 31.91],
        蓬莱: [120.75, 37.8],
        韶关: [113.62, 24.84],
        嘉峪关: [98.289152, 39.77313],
        广州: [113.23, 23.16],
        延安: [109.47, 36.6],
        太原: [112.53, 37.87],
        清远: [113.01, 23.7],
        中山: [113.38, 22.52],
        昆明: [102.73, 25.04],
        寿光: [118.73, 36.86],
        盘锦: [122.070714, 41.119997],
        长治: [113.08, 36.18],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        宿迁: [118.3, 33.96],
        咸阳: [108.72, 34.36],
        铜川: [109.11, 35.09],
        平度: [119.97, 36.77],
        佛山: [113.11, 23.05],
        海口: [110.35, 20.02],
        江门: [113.06, 22.61],
        章丘: [117.53, 36.72],
        肇庆: [112.44, 23.05],
        大连: [121.62, 38.92],
        临汾: [111.5, 36.08],
        吴江: [120.63, 31.16],
        石嘴山: [106.39, 39.04],
        沈阳: [123.38, 41.8],
        苏州: [120.62, 31.32],
        茂名: [110.88, 21.68],
        嘉兴: [120.76, 30.77],
        长春: [125.35, 43.88],
        胶州: [120.03336, 36.264622],
        银川: [106.27, 38.47],
        张家港: [120.555821, 31.875428],
        三门峡: [111.19, 34.76],
        锦州: [121.15, 41.13],
        南昌: [115.89, 28.68],
        柳州: [109.4, 24.33],
        三亚: [109.511909, 18.252847],
        自贡: [104.778442, 29.33903],
        吉林: [126.57, 43.87],
        阳江: [111.95, 21.85],
        泸州: [105.39, 28.91],
        西宁: [101.74, 36.56],
        宜宾: [104.56, 29.77],
        呼和浩特: [111.65, 40.82],
        成都: [104.06, 30.67],
        大同: [113.3, 40.12],
        镇江: [119.44, 32.2],
        桂林: [110.28, 25.29],
        张家界: [110.479191, 29.117096],
        宜兴: [119.82, 31.36],
        北海: [109.12, 21.49],
        西安: [108.95, 34.27],
        金坛: [119.56, 31.74],
        东营: [118.49, 37.46],
        牡丹江: [129.58, 44.6],
        遵义: [106.9, 27.7],
        绍兴: [120.58, 30.01],
        扬州: [119.42, 32.39],
        常州: [119.95, 31.79],
        潍坊: [119.1, 36.62],
        重庆: [106.54, 29.59],
        台州: [121.420757, 28.656386],
        南京: [118.78, 32.04],
        滨州: [118.03, 37.36],
        贵阳: [106.71, 26.57],
        无锡: [120.29, 31.59],
        本溪: [123.73, 41.3],
        克拉玛依: [84.77, 45.59],
        渭南: [109.5, 34.52],
        马鞍山: [118.48, 31.56],
        宝鸡: [107.15, 34.38],
        焦作: [113.21, 35.24],
        句容: [119.16, 31.95],
        北京: [116.46, 39.92],
        徐州: [117.2, 34.26],
        衡水: [115.72, 37.72],
        包头: [110, 40.58],
        绵阳: [104.73, 31.48],
        乌鲁木齐: [87.68, 43.77],
        枣庄: [117.57, 34.86],
        杭州: [120.19, 30.26],
        淄博: [118.05, 36.78],
        鞍山: [122.85, 41.12],
        溧阳: [119.48, 31.43],
        库尔勒: [86.06, 41.68],
        安阳: [114.35, 36.1],
        开封: [114.35, 34.79],
        济南: [117, 36.65],
        德阳: [104.37, 31.13],
        温州: [120.65, 28.01],
        九江: [115.97, 29.71],
        邯郸: [114.47, 36.6],
        临安: [119.72, 30.23],
        兰州: [103.73, 36.03],
        沧州: [116.83, 38.33],
        临沂: [118.35, 35.05],
        南充: [106.110698, 30.837793],
        天津: [117.2, 39.13],
        富阳: [119.95, 30.07],
        泰安: [117.13, 36.18],
        诸暨: [120.23, 29.71],
        郑州: [113.65, 34.76],
        哈尔滨: [126.63, 45.75],
        聊城: [115.97, 36.45],
        芜湖: [118.38, 31.33],
        唐山: [118.02, 39.63],
        平顶山: [113.29, 33.75],
        邢台: [114.48, 37.05],
        德州: [116.29, 37.45],
        济宁: [116.59, 35.38],
        荆州: [112.239741, 30.335165],
        宜昌: [111.3, 30.7],
        义乌: [120.06, 29.32],
        丽水: [119.92, 28.45],
        洛阳: [112.44, 34.7],
        秦皇岛: [119.57, 39.95],
        株洲: [113.16, 27.83],
        石家庄: [114.48, 38.03],
        莱芜: [117.67, 36.19],
        常德: [111.69, 29.05],
        保定: [115.48, 38.85],
        湘潭: [112.91, 27.87],
        金华: [119.64, 29.12],
        岳阳: [113.09, 29.37],
        长沙: [113, 28.21],
        衢州: [118.88, 28.97],
        廊坊: [116.7, 39.53],
        菏泽: [115.480656, 35.23375],
        合肥: [117.27, 31.86],
        武汉: [114.31, 30.52],
        大庆: [125.03, 46.58]
      };

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      }

      let option = {
        // backgroundColor: '#404a59',
        title: {
          text: "全国主要城市空气质量",
          subtext: "data from PM25.in",
          sublink: "http://www.pm25.in",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: "water",
                elementType: "all",
                stylers: {
                  color: "#044161"
                }
              },
              {
                featureType: "land",
                elementType: "all",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry",
                stylers: {
                  color: "#064f85"
                }
              },
              {
                featureType: "railway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "highway",
                elementType: "geometry.fill",
                stylers: {
                  color: "#005b96",
                  lightness: 1
                }
              },
              {
                featureType: "highway",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry",
                stylers: {
                  color: "#004981"
                }
              },
              {
                featureType: "arterial",
                elementType: "geometry.fill",
                stylers: {
                  color: "#00508b"
                }
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "green",
                elementType: "all",
                stylers: {
                  color: "#056197",
                  visibility: "off"
                }
              },
              {
                featureType: "subway",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "manmade",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "local",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "arterial",
                elementType: "labels",
                stylers: {
                  visibility: "off"
                }
              },
              {
                featureType: "boundary",
                elementType: "geometry.fill",
                stylers: {
                  color: "#029fd4"
                }
              },
              {
                featureType: "building",
                elementType: "all",
                stylers: {
                  color: "#1a5787"
                }
              },
              {
                featureType: "label",
                elementType: "all",
                stylers: {
                  visibility: "off"
                }
              }
            ]
          }
        },
        series: [
          {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ddb926"
              }
            }
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "bmap",
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 6)
            ),
            symbolSize: function(val) {
              return val[2] / 10;
            },
            showEffectOn: "emphasis",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#f4e925",
                shadowBlur: 10,
                shadowColor: "#333"
              }
            },
            zlevel: 1
          }
        ]
      };
      chart.setOption(option);
      console.log(chart)
    }
  },
  created() {
    this.$nextTick(() => {
      this.drawHK();
      this.drawCM();
      this.drawSH();
      this.drawSHA();
      this.drawSZ();
      this.drawChinaAir();
      // this.drawBaidu()
      baiduMap
        .init("ZUONbpqGBsYGXNIYHicvbAbM")
        .then(() => {
          this.drawBaidu()
        })
        .catch(e => {
          console.log(e);
        });
    });
  }
};
</script>

<style lang="less" scoped>
@hborder: #90c;
@color: #333;
.detail {
  width: 100%;
  padding: 20px;
  .title {
    h2 {
      color: @color;
      font-size: 20px;
      padding-left: 5px;
      border-left: 2px solid @hborder;
    }
  }
  .chart {
    width: 1200px;
    height: 650px;
  }
}
</style>
