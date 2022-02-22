<template>
    <charts type="bar" :option="option"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Charts from '@/components/public/charts.vue'
export default defineComponent({
    components: { Charts },
    setup() {
        let option = {
            xAxis: {
                data: ['4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9'],
            },
            yAxis: {},
            series: [
                {
                    name: '用户量',
                    type: 'line',
                    data: [8, 15, 31, 13, 15, 22, 11],
                },
            ],
        }
        return {
            option
        }
    }
})
</script>