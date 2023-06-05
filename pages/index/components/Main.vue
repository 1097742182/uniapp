<template>
  <view class="u-page">
    <cl-header :key="0" title="密码神探" :isBack="false" />
    <main-image style="width: 100%" :key="mainImageKey"></main-image>
    <view class="loginPopup">
      <u-popup
        :show="popupShow"
        mode="bottom"
        @close="close"
        @open="open"
        :closeable="true"
        :safeAreaInsetBottom="false"
      >
        <view class="popup">
          <view class="popup-title">游戏规则</view>
          <view class="popup-content">
            <view class="popup-content-item">
              每一关的密码是由不同的数字组成，数字可以重复。
            </view>
            <view class="popup-content-item">
              破译者猜测其中的数字，确定后根据系统提示的“√”、或“O”、或“—”，修改写出下一轮的密码，并根据系统的提示，继续推理出下一轮的密码。
            </view>
            <view class="popup-content-item">
              在每一关限定次数内完成密码破译，则成功通关，并得到相应的积分。
            </view>
          </view>
        </view>
      </u-popup>
    </view>

    <view class="u-demo-block">
      <view class="u-demo-block__content">
        <view class="u-page__button-item">
          <u-button @click="goPage(1)" text="开始游戏" type="primary" />
        </view>
        <view class="u-page__button-item">
          <u-button @click="popupShow = true" text="游戏规则" type="primary" />
        </view>
        <!-- <view class="u-page__button-item">
          <u-button
            @click="OneClickSubmitBtnClick()"
            text="一键登录"
            type="primary"
          />
        </view> -->
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

export default {
  data() {
    return {
      popupShow: false,
      mainImageKey: false, // key
    };
  },
  components: {
    MainImage,
  },
  mounted() {
    this.OneClickSubmitBtnClick();
  },
  methods: {
    goPage(type) {
      if (!this.NickName) return uni.$showMsg("请先填写用户名");

      this.$Router.push({ name: "gameMenu", params: {} });
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
          // 将 code 发送到后台获取 openid
          this.$api.user.getUserInfo(code).then((res) => {
            const userInfo = res;
            this.$store.dispatch("updateUserInfoByInterfaceData", userInfo);
            setTimeout(() => (this.mainImageKey = !this.mainImageKey), 100);
          });
        },
      });
    },
    // 获取微信用户的基本信息
    // getUserInfo(e) {
    // 	// 判断是否获取用户信息成功
    // 	if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')

    // 	// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
    // 	console.log(e.detail.userInfo)
    // }
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
</style>