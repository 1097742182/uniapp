<template>
  <view>
    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="center"
      :safeAreaInsetBottom="false"
      customStyle="border-radius: 16rpx"
    >
      <view class="BoxDialog">
        <button
          @click="showRightNumber()"
          :disabled="checkRightButtonDisabled()"
          type="primary"
          style="margin: 10px; background: #2ce92c"
        >
          展示正确答案
        </button>
        <button
          @click="showErrorNumber()"
          :disabled="checkErrorButtonDisabled()"
          type="primary"
          style="margin: 10px; background: #fb97af"
        >
          排除错误答案
        </button>
      </view>
    </u-popup>
  </view>
</template>
 
<script>
export default {
  name: "secluded",
  data() {
    return {
      show: false, //控制打开还是不打开
    };
  },

  props: {},
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    confirm() {
      this.show = false;
      this.$emit("confirm");
    },
    cancel() {
      this.show = false;
    },
    showRightNumber() {
      this.$emit("showRightNumber");
    },
    showErrorNumber() {
      this.$emit("showErrorNumber");
    },
    checkRightButtonDisabled() {
      if (this.RightButtonNumber) return true;
    },
    checkErrorButtonDisabled() {
      // if (this.ErrorButtonNumber) return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.BoxDialog {
  background-color: #fff;
  border-radius: 20px;
  width: 350px;

  padding: 20px;
  box-sizing: border-box;
}
</style>