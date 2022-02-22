<template>
    <a-form 
        ref="userRef"
        :model="userForm"
        :rules="userRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }">
        <!-- <template v-for="item in formItems" :key="item">
            <init-form-item :formObject="userForm" :formItem="item"></init-form-item>
        </template> -->
        <a-form-item label="姓名" name="userName">
            <a-input v-model:value="userForm.userName"></a-input>
        </a-form-item>
        <a-form-item label="邮箱" name="email">
            <a-auto-complete v-model:value="userForm.email" @search="emailSearch" :options="options"></a-auto-complete>
        </a-form-item>
        <a-form-item label="密码" name="password">
            <a-input v-model:value="userForm.password"></a-input>
        </a-form-item>
        <a-form-item label="确认密码" name="conPassword">
            <a-input v-model:value="userForm.conPassword"></a-input>
        </a-form-item>
        <!-- <a-form-item label="出生日期" name="bornDate">
            <a-input v-model:value="userForm.bornDate"></a-input>
        </a-form-item>
        <a-form-item label="性别" name="sex">
            <a-input v-model:value="userForm.sex"></a-input>
        </a-form-item>
        <a-form-item label="爱好" name="hobby">
            <a-input v-model:value="userForm.hobby"></a-input>
        </a-form-item>
        <a-form-item label="有效期" name="timePeriod">
            <a-input v-model:value="userForm.timePeriod"></a-input>
        </a-form-item>
        <a-form-item label="是否启用" name="enabled">
            <a-input v-model:value="userForm.enabled"></a-input>
        </a-form-item> -->
        <a-form-item>
            <a-button type="primary" @click="resetForm">重置</a-button>
            <a-button type="primary" @click="submitForm">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
interface DomoForm {
    userName: string;
    emial: string;
    password: string;
    conPassword: string,
    bornDate: string,
    sex: string,
    hobby: Array<string>,
    timePeriod: Array<string>,
    enabled: boolean
}
export default defineComponent({
    setup(){
        const userRef = ref<DomoForm>()
        // 邮件自动填入对象
        const options: { value: string }[] = []

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
                sex: '',
                hobby: [],
                timePeriod: [],
                enabled: true
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
            }
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