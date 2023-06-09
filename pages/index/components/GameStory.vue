<template>
  <view class="story-container">
    <view class="jumpClass jumpHide" @click="jumpBtnClick()">跳过</view>
    <view class="story-content">
      <text class="text text0"> {{ storyText0 }}</text>
    </view>
    <view class="story-content">
      <text class="text text1"> {{ storyText1 }}</text>
    </view>
    <view class="story-content">
      <text class="text text2"> {{ storyText2 }}</text>
    </view>
    <view v-show="showStartBtn" class="start-btn" @click="goBtnClick()">出发</view>
    <!-- <game-story-background /> -->
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
      showStartBtn: false,
    };
  },
  components: { GameStoryBackground },
  mounted() {
    this._initAnimated();
    this._initListenClick();
  },
  methods: {
    _initAnimated() {
      this.text0Animated();
      setTimeout(() => this.text1Animated(), 3000);
      setTimeout(() => this.text2Animated(), 6000);
      setTimeout(() => this.startBtnAnimated(), 8000);
    },

    text0Animated() {
      const text0 = document.querySelector(".text0");
      text0.classList.add("animated");
      text0.classList.remove("text");
    },

    text1Animated() {
      const text1 = document.querySelector(".text1");
      text1.classList.add("animated");
      text1.classList.remove("text");
    },

    text2Animated() {
      const text2 = document.querySelector(".text2");
      text2.classList.add("animated");
      text2.classList.remove("text");
    },

    startBtnAnimated() {
      const startBtn = document.querySelector(".start-btn");
      startBtn.classList.add("animated");
      this.showStartBtn = true;
    },

    _initListenClick() {
      const container = document.querySelector(".story-container");
      const jumpClass = document.querySelector(".jumpClass");

      container.addEventListener("click", (event) => {
        jumpClass.classList.add("animated");
        jumpClass.classList.remove("jumpHide");
      });
    },

    hideGameStory() {
      const myAnimation = document.querySelector(".story-container");
      myAnimation.classList.add("hideAnimated");
      setTimeout(() => {
        this.$emit("hideGameStory");
      }, 500);
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
  top: 60px;
  padding: 6px 20px;
  border-radius: 10px;
  border: 1px solid #666666;
  background: #eeeeee;
}

.jumpHide {
  opacity: 0;
}

.story-content {
  font-size: 20px;
  text-align: center;
  margin-bottom: 50px;
}

.text {
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
}
</style>