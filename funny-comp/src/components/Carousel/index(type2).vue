<template>

    <div class="carousel-container" ref="container">

        <div class="carousel-item" v-if="imgs.length > 0" :style="{
            width: width + 'px',
            height: height + 'px',
            transform: `translateX(-${index}00%)`,
            transition: openTransition ? '1s' : '0s'
        }">
            <img v-for="(item, i) in modifyImgs" :key="i" :src="item" alt="">
        </div>
        <div class="indicators">
            <span v-for="(item, i) in imgs" :key="i" class="indicator" :class="{
                active: index === i + 1
            }" @click="moveTo(i + 1)">

            </span>
        </div>
        <div class="arrow left" @click="leftNext">
            < </div>
                <div class="arrow right" @click="rightNext">
                    >
                </div>


        </div>

</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';



const props = defineProps({
    imgs: {
        type: Array,
        default: () => []
    },
    width: {
        type: Number,
        default: 800
    },
    height: {
        type: Number,
        default: 400
    },
    changeDuration: {
        //切换下一张图的间隔时间
        type: Number,
        default: 3000
    }
})
const container = ref(null)
let interval = null
const index = ref(1)//当前图片，第一张图对应1
//这是做了无缝补充后的图片数组
const modifyImgs = computed(() => {
    let arr = [
        props.imgs[props.imgs.length - 1],
        ...props.imgs,
        props.imgs[0],

    ]
    return arr
})
const openTransition = ref(true)
/**
 * 实现跳到某一张图片
 * @param i 
 */
const moveTo = (i) => {
   clearInterval(interval)
    if (i === 1 && index.value === props.imgs.length) {
        //从最后一张跳第一张
        rightNext()

    } else if (i === props.imgs.length && index.value === 1) {
        //从第一张跳最后一张
        leftNext()

    } else {
        if (i < 0) {
            i = 0
        }
        //这里仍使用props.imgs的长度是保证不会跳到我们为实现无缝效果而添加的两张额外图片
        if (i > props.imgs.length) {
            i = props.imgs.length
        }
        index.value = i
    }
    startCircle()
}
let timer = ref(null)
/**
 * 往左下一张
 */
const leftNext = async () => {
    if (index.value === 1) {
        //先跳到模拟的第一张（注意要把过渡关掉），就是在实际最后一张的右边的一张图
        openTransition.value = false;
        index.value = modifyImgs.value.length - 1;

        timer = setTimeout(() => {
            //然后打开过渡效果再往左滚动一张图就是最后一张了
            openTransition.value = true;
            moveTo(props.imgs.length);
        }, 50)

    } else {
        moveTo(index.value - 1)
    }

}
const rightNext = async () => {


    if (index.value === props.imgs.length) {
        openTransition.value = false
        index.value = 0;

        setTimeout(() => {
            openTransition.value = true;
            moveTo(1);
        }, 50)

    } else {
        moveTo(index.value + 1)
    }


}
onUnmounted(() => {
    clearTimeout(timer.value)
    clearInterval(interval)
})
// let interval = setInterval(() => {
//     let targetIndex = (index.value + 1) % (props.imgs.length + 1);
//     if (targetIndex === 0) {
//         targetIndex = 1
//     }
//     moveTo(targetIndex)

// }, props.changeDuration)
const startCircle = () => {
    interval = setInterval(() => {
        let targetIndex = (index.value + 1) % (props.imgs.length + 1);
        if (targetIndex === 0) {
            targetIndex = 1
        }
        moveTo(targetIndex)

    }, props.changeDuration)
}
startCircle()


</script>

<style scoped lang="less">
@import url('../../styles/mixin.less');

.carousel-container {
    position: relative;
    .self-center();
    overflow: hidden;

    .carousel-item {


        display: flex;

        img {
            flex: 0 0 auto;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }

    .indicators {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);

        .indicator {
            cursor: pointer;
            display: inline-block;
            width: 30px;
            height: 5px;
            border-radius: 5px;
            margin-right: 15px;
            background-color: #c3c1c1;

            &.active {
                background-color: #f6f4f4;
            }
        }
    }

    .arrow {
        width: 50px;
        height: 50px;

        color: #fff;

        border-radius: 50%;
        text-align: center;
        line-height: 50px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &.left {
            left: 20px;
        }

        &.right {
            right: 20px;
        }

        &:hover {
            background-color: rgba(172, 170, 170, 0.5);
        }
    }


}
</style>