<template>
    <div class="app-container">
        <Fanshaped
            color="#000"
            :radius="600"
            :start-deg="10"
            :end-deg="80"
        />
    </div>
</template>

<script setup>
import Fanshaped from '@/components/Fanshaped/index.vue';
</script>

<style scoped lang="less">
@import url('./styles/mixin.less');

.app-container {
  .self-fill(fixed)
}
</style>
