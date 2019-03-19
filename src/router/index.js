import Vue from 'vue';
import VueRouter from 'vue-router';


Vue.use(VueRouter);

export const constantRouterMap = [
  // hidden 的作用应该是确定路由白名单的
  { path: '/login', component: () => import('@/views/login/index'), hidden: true }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap 
})