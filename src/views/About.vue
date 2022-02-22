<template>
    <div class="about">
        <date-time></date-time>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DateTime from '@/components/public/DateTime.vue'
export default defineComponent({
    components: {
        DateTime
    },
})
</script>
<style lang="less" scoped>
.about{
    height: calc(100% - 20px);
    background: #fff;
    margin: 10px;
}
</style>