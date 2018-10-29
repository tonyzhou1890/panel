<template>
  <div class="wrapper">
    <button @click="getCookie">获取cookie</button>
    <button @click="sendCookie">发送cookie</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://坚.top/apps/test/water.php'
    }
  },
  methods: {
    getCookie() {
      this.$axios({
        url: this.url,
        method: 'get',
        params: {
          'cookie': 'get'
        }
      }).then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    },
    sendCookie() {
      this.$axios({
        url: this.url,
        method: 'get',
        params: {
          'cookie': 'lily'
        }
      }).then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>
