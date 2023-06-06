<template>
  <view class="countMall">
    <cl-header title="积分商城" :transparent="true" />
    <view style="margin: 20px">
      <UserCountCard />
    </view>

    <view style="margin: 10px">
      <mall-ticket
        v-for="(item, index) in ticketList"
        :ticketDetail="item"
        :key="index"
      />
    </view>
  </view>
</template>

<script>
import MallTicket from "./components/countMall/MallTicket.vue";
import UserCountCard from "@/pagesGames/components/gameMenu/UserCountCard.vue";

export default {
  data() {
    return {
      ticketList: [
        {
          money: 10,
          saleTips: "无门槛使用",
          needUserCount: 1000,
        },
        {
          money: 100,
          saleTips: "满300元使用",
          needUserCount: 8000,
        },
      ],
    };
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