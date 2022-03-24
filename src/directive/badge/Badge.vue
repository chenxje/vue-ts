<template>
    <div v-if="isDot" class="is-dot" :style="{ background: backgroundColor }">{{value}}</div>
    <div v-else class="not-dot" :style="{  background: backgroundColor}">
        <b>{{value}}</b>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            isDot: true,
            backgroundColor: '#ed5b56',
            value: 0
        }
    }
})
</script>
<style lang="less" scoped>
.is-dot{
    position: absolute;
    top: -5px; 
    right: -5px; 
    height: 10px; 
    width: 10px; 
    border-radius: 50%;
}
.not-dot{
    color: #fff; 
    padding: 0 5px; 
    position: absolute; 
    text-align: center;
    top: -10px;
    right: -10px;
    height: 20px;
    min-width: 20px;
    border-radius: 10px;
    line-height: 20px;
}
</style>