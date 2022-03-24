import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const contexts = require.context('@/views/', true, /\.vue$/).keys()

const menuList: any[] = []
const _map = new Map()
contexts.forEach(value => {
    const _value = value.replace(/\.vue/g, '').split(/\//)
    const regex = /\.\/\w+\.vue/
    const childRegex = /\.\/\w+\/\w+\.vue/
    if(regex.test(value)){
        _map.set(_value[1], [])
        menuList.push({
            key: _value[1]
        })
    } else if(childRegex.test(value)){
        if(_map.get(_value[1])){
            menuList.forEach(item => {
                if(item.key == _value[1]){
                    item.childrens.push(_value[2])
                }
            })
        }else{
            _map.set(_value[1], [_value[2]])
            menuList.push({
                key: _value[1],
                childrens: [_value[2]]
            })
        }
    }
})

const routes: Array<RouteRecordRaw> = menuList.map(menu => {
    if(menu.childrens){
        const _children = menu.childrens.filter((item: string) => item != 'Me').map((child: string) => {
            return {
                path: toLine(child),
                name: child,
                component: () => import('@/views/' + menu.key + '/' + child + '.vue'),
                meta: {
                    children: true
                }
            }
        })
        return {
            path: '/' + toLine(menu.key),
            name: menu.key,
            component: () => import('@/views/' + menu.key + '/Me.vue'),
            children: _children
        }
    }else{
        return {
            path: '/' + toLine(menu.key),
            name: menu.key,
            component: () => import('@/views/' + menu.key + '.vue')
        }
    }
})
routes.push({
    path: '/',
    redirect: '/home'
})
routes.push({
    path: '/:pathMatch(.*)',
    redirect: '/404'
})

// 驼峰转换下划线
function toLine(name: string) {
    return name.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, '');
}
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router