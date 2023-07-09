<template>
  <view class="pkOnlineMenu">
    <cl-header :key="0" title="线上PK" :transparent="true" />

    <user-info />

    <view style="padding: 2px 14px">
      <user-detail-card />
    </view>

    <view style="padding: 2px 14px; margin-top: 10px">
      <PKHistoryDetailVue />
    </view>

    <view style="margin: 10px; padding: 10px 20px">
      <ice-button @click="gameBegin()" buttonText="开始PK" />
    </view>
  </view>
</template>

<script>
import UserInfo from "./components/gameMenu/UserInfo.vue";
import PKHistoryDetailVue from "./components/pkOnlineMenu/PKHistoryDetail/PKHistoryDetail.vue";
import UserDetailCard from "./components/pkOnlineMenu/UserDetailCard/UserDetailCard.vue";
import IceButton from "@/components/IceButton/IceButton.vue";

export default {
  data() {
    return {};
  },
  components: {
    UserInfo,
    UserDetailCard,
    PKHistoryDetailVue,
    IceButton,
  },
  methods: {
    gameBegin() {
      this.$store.dispatch("setPKLevel");
      setTimeout(() => {
        this.$Router.push({ name: "gameBegin", params: {} });
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.pkOnlineMenu {
  background-image: linear-gradient(to bottom, rgb(165, 207, 244) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;
}
</style>