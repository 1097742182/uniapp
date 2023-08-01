<template>
  <div class="enterRoom">
    <cl-header title="线上PK" :transparent="true" />
    <!-- <view>当前RoomId为：{{ roomId }}</view> -->

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
      <view>
        <view class="inputArea">房间ID号</view>
        <input class="weui-input" :value="roomId" :disabled="true" />
      </view>

      <view>
        <view class="inputArea">用户名</view>
        <input
          type="nickname"
          class="weui-input"
          :value="nickName"
          @blur="bindblur"
          @input="bindinput"
          placeholder="给自己起个名字，开始你的征程吧"
        />
        <text class="tips"></text>
      </view>
    </view>

    <view class="buttonArea">
      <button type="primary" @click="enterRoom()">进入房间</button>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: "",
      nickName: "",
      openId: "",
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
  onLoad: async function (option) {
    this._initUserInfo();
    console.log(option);
    // 如果vuex中有openId，则直接进入
    if (this.OpenId) {
      this.nickName = this.NickName;
      this.openId = this.OpenId;
      this.roomId = option.roomId;
      this.enterRoom();
      return;
    }

    // 如果没有获取到openId，则登录微信接口获取
    uni.login({
      provider: "weixin",
      success: (res) => {
        var code = res.code;
        // 将 code 发送到后台获取 openId
        this.$api.user.getUserInfo(code).then((res) => {
          const userInfo = res;
          this.$store.dispatch("updateUserInfoByInterfaceData", userInfo);

          setTimeout(() => {
            this.nickName = this.NickName;
            this.openId = this.OpenId;
            this.roomId = option.roomId;
            this.enterRoom();
          }, 100);
        });
      },
    });
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
    enterRoom() {
      // 如果没有名称与openId，则直接返回
      if (!this.nickName) return uni.showToast({ title: "请输入用户名！", icon: "none" });
      if (!this.openId) {
        uni.showToast({ title: "用户状态异常，进入房间失败！", icon: "none" });
        uni.reLaunch({ url: "/pages/index/index" });
        // this.$Router.replace({ path: `/pages/index/index` });
        return;
      }

      const data = {
        roomId: this.roomId,
        username: this.nickName,
        openId: this.openId,
      };

      this.$api.user.searchRoom(data).then((data) => {
        console.log(data);
        console.log("进入房间成功！");
        uni.showToast({ title: "进入房间成功" });

        // 将获取到的数据保存到vuex中
        const roomDetail = data;
        this.$store.commit("PkOnline/SET_RoomDetail", roomDetail);

        // 初始化游戏房间的状态
        this.$store.dispatch("setPKLevel");

        setTimeout(() => {
          // 跳转到游戏开始界面
          this.$Router.replace({ path: `/pagesGames/pkOnlineBegin` });
        }, 400);
      });
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

<style lang="scss" scoped>
.enterRoom {
  background-image: linear-gradient(to bottom, rgb(132, 193, 247) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;
}

.avatarUrl {
  margin-top: 120px;
  padding: 0 0 20rpx;
  background: #ffffff00;

  button {
    background: #ffffff00;
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
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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
    margin-bottom: 20px;
  }

  .tips {
    color: #aaaaaa;
    margin: 20px;
  }
}

.buttonArea {
  display: flex;
}

.inputArea {
  margin-bottom: 10px;
  font-size: 18px;
}
</style>