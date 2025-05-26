import { defineStore } from "pinia";
import { ref } from "vue";
export const useCountStore = defineStore('count',()=>{
    const count = ref(1)
    return{
        count
    }
})