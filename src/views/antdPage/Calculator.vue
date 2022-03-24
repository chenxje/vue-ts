<template>
    <div>
        <a-input v-model:value="num1"></a-input>
        <a-input v-model:value="num2"></a-input>
        <a-input v-model:value="num3"></a-input>
    </div>
    <a-button @click="mathAdd">+</a-button>
    <a-button @click="mathSub">-</a-button>
    <a-button @click="mathMul">*</a-button>
    <a-button @click="mathDiv">/</a-button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { accAdd, accSub, accMul, accDiv } from '@/utils/utils'
export default defineComponent({
    setup(){
        const num1 = ref(0)
        const num2 = ref(0)
        const num3 = ref(0)
        const mathAdd = () => {
            num3.value = accAdd(num1.value, num2.value)
        }
        const mathSub = () => {
            num3.value = accSub(num1.value, num2.value)
        }
        const mathMul = () => {
            num3.value = accMul(num1.value, num2.value)
        }
        const mathDiv = () => {
            num3.value = accDiv(num1.value, num2.value)
        }
        return {
            num1,
            num2,
            num3,
            mathAdd,
            mathSub,
            mathMul,
            mathDiv,
        }
    }
})
</script>