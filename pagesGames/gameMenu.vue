<template>
  <view class="u-page gradient">
    <cl-header :key="0" title="游戏目录" :transparent="true" />
    <user-info />
    <UserCountCard />
    <!-- <success-dialog /> -->

    <view class="u-demo-block">
      <div class="u-demo-block-header">
        <text class="u-demo-block__title">游戏目录</text>
        <button
          type="primary"
          v-if="CurrentLevelType === 'normal'"
          class="u-demo-block__hardLevel"
          @click="changeLevelBtnClick()"
        >
          困难模式 >
        </button>

        <button
          type="primary"
          v-if="CurrentLevelType === 'hard'"
          class="u-demo-block__hardLevel"
          style="background: #6273cb"
          @click="changeLevelBtnClick()"
        >
          普通模式 >
        </button>
      </div>
      <view class="u-demo-block__content">
        <view class="u-page__button-item">
          <!-- <u-button @click="gameBegin(1)" text="第一关" type="primary" /> -->
          <ice-button @click="gameBegin(1)" :buttonType="getButtonType(1)" buttonText="第一关" />
        </view>
        <view class="u-page__button-item">
          <!-- <u-button @click="gameBegin(2)" text="第二关" type="primary" /> -->
          <ice-button @click="gameBegin(2)" :buttonType="getButtonType(2)" buttonText="第二关" />
        </view>
        <view class="u-page__button-item">
          <!-- <u-button @click="gameBegin(3)" text="第三关" type="primary" /> -->
          <ice-button @click="gameBegin(3)" :buttonType="getButtonType(3)" buttonText="第三关" />
        </view>
        <view class="u-page__button-item">
          <!-- <u-button @click="gameBegin(4)" text="第四关" type="primary" /> -->
          <ice-button @click="gameBegin(4)" :buttonType="getButtonType(4)" buttonText="第四关" />
        </view>
        <view class="u-page__button-item">
          <ice-button @click="gameBegin(5)" :buttonType="getButtonType(5)" buttonText="第五关" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UserInfo from "./components/gameMenu/UserInfo.vue";
// import UserCountCard from "./components/gameMenu/UserCountCard.vue"
import UserCountCard from "@/pagesGames/components/gameMenu/UserCountCard.vue";
import IceButton from "@/components/IceButton/IceButton.vue";
import SuccessDialog from "components/SuccessDialog/SuccessDialog.vue";

export default {
  data() {
    return {
      contentKey: new Date().getTime(), // 刷新按钮区域
    };
  },
  components: { UserInfo, UserCountCard, IceButton, SuccessDialog },
  methods: {
    backBtnClick() {
      uni.navigateBack();
    },
    gameBegin(level) {
      if (level == 1) this.$store.dispatch("setLevelOne");

      if (level == 2) this.$store.dispatch("setLevelTwo");

      if (level == 3) this.$store.dispatch("setLevelThree");

      if (level == 4) this.$store.dispatch("setLevelFour");

      if (level == 5) this.$store.dispatch("setLevelFive");

      setTimeout(() => {
        this.$Router.push({ name: "gameBegin", params: {} });
      }, 100);
    },
    getButtonType(level) {
      if (this.CurrentLevelType === "normal") {
        return this.LevelStep >= level ? "ice" : "disabled";
      } else if (this.CurrentLevelType === "hard") {
        return this.HardLevelStep >= level ? "fire" : "disabled";
      }
    },
    changeLevelBtnClick() {
      if (this.CurrentLevelType === "normal") this.$u.vuex("CurrentLevelType", "hard");
      else if (this.CurrentLevelType === "hard") this.$u.vuex("CurrentLevelType", "normal");
      setTimeout(() => {
        this.contentKey = new Date().getTime();
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.gradient {
  background-image: linear-gradient(to bottom, rgb(165, 207, 244) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;
}

.u-view {
  padding: 40px 20px 0px 20px;

  &__title {
    font-size: 14px;
    color: rgb(143, 156, 162);
    margin-bottom: 10px;
  }
}

.u-block {
  padding: 14px;

  &__section {
    margin-bottom: 10px;
  }

  &__title {
    margin-top: 10px;
    font-size: 15px;
    color: $u-content-color;
    margin-bottom: 10px;
  }

  &__flex {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
  }
}

// 使用了cell组件的icon图片样式
.u-cell-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 8rpx;
}

.u-page {
  padding: 15px 15px 40px 15px;
}

.u-demo-block {
  flex: 1;
  margin-bottom: 23px;

  &__content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    // flex-direction: row!important;
    // align-items: center;
    // flex-wrap: wrap;
  }

  &-header {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
  }

  &__title {
    display: block;
    font-size: 20px;
    color: #40485b;
    margin-bottom: 18px;
  }

  &__hardLevel {
    margin-right: 0;
    padding: 5px 10px;
    height: 28px;
    line-height: 1;
    font-size: 16px;
    background: #fd4a4a;
  }
}

.u-page {
  &__button-item {
    width: 100%;
    margin: 0 15px 15px 0;
  }
}

.u-demo-block__content {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.prompt {
  text-align: left;
}
</style>