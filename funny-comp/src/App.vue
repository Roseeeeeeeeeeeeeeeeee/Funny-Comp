<template>
  <div class="app-container">
    <MaterialInput />
  </div>
</template>

<script setup>
import MaterialInput from '@/components/MaterialInput/index.vue'

</script>

<style scoped lang="less">
@import url('./styles/mixin.less');
.app-container{
  .self-fill(fixed)
}
</style>
