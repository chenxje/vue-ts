<template>
    <a-config-provider :locale="zhCN">
        <div id="app">
            <div class="te-head">
                <div class="te-logout">
                    <a href="javascript:viod(0);" class="iconfont icon-log-out"></a>
                </div>
            </div>
            <div class="te-body">
                <a-menu
                    style="width: 256px"
                    :default-selected-keys="[current]"
                    :default-open-keys="openKeys"
                    mode="inline"
                    :theme="theme"
                    :selected-keys="[current]"
                    @click="handleClick"
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
                                {{ child.meta.cn_name }}
                                <router-link :to="menu.path + '/' + child.path" />
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
                <router-view> </router-view>
            </div>
        </div>
    </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@/components/icon'

export default defineComponent({
    components: {
        Icon
    },
    setup() {
        const theme = 'light'
        let current = ref()
        const handleClick = e => {
            current = ref(e.key)
        }
        const menus = Array.from(useRouter().getRoutes()).filter(router => {
            return router.meta?.cn_name
        })
        const ls = window.location.href.split('/')
        current = '/' + ls[ls.length - 1]
        const openKeys = []
        menus.forEach(menu => {
            menu.children?.forEach(item => {
                if(item.path == current.value){
                    openKeys.push(menu.path)
                }
            })
        })
        return {
            zhCN,
            theme,
            current,
            openKeys,
            menus,
            handleClick,
        }
    },
})
</script>
<style lang="less">
#app {
    height: 100%;
    font-size: 16px;
    background-color: #eee;
    .te-head {
        background-color: #fff;
        height: 60px;
        line-height: 60px;
        width: 100%;
        border-bottom: 1px solid #ccc;
        .te-logout {
            float: right;
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