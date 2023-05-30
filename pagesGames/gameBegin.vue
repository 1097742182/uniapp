<template>
  <view class="gameBegin" style="margin-top: 20px">
    <cl-header :title="GameBeginTitle" />
    <u-toast ref="uToast"></u-toast>
    <view class="content">
      <user-info></user-info>
      <number-content></number-content>
      <history-number-content></history-number-content>
      <button-content></button-content>
      <view class="buttonContent">
        <view class="" style="width: 200px" v-if="!gameOver">
          <u-button
            type="primary"
            style="background-color: #3c8adf"
            @click="checkAnswer"
          >
            提交
          </u-button>
        </view>

        <view class="" style="width: 200px" v-if="gameOver">
          <u-button type="success" @click="returnMenuBtnClick()">
            返回菜单
          </u-button>

          <u-popup
            :show="showPopup"
            :round="10"
            mode="center"
            @close="showPopup = false"
            :closeable="true"
          >
            <view class="popupContent">
              <view class="popupText">{{ gameResult }}</view>
              <view
                class="popupBtn"
                v-if="gameStatus && GameBeginTitle != '第四关'"
              >
                <u-button type="primary" @click="nextLevel()">
                  下一关
                </u-button>
              </view>

              <view class="popupBtn" v-if="!gameStatus">
                <u-button type="primary" @click="reloadLevel()">
                  重新开始
                </u-button>
              </view>

              <view class="popupBtn">
                <u-button type="success" @click="returnMenuBtnClick()">
                  返回菜单
                </u-button>
              </view>
            </view>
          </u-popup>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 子组件
import UserInfo from "./components/UserInfo.vue";
import NumberContent from "./components/NumberContent.vue";
import HistoryNumberContent from "./components/HistoryNumberContent.vue";
import ButtonContent from "./components/ButtonContent.vue";

// 方法
import { equals } from "@/utils/index.js";

