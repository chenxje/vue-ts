<template>
    <div :id="'myChart_' + type" class="my-echarts"></div>
</template>
<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { ref, watch } from 'vue';
import * as echarts from 'echarts'
export interface chartsData {
    myEcharts: any
}
export default defineComponent({
    props: {
        type: {
            type: String
        },
        option: {
            type: Object as any,
            default: () => {
                return {}
            }
        }
    },
    setup(props) {
        let _myEcharts: any = null
        let echartOption = ref(props.option)
        onMounted(() => {
            _myEcharts = echarts.init(document.getElementById('myChart_' + props.type) as HTMLDivElement)
            
            watch(echartOption, val => {
                _myEcharts.setOption(val)
            }, {
                immediate: true, //默认为false,是否在页面加载后先触发一次回调
                deep: true, //默认为false,是否开启深度监视
            })
            window.onresize = function () { // 自适应大小
                _myEcharts.resize();
            };
        })
    }
})
</script>
<style lang="less" scoped>
.my-echarts {
    width: 1500px;
    height: 550px;
}
</style>