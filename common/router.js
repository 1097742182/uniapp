// router.js
import {
    RouterMount,
    createRouter
} from 'uni-simple-router';
import store from '@/store';


const router = createRouter({
    encodeURI: false,
    platform: process.env.VUE_APP_PLATFORM,
    routes: ROUTES
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log(to);
    // 初始化用户状态
    store.dispatch("initUserStatus")
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}