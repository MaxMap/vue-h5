export function frontNavigationGuard(router) {

    router.beforeEach((to, from, next) => {
        const title = (to.meta && to.meta.title) || ''
        // 设置页面标题为 "路由标题 | 项目名称"
        document.title = title
        next()
    })
}