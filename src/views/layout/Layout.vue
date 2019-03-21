<template>
  <div class="app-wrapper" :class="classObj">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
    </div>
  </div>
</template>

<script>
import { Sidebar, Navbar } from './components';

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar
  },
  computed: {
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
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
