<template>
  <view class="HistoryNumberContentItem">
    <view class="numberList">
      <view class="numberItem" v-for="(item, index) in numberList" :key="index">
        <text v-if="item">{{ item }}</text>
        <text v-else style="color: #ffffff">0</text>
      </view>
    </view>

    <view class="numberStatus" v-if="numberDetail">
      <text class="right" v-for="item in rightListCount" :key="item"> √ </text>
      <text class="nearly" v-for="item in nearlyRightListCount" :key="item">
        O
      </text>
      <text class="error" v-for="item in errorListCount" :key="item"> - </text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      numberDetail: {},
      numberList: ["", "", "", ""],
      numberStatus: {
        right: "",
        nearlyRight: "",
      },
    };
  },
  props: {
    value: { type: Number },
  },
  computed: {
    rightListCount() {
      return Array.from(
        { length: this.numberStatus.right - 0 },
        (_, index) => index + 1
      );
    },
    nearlyRightListCount() {
      return Array.from(
        { length: this.numberStatus.nearlyRight - 0 },
        (_, index) => index + 10
      );
    },
    errorListCount() {
      const all = this.numberList.length;
      const right = this.numberStatus.right - 0;
      const nearly = this.numberStatus.nearlyRight - 0;
      const error = all - right - nearly;
      return Array.from({ length: error }, (_, index) => index + 100);
    },
  },
  watch: {
    HistoryNumberList() {
      this._initNumberList();
    },
  },
  mounted() {
    this._initNumberList();
  },
  methods: {
    _initNumberList() {
      this.numberDetail = this.HistoryNumberList[this.value];

      // 获取历史记录，如果找到对应数据，则放入对应数据
      if (this.numberDetail) {
        this.numberList = this.numberDetail["numberList"];
        this.numberStatus = this.numberDetail["status"];
      } else {
        // 如果没有找到对应数据，则重置数据
        this.numberList = this.NumberList.map((item) => "");
        this.numberStatus = { right: "", nearlyRight: "" };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.HistoryNumberContentItem {
  height: 50px;

  margin-bottom: 10px;
  padding: 0 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .numberList {
    display: flex;
    justify-content: center;

    // border: 1px solid blue;
    border-radius: 5px;

    width: 200px;
    height: 50px;
    line-height: 50px;
    padding-left: 4px;
    padding-right: 10px;

    .numberItem {
      text {
        font-size: 20px;
        border: 1px solid #333333;
        border-radius: 5px;
        padding: 12px 18px;
      }
    }
  }

  .numberStatus {
    // border: 1px solid saddlebrown;
    padding: 4px;
    width: 120px;
    border-radius: 6px;
    display: flex;
    // justify-content: space-between;

    .statusNumber {
      display: inline-block;
      width: 10px;
      text-align: center;
      margin: 0px 1px;
      border-bottom: 1px solid #333333;
    }

    .right {
      color: green;
      margin: 0 4px;
    }

    .nearly {
      color: blue;
      margin: 0 4px;
    }

    .error {
      color: red;
      margin: 0 4px;
    }
  }
}
</style>