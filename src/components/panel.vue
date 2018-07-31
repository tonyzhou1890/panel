<template>
  <div class="wrap">
    <vuenav></vuenav>
    <vuebody></vuebody>
  </div>
</template>

<script>
import vuenav from "./nav.vue";
import vuebody from "./body.vue";
export default {
  components: {
    vuenav,
    vuebody
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  min-height: 100%;
}
</style>
