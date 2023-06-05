<template>
  <view class="countMall">
    <cl-header title="积分商城" :transparent="true" />
    <view style="margin: 20px">
      <UserCountCard />
    </view>

    <view>
      <mall-ticket />
    </view>
  </view>
</template>

<script>
import MallTicket from "./components/MallTicket";
import UserCountCard from "@/pagesGames/components/gameMenu/UserCountCard.vue";

export default {
  data() {
    return {};
  },
  components: {
    MallTicket,
    UserCountCard,
  },
};
</script>

<style lang="scss" scoped>
.countMall {
  background-image: linear-gradient(
    to bottom,
    rgb(132, 193, 247) 0%,
    white 100%
  );
  background-size: 100% 200px;
  background-repeat: no-repeat;

  margin-bottom: 20px;
}
</style>