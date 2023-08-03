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
        <input class="weui-input" :value="roomId" />
      </view>

      <view>
        <view class="inputArea">用户昵称</view>
        <input class="weui-input" :value="nickName" :disabled="true" />
        <text class="tips"></text>
      </view>

      <view>
        <view class="inputArea">对手昵称</view>
        <input class="weui-input" :value="user2" :disabled="true" />
        <text class="tips"></text>
      </view>
    </view>

    <view class="buttonArea">
      <button type="primary" @click="enterRoom()" :disabled="checkEnterBtnStatus()">开始游戏</button>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomId: "",
      nickName: "",
      avatarUrl: "",
      user2: "",
      openId: "",

      timeInterval: "",
    };
  },
  onLoad: function (option) {
    console.log(option);
    this.roomId = option.roomId;
  },
  mounted() {
    this._initUserInfo();
    this.timeInterval = setInterval(() => {
      this._getRoomDetail();
    }, 10000);
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
    _getRoomDetail() {
      console.log("RoomId", this.roomId);
      if (!this.roomId) return; // 没有房间号，则直接返回
      const data = { roomId: this.roomId };
      this.$api.user.getRoomDetail(data).then((data) => {
        if (this.nickName == data.firstUser) {
          this.user2 = data.secondUser;
        } else {
          this.user2 = data.firstUser;
        }

        if (this.user2) clearInterval(this.timeInterval);
      });
    },
    enterRoom() {
      // 如果没有名称与openId，则直接返回
      if (!this.nickName) return uni.showToast({ title: "请输入用户名！", icon: "none" });
      if (!this.openId) {
        uni.showToast({ title: "用户状态异常，进入房间失败！", icon: "none" });
        uni.reLaunch({ url: "/pages/index/index" });
        return;
      }

      if (!this.roomId) return uni.showToast({ title: "房间号为空", icon: "none" });

      const data = { roomId: this.roomId };
      this.$api.user.getRoomDetail(data).then((data) => {
        // 将获取到的数据保存到vuex中
        const roomDetail = data;
        this.$store.commit("PkOnline/SET_RoomDetail", roomDetail);

        // 初始化游戏房间的状态
        this.$store.dispatch("setPKLevel");

        setTimeout(() => {
          this.$Router.replace({ path: `/pagesGames/pkOnlineBegin` }); // 跳转到游戏开始界面
        }, 400);
      });
    },
    checkEnterBtnStatus() {
      if (this.user2) return false;
      if (!this.user2) return true;
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