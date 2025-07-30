<template>
   <div class="authorization-buttons">
      <AuthButton v-for="btn in btnsInfo" :key="btn.content" :content="btn.content" :hoverColor="btn.hoverColor"
         :styleColor="props.color" :permission="btn.permission" :size="btnSize" />
   </div>
</template>

<script setup>

import { ref } from 'vue';
import AuthButton from './AuthButton.vue';
import { READ, DELETE, EDIT } from './permissionConfig'


const props = defineProps(['color'])
const btnSize = ref({
   width: 60,
   height: 30
})
const btnsInfo = ref([
   {
      content: '读取',
      hoverColor: 'rgb(132, 240, 100)',
      permission: READ
   },
   {
      content: '修改',
      hoverColor: 'lightblue',
      permission: EDIT
   },
   {
      content: '删除',
      hoverColor: 'rgb(245, 101, 101)',
      permission: DELETE
   },
])

</script>

<style scoped>
.authorization-buttons {
   border: 1px solid v-bind('props.color');
   display: inline-flex;
   padding: 5px 10px;
   justify-content: space-between;
   align-items: center;
  
   border-radius: 10px;
}
</style>