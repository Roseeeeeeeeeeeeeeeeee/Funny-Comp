<template>
    <div>
        <h1>错误日志</h1>
        <ul>
            <li v-for="err in errors" :key="err.time">
                {{err.time}} - {{err.message}}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const errors = ref([]);
//改写console.err
onMounted(()=>{
    const oldConsoleError = console.error
    console.error = (...args)=>{
      
        errors.value.push({
            message:args[0],
            time: new Date().toDateString()
        })
        oldConsoleError.apply(console,args)
    }

})
</script>

<style scoped>

</style>