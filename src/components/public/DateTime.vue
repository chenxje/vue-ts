<template>
    <div class="date">
        <div class="date-watch">
            <div class="watch">
                <div class="pointer hour" ref="hour">
                    <span></span>
                </div>
                <div class="pointer minute" ref="minute">
                    <span></span>
                </div>
                <div class="pointer second" ref="second">
                    <span></span>
                </div>
            </div>
        </div>
        <div class="date-show">{{ date }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { getDate } from '@/utils/utils'
export default defineComponent({
    setup() {
        let current = new Date()

        const hour = ref(null)
        const minute = ref(null)
        const second = ref(null)

        function setWatchPoint(currentTime: Date){
            let hourRotate = currentTime.getHours() * 6
            let minuteRotate = currentTime.getMinutes() * 6
            let secondRotate = currentTime.getSeconds() * 6
            const _hour: any = hour.value
            _hour.style.transform = `rotate(${hourRotate}deg)`
            const _minute: any = minute.value
            _minute.style.transform = `rotate(${minuteRotate}deg)`
            const _second: any = second.value
            _second.style.transform = `rotate(${secondRotate}deg)`
        }

        let date = ref(getDate(current, 'yyyy-MM-dd hh:mm:ss'))

        onMounted(() => {
            setWatchPoint(current)
        })

        let timer = setInterval(() => {
            current = new Date()
            date.value = getDate(current, 'yyyy-MM-dd hh:mm:ss')
            setWatchPoint(current)
        }, 1000)

        onUnmounted(() => {
            clearInterval(timer)
        })
        return {
            hour,
            minute,
            second,
            date
        }
    },
})
</script>
<style lang="less" scoped>
.date {
    &-watch {
        .watch {
            position: relative;
            height: 200px;
            width: 200px;
            background-image: url('~@/assets/watch.png');
            .pointer {
                position: absolute;
                height: 100%;
                top: 0;
                left: calc(50% - 2px);
                span {
                    display: inline-block;
                }
            }
            .hour{
                span {
                    margin-top: 70px;
                    width: 6px;
                    height: 20%;
                    background: black;
                }
            }
            .minute{
                span {
                    margin-top: 50px;
                    height: 30%;
                    width: 6px;
                    background: black;
                }
            }
            .second {
                left: calc(50% - 1px);
                span {
                    margin-top: 30px;
                    height: 40%;
                    width: 3px;
                    background: red;
                    position: relative;
                }
                span:after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: red;
                    position: absolute;
                    bottom: 5px;
                    left: -3.5px;
                }
            }
        }
    }
}
</style>
