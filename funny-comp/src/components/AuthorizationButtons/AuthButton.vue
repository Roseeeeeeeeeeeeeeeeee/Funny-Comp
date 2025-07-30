<template>
      <button v-permission="props.permission" class="auth-btn" >{{props.content}}</button>
</template>

<script setup>
import permissionConfig from './permissionConfig';
import { ref } from 'vue';
const vPermission = {
   mounted: (el, bind) => {
      const { value } = bind
      if (value) {
         const hasPermission = permissionConfig.includes(value)
         if (!hasPermission) {
            el.style.display = 'none'
         }
      } else {
         throw new Error('请传入权限数据')
      }
   }
}
const props = defineProps(['content', 'hoverColor','styleColor','permission','size'])
const btnSize = ref({
   width : props.size.width + 'px',
   height:props.size.height + 'px'
})
</script>

<style scoped lang="less">
.auth-btn {
   background: none;
   display: block;
   width: v-bind('btnSize.width');
   height: v-bind('btnSize.height');
   border-radius: 9px;
   border: 1px solid v-bind('props.styleColor');
   margin:  5px;
   &:hover{
      color: white;
      background-color: v-bind('props.hoverColor');
      border: none;
   }
}
</style>