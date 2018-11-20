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
  methods: {
    drawRiverWater() {
      let chart = this.$echarts.init(this.$refs.riverWater);
      let data = [
        {
          isFault: 0,
          latitude: 30.83024,
          longitude: 121.235825,
          town: "龙士路",
          address: "槽坊河1#"
        },
        {
          isFault: 0,
          latitude: 30.835428,
          longitude: 121.211006,
          town: "漾平路",
          address: "红光河桥4#"
        }
      ];
      let coordsOriginArr = [];
      data.map(item => {
        coordsOriginArr.push(new BMap.Point(item.longitude, item.latitude));
      });
      const translateCallback = res => {
        console.log(res);
        if (res.status === 0) {
          res = res.points;
          const newData = [];
          res.map((item, index) => {
            newData[index] = [item.lng, item.lat, data[index]];
          });
          chart.setOption({
            title: {
              text: "吕巷镇河道水设备分布",
              textStyle: {
                color: 'white',
                align: 'center'
              },
              tooltip: {

              }
            },
            bmap: {
              center: [121.182812, 30.831685],
              zoom: 13,
              roam: true,
              // mapStyle
            },
            series: [
              {
                name: "河道水设备",
                type: "scatter",
                coordinateSystem: "bmap",
                data: newData,
                symbolSize: 20,
                label: {
                  formatter: (params) => {
                    return params.data[2].address
                  },
                  position: 'right',
                  show: true
                },
                animation: false
              }
            ]
          });
        } else {
          console.log(res.status);
        }
      };
      setTimeout(() => {
        let convertor = new BMap.Convertor();
        convertor.translate(coordsOriginArr, 1, 5, translateCallback);
      }, 1000);
      const option = {
        title: {
          text: "吕巷镇河道水设备分布",
          tooltip: {},
          bmap: {
            center: [121.182812, 30.831685],
            zoom: 15,
            roam: true,
            mapStyle
          },
          series: [
            {
              name: "河道水设备",
              type: "scatter",
              coordinateSystem: "bmap"
            }
          ]
        }
      }
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
