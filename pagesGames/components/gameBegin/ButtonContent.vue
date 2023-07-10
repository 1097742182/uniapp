<template>
  <view class="ButtonContent">
    <view class="firstRow">
      <button
        type="primary"
        class="buttonClass"
        :class="backgroundType"
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
        :class="backgroundType"
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
  props: {
    backgroundType: { type: String, default: "blueBackground" },
  },

  mounted() {
    this._initButtonRow();
  },
  methods: {
    _initButtonRow() {
      let buttonList = JSON.parse(JSON.stringify(this.buttonList));
      if (this.ButtonCount <= 6) buttonList.shift();

      if (this.ButtonCount == 6) {
        this.buttonFirstRow = buttonList.slice(0, this.ButtonCount);
      } else if (this.ButtonCount > 5) {
        buttonList = buttonList.slice(0, this.ButtonCount);
        const rowCount = this.ButtonCount / 2;
        this.buttonFirstRow = buttonList.slice(0, rowCount);
        this.buttonSecondRow = buttonList.slice(rowCount);
      } else {
        this.buttonFirstRow = buttonList.slice(0, this.ButtonCount);
      }
    },
    buttonClick(item) {
      uni.vibrateShort(); // 用户点击时，手机震动
      let numberList = this.NumberList;
      let currentIndex = this.CurrentIndex;
      numberList[currentIndex] = item.toString();
      uni.$u.vuex("NumberList", numberList);

      // 如果当前选择的是小于总数的，则+1，否则默认为0
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
  }
}

.blueBackground {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}

.redBackground {
  background: linear-gradient(0deg, rgb(215, 138, 138) 0%, rgb(225, 89, 89) 100%);
}
</style>