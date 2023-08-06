<template>
  <view class="gameBegin">
    <cl-header :title="GameBeginTitle" :transparent="true" />
    <view class="content">
      <user-info ref="UserInfo" :backgroundType="backgroundType"></user-info>
      <number-content :gameOver="gameOver" :backgroundType="backgroundType"></number-content>

      <new-history-number-content style="position: relative" />

      <!-- 当需要展示答案时，按钮就不显示了 -->
      <button-content v-if="!CurrentLevelNumberResultShow" :backgroundType="backgroundType"></button-content>

      <view class="buttonContent">
        <view style="width: 200px" v-if="!gameOver">
          <button type="primary" class="submitClass" @click="checkAnswer">提交</button>
        </view>

        <view style="width: 200px" v-if="gameOver">
          <button type="primary" class="submitClass" @click="backToMenuBtnClick()">返回菜单</button>
        </view>
      </view>
    </view>
    <startGameMessageBox></startGameMessageBox>
    <gameResultPopupContentVue ref="gameResultPopupContentVue" />

    <message-box-vue ref="MessageBox" content="可在比赛记录查看PK结果" @confirm="messageBoxConfirm" />
  </view>
</template>

<script>
// 子组件
import UserInfo from "./components/gameBegin/UserInfo.vue";
import NumberContent from "./components/gameBegin/NumberContent.vue";
import HistoryNumberContent from "./components/gameBegin/HistoryNumberContent.vue";
import NewHistoryNumberContent from "./components/gameBegin/NewHistoryNumberContent/NewHistoryNumberContent.vue";
import ButtonContent from "./components/gameBegin/ButtonContent.vue";
import MessageBoxVue from "@/components/MessageBox/MessageBox.vue";
import startGameMessageBox from "./components/pkOnlineBegin/startGameMessageBox";
import gameResultPopupContentVue from "./components/pkOnlineBegin/gameResultPopupContent.vue";

// 方法
import { equals, addDuplicate, checkNumberRight, checkPkGameStatus } from "@/utils/index.js";

