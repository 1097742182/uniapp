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
    let UserCount = store.state.UserCount;
    if (!UserCount || UserCount === -1) {
        const storageUserCount = uni.getStorageSync('UserCount'); // 从缓存里面获取分数
        UserCount = storageUserCount ? storageUserCount : 100 // 如果缓存里面的分数为空，则默认为100

        if (!storageUserCount) uni.setStorageSync('UserCount', UserCount)
        store.commit("SET_UserCount", UserCount)
    }
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