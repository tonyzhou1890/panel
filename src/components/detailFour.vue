<template>
  <div class="map-container">
    <div
      class="map"
      :style="'transform: scale(' + range + '); top: ' + y + 'px; left: ' + x + 'px'"
      @mousedown="mousedown"
      @mousemove="mousemove"
      @mouseup="mouseup"
      @wheel="scale">
      <img src="../assets/source/image/tjllw.jpg">
      <div class="mask"></div>
      <div class="mark-layer">
        <div
          v-for="(item, index) in mark"
          :key="index"
          :style="'left:' + item[0] + 'px; top: ' + item[1] + 'px' "
          v-text="item[2]"
          class="mark"></div>
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
      mark: [
        [100, 23, 4],
        [300, 50, 7]
      ],
      inter: null
    }
  },
  methods: {
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
    generateData() {
      this.inter = setInterval(() => {
        let arr = []
        this.mark.map(item => {
          item[item.length - 1] = Math.ceil(Math.random() * 10)
          arr.push(item)
        })
        this.mark = arr
      }, 1000)
    }
  },
  created() {
    this.generateData()
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
  border-radius: 50%;
  box-sizing: border-box;
  border: 1px solid white;
  color: white;
  line-height: 20px;
  text-align: center;
  font-size: 15px;
}
</style>
