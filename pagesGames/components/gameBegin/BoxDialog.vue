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
          显示一个正确数字
        </button>
        <button
          @click="showErrorNumber()"
          :disabled="checkErrorButtonDisabled()"
          type="primary"
          style="margin: 10px; background: #fb97af"
        >
          显示一个不正确数字
        </button>
      </view>
    </u-popup>

    <MessageBoxVue
      ref="useBigUserCount"
      :ShowbottomShare="true"
      :content="getUseCountContent(bigUseCount)"
      @confirm="useBigConfirm"
      @shareBtnClick="shareBtnClick"
    />
    <MessageBoxVue
      ref="useSmallUserCount"
      :ShowbottomShare="true"
      :content="getUseCountContent(smallUseCount)"
      @confirm="useSmallConfirm"
      @shareBtnClick="shareBtnClick"
    />
  </view>
</template>
 
<script>
import MessageBoxVue from "components/MessageBox/MessageBox.vue";

export default {
  name: "secluded",
  data() {
    return {
      show: false, //控制打开还是不打开
      bigUseCount: 600,
      smallUseCount: 400,
      shareType: "",
      shareBtnStatus: false,
    };
  },
  computed: {
    userCount() {
      return parseInt(this.UserCount);
    },
  },
  props: {},
  components: { MessageBoxVue },
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
    // 弹出消耗大量积分确认框
    showRightNumber() {
      this.shareType = "right";
      this.$refs.useBigUserCount.open();
    },
    useBigConfirm() {
      if (this.userCount < this.bigUseCount) return uni.$showMsg("积分不足，道具使用失败");
      uni.$showMsg("使用道具成功，已展示正确数字");
      this.saveUserCount(this.userCount - this.bigUseCount);
      this.$emit("showRightNumber");
    },
    // 弹出消耗小量积分确认框
    showErrorNumber() {
      this.shareType = "error";
      this.$refs.useSmallUserCount.open();
    },
    useSmallConfirm() {
      if (this.userCount < this.smallUseCount) return uni.$showMsg("积分不足，道具使用失败");
      uni.$showMsg("使用道具成功，已排除错误数字");
      this.saveUserCount(this.userCount - this.smallUseCount);
      this.$emit("showErrorNumber");
    },
    saveUserCount(userCount) {
      this.$store.dispatch("UPDATE_UserCount", userCount); // 保存积分到VueX

      // 保存积分到数据库中
      const data = { openId: this.OpenId, nickname: this.NickName, UserCount: userCount };
      this.$api.user.setUserCount(data);
    },
    shareBtnClick() {
      this.shareBtnStatus = true;
    },
    emitShareStatus() {
      // 如果没有开启，说明没有点击分享按钮，则取消当前操作
      if (!this.shareBtnStatus == true) return;

      this.shareBtnStatus = false; // 重置状态
      uni.$showMsg("分享完成，使用道具成功");
      if (this.shareType === "right") this.$emit("showRightNumber");
      if (this.shareType === "error") this.$emit("showErrorNumber");
    },

    // 检查是否已经使用过道具
    checkRightButtonDisabled() {
      if (this.RightButtonNumber) return true;
    },
    checkErrorButtonDisabled() {
      if (this.ErrorButtonNumber) return true;
    },
    // 获取名称
    getUseCountContent(userCount) {
      return `
      <div>是否消耗“${userCount}积分”获取道具？</div>
      <div style="margin-top: 10px; font-weight: bold;">（当前用户积分：${this.userCount}）</div>
       `;
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