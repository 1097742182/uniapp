<template>
  <view class="pkOnlineMenu">
    <cl-header :key="0" title="线上PK" :transparent="true" />

    <user-info :resetStatus="false" @resetBtnClick="resetBtnClick()" />

    <view style="padding: 2px">
      <user-detail-card ref="UserDetailCard" />
    </view>

    <view style="padding: 2px; margin-top: 10px">
      <PKHistoryDetailVue ref="PKHistoryDetailVue" />
    </view>

    <view style="margin: 10px; padding: 10px 20px; position: relative">
      <view style="margin-bottom: 10px">
        <ice-button @click="gameBegin()" buttonText="开始PK" />
      </view>
      <view>
        <ice-button buttonText="邀请好友" />
        <button class="shareButton" type="primary" open-type="share">好友PK</button>
      </view>
    </view>
    <button @click="enterRoomBtnClick()" v-if="false">enterRoom</button>
    <button @click="waitingRoomBtnClick()" v-if="false">waitingRoom</button>

    <MessageBox ref="MessageBox" :showBottom="true" :confirmShow="false" cancelText="取消匹配">
      <view slot="body">匹配用户中……</view>
    </MessageBox>
  </view>
</template>

<script>
// 子组件
import UserInfo from "./components/gameMenu/UserInfo.vue";
import PKHistoryDetailVue from "./components/pkOnlineMenu/PKHistoryDetail/PKHistoryDetail.vue";
import UserDetailCard from "./components/pkOnlineMenu/UserDetailCard/UserDetailCard.vue";
import IceButton from "@/components/IceButton/IceButton.vue";

import { formatDate } from "@/utils/index.js";

export default {
  data() {
    return {};
  },
  async onShareAppMessage() {
    const createRoomData = { username: this.NickName, openId: this.OpenId };
    const res = await this.$api.user.createRoom(createRoomData);
    const roomId = res["roomId"];
    if (!roomId) return uni.showToast({ title: "分享失败" });

    this.$store.commit("PkOnline/SET_RoomId", roomId);

    const data = JSON.parse(JSON.stringify(this.share));
    data.title = "对战房间";
    // data.path = "/pagesGames/enterRoom?roomId=" + roomId;
    data.path = "/pagesGames/pkOnlineMenu?roomId=" + roomId;

    // 分享结束后跳转界面
    setTimeout(() => {
      const path = "/pagesGames/waitingRoom?roomId=" + roomId;
      console.log(path);
      this.$Router.push(path);
    }, 1000);

    return data;
  },
  components: {
    UserInfo,
    UserDetailCard,
    PKHistoryDetailVue,
    IceButton,
  },
  mounted() {
    this._checkIsHaveRoomId();
    this.$store.dispatch("PkOnline/initPkOnlineData");
  },
  methods: {
    // 如果有roomid传入进来，说明是链接跳转的，直接跳转到enterRoom中
    _checkIsHaveRoomId() {
      const pages = getCurrentPages();
      const length = pages.length;

      const currentPage = pages[length - 1];
      const options = currentPage.options;
      const roomId = options.roomId;

      if (roomId) {
        const path = "/pagesGames/enterRoom?roomId=" + roomId;
        setTimeout(() => {
          this.$Router.push({ path });
        }, 100);
      }
    },
    async gameBegin() {
      this.$refs.MessageBox.open();
      this.$store.dispatch("setPKLevel");

      const userData = { OpenId: this.OpenId, NickName: this.NickName };
      const roomDetail = await this.$api.user.searchUser(userData);
      roomDetail.firstUser = this.NickName;

      if (!this.$refs.MessageBox.show) return; // 如果“等待窗口”已关闭，则直接返回

      const id = roomDetail.roomId;
      this.$store.commit("PkOnline/SET_RoomDetail", roomDetail);

      setTimeout(() => {
        const path = `/pagesGames/pkOnlineBegin?id=${id}`;
        this.$Router.push({ path: path });
        this.$refs.MessageBox.close();
      }, 1000);
    },
    // 重置按钮点击
    resetBtnClick() {
      uni.showModal({
        title: "提示",
        content: "是否重置历史记录?",
        success: (res) => {
          if (res.confirm) {
            this.$refs.PKHistoryDetailVue.resetPkHistoryList();
            this.$refs.UserDetailCard.resetUserGameDetail();
          }
        },
      });
    },
    enterRoomBtnClick() {
      const path = `/pagesGames/enterRoom?roomId=${this.PkOnline.RoomId}`;
      this.$Router.push({ path: path });
    },
    waitingRoomBtnClick() {
      const path = `/pagesGames/waitingRoom`;
      this.$Router.push({ path: path });
    },
  },
};
</script>

<style lang="scss" scoped>
.pkOnlineMenu {
  background-image: linear-gradient(to bottom, rgb(165, 207, 244) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;

  padding: 15px;
}

.shareButton {
  position: absolute;
  bottom: 10px;
  background: #ffffff00;
  color: #ffffff00;
  border: none;
  width: 90%;

  &:after {
    border: none;
  }
}
</style>
