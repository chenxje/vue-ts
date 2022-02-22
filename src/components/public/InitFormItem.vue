<template>
    <a-form-item :label="formItem.label" :name="formItem.name">
        <template v-if="formItem.field_type == 'text'">
            <!-- <a-input v-model:value="formObject[formItem.name]"></a-input> -->
        </template>
    </a-form-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export interface UserInfo {
    userName: string,
    emial: string,
    password: string,
    conPassword: string,
    bornDate: string,
    sex: string,
    hobby: ArrayLike<string>,
    timePeriod: ArrayLike<Date>,
    enabled: boolean
}
export default defineComponent({
    props: {
        formItem: {
            type: Object,
            default: () => {
                return {}
            }
        },
        formObject: {
            type: Object as UserInfo,
            default: () => {
                return {}
            }
        }
    },
    // setup(props){

    //     return {

    //     }
    // }
})
</script>