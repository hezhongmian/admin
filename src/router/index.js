import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export const constantRouterMap = [
  // hidden 的作用应该是确定路由白名单的
  { path: '/login', components: () => import('@/views/login/index'), hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap 
})