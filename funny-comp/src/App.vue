<template>
  <div class="app-container">
    <Carousel :imgs="data" />
  </div>
</template>

<script setup>
import Carousel from '@/components/Carousel/index(type2).vue'
console.log(import.meta.url);
const data = [
  new URL('./assets/wp1.jpeg', import.meta.url),
  new URL('./assets/wp4.jpeg', import.meta.url),
  new URL('./assets/wp5.jpg', import.meta.url),
  new URL('./assets/wp6.jpeg', import.meta.url),
  new URL('./assets/wp2.jpg', import.meta.url),
]

</script>

<style scoped lang="less">
@import url('./styles/mixin.less');

.app-container {
  .self-fill(fixed)
}
</style>
