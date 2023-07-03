<template>
  <view class="container" :class="backgroungType">
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
        :safeAreaInsetBottom="false"
      >
        <view class="popup">
          <view class="popup-title">游戏规则</view>
          <view class="popup-content">
            <view class="popup-content-item"> 每一关的密码是由不同的数字组成，数字可以重复。 </view>
            <view class="popup-content-item">
              破译者猜测其中的数字，并根据系统的提示，继续推理出下一轮的密码。
            </view>
            <view class="popup-content-item"> 标签解析 </view>
            <view class="popup-content-item" style="margin-left: 40px">
              √：代表有数字与位置都正确
            </view>
            <view class="popup-content-item" style="margin-left: 40px">
              O：代表数字正确，位置不正确
            </view>
            <view class="popup-content-item" style="margin-left: 40px"> ~：代表数字不正确 </view>
            <view class="popup-content-item">
              在每一关限定次数内完成密码破译，则成功通关，并得到相应的积分。
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
      backgroungType: "blueBackground",
      popupShow: false,
    };
  },
  props: {
    gameOver: { type: Boolean, default: false },
  },
  components: {
    NumberContentItem,
  },
  watch: {},
  mounted() {
    // this.backgroungType = "redBackground";
  },
  methods: {
    changeIndex(i) {
      uni.$u.vuex("CurrentIndex", i);
    },
    questionBtnClick() {
      this.popupShow = true;
    },
    close() {
      this.popupShow = false;
    },
    open() {
      this.popupShow = true;
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

.blueBackground {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}

.redBackground {
  background: linear-gradient(0deg, rgb(230, 92, 17) 0%, rgb(200, 97, 32) 100%);
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
</style>