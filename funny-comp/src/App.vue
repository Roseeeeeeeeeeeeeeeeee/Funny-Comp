<template>
  <div class="app-container">
    <authorization-button height="100" width="300" color="green" />
   
  </div>
</template>

<script setup>
import AuthorizationButton from '@/components/AuthorizationButtons/index.vue'
</script>

<style scoped lang="less">
@import url('./styles/mixin.less');

.app-container {
  .self-fill(fixed)
}

</style>
