<template>
    <a-config-provider :locale="zhCN">
        <div class="app">
            <div class="te-head">
                <!-- <date-time></date-time> -->
                <div class="te-city">{{cityInfo?.cname}}</div>
                <div class="te-logout">
                    <icon icon="LogoutOutlined"/>
                </div>
            </div>
            <div class="te-body">
                <a-menu
                    style="width: 256px"
                    v-model:selectedKeys="selectedKeys"
                    v-model:openKeys="openKeys"
                    mode="inline"
                >
                    <template v-for="menu in menus">
                        <a-sub-menu :key="menu.path" v-if="menu.children?.length > 0">
                            <template #title>
                                <span>
                                    <icon :icon="menu.meta.icon" />
                                    <span>{{ menu.meta.cn_name }}</span>
                                </span>
                            </template>
                            <a-menu-item v-for="child in menu.children" :key="child.path">
                                <icon :icon="child.meta.icon" />
                                {{ child.meta.cn_name }}
                                <router-link :to="child.path" />
                            </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item :key="menu.path" v-else>
                            <template #icon>
                                <icon :icon="menu.meta.icon" />
                            </template>
                            <span>{{ menu.meta.cn_name }}</span>
                            <router-link :to="menu.path" />
                        </a-menu-item>
                    </template>
                </a-menu>
                <router-view></router-view>
            </div>
        </div>
    </a-config-provider>
</template>
<script lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@/components/icon'
import { api } from '@/utils/api'
export default defineComponent({
    components: {
        Icon
    },
    setup() {
        const ls = window.location.href.split('/')
        const current = '/' + ls[ls.length - 1]
        const menus = Array.from(useRouter().getRoutes()).filter(router => {
            return router.meta?.cn_name && !router.meta?.children
        })
        const openKeys: string[] = []
        menus.forEach(menu => {
            menu.children?.forEach(item => {
                if(item.path == current){
                    openKeys.push(menu.path)
                }
            })
        })
        const state = reactive({
            openKeys,
            selectedKeys: [current],
        })
        let cityInfo = ref()
        api.about.currentCity().then((res: any) => {
            const str = res.match(/\{.*?\}/);
            cityInfo.value = JSON.parse(str[0])
            
        })
        return {
            zhCN,
            menus,
            cityInfo,
            ...toRefs(state),
        }
    },
})
</script>
<style lang="less">
.app {
    height: 100%;
    font-size: 16px;
    background-color: #eee;
    .te-head {
        background-color: #fff;
        height: 60px;
        line-height: 60px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: flex-end;
        .te-city{
            margin-right: 20px;
        }
        .te-logout {
            float: right;
            margin-right: 20px;
            a {
                line-height: 60px;
                padding: 0 10px;
            }
        }
    }
    .te-body {
        height: calc(100% - 60px);
        display: flex;
        > div {
            width: 100%;
            padding: 10px 10px 0;
        }
    }
}
</style>