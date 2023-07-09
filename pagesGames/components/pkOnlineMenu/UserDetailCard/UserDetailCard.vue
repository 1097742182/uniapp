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
    return {
      gameDetail: [
        { content: "比赛次数", value: 10 },
        { content: "胜场", value: 5 },
        { content: "胜率", value: "50%" },
        { content: "比赛次数", value: 10 },
      ],
    };
  },
  components: {
    GameDetailItem,
  },
};
</script>

<style lang="scss" scoped>
.UserDetailCard {
  position: relative;
  overflow: hidden;
  height: 100px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 40px;
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