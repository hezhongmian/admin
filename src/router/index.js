import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '../views/layout/Layout'

Vue.use(VueRouter);

export const constantRouterMap = [
  // hidden 的作用应该是确定路由白名单的
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index')
    }]
  }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap 
})