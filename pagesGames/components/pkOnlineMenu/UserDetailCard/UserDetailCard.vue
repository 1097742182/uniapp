<template>
  <view class="UserDetailCard">
    <view class="gameDetailContent">
      <game-detail-item class="gameDetailItem" v-for="(item, index) in gameDetail" :key="index" :gameDetail="item" />
    </view>
  </view>
</template>

<script>
import GameDetailItem from "./components/GameDetailItem.vue";

export default {
  data() {
    return {};
  },
  mounted() {},
  computed: {
    gameDetail() {
      return this.PkOnline.UserGameDetail;
    },
  },
  components: {
    GameDetailItem,
  },
  methods: {
    // 重置用户比赛详情
    resetUserGameDetail() {
      const UserGameDetail = [
        { content: "比赛次数", value: 0 },
        { content: "胜场次数", value: 0 },
        { content: "游戏胜率", value: "0%" },
        { content: "最少步数", value: 0 },
      ];
      this.$store.commit("PkOnline/SET_UserGameDetail", UserGameDetail);
    },
  },
};
</script>

<style lang="scss" scoped>
.UserDetailCard {
  position: relative;
  overflow: hidden;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;

  background: linear-gradient(90deg, #406de4, #7c78b8);
  background-repeat: repeat-y;

  display: flex;
  justify-content: space-between;
}

.gameDetailContent {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
