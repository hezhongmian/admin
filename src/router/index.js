import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '../views/layout/Layout'

Vue.use(VueRouter);

export const constantRouterMap = [
  // hidden 的作用应该是确定路由白名单的
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '', // 首页
    component: Layout,
    redirect: '/home',
    children: [{ 
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  }, {
    path: '/pms',  // 商品
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: { title: '商品', icon: 'product' },
    children: [{ // 商品列表
      path: 'addProduct',
      name: 'addProduct',
      component: () => import('@/views/pms/product/index'),
      meta: { title: '商品列表', icon: 'product-list' }
    }]
  }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap 
})