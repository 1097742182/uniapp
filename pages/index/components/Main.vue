<template>
  <view class="u-page">
    <cl-header :key="0" title="密码神探" :isBack="false" />
    <main-image style="width: 100%" ref="MainImage"></main-image>
    <view class="loginPopup">
      <u-popup
        :show="popupShow"
        mode="bottom"
        @close="close"
        round="20"
        @open="open"
        :closeable="true"
        :safeAreaInsetBottom="false"
      >
        <view class="popup">
          <view class="popup-title">游戏规则</view>
          <view class="popup-content">
            <view class="popup-content-item"> 每一关的密码是由不同的数字组成，数字不可重复。 </view>
            <view class="popup-content-item"> 破译者猜测其中的数字，并根据系统的提示，继续推理出下一轮的密码。 </view>
            <view class="popup-content-item"> 标签解析 </view>
            <view class="popup-content-item" style="margin-left: 40px"> √：代表有数字与位置都正确 </view>
            <view class="popup-content-item" style="margin-left: 40px"> O：代表数字正确 但位置不正确 </view>
            <view class="popup-content-item" style="margin-left: 40px"> ~：代表数字并未出现 </view>
            <view class="popup-content-item"> 在每一关限定次数内完成密码破译，则成功通关，并得到相应的积分。 </view>
          </view>
        </view>
      </u-popup>
    </view>

    <view class="u-demo-block">
      <view class="u-demo-block__content">
        <view class="u-page__button-item">
          <ice-button @click="goPage(1)" buttonText="开始游戏" />
          <!-- <u-button @click="goPage(1)" type="primary">开始游戏</u-button> -->
        </view>
        <view class="u-page__button-item">
          <ice-button @click="pkOnlineBtnClick(1)" buttonText="线上PK" />
          <!-- <u-button @click="pkOnlineBtnClick()" type="primary">线上PK</u-button> -->
        </view>
        <view class="u-page__button-item" style="display: flex; justify-content: center">
          <view @click="popupShow = true" class="gameRule">游戏规则</view>
        </view>
      </view>
    </view>

    <view class="footer">
      <text class="u-demo-block__title">密码神探</text>
      <text class="info">本程序仅供娱乐，请勿用于非法活动</text>
    </view>
  </view>
</template>

<script>
import MainImage from "./MainImage.vue";
import IceButton from "@/components/IceButton/IceButton.vue";

export default {
  data() {
    return {
      popupShow: false,
    };
  },
  components: {
    MainImage,
    IceButton,
  },
  mounted() {
    this.OneClickSubmitBtnClick();
  },
  methods: {
    goPage(type) {
      if (!this.NickName) return uni.$showMsg("请先填写用户名");

      // 更新用户信息到数据库
      const data = { openId: this.OpenId, nickname: this.NickName };
      this.$api.user.updateUserInfo(data);

      this.$Router.push({ name: "gameMenu", params: {} });
    },
    pkOnlineBtnClick() {
      if (!this.NickName) return uni.$showMsg("请先填写用户名");

      setTimeout(() => {
        this.$Router.push({ name: "pkOnlineMenu", params: {} });
      }, 100);
    },

    close() {
      this.popupShow = false;
    },
    open() {
      this.popupShow = true;
    },
    btnClick() {
      this.popupShow = true;
    },
    OneClickSubmitBtnClick() {
      uni.login({
        provider: "weixin",
        success: (res) => {
          var code = res.code;
          // 将 code 发送到后台获取 openId
          this.$api.user.getUserInfo(code).then((res) => {
            const userInfo = res;
            this.$store.dispatch("updateUserInfoByInterfaceData", userInfo);
            setTimeout(() => this.$refs.MainImage._initUserInfo(), 100);
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.u-view {
  padding: 40px 20px 0px 20px;

  &__title {
    font-size: 14px;
    color: rgb(143, 156, 162);
    margin-bottom: 10px;
  }
}

.u-block {
  padding: 14px;

  &__section {
    margin-bottom: 10px;
  }

  &__title {
    margin-top: 10px;
    font-size: 15px;
    color: $u-content-color;
    margin-bottom: 10px;
  }

  &__flex {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
  }
}

// 使用了cell组件的icon图片样式
.u-cell-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}

.u-page {
  padding: 15px 15px 40px 15px;
}

.u-demo-block {
  flex: 1;
  margin: 20px 30px;
  margin-bottom: 23px;

  &__content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    // flex-direction: row!important;
    // align-items: center;
    // flex-wrap: wrap;
  }

  &__title {
    display: block;
    font-size: 20px;
    color: #40485b;
    margin-bottom: 18px;
    text-align: center;
  }
}

.u-page {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__button-item {
    width: 100%;
    min-width: 250px;
    margin: 0 0 15px 0;
  }
}

.u-demo-block__content {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.footer {
  position: absolute;
  bottom: 30px;
  display: block;
  text-align: center;
  width: 100%;

  .info {
    font-size: 12px;
    color: #444444;
    text-align: center;
    display: block;
    margin-top: -10px;
  }
}

.popup {
  // height: 400px;
  padding-bottom: 30px;

  .popup-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 10px;
  }

  .popup-content {
    margin: 14px;
    font-size: 18px;

    view {
      margin: 16px;
    }
  }

  .popup-content-item::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #000;
    margin-right: 6px;
    margin-bottom: 4px;
  }
}

.gameRule {
  background: #ffffff00;
  border: none;
  color: #000000;
  border-bottom: 1px solid #636666; /* Dark Grey */
  width: 85px;
  padding-bottom: 8px;
  height: 20px;
  margin-top: 10px;
  text-align: center;
}
</style>