<template>
  <view class="startGameMessageBox">
    <MessageBox ref="startGame" title="对战详情">
      <view slot="body" class="content">
        <view class="user1 user">
          <view class="username">{{ firstUser }}</view>
          <view v-if="user1Status" class="userStatus">
            <u-icon name="checkbox-mark" size="20" color="#39b844"></u-icon>
          </view>
        </view>
        <view>VS</view>
        <view class="user2 user">
          <view class="username">{{ secondUser }} </view>
          <view v-if="user2Status" class="userStatus">
            <u-icon name="checkbox-mark" size="20" color="#39b844"></u-icon>
          </view>
        </view>
      </view>

      <view slot="bottom">
        <button v-if="!readyStatus" class="ready" @click="readyBtnClick()">准备</button>
        <button v-if="readyStatus" class="beready" @click="gameBeginBtnClick()">开始游戏</button>
      </view>
    </MessageBox>
  </view>
</template>

<script>
export default {
  data() {
    return {
      firstUser: "",
      secondUser: "",
      readyStatus: false,
      user1Status: false,
      user2Status: false,
    };
  },
  mounted() {
    this.$refs.startGame.open();
    this._initUserDetail();
    setTimeout(() => {
      if (this.firstUser === this.NickName) this.user2Status = true;
      else if (this.secondUser === this.NickName) this.user1Status = true;
    }, 1000);
  },
  methods: {
    _initUserDetail() {
      const roomDetail = this.PkOnline.RoomDetail;

      if (!roomDetail.firstUser) roomDetail.firstUser = "user";
      if (!roomDetail.secondUser) roomDetail.secondUser = "user";

      this.firstUser = roomDetail.firstUser;
      this.secondUser = roomDetail.secondUser;
    },
    readyBtnClick() {
      // this.$refs.startGame.close();
      this.readyStatus = true;
      this.user1Status = true;
    },
    gameBeginBtnClick() {
      this.$refs.startGame.close();
      uni.$emit("$gameBegin");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-around;
  height: 100px;
  align-items: center;
}

.ready {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
  color: #ffffff;
}

.beready {
  background: linear-gradient(0deg, rgb(0, 238, 48) 0%, rgb(51, 220, 85) 100%);
  color: #ffffff;
}

.user {
  position: relative;

  .userStatus {
    position: absolute;
    right: -25px;
    top: 2px;
  }
}
</style>