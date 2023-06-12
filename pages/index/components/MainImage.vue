<template>
  <view class="containar">
    <view class="avatarUrl">
      <button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar">
        <view class="imageContent" style="position: relative">
          <image :src="avatarUrl" class="refreshIcon">
            <view class="svgClass">
              <u-icon name="camera" size="28"></u-icon>
            </view>
          </image>
        </view>
      </button>
    </view>
    <view class="nickname">
      <input
        type="nickname"
        class="weui-input"
        :value="nickName"
        @blur="bindblur"
        @input="bindinput"
        placeholder="xx"
      />
      <text class="tips">建议修改为微信头像昵称</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      nickName: "",
    };
  },
  computed: {
    avatarUrlState() {
      return this.AvatarUrl;
    },
    nickNameState() {
      return this.NickName;
    },
  },
  watch: {
    avatarUrlState() {
      this._initUserInfo();
    },
    nickNameState() {
      this._initUserInfo();
    },
  },
  mounted() {
    this._initUserInfo();
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
    bindblur(e) {
      // 获取微信昵称
      this.nickName = e.detail.value;
      uni.setStorageSync("nickName", this.nickName);
      this.$store.commit("SET_NickName", this.nickName);
    },
    bindinput(e) {
      //这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
      this.nickName = e.detail.value;
      uni.setStorageSync("nickName", this.nickName);
      this.$store.commit("SET_NickName", this.nickName);
    },
    onChooseavatar(e) {
      this.avatarUrl = e.detail.avatarUrl;
      if (this.avatarUrl) {
        uni.setStorageSync("avatarUrl", this.avatarUrl);
        this.$store.commit("SET_AvatarUrl", this.avatarUrl);
      }
    },
  },
};
</script>
<style lang="scss">
.containar {
  width: 100%;

  .avatarUrl {
    padding: 0 0 20rpx;
    background: #fff;

    button {
      background: #fff;
      line-height: 80rpx;
      height: auto;
      width: auto;
      padding: 20rpx 30rpx;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .refreshIcon {
        width: 260rpx;
        height: 260rpx;
        border-radius: 50%;
        position: relative;
      }

      .svgClass {
        position: absolute;
        right: 10px;
        bottom: 20px;
        background-color: #ffffff;
        border-radius: 50%;
        opacity: 0.8;
      }

      .jt {
        width: 14rpx;
        height: 28rpx;
      }
    }
  }

  // botton 去除边框
  button::after {
    border: none;
  }

  .nickname {
    text-align: center;
    margin: 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;

    .weui-input {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      height: 46px;
      border: 1px solid #444444;
      border-radius: 10px;
    }

    .tips {
      color: #aaaaaa;
      margin: 20px;
    }
  }
}
</style>