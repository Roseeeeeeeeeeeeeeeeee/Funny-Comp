<template>
    <div class="check-editor-container">
        <div class="check-editor-inner">
            <div class="checkbox" @click="handleClick" :class="{ checked: modelValue }"></div>
            <input type="text" :value="title" @input="handleInput">
        </div>

    </div>

</template>

<script>
import { ref } from 'vue'
export default {

    props: {
        modelValue: Boolean,
        title: String,
        // titleModifiers:{
        //     default : ()=>({})
        // }
    },
    setup(props, ctx) {



        const handleClick = () => {
            ctx.emit('update:modelValue', !props.modelValue)
        }
        const handleInput = (e) => {
            ctx.emit('update:title', e.target.value)
        }
        return {
            handleClick,
            handleInput,

        }
    }
}
</script>

<style scoped lang="less">
.check-editor-container {
    cursor: pointer;
        margin: 10px 5px;
    .check-editor-inner {
        display: flex;
        align-items: center;

        .checkbox {
            width: 15px;
            height: 15px;
            border: 1px solid #dcdfe6;
            border-radius: 3px;
            transition: 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;

            &.checked,
            &:hover {
                border-color: #409eff;
            }

            &.checked::after {
                content: "";
                border-radius: 2px;
                width: 9px;
                height: 9px;
                background: #409eff;
            }
        }

        input {
            border: none;
            outline: none;
            border-bottom: 1px solid gray;
            padding-left: 10px;
            margin-left: 5px;
            font-size: inherit;
        }
    }

}
</style>