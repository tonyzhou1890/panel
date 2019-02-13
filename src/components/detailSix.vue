<template>
  <div class="detail">
    <div class="stage">
      <div class="title">
        <h2>图1</h2>
      </div>
      <div class="chart chart-1" ref="riverWater"></div>
    </div>
  </div>
</template>

<script>
import baiduMap from "../assets/js/baidu_map"
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
}
export default {
  data() {
    return {
      regions: [],
      curRegions: [],
      chart: null
    }
  },
  methods: {
    drawRiverWater() {
      this.chart = this.$echarts.init(this.$refs.riverWater);
      this.draw()
    },
    // 绘制函数
    draw() {
      this.chart.setOption({
        title: {
          text: "行政区划",
          textStyle: {
            color: 'white',
            align: 'center'
          },
          tooltip: {

          }
        },
        color: ['white'],
        bmap: {
          center: [121.182812, 30.831685],
          zoom: 8,
          roam: true,
          mapStyle
        },
        series: [
          {
            name: "河道水设备",
            type: "scatter",
            coordinateSystem: "bmap",
            data: this.curRegions,
            symbolSize: 20,
            label: {
              formatter: (params) => {
                return params.data[2].label
              },
              position: 'right',
              show: true
            },
            animation: false
          }
        ]
      });
      // 注册事件处理器
      this.chart.on('click', e => {
        console.log(e)
      })
      this.chart.on('bmaproam', this._.debounce((params) => {
        this.getData()
      }, 200))
      this.getData()
    },
    // 获取数据
    getData() {
      this.chart.showLoading()
      this.$axios
        .get("./src/assets/data/region.json")
        .then(data => {
          this.regions = data.data
          const option = this.chart.getOption()
          const zoom = option.bmap[0].zoom
          const bmap = this.chart.getModel().getComponent('bmap').getBMap();
          const bs = bmap.getBounds()
          const sw = bs.getSouthWest()
          const ne = bs.getNorthEast()
          console.log(option)
          let temp = []
          if (zoom < 10) {
            temp = this.regions[0]
          } else if (zoom < 12) {
            temp = this.regions[0].children[0]
          } else if (zoom < 15) {
            temp = this.regions[0].children[0].children[0]
          }
          this.curRegions[0] = [temp.lng, temp.lat, temp]
          option.series[0].data = this.curRegions
          this.chart.setOption(option)
          this.regions = data.data
          this.chart.hideLoading()
        })
        .catch(e => {
          console.log(e)
          this.chart.hideLoading()
        })
    }
  },
  mounted() {
      baiduMap
        .init("ZUONbpqGBsYGXNIYHicvbAbM")
        .then(() => {
          this.drawRiverWater()
        })
        .catch(e => {
          console.log(e);
        })
  }
}
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