export default {
  data() {
    return {
      roomId: "",
      backgroundType: "blueBackground",
      secretNumbers: [1, 2, 3, 4], // 正确的数字序列
      gameOver: false, // 是否游戏结束
      gameStatus: false,
      count: 0, // 已猜测次数
      firstCheck: true, // 第一次检查，不可直接成功
      errorDialogShow: false, // 游戏失败动画
      warningDialogShow: false, // 游戏失败动画
      historyHeight: "355px",
    };
  },
  components: {
    UserInfo,
    NumberContent,
    HistoryNumberContent,
    NewHistoryNumberContent,
    ButtonContent,
    MessageBoxVue,
    startGameMessageBox,
    gameResultPopupContentVue,
  },
  computed: {
    currentLevelNumberResultShowState() {
      return this.CurrentLevelNumberResultShow;
    },
  },
  watch: {
    currentLevelNumberResultShowState() {
      this.historyHeight = "430px";
    },
  },
  onLoad: function (option) {
    this.roomId = option.id;
  },
  created() {
    this._initSecretNumbers();
    this._initNumberList();
  },
  mounted() {
    uni.$u.vuex("HistoryNumberList", []);
    this._initRoomDetail();
  },

  // 离开界面时
  onUnload() {
    this.setGameDataToHistory(); // 离开界面时，将游戏数据传输到历史数据中
  },

  methods: {
    _initRoomDetail() {},
    _initSecretNumbers() {
      const nums = [];
      // NumberCount为store里面的数据，是可输入的总数
      while (nums.length < this.NumberCount) {
        let num = Math.floor(Math.random() * this.ButtonCount); // 值为button的值
        if (!nums.includes(num)) nums.push(num);
      }
      this.secretNumbers = nums.map((item) => item.toString());
      console.log(this.secretNumbers);
    },
    // 初始化头部的数据
    _initNumberList() {
      let numberList = [];
      for (let i = 0; i < this.NumberCount; i++) {
        numberList.push("");
      }
      uni.$u.vuex("NumberList", numberList);
    },
    // 离开界面时，将游戏数据传输到历史数据中
    setGameDataToHistory() {
      const historyList = this.PkOnline.PkHistoryList;
      const roomDetail = this.PkOnline.RoomDetail;

      const useTime = this.$refs.UserInfo.getTimer(); // 获取游戏时间

      // 如果用户名等于firstUser
      if (roomDetail.firstUser === this.NickName) {
        roomDetail.firstUseTime = useTime;
        if (this.gameStatus) roomDetail.firstStep = this.HistoryNumberList.length; // 如果用户游戏已经结束，则赋值firstStep
      } else if (roomDetail.secondUser === this.NickName) {
        roomDetail.secondUseTime = useTime;
        if (this.gameStatus) roomDetail.secondStep = this.HistoryNumberList.length; // 如果用户游戏已经结束，则赋值secondStep
      }

      // 获取游戏状态
      roomDetail.gameStatus = checkPkGameStatus(roomDetail);

      historyList.push(roomDetail);
      this.$store.commit("PkOnline/SET_PkHistoryList", historyList); // 将历史数据保存到vuex中，
      this.$store.dispatch("PkOnline/checkUserGameDetailActions"); // 给用户PK记录进行计算
      this.$store.dispatch("PkOnline/updateRoomDetailAction", roomDetail); // 将用户数据保存到数据库中
    },
    backToMenuBtnClick() {
      this.$refs.MessageBox.open();
    },
    messageBoxConfirm() {
      let pages = getCurrentPages(); // 获取栈实例
      if (pages.length <= 1) {
        this.$Router.replace({ path: `/pagesGames/pkOnlineMenu` });
      } else {
        uni.navigateBack({ delta: 1 });
      }
    },
    // 检查用户输入数字并显示结果
    checkAnswer() {
      // 检查数据有效性，如果数据有空，则不可提交
      const valid = this._checkValueValid();
      if (!valid) return;

      // 第一次不可为空，所以需要检查数据
      this._checkFirstCheck();

      const data = { secretNumbers: [...this.secretNumbers], NumberList: [...this.NumberList] };
      const { A, B } = checkNumberRight(this.CurrentLevelType, data);

      // 保存数据到history中
      const status = { right: A, nearlyRight: B };
      this._setHistoryNumberList(status); // 将数据保存到history中

      this.count++; // 游戏次数+1
      this._checkGameStatus(A); // 查看游戏是否已经结束

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
      if (this.CurrentLevelType === "hard") return true;
      let newArr = Array.from(new Set(arr)); // 将数组转换成 Set
      return newArr.length === arr.length; // 比较长度，判断是否存在重复元素
    },

    // 如果是第一次输入，则判断是否相等
    _checkFirstCheck() {
      if (!this.firstCheck) return; // 如果不是第一次检查，则直接返回

      if (equals(this.NumberList, this.secretNumbers)) this._initSecretNumbers();
      // 如果重置后 仍然相同，则再重置一次
      if (equals(this.NumberList, this.secretNumbers)) this._checkFirstCheck();

      this.firstCheck = false;
    },

    // 将数据保存到history中
    _setHistoryNumberList(status) {
      const historyitem = { numberList: this.NumberList, status: status };

      const historyNumberList = JSON.parse(JSON.stringify(this.HistoryNumberList));
      historyNumberList.push(historyitem);
      uni.$emit("$scrollToContent");

      uni.$u.vuex("HistoryNumberList", historyNumberList);
      uni.$u.vuex("HistoryRefresh", !this.HistoryRefresh);
    },

    // 检查游戏是否已经结束
    _checkGameStatus(A) {
      // 如果猜测次数已满10次或者已猜对，则游戏结束
      if (A === this.NumberCount) {
        this.gameOver = true;
        this.$refs.gameResultPopupContentVue.success();
        this.gameStatus = true; // true代表游戏胜利
        uni.$emit("$stopTimer");
        this._setCurrentLevelNumberResult(); // 展示答案出来
      } else if (this.count === this.HistoryNumberCount) {
        this.gameOver = true;
        this.$refs.gameResultPopupContentVue.error();
        uni.$emit("$stopTimer");
        this._setCurrentLevelNumberResult(); // 如果已经用了第二次机会，则直接显示答案
        this.gameStatus = false; // false代表输掉游戏
      }
    },

    // 修改state的参数，设置SET_CurrentLevelNumberResult值
    _setCurrentLevelNumberResult() {
      this.$store.commit("SET_CurrentLevelNumberResult", this.secretNumbers);
      this.$store.commit("SET_CurrentLevelNumberResultShow", true);
      setTimeout(() => this.$store.commit("SET_NumberList", this.secretNumbers), 100);
    },

    ErrorConfirmBtnClick() {
      this.errorDialogShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.gameBegin {
  background-image: linear-gradient(to bottom, rgb(132, 193, 247) 0%, white 100%);
  background-size: 100% 200px;
  background-repeat: no-repeat;

  margin-bottom: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 85vh;
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

.swiper-1 {
  height: 345px;
}

/deep/ .u-popup__content {
  overflow: hidden;
}

.submitClass {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}
</style>