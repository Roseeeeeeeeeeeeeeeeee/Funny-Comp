<template>
  <div class="app-container">
   <Fanshaped
   color="#000"
   :radius="600"
   :startDeg="10"
   :endDeg="80"/>
  </div>
</template>

<script setup>
import Fanshaped from '@/components/Fanshaped/index.vue'
</script>

<style scoped lang="less">
@import url('./styles/mixin.less');

.app-container {
  .self-fill(fixed)
}
</style>
