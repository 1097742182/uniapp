<template>
  <view class="HistoryNumberContentItem" :style="'margin-bottom:' + bottomValue">
    <view class="numberList">
      <view class="numberItem" v-for="(item, index) in numberList" :key="index">
        <text v-if="item">{{ item }}</text>
        <text v-else style="color: #ffffff00"> 0</text>

        <!-- 最后出现答案时，展示的密码 -->
        <view v-if="currentLevelNumberResultShowState" class="numberListStatus">
          <view v-if="numberListStatus[index] === 'V'" class="right">
            {{ numberListStatus[index] }}
          </view>
          <view v-if="numberListStatus[index] === 'O'" class="nearly">
            {{ numberListStatus[index] }}
          </view>
          <view v-if="numberListStatus[index] === '~'" class="error">
            {{ numberListStatus[index] }}
          </view>
        </view>
      </view>
    </view>

    <view class="numberStatus">
      <text class="statusNumber">{{ numberStatus.right }}</text>
      <text style="color: green">V</text>
      <text class="statusNumber">{{ numberStatus.nearlyRight }}</text>
      <text style="color: blue">O</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      numberDetail: {},
      numberList: ["", "", "", ""],
      numberListStatus: ["~", "~", "~", "~"],
      numberStatus: {
        right: "",
        nearlyRight: "",
      },
      bottomValue: "10px",
    };
  },
  props: {
    value: {
      type: Number,
    },
  },
  computed: {
    currentLevelNumberResultShowState() {
      return this.CurrentLevelNumberResultShow;
    },
  },
  watch: {
    HistoryNumberList() {
      this._initNumberList();
    },
    currentLevelNumberResultShowState() {
      // 如果等于true
      if (this.currentLevelNumberResultShowState) {
        this.bottomValue = "30px";
        this._checkNumberList();
      }
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
    _checkNumberList() {
      const currentLevelNumberResult = this.CurrentLevelNumberResult;
      for (let i = 0; i < this.numberList.length; i++) {
        const item = this.numberList[i];
        if (item === currentLevelNumberResult[i]) this.numberListStatus[i] = "V";
        else if (currentLevelNumberResult.includes(item)) this.numberListStatus[i] = "O";
        else this.numberListStatus[i] = "~";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.HistoryNumberContentItem {
  height: 50px;
  border: 1px solid blue;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 0 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .numberList {
    flex: 1;
    display: flex;
    justify-content: space-around;
    height: 50px;
    line-height: 50px;
    padding-left: 4px;
    padding-right: 10px;

    .numberItem {
      position: relative;
      text {
        border-bottom: 1px solid #333333;
        padding: 2px;
      }
    }
  }

  .numberStatus {
    border: 1px solid saddlebrown;
    padding: 4px;
    border-radius: 6px;

    .statusNumber {
      display: inline-block;
      width: 10px;
      text-align: center;
      margin: 0px 1px;
      border-bottom: 1px solid #333333;
    }
  }
}

.numberListStatus {
  position: absolute;
  bottom: -15px;
  left: -4px;
  line-height: 10px;
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
</style>