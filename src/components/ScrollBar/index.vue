<template>
  <div class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{ top: top + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const delta = 15;
export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0
    }
  },
  methods: {
    /**
     * 鼠标滚轮事件
     */
    handleScroll(e) {
      // 效果是让其与滚轮滚动
      const eventDelta = e.wheelDelta || -e.deltaY * 3;
      const $container = this.$refs.scrollContainer;
      const $containerHeight = $container.offsetHeight;
      const $wrapper = this.$refs.scrollWrapper;
      const $wrapperHeight = $wrapper.offsetHeight;
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta);
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + dalta)) {
            this.top = this.top;
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight);
          }
        } else {
          this.top = 0;
        }
      }
    }
  },
}
</script>

<style>

</style>
