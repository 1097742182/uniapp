<template>
  <view class="gameBegin">
    <cl-header :title="GameBeginTitle" :transparent="true" />
    <u-toast ref="uToast"></u-toast>
    <view class="content">
      <user-info :backgroundType="backgroundType"></user-info>
      <number-content :gameOver="gameOver" :backgroundType="backgroundType"></number-content>

      <!-- history区域 -->
      <swiper
        id="historySwiper"
        :duration="300"
        class="swiper-1"
        :style="'height:' + historyHeight"
        easing-function="linear"
        :indicator-dots="true"
        :current="currentSwiper"
      >
        <swiper-item>
          <history-number-content v-if="getCurrentTitle()" />
          <new-history-number-content v-else />
        </swiper-item>
        <swiper-item v-if="SecondHistory">
          <history-number-content v-if="getCurrentTitle()" :secondHistory="true" />
          <new-history-number-content v-else :secondHistory="true" />
        </swiper-item>
      </swiper>

      <!-- <history-number-content v-if="GameBeginTitle === '第四关'" />
      <new-history-number-content v-else /> -->

      <!-- 当需要展示答案时，按钮就不显示了 -->
      <button-content v-if="!CurrentLevelNumberResultShow" :backgroundType="backgroundType"></button-content>

      <view class="buttonContent">
        <view style="width: 200px" v-if="!gameOver">
          <button type="primary" class="submitClass" @click="checkAnswer">提交</button>
        </view>

        <view class="" style="width: 200px" v-if="gameOver">
          <!-- <u-button type="success" @click="returnMenuBtnClick()"> 返回菜单 </u-button> -->
          <!-- 如果游戏失败了，则显示“再来一局” -->
          <view class="popupBtn" v-if="!gameStatus">
            <button type="primary" class="submitClass" @click="reloadLevel()">再来一局</button>
          </view>
          <!-- 如果游戏胜利了，但使用过二次机会，则显示“再来一局” -->
          <view class="popupBtn" v-else-if="gameStatus && SecondHistory">
            <button type="primary" class="submitClass" @click="reloadLevel()">再来一局</button>
          </view>
          <!-- 如果游戏胜利了，并且不是最后一关，并且没有使用过二次机会，则显示“下一关” -->
          <view class="popupBtn" v-else-if="gameStatus && !checkIsLastLevel() && !SecondHistory">
            <button type="primary" class="submitClass" @click="nextLevel()">下一关</button>
            <button type="primary" class="submitClass" @click="reloadLevel()" style="margin-top: 10px">再来一局</button>
          </view>
          <!-- 如果游戏胜利了，并且是最后一关，则显示“返回菜单” -->
          <view class="popupBtn" v-else-if="gameStatus && checkIsLastLevel()">
            <button type="success" class="submitClass" @click="returnMenuBtnClick()">返回菜单</button>
          </view>

          <!-- 成功的dialog展示 -->
          <u-popup
            :show="successDialogShow"
            :round="30"
            mode="center"
            :closeOnClickOverlay="false"
            @close="successDialogShow = false"
            :safeAreaInsetBottom="false"
          >
            <success-dialog @comfirmBtnClick="successDialogShow = false" />
          </u-popup>

          <!-- 失败的dialog展示 -->
          <u-popup
            :show="errorDialogShow"
            :round="30"
            mode="center"
            :closeOnClickOverlay="false"
            @close="errorDialogShow = false"
            :safeAreaInsetBottom="false"
          >
            <error-dialog @confirmBtnClick="ErrorConfirmBtnClick()" />
          </u-popup>

          <!-- 失败一次的dialog展示，进行warning展示 -->
          <u-popup
            :show="warningDialogShow"
            :round="30"
            mode="center"
            :closeOnClickOverlay="false"
            @close="warningDialogShow = false"
            :safeAreaInsetBottom="false"
          >
            <warning-dialog @continueBtnClick="continueBtnClick()" @abandonBtnClick="abandonBtnClick()" />
          </u-popup>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 子组件
import UserInfo from "./components/gameBegin/UserInfo.vue";
import NumberContent from "./components/gameBegin/NumberContent.vue";
import HistoryNumberContent from "./components/gameBegin/HistoryNumberContent.vue";
import NewHistoryNumberContent from "./components/gameBegin/NewHistoryNumberContent/NewHistoryNumberContent.vue";
import ButtonContent from "./components/gameBegin/ButtonContent.vue";
import SuccessDialog from "@/components/SuccessDialog/SuccessDialog.vue";
import ErrorDialog from "@/components/ErrorDialog/ErrorDialog.vue";
import WarningDialog from "@/components/WarningDialog/WarningDialog.vue";

// 方法
import { equals, addDuplicate, checkNumberRight } from "@/utils/index.js";

