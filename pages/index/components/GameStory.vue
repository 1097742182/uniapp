<template>
  <view class="story-container" :class="containerClass" @click="fastClick()">
    <view class="jumpClass" :class="jumpBtnClass" @click="jumpBtnClick()">跳过</view>
    <view class="story-content">
      <text :class="className0"> {{ storyText0 }}</text>
    </view>
    <view class="story-content">
      <text :class="className1"> {{ storyText1 }}</text>
    </view>
    <view class="story-content">
      <text :class="className2"> {{ storyText2 }}</text>
    </view>
    <view class="start-btn" :class="startClass" @click="goBtnClick()"> 出发 </view>
    <game-story-background class="gameBackground" />
  </view>
</template>
<script>
import GameStoryBackground from "./GameStoryBackground.vue";

export default {
  data() {
    return {
      storyText0: "在1000多年以前，一队满载丝绸的商旅驼队冒着漫天黄沙，行进在河西走廊的沙漠戈壁。",
      storyText1: "黄沙遮天闭日，他们似乎迷失了方向。",
      storyText2:
        "这时候，他们来到了一个三叉路口，路牌却是一串未知的密码，请你帮他们解开密码，指出正确的前进方向！",

      containerClass: "",
      className0: "opacityNone",
      className1: "opacityNone",
      className2: "opacityNone",
      startClass: "opacityNone",
      jumpBtnClass: "opacityNone",
    };
  },
  components: { GameStoryBackground },
  mounted() {
    this._initAnimated();
  },
  methods: {
    _initAnimated() {
      this.text0Animated();
      setTimeout(() => this.text1Animated(), 3000);
      setTimeout(() => this.text2Animated(), 6000);
      setTimeout(() => this.startBtnAnimated(), 8000);
    },

    text0Animated() {
      this.className0 = "animated";
    },

    text1Animated() {
      this.className1 = "animated";
    },

    text2Animated() {
      this.className2 = "animated";
    },

    startBtnAnimated() {
      this.startClass = "animated";
    },

    fastClick() {
      this.jumpBtnClass = "animated";
    },

    hideGameStory() {
      this.containerClass = "hideAnimated";
      setTimeout(() => this.$emit("hideGameStory"), 500);
    },

    goBtnClick() {
      this.hideGameStory();
    },
    jumpBtnClick() {
      this.hideGameStory();
    },
  },
};
</script>
<style scoped>
.story-container {
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
}

.jumpClass {
  position: absolute;
  right: 20px;
  top: 110px;
  padding: 6px 20px;
  border-radius: 10px;
  border: 1px solid #666666;
  background: #eeeeee;
  z-index: 10;
}

.story-content {
  font-size: 20px;
  text-align: center;
  margin-bottom: 50px;

  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: #5d4f3f;
  text-shadow: 0px 0px 1px rgba(255, 255, 255, 0.6), 0px 4px 4px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.2rem;
}

.opacityNone {
  opacity: 0;
}

/* 定义动画的 CSS 样式 */
.animated {
  animation-name: fadeIn;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

.hideAnimated {
  animation-name: hideOut;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hideOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.start-btn {
  font-size: 20px;
  padding: 10px 40px;
  border-radius: 30px;
  background-color: #2d8cf0;
  color: #fff;
  cursor: pointer;
  z-index: 10;
}

.gameBackground {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>