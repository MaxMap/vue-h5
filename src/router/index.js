import { createRouter, createWebHashHistory } from "vue-router"
import { frontNavigationGuard } from './guards/index'

// 懒加载引入组件
const home = () => import('../views/home/home.vue')
const faceRecognition = () => import('../views/faceRecognition/index.vue')
const Location = () => import('../views/location/index.vue')

// 路由表
const routes = [{
    path: '/',
    component: home,
    isHide: true,
    meta: {
        title: '主页',
    }
}, {
    path: '/faceRecognition',
    component: faceRecognition,
    meta: {
        title: '人脸识别'
    }
}, {
    path: '/location',
    component: Location,
    meta: {
        title: '腾讯定位'
    }
}]


// 3. 创建路由实例
const router = createRouter({
    // 4. 采用hash 模式
    history: createWebHashHistory(),
    // 采用 history 模式
    // history: createWebHistory(),
    routes, // short for `routes: routes`
});

frontNavigationGuard(router)
export default router