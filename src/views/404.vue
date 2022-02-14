<template>
    <exception-page type="404" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import ExceptionPage from '@/components/Exception/ExceptionPage.vue'

@Options({
    components: {
        ExceptionPage,
    },
})
export default class ErrorPage extends Vue {}
</script>