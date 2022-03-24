<template>
    <a-form
        class="antdesign-form"
        ref="userRef"
        :model="userForm"
        :rules="userRules"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }">
        <a-form-item label="用户名" name="userName">
            <a-input v-model:value="userForm.userName" placeholder="请输入姓名"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="password" >
            <a-input-password v-model:value="userForm.password" placeholder="请输入密码"></a-input-password>
        </a-form-item>
        <a-form-item label="确认密码" name="conPassword">
            <a-input-password v-model:value="userForm.conPassword" placeholder="请确认输入密码"></a-input-password>
        </a-form-item>
        <a-form-item label="手机号" name="phoneNumber">
            <a-input v-model:value="userForm.phoneNumber" placeholder="请输入手机号"></a-input>
        </a-form-item>
        <a-form-item label="邮箱" name="email">
            <a-auto-complete v-model:value="userForm.email" @search="emailSearch" :options="options" placeholder="请输入邮箱地址"></a-auto-complete>
        </a-form-item>
        <a-form-item label="是否启用" name="enabled">
            <a-radio-group v-model:value="userForm.enabled">
                <a-radio value="1">启用</a-radio>
                <a-radio value="0">废弃</a-radio>
            </a-radio-group>
        </a-form-item>
        <a-divider />
    </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
// import { api } from '@/utils/api'
interface UserForm {
    userName: string;
    password: string;
    conPassword: string,
    emial: string;
    phoneNumber: string;
    enabled: string;
}
export default defineComponent({
    props: {
        user: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    setup(props){
        console.log(props.user)
        const userRef = ref<UserForm>()
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

        // 验证邮箱地址
        const checkPhone = async (_rule: any, value: string) => {
            if (!value) {
                return Promise.reject('请输入手机号');
            } else {
                const regex = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
                if (!regex.test(value)) {
                    return Promise.reject('请输入手机号')
                } else {
                    return Promise.resolve()
                }
            }
        }

        const demoReactive = reactive({
            userForm: {
                userName: '',
                password: '',
                conPassword: '',
                emial: '',
                phoneNumber: '',
                enabled: '1',
            },
            userRules: {
                userName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
                password: [{ required: true, validator: validatePass, trigger: 'change' }],
                conPassword: [{ validator: validatePass2, trigger: 'change' }],
                email: [{ validator: checkEmail, trigger: 'change' }],
                phoneNumber: [{ validator: checkPhone, trigger: 'change' }]
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
        })

        const resetForm = () => {
            const _userRef: any = userRef.value
            _userRef.resetFields()
        }
        // const submitForm = () => {
        //     const _userRef: any = userRef.value
        //     _userRef.validate().then((valid: any) => {
        //         console.log(valid)
        //         // api.user.createUser({

        //         // }).then((res: any) => {
        //         //     console.log(res)
        //         // })
        //     }).catch((err: Error) => {
        //         console.log(err)
        //     })
        // }
        return {
            ...toRefs(demoReactive),
            userRef,
            resetForm,
            // submitForm
        }
    }
})
</script>
<style lang="less" scoped>
.antdesign-form{
    max-width: 600px;
}
</style>
