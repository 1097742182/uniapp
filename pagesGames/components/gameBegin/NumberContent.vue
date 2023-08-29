<template>
  <view class="container" :class="backgroundType">
    <number-content-item
      v-for="(item, index) in NumberList"
      :key="index"
      :value="item"
      :gameOver="gameOver"
      :viewIndex="index"
      @changeIndex="changeIndex"
      :actived="CurrentIndex === index"
    ></number-content-item>

    <div class="question" @click="questionBtnClick()">
      <u-icon name="question-circle-fill" color="#1f8ce1" size="20"></u-icon>
    </div>

    <div style="position: absolute">
      <u-popup
        :show="popupShow"
        mode="center"
        @close="close"
        @open="open"
        :closeable="true"
        round="20"
        :zIndex="20000"
        :safeAreaInsetBottom="false"
      >
        <view class="popup">
          <view class="popup-title">游戏规则</view>
          <view class="popup-content">
            <view class="popup-content-item"> 每一关的密码是由不同的数字组成，数字不可重复。 </view>
            <view class="popup-content-item"> 破译者猜测其中的数字，并根据系统的提示，继续推理出下一轮的密码。 </view>
            <view class="popup-content-item"> 标签解析 </view>
            <view class="popup-content-item" style="margin: 8px 0 8px 40px"> √：代表有数字与位置都正确 </view>
            <view class="popup-content-item" style="margin: 8px 0 8px 40px"> O：代表数字正确 但位置不正确 </view>
            <view class="popup-content-item" style="margin: 8px 0 8px 40px"> ~：代表数字并未出现 </view>
            <view class="popup-content-item"> 在每一关限定次数内完成密码破译，则成功通关，并得到相应的积分。 </view>

            <view class="popup-content-button-area">
              <view class="checkboxGroup">
                <u-checkbox-group v-model="checkboxValue" @change="handleCheckboxChange" style="margin: 6px">
                  <u-checkbox name="不再提醒" label="不再提醒" style="margin: 0"></u-checkbox>
                </u-checkbox-group>
              </view>

              <button type="primary" style="width: 120px; line-height: 2" @click="close()">关闭</button>
            </view>
          </view>
        </view>
      </u-popup>

      <u-popup
        :show="hardPopupShow"
        mode="center"
        @close="hardClose"
        @open="hardOpen"
        :closeable="true"
        round="20"
        :safeAreaInsetBottom="false"
      >
        <view class="popup">
          <view class="popup-title">“华山论剑”游戏规则</view>
          <view class="popup-content">
            <view class="popup-content-item"> 与“菜鸟集训”规则大致相同 </view>
            <view class="popup-content-item" style="font-weight: bold; color: red"> “华山论剑”数字可重复 </view>

            <view class="popup-content-button-area">
              <view class="checkboxGroup">
                <u-checkbox-group v-model="hardCheckboxValue" @change="handleHardCheckboxChange" style="margin: 6px">
                  <u-checkbox name="不再提醒" label="不再提醒" style="margin: 0"></u-checkbox>
                </u-checkbox-group>
              </view>
              <button type="primary" style="width: 120px; line-height: 2" @click="hardClose()">关闭</button>
            </view>
          </view>
        </view>
      </u-popup>
    </div>
  </view>
</template>

<script>
import NumberContentItem from "./NumberContentItem.vue";

export default {
  data() {
    return {
      // numberList: ["1", "2", "3", "4"],
      // currentIndex: 0
      popupShow: false,
      hardPopupShow: false,
      questionShow: false,
      checkboxValue: [],
      hardCheckboxValue: [],
    };
  },

  props: {
    gameOver: { type: Boolean, default: false },
    backgroundType: { type: String, default: "blueBackground" },
  },
  components: {
    NumberContentItem,
  },
  watch: {},
  mounted() {
    this._initQuestionShow();
  },
  methods: {
    _initQuestionShow() {
      if (this.CurrentLevelType === "normal") {
        this.questionShow = uni.getStorageSync("questionShow");
        if (!this.questionShow) this.popupShow = true;
        if (this.questionShow) this.checkboxValue = ["不再提醒"];
      } else if (this.CurrentLevelType === "hard") {
        this.hardQuestionShow = uni.getStorageSync("hardQuestionShow");
        if (!this.hardQuestionShow) this.hardPopupShow = true;
        if (this.hardQuestionShow) this.hardCheckboxValue = ["不再提醒"];
      }
    },

    changeIndex(i) {
      uni.$u.vuex("CurrentIndex", i);
    },
    questionBtnClick() {
      if (this.CurrentLevelType === "normal") {
        this.popupShow = true;
      } else if (this.CurrentLevelType === "hard") {
        this.hardPopupShow = true;
      }
    },

    // 菜鸟集训游戏规则逻辑
    close() {
      uni.setStorageSync("questionShow", this.questionShow);
      this.popupShow = false;
    },
    open() {
      this.popupShow = true;
    },
    handleCheckboxChange(list) {
      if (list.length !== 0) this.questionShow = true;
      if (list.length === 0) this.questionShow = false;
    },

    // 华山论剑游戏规则逻辑
    hardClose() {
      uni.setStorageSync("hardQuestionShow", this.hardQuestionShow);
      this.hardPopupShow = false;
    },
    hardOpen() {
      this.hardPopupShow = true;
    },
    handleHardCheckboxChange(list) {
      if (list.length !== 0) this.hardQuestionShow = true;
      if (list.length === 0) this.hardQuestionShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  // border: 1px solid #a96fa9;
  border-radius: 5px;
  margin: 6px 30px;

  // background: radial-gradient(circle, rgb(207, 107, 170) 0%, rgb(247, 150, 192) 100%);
  // box-shadow: 0px 3px 3px #e0b6de, 0px -3px 3px #e6c9e4, inset 0px -1px 3px #e2cfe1;
}

.question {
  position: absolute;
  right: -20px;
}

.popup {
  // height: 400px;
  width: 360px;
  padding-bottom: 30px;

  .popup-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 10px;
  }

  .popup-content {
    margin: 14px;
    font-size: 18px;

    view {
      margin: 16px;
    }
  }

  .popup-content-button-area {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .popup-content-item::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #000;
    margin-right: 6px;
    margin-bottom: 4px;
  }
}

/deep/ uni-checkbox .uni-checkbox-input {
  width: 18px;
  height: 18px;
}

.checkboxGroup {
  display: flex;
  justify-content: center;
}

.blueBackground {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}

.redBackground {
  background: linear-gradient(0deg, rgb(215, 138, 138) 0%, rgb(225, 89, 89) 100%);
}
</style>