<template>
    <div class="fanshaped-container">
       <div class="circle">

       </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    radius:{
        type : Number,
        default:200
    },
    color:{
        //传16进制颜色
        type : String,
        default:'#f40'
    },
    startDeg:{
        type : Number,
        default:30
    },
    endDeg:{
        type : Number,
        default:60
    }
})
const radius = computed(()=>{
    return props.radius + 'px'
})
const startDeg = computed(()=>props.startDeg + 'deg')
const endDeg = computed(()=>props.endDeg + 'deg')
</script>

<style lang="less" scoped>
.circle{
    width: v-bind(radius);
    height: v-bind(radius);
    --d:v-bind(startDeg);
    margin: 50px auto;
    border-radius: 50%;
    background:conic-gradient(
        v-bind('props.color') var(--d),
        transparent var(--d) calc(360deg - var(--d)),
        v-bind('props.color') calc(360deg - var(--d)));
    transition: --d 2s;
    @property --d{
        syntax: "<angle>";
        inherits: false;
        initial-value: 0deg;
    };
    &:hover{
        --d:v-bind(endDeg);
    }
}
</style>