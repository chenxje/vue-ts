import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
        meta: {
            cn_name: '首页',
            icon: 'HomeOutlined'
        }
    },
    {
        path: "/demo",
        name: 'demo',
        component: () => import("@/views/modelPage/Me.vue"),
        meta: {
            cn_name: '测试页面',
            icon: 'MoreOutlined'
        },
        children: [
            {
                path: '/turn-table',
                name: 'turnTable',
                meta: {
                    cn_name: '抽奖转盘',
                    icon: 'QuestionCircleOutlined',
                    children: true
                },
                component: () => import("@/views/modelPage/TurnTable.vue") 
            }
        ]
    },
    {
        path: "/about",
        name: "About",
        component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue"),
        meta: {
            cn_name: '关于',
            icon: 'SettingOutlined'
        }
    },

    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404'
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
