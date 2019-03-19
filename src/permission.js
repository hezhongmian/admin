/**
 * 路由的全局守卫
 */
import router from './router';

import store from './store';

import NProgress from 'nprogress'; // 加载页面进度条

import 'nprogress/nprogress.css'

import { Message } from 'element-ui';

import { getToken } from '@/utils/auth';  // 验证token

const whiteList = ['/login']; // 不重定向白名单?
// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start(); // 启动进度条
  if (getToken()) {
    // cookie中存在token,证明已经登录
    if (to.path === 'login') {
      next({ path: '/' })
      NProgress.done(); // 取消进度条
    } else {
      // 判断vuex中是否存储登录用户信息,
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          next();
        })
      } else {
        next()
      }
    }
  } else {
    // 没有登录时,判断路由地址是否是login,
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done();
    }
  }
})

router.afterEach(() => {
  NProgress.done(); // 结束进度条
})
