<template>
  <div class="app-container">
    <h1>首页</h1>
    <button @click="triggerError">触发错误</button>
    <ErrorLog/>
  </div>
</template>

<script setup>
function triggerError(){

  throw new Error('出错啦！！')

}
</script>

<style scoped lang="less">
@import url('./styles/mixin.less');

.app-container {
  .self-fill(fixed)
}

</style>
