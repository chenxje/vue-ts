<template>
    <a-form
        class="antdesign-form"
        ref="userRef"
        :model="userForm"
        :rules="userRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }">
        <!-- <template v-for="item in formItems" :key="item">
            <init-form-item :formObject="userForm" :formItem="item"></init-form-item>
        </template> -->
        <a-form-item label="姓名" name="userName">
            <a-input v-model:value="userForm.userName" placeholder="请输入姓名" v-focus></a-input>
        </a-form-item>
        <a-form-item label="邮箱" name="email">
            <a-auto-complete v-model:value="userForm.email" @search="emailSearch" :options="options" placeholder="请输入邮箱地址"></a-auto-complete>
        </a-form-item>
        <a-form-item label="密码" name="password">
            <a-input-password v-model:value="userForm.password" placeholder="请输入密码"></a-input-password>
        </a-form-item>
        <a-form-item label="确认密码" name="conPassword">
            <a-input-password v-model:value="userForm.conPassword" placeholder="请确认输入密码"></a-input-password>
        </a-form-item>
        <a-form-item label="出生日期" name="bornDate">
            <a-date-picker v-model:value="userForm.bornDate" value-format="YYYY-MM-DD" :disabled-date="disabledDate"></a-date-picker>
        </a-form-item>
        <a-form-item label="性别" name="sex">
            <a-radio-group v-model:value="userForm.sex">
                <a-radio value="male">男</a-radio>
                <a-radio value="famela">女</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-form-item label="爱好" name="hobby">
            <a-select v-model:value="userForm.hobby" mode="tags" placeholder="爱好" :options="hobbyList"></a-select>
        </a-form-item>
        <a-form-item label="有效期" name="timePeriod">
            <a-range-picker v-model:value="userForm.timePeriod" value-format="YYYY-MM-DD" />
        </a-form-item>
        <a-divider />
        <a-form-item :wrapper-col="{ span: 16, offset: 8 }">
            <a-button @click="resetForm" v-badge.isDot.success="20">重置</a-button>
            <span>&nbsp;</span>
            <a-button type="primary" @click="submitForm">提交</a-button>
            <!-- <a-button is="vue:a-input"></a-button> -->
        </a-form-item>
    </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import dayjs, { Dayjs } from 'dayjs';
interface DomoForm {
    userName: string;
    emial: string;
    password: string;
    conPassword: string,
    bornDate: string,
    sex: string,
    hobby: Array<string>,
    timePeriod: Array<string>
}
export default defineComponent({
    setup(){
        const userRef = ref<DomoForm>()
        // 邮件自动填入对象
        const options: { value: string }[] = []
        const hobbyList = [
            { value: '吃饭', label: '吃饭' },
            { value: '睡觉', label: '睡觉' },
            { value: '打豆豆', label: '打豆豆' },
        ]

        // 验证邮箱地址
        const checkEmail = async (_rule: any, value: string) => {
            if (!value) {
                return Promise.reject('请输入邮箱地址');
            } else {
                const regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if (!regex.test(value)) {
                    return Promise.reject('请输入正确格式邮箱地址.如(xxxx@xx.xx)')
                } else {
                    return Promise.resolve()
                }
            }
        }

        // 密码验证
        let validatePass = async (_rule: any, value: string) => {
            if (value === '') {
                return Promise.reject('请输入密码');
            } else {
                if (demoReactive.userForm.conPassword !== '') {
                    const _userRef: any = userRef.value
                    _userRef.validateFields('checkPass');
                }
                return Promise.resolve();
            }
        };
        let validatePass2 = async (_rule: any, value: string) => {
            if (value === '') {
                return Promise.reject('请再次输入密码');
            } else if (value !== demoReactive.userForm.password) {
                return Promise.reject("两次输入密码不匹配!");
            } else {
                return Promise.resolve();
            }
        };

        const demoReactive = reactive({
            userForm: {
                userName: '',
                emial: '',
                password: '',
                conPassword: '',
                bornDate: '',
                sex: 'male',
                hobby: [],
                timePeriod: []
            },
            userRules: {
                userName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                email: [{ validator: checkEmail, trigger: 'change' }],
                password: [{ required: true, validator: validatePass, trigger: 'change' }],
                conPassword: [{ validator: validatePass2, trigger: 'change' }],
            },
            options,
            emailSearch: (val: string) => {
                let res: { value: string }[]
                if(!val || val.indexOf('@') > 0){
                    res = []
                }else{
                    res = ['gmail.com', '163.com', 'qq.com'].map(domain => ({ value: `${val}@${domain}`}))
                }
                demoReactive.options = res
            },
            disabledDate: (current: Dayjs) => {
                // Can not select days before today and today
                return current && current > dayjs().endOf('day');
            },
            hobbyList
        })

        const resetForm = () => {
            const _userRef: any = userRef.value
            _userRef.resetFields()
        }
        const submitForm = () => {
            const _userRef: any = userRef.value
            _userRef.validate().then((valid: any) => {
                console.log(valid)
            }).catch((err: Error) => {
                console.log(err)
            })
        }
        return {
            ...toRefs(demoReactive),
            userRef,
            resetForm,
            submitForm
        }
    }
})
</script>
<style lang="less" scoped>
.antdesign-form{
    max-width: 600px;
}
</style>