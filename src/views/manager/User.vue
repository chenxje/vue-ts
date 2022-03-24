<template>
    <div class="user h-100">
        <a-row class="m-b-10 btn-list">
            <a-button type="primary" @click="addUser">新增</a-button>
            <a-button @click="editUser">修改</a-button>
            <a-button type="dashed" @click="updateEnabled(true)">启用</a-button>
            <a-button type="primary" @click="updateEnabled(false)" danger>废弃</a-button>
            <a-button type="dashed" @click="refresh">刷新</a-button>
            <!-- <a-button type="link" @click="addUser">启用</a-button>
            <a-button type="text" @click="addUser">废弃</a-button> -->
        </a-row>
        <a-row class="w-10">
            <a-table
                bordered
                class="w-100"
                rowKey="id"
                :dataSource="list"
                :columns="columns"
                :loading="userLoading"
                :pagination="pagination"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                @change="handleChangePagination">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'createDate'">
                        <span>{{transDate(record.createDate)}}</span>
                    </template>
                    <template v-if="column.dataIndex === 'modityDate'">
                        <span>{{transDate(record.modityDate)}}</span>
                    </template>
                    <template v-else-if="column.dataIndex === 'enabled'">
                        <span>
                            <a-tag :color="record.enabled ? 'success' : 'error'">
                                {{ record.enabled ? '是' : '否' }}
                            </a-tag>
                        </span>
                    </template>
                </template>
            </a-table>
        </a-row>
        <a-modal v-model:visible="visible" :title="(type === 'ADD' ? '新增' : '修改') + '用户'" @ok="handleOk" @cancel="visible = false;">
			<user-form ref="userForm" :user="user"></user-form>
        </a-modal>
    </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, ref, onMounted } from 'vue'
import { api } from '@/utils/api'
import { getDate } from '@/utils/utils'
import UserForm from '@/components/pages/manager/UserForm.vue'
import { message, TableColumnType } from 'ant-design-vue'

type Key = string | number;

interface UserType {
    id: number,
    userName: string,
    phoneNumber: string,
    email: string,
    createDate: Date,
    modityDate: Date,
    enabled: boolean
}

const columns: TableColumnType<UserType>[] = [
    {
        title: '用户名',
        dataIndex: 'userName',
    },
    {
        title: '手机号',
        dataIndex: 'phoneNumber',
    },
    {
        title: '电子邮箱',
        dataIndex: 'email',
    },
    {
        title: '创建时间',
        dataIndex: 'createDate',
    },
    {
        title: '修改时间',
        dataIndex: 'modityDate',
    },
    {
        title: '是否启用',
        dataIndex: 'enabled',
    }
]
const selectedRowKeys: Key[] = []
let selectedRows: UserType[]

export default defineComponent({
    components: { UserForm },
    setup(){
        const pagination: {
            total: number,
            pageSize: number,
            current: number,
        } = {
            total: 0,
            pageSize: 20,
            current: 1
        }
        const users = reactive({
            columns,
            transDate: (val: string) => {
                return val && getDate(new Date(val), 'yyyy-MM-dd hh:mm:ss')
            },
            userLoading: true,
            list: [],
            selectedRowKeys,
            selectedRows,
            onSelectChange: (selectedRowKeys: Key[], selectedRows: UserType[]) => {
                users.selectedRowKeys = selectedRowKeys
                users.selectedRows = selectedRows
            },
            pagination,
            handleChangePagination: (a: number, b: number) => {
                console.log(a, b)
            }
        })

        const btnList = reactive({
            addUser: () => {
                userModal.visible = true
            },
            editUser: () => {
                if(users.selectedRowKeys.length == 0) {
                    message.warn('请选择数据')
                    return
                }
                const _userForm: any = userForm.value
                console.log(_userForm)
                userModal.visible = true
            },
            refresh: () => {
                users.userLoading = true
                api.user.getAllUsers().then((res: any) => {
                    users.userLoading = false
                    users.list = res.content.list
                    users.pagination.total = res.content.total
                })
            },
            updateEnabled: (val: boolean) => {
                if(users.selectedRowKeys.length == 0) {
                    message.warn('请选择数据')
                    return
                }
                api.user.updateEnabled({
                    ids: users.selectedRowKeys,
                    enabled: val
                }).then((res: any) => {
                    if(res.success){
                        message.success(res.message)
                        btnList.refresh()
                    }else{
                        message.warn(res.message)
                    }
                })
            }
        })

        onMounted(() => {
            btnList.refresh()
        })

        const userForm = ref(null)
        const userModal = reactive({
            visible: false,
            type: 'ADD',
            handleOk: () => {
                const _userForm: any = userForm.value
                const _userRef = _userForm.userRef
                _userRef.validate().then((valid: any) => {
                    valid.enabled = valid.enabled === '1'
                    api.user.createUser(valid).then((res: any) => {
                        if(res.success){
                            message.success(res.message)
                            userModal.visible = false
                            _userForm.resetForm()
                            btnList.refresh()
                        }else{
                            message.warn(res.message)
                        }
                    })
                }).catch((err: Error) => {
                    console.log(err)
                })
            }
        })
        return {
            ...toRefs(users),
            ...toRefs(userModal),
            ...toRefs(btnList),
            userForm,
        }
    }
})
</script>
<style lang="less" scoped>
.btn-list{
    /deep/ .ant-btn{
        margin-left: 10px;
    }
    /deep/ .ant-btn:first-child{
        margin-left: 0;
    }
}
</style>
