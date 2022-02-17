<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>
<script lang="ts">
import { onMounted, defineComponent } from 'vue'
import { api } from '@/utils/api'
export default defineComponent({
    setup(){
        onMounted(() => {
            api.about.currentCity().then(res => {
                console.log(res)
            })
        })
    }
})
</script>