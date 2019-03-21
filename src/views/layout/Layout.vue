<template>
  <div class="app-wrapper" :class="classObj">
    <!-- 左边侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>
    <!-- 右边 -->
    <div class="main-container">
      <!-- top-nav -->
      <navbar></navbar>
      <!-- 主要内容 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
    AppMain
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.$store.state.app.sidebar.opened,
        withoutAnimation: this.$store.state.app.sidebar.withoutAnimation,
        mobile: this.$store.state.app.device === 'mobile'
      }
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
