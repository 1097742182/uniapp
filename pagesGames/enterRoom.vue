<template>
  <div class="enterRoom">
    <cl-header title="线上PK" :transparent="true" />
    <view>当前RoomId为：{{ roomId }}</view>
    <input type="nickname" class="weui-input" :value="nickName" placeholder="给自己起个名字，开始你的征程吧" />
    <button type="primary" @click="enterRoom()">enterRoom</button>
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
  onLoad: async function (option) {
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
    enterRoom() {
      if (!this.nickName || !this.openId) {
        return;
      }

      const data = {
        roomId: this.roomId,
        username: this.nickName,
        openId: this.openId,
      };

      this.$api.user.searchRoom(data).then((res) => {
        console.log(res);
        uni.showToast({ title: "进入房间成功" });
      });
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
</style>