<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">
          {{ item.meta.title }}
        </span>
        <router-link :to="item.redirect || item.path" v-else>{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
    return {
      levelList: [], // 面包屑数据
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    /**
     * 从路由的meta中获取数据
     */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== 'home') {
        matched = [{ path: '/home', meta: { title: '首页' } }].concat(matched);
      }
      this.levelList = matched;
    }
  },
  created() {
    this.getBreadcrumb();
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
