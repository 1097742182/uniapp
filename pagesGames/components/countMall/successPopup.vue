<template>
  <div>
    <u-popup
      :show="showPopup"
      mode="center"
      :closeable="true"
      @close="close"
      @open="open"
      :styles="{ background: 'rgba(0,0,0,.6)' }"
    >
      <view class="popup-content">
        <view class="popup-title">优惠券领取成功！</view>
        <view class="popup-desc">使用优惠券可享受更多优惠哦！</view>
        <view class="popup-button" @tap="goToMiniProgram">前往其他小程序</view>
      </view>
    </u-popup>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      showPopup: true, // 弹出窗口是否显示
    };
  },
  methods: {
    // 前往其他小程序
    goToMiniProgram() {
      uni.navigateToMiniProgram({
        appId: "wx724a4f4d4603eea3", // 目标小程序的appId，需要在微信公众号平台上配置为合法的关联小程序
        // path: "/pages/index/index", // 目标小程序中需要跳转到的页面路径，可以通过微信开发者工具查看
        success(res) {
          console.log("跳转成功", res); // 在控制台输出跳转结果
        },
      });
      this.showPopup = false; // 关闭弹窗
    },
    open() {
      // console.log('open');
    },
    close() {
      // this.showPopup = false;
      this.$emit("hidePopup");
      // console.log('close');
    },
  },
};
</script>

<style scoped>
.popup-content {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  margin-top: 20px;
}
.popup-title {
  font-size: 24px;
  color: #333;
  font-weight: bold;
  line-height: 32px;
}
.popup-desc {
  font-size: 16px;
  color: #666;
  margin-top: 12px;
  line-height: 24px;
}
.popup-button {
  background-color: #e54847;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
}
</style>
