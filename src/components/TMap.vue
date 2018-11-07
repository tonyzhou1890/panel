<template>
  <div class="map-container">
    <div
      class="map"
      :style="'transform: scale(' + range + '); top: ' + y + 'px; left: ' + x + 'px'"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      @wheel.prevent="scale">
      <img :src="map.url">
      <div class="mask"></div>
      <div class="mark-layer">
        <div
          v-for="(item, index) in data"
          :key="index"
          :style="getStyle(item)"
          class="mark">
          <img
            class="map-elevator"
            :src="elevator(item)" >
          <p
            v-text="floorText(item)"
            class="map-elevator-floor-text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      range: 1,
      x: 0,
      y: 0,
      preX: 0,
      preY: 0,
      mouseDown: false,
      map: {
        url: "/src/assets/source/image/tjllw.png",
        bounds: [
          [121.211597,31.408939],
          [121.215522,31.411146],
          // [121.210634,31.402951]
          [121.21713,31.40927]
        ]
      },
      data: [
        {
          situation: '56#',
          xPercent: 8.84,
          yPercent: 17.16,
          position: [121.212152,31.408764],
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '18#右',
          xPercent: 46.47,
          yPercent: 58.60,
          position: [121.214131,31.408703],
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '22#右',
          xPercent: 66.26,
          yPercent: 59.54,
          position: [121.214919, 31.409119],
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '30#左',
          xPercent: 60.79,
          yPercent: 39.25,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '12#左',
          xPercent: 29.65,
          yPercent: 77.94,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '46#左',
          xPercent: 53.59,
          yPercent: 17.99,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '06#左',
          xPercent: 59.92,
          yPercent: 77.93,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '16#右',
          xPercent: 30.34,
          yPercent: 57.68,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '28#右',
          xPercent: 72.04,
          yPercent: 39.67,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '14#右',
          xPercent: 21.81,
          yPercent: 56.31,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '06#右',
          xPercent: 64.82,
          yPercent: 77.97,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '16#左',
          xPercent: 25.21,
          yPercent: 57.18,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '02#右',
          xPercent: 89.21,
          yPercent: 76.60,
          position: [121.216026, 31.409258],
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '38#',
          xPercent: 19.35,
          yPercent: 36.56,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '10#右',
          xPercent: 43.06,
          yPercent: 77.59,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '02#左',
          xPercent: 85.38,
          yPercent: 77.22,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '20#左',
          xPercent: 50.37,
          yPercent: 61.66,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '26#右',
          xPercent: 87.51,
          yPercent: 52.95,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '42#左',
          xPercent: 73.57,
          yPercent: 19.00,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '54#左',
          xPercent: 15.78,
          yPercent: 17.39,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '44#右',
          xPercent: 66.26,
          yPercent: 18.13,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '08#左',
          xPercent: 48.92,
          yPercent: 77.72,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '24#右',
          xPercent: 75.18,
          yPercent: 63.07,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '20#右',
          xPercent: 54.45,
          yPercent: 62.16,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '30#右',
          xPercent: 64.48,
          yPercent: 38.80,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '18#左',
          xPercent: 42.01,
          yPercent: 56.68,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '48#右',
          xPercent: 47.39,
          yPercent: 18.10,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '32#右',
          xPercent: 50.88,
          yPercent: 39.29,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '48#左',
          xPercent: 42.97,
          yPercent: 18.63,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '52#右',
          xPercent: 28.02,
          yPercent: 17.88,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '42#右',
          xPercent: 77.31,
          yPercent: 19.00,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '04#左',
          xPercent: 78.33,
          yPercent: 77.22,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '50#右',
          xPercent: 38.56,
          yPercent: 17.63,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '36#',
          xPercent: 26.83,
          yPercent: 37.43,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '40#左',
          xPercent: 83.94,
          yPercent: 30.46,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '32#左',
          xPercent: 45.95,
          yPercent: 39.67,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '10#左',
          xPercent: 38.22,
          yPercent: 77.97,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '34#左',
          xPercent: 36.94,
          yPercent: 38.42,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '58#',
          xPercent: 2.68,
          yPercent: 16.27,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '52#左',
          xPercent: 24.11,
          yPercent: 18.01,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '46#右',
          xPercent: 57.11,
          yPercent: 17.88,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '22#左',
          xPercent: 61.42,
          yPercent: 58.55,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '24#左',
          xPercent: 70.59,
          yPercent: 62.90,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '34#右',
          xPercent: 41.27,
          yPercent: 38.05,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '14#左',
          xPercent: 18.44,
          yPercent: 54.81,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '50#左',
          xPercent: 34.65,
          yPercent: 17.88,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '28#左',
          xPercent: 68.39,
          yPercent: 39.92,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '40#右',
          xPercent: 88.70,
          yPercent: 33.07,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '04#右',
          xPercent: 81.58,
          yPercent: 77.22,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '12#右',
          xPercent: 33.88,
          yPercent: 77.72,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '44#左',
          xPercent: 61.84,
          yPercent: 19.00,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '26#左',
          xPercent: 83.71,
          yPercent: 49.50,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '08#右',
          xPercent: 53.43,
          yPercent: 77.84,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        },
        {
          situation: '54#右',
          xPercent: 19.18,
          yPercent: 16.51,
          floor: 3,
          isFault: 1,
          isOffLine: 0
        }
      ],
      inter: null
    }
  },
  computed: {
  },
  methods: {
    elevator(item) {
      if (item.isOffLine > 0) return '/src/assets/source/image/elevatorOff.svg'
      if (item.isFault > 0) return '/src/assets/source/image/elevatorFault.svg'
      return '/src/assets/source/image/elevator.svg'
    },
    floorText(item) {
      return item.floor !== null ? item.floor : '查询中'
    },
    scale(e) {
      if (e.deltaY > 0) {
        this.range /= 1.1
      } else {
        this.range *= 1.1
      }
    },
    mousedown(e) {
      this.mouseDown = true
      this.preX = e.pageX
      this.preY = e.pageY
    },
    mousemove(e) {
      if (this.mouseDown) {
        this.x += e.pageX - this.preX
        this.y += e.pageY - this.preY
        this.preX = e.pageX
        this.preY = e.pageY
      }
    },
    mouseup(e) {
      this.mouseDown = false
    },
    getStyle(item) {
      if (item.position) {
        return `left: ${item.position[0]}%;top: ${item.position[1]}%`
      }
      return `left: ${item.xPercent}%;top: ${item.yPercent}%`
    },
    generate() {
      this.data.map(item => {
        item.isFault = Math.random() > 0.95 ? 1 : 0
        item.isOffLine = Math.random() > 0.95 ? 1 : 0
        item.floor = Math.random() > 0.1 ? Math.floor(Math.random() * 20) : null
      })
    },
    // 求垂足
    getFoot(start, end, pt) {
      const foot = []
      const dx = start[0] - end[0]
      const dy = start[1] - end[1]
      let k = (pt[0] - start[0]) * (start[0] - end[0]) + (pt[1] - start[1]) * (start[1] - end[1])
      k /= dx * dx + dy * dy
      foot[0] = start[0] + k * dx
      foot[1] = start[1] + k * dy
      return foot
    },
    // 求距离
    getDistance(start, end) {
      return Math.sqrt(Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2))
    },
    // 求指定位置在图上的百分比
    getPercent(leftTop, rightTop, rightBottom, point, foot) {
      const percent = []
      percent[0] = this.getDistance(leftTop, foot) / this.getDistance(leftTop, rightTop) * 100
      percent[1] = this.getDistance(point, foot) / this.getDistance(rightTop, rightBottom) * 100
      return percent
    },
    // 计算经纬度
    getLongitude() {
      // const k2 = (this.map.bounds[2][1] - this.map.bounds[])
    }
  },
  created() {
    this.data.map(item => {
      if (item.position) {
        const foot = this.getFoot(this.map.bounds[0], this.map.bounds[1], item.position)
        const p = this.getPercent(this.map.bounds[0], this.map.bounds[1], this.map.bounds[2], item.position, foot)
        item.position = p
      }
    })
    this.inter = setInterval(() => {
      this.generate()
    }, 3000)
  }
}
</script>

<style>
.map-container {
  width: 800px;
  height: 500px;
  overflow: hidden;
  position: relative;
}

.map-container div {
  position: absolute;
  left: 0;
  top: 0;
}

.map, .mask, .mark-layer {
  width: 100%;
  height: 100%;
}

.map {
  position: absolute;
}

.map img {
  width: 100%;
  height: 100%;
}

.mark {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  color: white;
  line-height: 20px;
  text-align: center;
  font-size: 15px;
}

.mark .map-elevator {
  width: 100%;
  cursor: pointer;
  color: #8a2be2;
}

.mark .map-elevator-floor-text {
  margin: 0;
  font-size: 12px;
  line-height: 12px;
  color: white;
  background-color: gray;
}
</style>
