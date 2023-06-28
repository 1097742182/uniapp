<template>
  <view class="HistoryNumberContentItem" :style="'margin-bottom:' + bottomValue">
    <view class="numberList">
      <view class="numberItem" v-for="(item, index) in numberList" :key="index">
        <text v-if="item" :style="'color: ' + colorList[index]">{{ item }}</text>
        <text v-else style="color: #ffffff">0</text>

        <!-- 最后出现答案时，展示的密码 -->
        <view v-if="currentLevelNumberResultShowState" class="numberListStatus">
          <view v-if="numberListStatus[index] === 'V'" class="right">
            <!-- {{ numberListStatus[index] }} -->
            <u-icon
              name="checkbox-mark"
              size="20"
              color="#39b844"
              style="margin-bottom: -5px"
            ></u-icon>
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
      <!-- <text class="right" v-for="item in rightListCount" :key="item"> V </text> -->

      <view class="right" v-for="item in rightListCount" :key="item">
        <u-icon name="checkbox-mark" size="20" color="#39b844"></u-icon>
      </view>
      <text class="nearly" v-for="item in nearlyRightListCount" :key="item"> O </text>
      <text class="error" v-for="item in errorListCount" :key="item"> ~ </text>
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
      colorList: [],
      numberStatus: {
        right: "",
        nearlyRight: "",
      },
      bottomValue: "10px",
    };
  },
  props: {
    value: { type: Number },
  },
  computed: {
    rightListCount() {
      return Array.from({ length: this.numberStatus.right - 0 }, (_, index) => index + 1);
    },
    nearlyRightListCount() {
      return Array.from({ length: this.numberStatus.nearlyRight - 0 }, (_, index) => index + 10);
    },
    errorListCount() {
      const all = this.numberList.length;
      const right = this.numberStatus.right - 0;
      const nearly = this.numberStatus.nearlyRight - 0;
      const error = all - right - nearly;
      return Array.from({ length: error }, (_, index) => index + 100);
    },
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
    this._initColorList();
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
    _initColorList() {
      this.colorList.push(this.randomColor());
      this.colorList.push(this.randomColor());
      this.colorList.push(this.randomColor());
      this.colorList.push(this.randomColor());
      this.colorList.push(this.randomColor());
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
    randomColor() {
      const colorList = [
        "red",
        "blue",
        "green",
        "darkorchid",
        "darkblue",
        "pink",
        "blueviolet",
        "cornflowerblue",
        "black",
        "cadetblue",
        "dodgerblue",
        "saddlebrown",
        "darkred",
        "orangered",
        "palevioletred",
        "darkcyan",
      ];
      const length = colorList.length;
      const randomR = Math.floor(Math.random() * length);

      return colorList[randomR];
    },
  },
};
</script>

<style lang="scss" scoped>
.HistoryNumberContentItem {
  height: 50px;
  width: 100%;
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

    max-width: 240px;
    height: 50px;
    line-height: 50px;
    padding-left: 4px;
    padding-right: 10px;

    .numberItem {
      position: relative;

      text {
        font-size: 20px;
        border: 1px solid palevioletred;
        border-radius: 5px;
        padding: 12px 18px;
      }
    }
  }

  .numberStatus {
    // border: 1px solid saddlebrown;
    padding: 4px;
    // width: 120px;
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
  }
}

.numberListStatus {
  position: absolute;
  bottom: -15px;
  left: 15px;
  line-height: 10px;
}

.right {
  color: green;
  margin: 0;
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