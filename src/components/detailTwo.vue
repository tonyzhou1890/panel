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
        <h2>图4</h2>
      </div>
      <div class="chart chart-4" ref="geo_four"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      geoOne: [],
      geoTwo: [],
      geoThree: [],
      geoFour: []
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
            tooltip: {
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
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"]
              }
            },
            series: [
              {
                name: "上海",
                type: "map",
                mapType: "SH", // 自定义扩展图表类型
                itemStyle: {
                  normal: { label: { show: true } },
                  emphasis: { label: { show: true } }
                },
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
                  崇明区: '崇明区',
                  虹口区: '虹口区',
                  嘉定区: '嘉定区',
                  闵行区: '闵行区',
                  宝山区: '宝山区',
                  长宁区: '长宁区',
                  奉贤区: '奉贤区',
                  金山区: '金山区',
                  静安区: '静安区',
                  普陀区: '普陀区',
                  青浦区: '青浦区',
                  松江区: '松江区',
                  徐汇区: '徐汇区',
                  杨浦区: '杨浦区',
                  闸北区: '闸北区',
                  黄浦区: '黄浦区',
                  浦东新区: '浦东新区'
                }
              }
            ]
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
                  常熟市: '常熟市',
                  虎丘区: '虎丘区',
                  昆山市: '昆山市',
                  太仓市: '太仓市',
                  吴江区: '吴江区',
                  相城区: '相城区',
                  张家港市: '张家港市',
                  吴中区: '吴中区',
                  姑苏区: '姑苏区'
                }
              }
            ]
          });
        })
        .catch(e => {
          console.log(new Error(e));
        });
    },
  },
  created() {
    this.$nextTick(() => {
      this.drawHK()
      this.drawCM()
      this.drawSH()
      this.drawSZ()
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
