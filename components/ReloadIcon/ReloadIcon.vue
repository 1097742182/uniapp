<template>
  <view class="iconContent" :class="{ rotate: isRotating }" @click="reloadBtnClick()">
    <u-icon name="reload" color="#ffffff" :size="size"></u-icon>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isRotating: false,
    };
  },
  props: {
    size: { type: String, default: "32" },
    showMsg: { type: String, default: "已刷新" },
  },
  methods: {
    reloadBtnClick() {
      this.isRotating = true; // 改变 isRotating 状态，标记为正在旋转
      setTimeout(() => {
        this.isRotating = false; // 2 秒钟后标记为停止旋转
        uni.$showMsg(this.showMsg);
      }, 1000);
      this.$emit("reloadSuccess");
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate {
  animation: rotate 0.5s infinite linear;
}
@keyframes rotate {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>