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
  </div>
</template>

<script>
export default {
  data() {
    return {
      geoOne: [],
      geoTwo: []
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
    }
  },
  created() {
    this.$nextTick(() => {
      this.drawHK()
      this.drawCM()
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
    width: 600px;
    height: 450px;
  }
}
</style>
