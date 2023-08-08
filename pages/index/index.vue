<template>
  <view>
    <GameStoryVue v-if="gameStoryShow" class="gameStory" @hideGameStory="hideGameStory" />
    <cl-header title="正常导航栏" />
    <Main />

    <view class="gameStoryButton" @click="gameStoryShow = true">故事详情</view>
    <div>
      <SvgIcon />
    </div>
  </view>
</template>

<script>
import GameStoryVue from "./components/GameStory.vue";
import Main from "./components/Main.vue";
import SvgIcon from "./components/svgIcon";

export default {
  data() {
    return {
      gameStoryShow: false,
    };
  },
  components: { Main, GameStoryVue, SvgIcon },
  mounted() {
    this._initGameStoryShow();
  },
  methods: {
    _initGameStoryShow() {
      const GameStory = uni.getStorageSync("GameStory");
      if (GameStory === "noShow") this.gameStoryShow = false;
      else this.gameStoryShow = true;
    },
    hideGameStory() {
      this.gameStoryShow = false;
      uni.setStorageSync("GameStory", "noShow");
    },
  },
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
