<template>
  <view class="pkOnlineMenu">
    <cl-header :key="0" title="线上PK" :transparent="true" />

    <user-info />

    <view style="padding: 2px">
      <user-detail-card />
    </view>

    <view style="padding: 2px; margin-top: 10px">
      <PKHistoryDetailVue />
    </view>

    <view style="margin: 10px; padding: 10px 20px; position: relative">
      <view style="margin-bottom: 10px">
        <ice-button @click="gameBegin()" buttonText="开始PK" />
      </view>
      <ice-button open-type="share" buttonText="邀请好友" />
      <button class="shareButton" type="primary" open-type="share">好友PK</button>
    </view>

    <MessageBox ref="MessageBox" :showBottom="true" :confirmShow="false" cancelText="取消匹配">
      <view slot="body">匹配用户中……</view>
    </MessageBox>
  </view>
</template>

<script>
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
    const roomData = {};
    const res = await this.$api.user.getRoomId(roomData);

    const data = JSON.parse(JSON.stringify(this.share));
    const yourId = res;
    data.title = "对战房间";
    data.path = "/pagesGames/pkOnlineBegin?id=" + yourId;
    return data;
  },
  components: {
    UserInfo,
    UserDetailCard,
    PKHistoryDetailVue,
    IceButton,
  },
  mounted() {
    this.$store.dispatch("PkOnline/initPkOnlineData");
  },
  methods: {
    async gameBegin() {
      this.$refs.MessageBox.open();
      this.$store.dispatch("setPKLevel");

      const userData = { OpenId: this.OpenId, NickName: this.NickName };
      const roomDetail = await this.$api.user.searchUser(userData);

      const id = roomDetail.roomId;
      this.$store.commit("PkOnline/SET_RoomDetail", roomDetail);

      setTimeout(() => {
        const path = `/pagesGames/pkOnlineBegin?id=${id}`;
        this.$Router.push({ path: path });
        this.$refs.MessageBox.close();
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.pkOnlineMenu {
  background-image: linear-gradient(to bottom, rgb(165, 207, 244) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;

  padding: 15px 15px 40px 15px;
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