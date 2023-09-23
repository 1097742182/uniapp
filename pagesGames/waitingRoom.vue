<template>
  <div class="waitingRoom">
    <cl-header title="线上PK" :transparent="true" />
    <!-- <view>当前waitingRoomId为：{{ waitingRoomId }}</view> -->

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
        <input class="weui-input" :value="waitingRoomId" />
      </view>

      <view>
        <view class="inputArea">用户昵称</view>
        <input class="weui-input" :value="waitingRoomDetail.firstUser.username" :disabled="true" />
      </view>

      <view>
        <view class="inputArea">对手昵称</view>
        <input
          class="weui-input"
          :value="waitingRoomDetail.secondUser.username"
          :disabled="true"
          placeholder="正在等待对手进入房间……"
        />
      </view>
    </view>

    <view class="buttonArea">
      <!-- 如果当前用户是roomLeader，那么拥有“开始游戏”的权利 -->
      <view v-if="waitingRoomDetail.roomLeader == OpenId">
        <button type="primary" v-if="!waitingRoomDetail.secondUser.status" :disabled="true" class="btnClass">等待用户准备</button>
        <button type="primary" v-else @click="enterRoom()" class="btnClass">开始游戏</button>
        <button @click="shareAgainBtnClick()" open-type="share" style="margin-top: 10px" class="btnClass">再次邀请</button>
      </view>

      <!-- 如果当前用户不是roomLeader，那么只能准备开始游戏 -->
      <view v-else-if="waitingRoomDetail.roomLeader != OpenId">
        <button type="primary" v-if="waitingRoomDetail.gameBeginStatus" @click="enterRoom()" class="btnClass">开始游戏</button>
        <button type="primary" v-else-if="!waitingRoomDetail.secondUser['status']" @click="prepareBtnClick()" class="btnClass">
          准备开始
        </button>
        <button type="primary" v-else :disabled="true" class="btnClass">已准备</button>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      waitingRoomId: "",
      nickName: "",
      avatarUrl: "",
      user2: "",
      openId: "",

      waitingRoomDetail: {
        waitingRoomId: "",
        roomLeader: "",
        gameBeginStatus: false,
        firstUser: { username: "", openId: "", status: false },
        secondUser: { username: "", openId: "", status: false },
      }, // 等待房间详情

      timeInterval: "",
    };
  },
  async onShareAppMessage() {
    const data = JSON.parse(JSON.stringify(this.share));
    data.title = "对战房间";
    data.path = "/pagesGames/pkOnlineMenu?waitingRoomId=" + this.waitingRoomId;
    return data;
  },
  onLoad: function (option) {
    console.log(option);
    this.waitingRoomId = option.waitingRoomId;

    // http://localhost:8080/#/pagesGames/waitingRoom?waitingRoomId=waitingRoom_id_3286784422203427&username=check2&openId=123asd123&friend=true

    if (option.username) uni.$u.vuex("NickName", option.username);
    if (option.openId) uni.$u.vuex("OpenId", option.openId);
    if (option.friend) {
      const createRoomData = { username: this.NickName, openId: this.OpenId, waitingRoomId: this.waitingRoomId };
      this.$api.user.getWaitingRoomDetail(createRoomData);
    }
  },
  mounted() {
    this._initUserInfo();
    clearInterval(this.timeInterval);
    this._getRoomDetail(); // 立马执行一次
    this.timeInterval = setInterval(() => {
      this._getRoomDetail();
    }, 5000);
  },
  // 离开前 清除循环
  onHide: function () {
    console.log("page Hide");
    // clearInterval(this.timeInterval);
  },
  beforeDestroy() {
    console.log("page beforeDestroy");
    clearInterval(this.timeInterval);
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
    _getRoomDetail() {
      console.log("waitingRoomId", this.waitingRoomId);
      if (!this.waitingRoomId) return; // 没有房间号，则直接返回
      if (!this.OpenId) return uni.showToast({ title: "当前用户状态异常，请重新登录" }); // 如果没有OpenId，也是直接返回

      const data = { waitingRoomId: this.waitingRoomId };
      this.$api.user.checkWaitingRoom(data).then((data) => {
        this.waitingRoomDetail = data;
        this._checkRoomLeaderStatus();
        const firstUser = data.firstUser;
        const secondUser = data.secondUser;

        // 如果user2没有用户，则进行赋值操作
        if (!this.user2) {
          // 如果当前用户的openId等于firstUser的openId，则用户2为secondUser的值
          if (this.OpenId == firstUser.openId) this.user2 = secondUser.username;
          else if (this.OpenId != firstUser.openId) this.user2 = firstUser.username;
        }

        // console.log(this.user2);
        // 如果用户2已经有值，则停止检查
        // if (this.user2) clearInterval(this.timeInterval);
      });
    },
    // roomLeader需要默认设置status为true
    _checkRoomLeaderStatus() {
      if (this.waitingRoomDetail.roomLeader == this.OpenId) {
        const firstUser = this.waitingRoomDetail.firstUser;
        // 如果firstUser的状态已经拥有，则不需要更改
        if (firstUser["openId"] == this.OpenId && firstUser["status"]) return;

        const data = {
          waitingRoomId: this.waitingRoomId,
          username: this.NickName,
          openId: this.OpenId,
          status: true,
        };

        this.$api.user.updateWaitingRoom(data).then((data) => {});
      }
    },
    // 用户准备开始
    prepareBtnClick() {
      const data = {
        waitingRoomId: this.waitingRoomId,
        username: this.NickName,
        openId: this.OpenId,
        status: true,
      };

      this.$api.user.updateWaitingRoom(data).then((data) => {
        this.waitingRoomDetail = data;
      });
    },
    async enterRoom() {
      // 如果没有名称与openId，则直接返回
      if (!this.nickName) return uni.showToast({ title: "请输入用户名！", icon: "none" });
      if (!this.OpenId) return uni.showToast({ title: "用户状态异常！", icon: "none" });
      if (!this.waitingRoomId) return uni.showToast({ title: "房间号为空", icon: "none" });
      if (!this.user2) return uni.showToast({ title: "对手用户信息为空", icon: "none" });

      const data = { waitingRoomId: this.waitingRoomId, username: this.NickName, openId: this.OpenId };
      this.$api.user.getPkRoomFromWaitingRoom(data).then((data) => {
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
  },
};
</script>

<style lang="scss" scoped>
.waitingRoom {
  background-image: linear-gradient(to bottom, rgb(132, 193, 247) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;
}

.avatarUrl {
  margin-top: 100px;
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
  flex-direction: column;
}

.inputArea {
  margin-bottom: 10px;
  font-size: 18px;
}

.btnClass {
  width: 200px;
}
</style>
