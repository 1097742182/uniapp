<template>
  <view>
    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="center"
      :safeAreaInsetBottom="false"
      :closeOnClickOverlay="false"
      customStyle="border-radius: 16rpx"
    >
      <view class="MessageBox">
        <slot name="title">
          <view class="title">{{ title }}</view>
        </slot>
        <slot name="body">
          <view class="content" v-html="content"></view>
        </slot>
        <slot name="bottom">
          <view class="btns" v-if="showBottom">
            <view class="cancel btn" @click="cancel" v-if="cancelShow">{{ cancelText }}</view>
            <view @click="shareBtnClick()" v-if="ShowbottomShare">
              <button class="btn shareBtn" type="primary" open-type="share">分享领取</button>
            </view>
            <view class="confirm btn" @click="confirm" v-if="confirmShow">{{ confirmText }}</view>
          </view>

          <view class="btns" v-if="showShare">
            <view class="cancel btn" @click="cancel" v-if="cancelShow">{{ cancelText }}</view>
            <button class="btn" style="height: 40px; line-height: 40px; padding: 0 16px" type="primary" open-type="share">
              炫耀一下
            </button>
          </view>
        </slot>
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
  onShow() {
    console.log("用户返回到面了！");
    // 在这里添加监听代码
  },
  onShareAppMessage() {
    const data = JSON.parse(JSON.stringify(this.share));
    return data;
  },
  props: {
    title: { type: String, default: "提示" },
    content: { type: String, default: "是否关闭对话框？" },
    showBottom: { type: Boolean, default: true },
    ShowbottomShare: { type: Boolean, default: false }, // 分享领取的功能是否启用
    showShare: { type: Boolean, default: false },
    cancelText: { type: String, default: "取消" },
    confirmText: { type: String, default: "确定" },

    cancelShow: { type: Boolean, default: true },
    confirmShow: { type: Boolean, default: true },
  },
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

    shareBtnClick() {
      setTimeout(() => {
        this.show = false;
        this.$emit("shareBtnClick");
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.MessageBox {
  background-color: #fff;
  border-radius: 20px;
  width: 350px;

  padding: 20px;
  box-sizing: border-box;

  .close {
    position: absolute;
    right: 30rpx;
    top: 20rpx;
    width: 40rpx;
    height: 40rpx;
  }
  .title {
    // text-align: center;
    font-weight: 600;
    height: 50rpx;
    line-height: 50rpx;
    margin-bottom: 20rpx;
    font-size: 20px;
  }

  .content {
    font-size: 16px;
    margin: 20px 0;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn {
      padding: 5px 16px;
      text-align: center;
      border-radius: 6px;
      margin: 0 5px;
      font-size: 16px;
    }

    .shareBtn {
      height: 30px;
      line-height: 20px;
      font-size: 16px;
    }

    .confirm {
      background: #409eff;
      color: #fff;
    }
    .cancel {
      // background: #ccc;
      border: 1px solid #ccc;
    }
  }
}
</style>