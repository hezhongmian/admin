<template>
  <!-- 这个组件的作用是让其产生鼠标滚轮事件 -->
  <scroll-bar>
    <!-- 使用插槽 -->
    <!-- mode: 模式, show-timeout: 展开 sub-menu 的延时,
        default-active :当前激活菜单的 index, collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
     -->
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from '@/components/ScrollBar';
import SidebarItem from './SidebarItem';
import { mapGetters } from 'vuex';

export default {
  name: 'sidebar',
  components: {
    ScrollBar,
    SidebarItem
  },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      return this.$router.options.routes
    }
  },
}
</script>

<style>

</style>
