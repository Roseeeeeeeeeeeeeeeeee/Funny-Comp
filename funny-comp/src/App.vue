<template>
  <div class="app-container">
    <div class="list">
      <strong>编辑:</strong>
      <CheckEdit v-model="item.checked" v-model:title="item.title" v-for="(item, i) in list" :key="item.id" />
    </div>
    <div class="list">
      已上架商品：
      <span v-if="onSell.length === 0">暂无</span>
      <template v-else v-for="(item, i) in onSell" :key="item.id">
        <span>{{ i + 1 }}、</span>
        <strong>{{ item.title }}</strong>
      </template>
    </div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import CheckEdit from '@/components/CheckEditor/index.vue'
const brandArr = [
  { title: '苹果', checked: false, id: 1 },
  { title: '华为', checked: false, id: 2 },
  { title: '小米', checked: false, id: 3 },
  { title: '三星', checked: false, id: 4 },
]
const list = ref(brandArr)
const onSell = computed(() => {
  return list.value.filter((item) => item.checked)
})


</script>

<style scoped lang="less">
.app-container {
  .list {
    display: flex;
    margin-top: 80px;
    justify-content: center;
    align-items: center;

    span,strong {
      margin-right: 10px;
    }
  }
}

</style>
