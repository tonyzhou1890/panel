<template>
  <div class="map-container">
    <t-map></t-map>
  </div>
</template>

<script>
import TMap from './TMap.vue'
export default {
  components: {TMap}
}
</script>

<style>
.map-container {
  width: 800px;
  height: 500px;
}
</style>