export default {
  data() {
    return {
      secretNumbers: [1, 2, 3, 4], // 正确的数字序列
      gameOver: false, // 是否游戏结束
      gameResult: "", // 是否游戏结束
      gameStatus: false,
      count: 0, // 已猜测次数
      showPopup: false,
      firstCheck: true, // 第一次检查，不可直接成功
      subCount: -1, // 用户每次失败扣除的分数
    };
  },

  components: {
    UserInfo,
    NumberContent,
    HistoryNumberContent,
    ButtonContent,
  },
  created() {
    this._initSecretNumbers();
    this._initNumberList();
  },
  mounted() {
    uni.$u.vuex("HistoryNumberList", []);

    setTimeout(() => {
      this.subCount = this.LevelCount / (this.HistoryNumberCount + 2);
    }, 1000);
  },

  methods: {
    _initSecretNumbers() {
      const nums = [];
      // NumberCount为store里面的数据，是可输入的总数
      while (nums.length < this.NumberCount) {
        const num = Math.floor(Math.random() * this.ButtonCount); // 值为button的值
        if (!nums.includes(num)) nums.push(num);
      }
      this.secretNumbers = nums.map((item) => item.toString());
      console.log(this.secretNumbers);
    },
    // 初始化头部的数据
    _initNumberList() {
      let numberList = ["", "", "", ""];
      numberList = numberList.slice(0, this.NumberCount);
      uni.$u.vuex("NumberList", numberList);
    },
    // 检查用户输入数字并显示结果
    checkAnswer() {
      // 检查数据有效性，如果数据有空，则不可提交
      const valid = this._checkValueValid();
      if (!valid) return;

      // 第一次不可为空，所以需要检查数据
      this._checkFirstCheck();

      console.log("numberList", this.NumberList);
      console.log("secretNumbers", this.secretNumbers);
      // 计算本次结果（1A和1B的数量）
      let A = 0,
        B = 0;
      for (let i = 0; i < this.NumberCount; i++) {
        // 数字和位置都正确
        if (this.NumberList[i] == this.secretNumbers[i]) A++;
        else if (this.secretNumbers.includes(this.NumberList[i])) B++; // 数字正确但位置不正确
      }

      // 保存数据到history中
      const status = { right: A, nearlyRight: B };
      this._setHistoryNumberList(status); // 将数据保存到history中

      this.count++; // 游戏次数+1
      this._checkGameStatus(A); // 查看游戏是否已经结束

      this._checkUserCount();

      // 清空输入数字
      const numberBack = this.NumberList.map((item) => "");
      uni.$u.vuex("NumberList", numberBack);
      uni.$u.vuex("CurrentIndex", 0);
    },

    // 检查数据有效性
    _checkValueValid() {
      // 如果数字不是4位数，则return false
      for (let item of this.NumberList) {
        if (!item) {
          uni.$showMsg("请输入完整数字！");
          return false;
        }
      }

      // 如果有相同数字，则return false
      const valid = this.__checkDuplicates(this.NumberList);
      if (!valid) {
        uni.$showMsg("请勿输入相同数字！");
        return false;
      }

      // 默认返回true
      return true;
    },

    // 检查重复数字
    __checkDuplicates(arr) {
      let newArr = Array.from(new Set(arr)); // 将数组转换成 Set
      return newArr.length === arr.length; // 比较长度，判断是否存在重复元素
    },

    // 如果是第一次输入，则判断是否相等
    _checkFirstCheck() {
      if (!this.firstCheck) return; // 如果不是第一次检查，则直接返回

      if (equals(this.NumberList, this.secretNumbers))
        this._initSecretNumbers();
      if (equals(this.NumberList, this.secretNumbers)) this._checkFirstCheck();

      this.firstCheck = false;
    },

    // 将数据保存到history中
    _setHistoryNumberList(status) {
      const historyitem = {
        numberList: this.NumberList,
        status: status,
      };

      const historyNumberList = JSON.parse(
        JSON.stringify(this.HistoryNumberList)
      );
      historyNumberList.push(historyitem);

      // 如果数量不大于10，则放入进去
      if (this.HistoryNumberList.length < 10) {
        uni.$u.vuex("HistoryNumberList", historyNumberList);
        uni.$u.vuex("HistoryRefresh", !this.HistoryRefresh);
      }
    },
    // 检查游戏是否已经结束
    _checkGameStatus(A) {
      // 如果猜测次数已满10次或者已猜对，则游戏结束
      if (A === this.NumberCount) {
        this.gameOver = true;
        this.showPopup = true;
        this.gameStatus = true; // true代表游戏胜利
        this.gameResult = "恭喜你猜对了！";
      } else if (this.count === this.HistoryNumberCount) {
        this.gameOver = true;
        this.showPopup = true;
        this.gameStatus = false; // false代表输掉游戏
        this.gameResult = `很遗憾，你没有在规定的${
          this.HistoryNumberCount
        }次内猜中答案。正确答案是${this.secretNumbers.join(" ")}`;
      }
    },

    // 检查用户分数，扣分逻辑
    _checkUserCount() {
      // 如果是游戏结束了，并且失败了，则直接返回
      if (this.gameOver && !this.gameStatus) return;

      // 如果游戏结束了，并且成功了，则加上用户总分上
      if (this.gameOver && this.gameStatus) {
        this.$store.dispatch("ADD_UserCount", this.LevelCount);
        return;
      }

      let levelCount = this.LevelCount - this.subCount;
      levelCount = parseInt(levelCount);
      this.$store.commit("SET_LevelCount", levelCount);
    },

    returnMenuBtnClick() {
      let pages = getCurrentPages(); //获取当前页面信息栈
      let currentPage = pages[pages.length - 1]; // 当前页面栈
      let prevPage = pages[pages.length - 2]; //获取上一个页面信息栈

      try {
        // 进行判断，如果有上一个页面，并且上一个页面不等于当前页面
        if (prevPage && prevPage.route != currentPage.route) {
          uni.navigateBack({ delta: 1 });
        } else if (prevPage) {
          // 如果有上一个页面，但是页面相等
          let pageNames = [];
          pages.forEach((page) => pageNames.push(page.route));

          let delta = 0;
          for (let page of pageNames.reverse()) {
            // 如果上一个页面与当前页面相同，则返回
            if (page === currentPage.route) delta += 1;
            else break;
          }

          uni.navigateBack({ delta });
        } else {
          // 如果没有上一个页面，则回到首页
          uni.reLaunch({ url: "/pages/index/index" });
        }
      } catch (err) {
        // uni.switchTab({ url: "/pages/tabs/home/index" });
        uni.reLaunch({ url: "/pages/index/index" });
      }
    },

    nextLevel() {
      if (this.GameBeginTitle === "第一关") {
        this.$store.dispatch("setLevelTwo");
      }

      if (this.GameBeginTitle === "第二关") {
        this.$store.dispatch("setLevelThree");
      }

      if (this.GameBeginTitle === "第三关") {
        this.$store.dispatch("setLevelFour");
      }

      this.$Router.push({
        name: "gameBegin",
        params: {},
      });
    },
    reloadLevel() {
      this.$Router.push({
        name: "gameBegin",
        params: {},
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.gameBegin {
  background-image: linear-gradient(
    to bottom,
    rgb(132, 193, 247) 0%,
    white 100%
  );
  background-size: 100% 200px;
  background-repeat: no-repeat;

  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
}

.buttonContent {
  display: flex;
  justify-content: center;

  .checkBtnClass {
    width: 200px;
  }

  .successBtnClass {
    width: 200px;
    // background-color: #3c8adf;
  }
}

.popupContent {
  margin-top: 20px;
  padding: 20px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .popupText {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;

    border: 1px solid green;
    padding: 10px 20px;
    border-radius: 5px;
  }

  .popupBtn {
    width: 200px;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>