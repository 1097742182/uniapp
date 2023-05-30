<template>
  <view class="ButtonContent">
    <view class="firstRow">
      <button
        type="primary"
        class="buttonClass"
        v-for="item in buttonFirstRow"
        :key="item"
        @click="buttonClick(item)"
      >
        {{ item }}
      </button>
    </view>
    <view class="secondRow">
      <button
        type="primary"
        class="buttonClass"
        v-for="item in buttonSecondRow"
        :key="item"
        @click="buttonClick(item)"
      >
        {{ item }}
      </button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      buttonList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      buttonFirstRow: [],
      buttonSecondRow: [],
    };
  },

  mounted() {
    if (this.ButtonCount > 5) {
      this.buttonList = this.buttonList.slice(0, this.ButtonCount);
      const rowCount = this.ButtonCount / 2;
      this.buttonFirstRow = this.buttonList.slice(0, rowCount);
      this.buttonSecondRow = this.buttonList.slice(rowCount);
    } else {
      this.buttonFirstRow = this.buttonList.slice(0, this.ButtonCount);
    }
  },
  methods: {
    buttonClick(item) {
      uni.vibrateShort(); // 用户点击时，手机震动
      let numberList = this.NumberList;
      let currentIndex = this.CurrentIndex;
      numberList[currentIndex] = item.toString();
      uni.$u.vuex("NumberList", numberList);

      if (currentIndex < this.NumberCount - 1) {
        uni.$u.vuex("CurrentIndex", this.CurrentIndex + 1);
      } else {
        uni.$u.vuex("CurrentIndex", 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ButtonContent {
  // display: flex;
  // justify-content: space-between;
  border: 1px solid blueviolet;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;

  .firstRow {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .secondRow {
    display: flex;
    justify-content: space-between;
  }

  .buttonClass {
    width: 50px;
    height: 50px;
    background-color: #3c8adf;
  }
}
</style>