export default {
  data() {
    return {
      backgroundType: "blueBackground",
      secretNumbers: [1, 2, 3, 4], // 正确的数字序列
      gameOver: false, // 是否游戏结束
      gameStatus: false,
      count: 0, // 已猜测次数
      firstCheck: true, // 第一次检查，不可直接成功
      subCount: -1, // 用户每次失败扣除的分数
      currentSwiper: 0, // 默认展示的swiper
      confirmSecondHistoryShow: false, // 巡检是否开启二次机会的popup
      successDialogShow: false, // 游戏成功动画
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
    ErrorDialog,
    SuccessDialog,
    WarningDialog,
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
  created() {
    this._initSecretNumbers();
    this._initNumberList();
  },
  mounted() {
    uni.$u.vuex("HistoryNumberList", []);

    // 初始化扣除的分数
    setTimeout(() => {
      this.subCount = this.LevelCount / (this.HistoryNumberCount + 2);
    }, 1000);

    if (this.CurrentLevelType === "hard") this.backgroundType = "redBackground";
  },

  methods: {
    _initSecretNumbers() {
      const nums = [];
      // NumberCount为store里面的数据，是可输入的总数
      while (nums.length < this.NumberCount) {
        let num = Math.floor(Math.random() * this.ButtonCount); // 值为button的值
        if (this.ButtonCount <= 6 && num == 0) num = this.ButtonCount; // num不为0，若num为0，则为最大数
        if (this.CurrentLevelType === "normal") {
          if (!nums.includes(num)) nums.push(num);
        } else if (this.CurrentLevelType === "hard") {
          // 如果是华山论剑，则不需要检查重复值
          nums.push(num);
        }
      }
      this.secretNumbers = nums.map((item) => item.toString());
      if (this.CurrentLevelType === "hard") addDuplicate(this.secretNumbers);
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
        this.successDialogShow = true;
        this.gameStatus = true; // true代表游戏胜利
        this._setCurrentLevelNumberResult(); // 展示答案出来
        if (!this.SecondHistory) this.$store.dispatch("setLevelStep"); // 如果没有开启二次机会，则游戏成功，则关卡往前走
      } else if (this.count === this.HistoryNumberCount) {
        this.gameOver = true;
        if (!this.SecondHistory) this.warningDialogShow = true; // 如果没有开启二次机会，则显示
        if (this.SecondHistory) this.errorDialogShow = true; // 如果已经开启了二次机会，则不显示
        if (this.SecondHistory) this._setCurrentLevelNumberResult(); // 如果已经用了第二次机会，则直接显示答案
        this.gameStatus = false; // false代表输掉游戏
      }
    },

    // 检查用户分数，扣分逻辑（每一次提交数字都出发扣分逻辑）
    _checkUserCount() {
      // 如果是游戏结束了，并且失败了，则直接返回
      if (this.gameOver && !this.gameStatus) return;

      // 如果游戏结束了，并且成功了，则加上用户总分上
      if (this.gameOver && this.gameStatus) {
        // 计算总分
        let userCount = parseInt(this.UserCount);
        userCount = userCount + parseInt(this.LevelCount);

        // 保存积分到VueX
        this.$store.dispatch("UPDATE_UserCount", userCount);

        // 保存积分到数据库中
        const data = {
          openId: this.OpenId,
          nickname: this.NickName,
          UserCount: userCount,
        };
        this.$api.user.setUserCount(data);
        return;
      }

      // 扣分逻辑
      let levelCount = this.LevelCount - this.subCount;
      levelCount = parseInt(levelCount);
      if (levelCount <= 0) levelCount = 0;
      this.$store.commit("SET_LevelCount", levelCount);
    },
    // 修改state的参数，设置SET_CurrentLevelNumberResult值
    _setCurrentLevelNumberResult() {
      this.$store.commit("SET_CurrentLevelNumberResult", this.secretNumbers);
      this.$store.commit("SET_CurrentLevelNumberResultShow", true);
      setTimeout(() => this.$store.commit("SET_NumberList", this.secretNumbers), 100);
    },

    // 返回菜单按钮点击
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

    // 下一关按钮点击
    nextLevel() {
      if (this.GameBeginTitle === "第一关") this.$store.dispatch("setLevelTwo");
      if (this.GameBeginTitle === "第二关") this.$store.dispatch("setLevelThree");
      if (this.GameBeginTitle === "第三关") this.$store.dispatch("setLevelFour");
      if (this.GameBeginTitle === "第四关") this.$store.dispatch("setLevelFive");
      if (this.GameBeginTitle === "第五关") this.$store.dispatch("setLevelSix");
      if (this.GameBeginTitle === "第六关") this.$store.dispatch("setLevelSeven");
      if (this.GameBeginTitle === "第七关") this.$store.dispatch("setLevelEight");
      if (this.GameBeginTitle === "第八关") this.$store.dispatch("setLevelNine");

      this.$Router.replace({ name: "gameBegin", params: {} });
    },

    // 继续游戏 按钮点击
    continueBtnClick() {
      this.$store.commit("SET_SecondHistory", true);
      this.$store.commit("SET_LevelCount", 0);
      this.gameOver = false;
      this.count = 0;
      setTimeout(() => (this.currentSwiper = 1), 100); // 延迟将页面转换到第二页
      this.warningDialogShow = false;
    },

    // 放弃机会 按钮点击
    abandonBtnClick() {
      this.warningDialogShow = false;
      this.errorDialogShow = true;
      this._setCurrentLevelNumberResult();
    },

    ErrorConfirmBtnClick() {
      this.errorDialogShow = false;
    },

    // 再来一局按钮点击
    reloadLevel() {
      if (this.GameBeginTitle === "第一关") this.$store.dispatch("setLevelOne");

      if (this.GameBeginTitle === "第二关") this.$store.dispatch("setLevelTwo");

      if (this.GameBeginTitle === "第三关") this.$store.dispatch("setLevelThree");

      if (this.GameBeginTitle === "第四关") this.$store.dispatch("setLevelFour");

      if (this.GameBeginTitle === "第五关") this.$store.dispatch("setLevelFive");

      this.$Router.push({ name: "gameBegin", params: {} });
    },
    getCurrentTitle() {
      if (this.GameBeginTitle === "第三关" || this.GameBeginTitle === "第四关") {
        // return true;
        return false;
      } else {
        return false;
      }
    },
    // 查看是否最后一关
    checkIsLastLevel() {
      return this.GameBeginTitle === "第九关";
    },
    getBackgroundColor() {
      if (this.CurrentLevelType === "hard") {
        return {
          background: "linear-gradient(0deg, rgb(215, 138, 138) 0%, rgb(225, 89, 89) 100%)",
        };
      }
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
