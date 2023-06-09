<template>
  <view>
    <GameStoryVue v-if="gameStoryShow" class="gameStory" @hideGameStory="gameStoryShow = false" />
    <cl-header title="正常导航栏" />
    <Main />

    <view class="gameStoryButton" @click="gameStoryShow = true">故事详情</view>
  </view>
</template>

<script>
import GameStoryVue from "./components/GameStory.vue";
import Main from "./components/Main.vue";

export default {
  data() {
    return {
      gameStoryShow: true,
    };
  },
  components: {
    Main,
    GameStoryVue,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.gameStory {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.gameStoryButton {
  position: absolute;
  right: -7px;
  top: 110px;
  padding: 4px 20px;
  border: 1px solid #eee;
  border-radius: 20px 0 0 20px;
  color: #ffffff;
  background: #3c9cff;
}
</style>