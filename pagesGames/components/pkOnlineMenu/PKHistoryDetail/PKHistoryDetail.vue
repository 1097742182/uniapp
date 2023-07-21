<template>
  <view class="PKHistoryDetail">
    <view class="header">
      <view>历史记录</view>
      <view v-show="false">查看更多 ></view>
      <view class="right"> <reload-icon size="28" showMsg="历史记录已刷新" @reloadSuccess="reloadSuccess" /> </view>
    </view>

    <view class="content" v-if="historyList.length != 0">
      <view class="historyItem" v-for="item in historyList" :key="item.roomId">
        <view class="left flexClass">
          <view style="margin-bottom: 6px" class="ellipsis-text">{{ item.firstUser }}</view>
          <view v-if="item.firstStep != 0">{{ item.firstStep }}</view>
          <view v-if="item.firstStep == 0">
            <u-tag text="闯关失败" type="error"></u-tag>
          </view>
          <view style="margin-top: 6px">{{ item.firstUseTime }}</view>
        </view>

        <view class="center flexClass">
          <view class="tagClass">
            <u-tag text="胜利" v-if="item.gameStatus === 'success'" type="success"></u-tag>
            <u-tag text="失败" v-else-if="item.gameStatus === 'failed'" type="error"></u-tag>
            <u-tag text="进行中" v-else-if="item.gameStatus === 'loading'" type="warning"></u-tag>
          </view>
          <view style="margin-top: 6px">使用步数</view>
          <view style="margin-top: 6px">使用时间</view>
        </view>

        <view class="right flexClass">
          <view style="margin-bottom: 6px" class="ellipsis-text">{{ item.secondUser }}</view>
          <view v-if="item.gameStatus === 'loading'">~</view>
          <view v-else-if="item.secondStep != 0">{{ item.secondStep }}</view>
          <view v-else-if="item.secondStep == 0">
            <u-tag text="闯关失败" type="error"></u-tag>
          </view>
          <view v-if="item.gameStatus === 'loading'">~</view>
          <view v-else style="margin-top: 6px">{{ item.secondUseTime }}</view>
        </view>
      </view>
    </view>

    <view class="noGameContnet" v-if="historyList.length === 0">
      <view class="noGameText">暂无游戏对局</view>
    </view>
  </view>
</template>

<script>
import ReloadIcon from "components/ReloadIcon/ReloadIcon.vue";

export default {
  components: { ReloadIcon },
  data() {
    return {};
  },
  computed: {
    historyList() {
      // const history = this.PkOnline.PkHistoryList.slice(-3);
      const history = JSON.parse(JSON.stringify(this.PkOnline.PkHistoryList));
      history.reverse();
      return history;
    },
  },
  mounted() {
    this.throttle();
  },

  methods: {
    // 检查是否有loading状态的历史记录
    _checkHistoryItemGameStatus() {
      for (let item of this.PkOnline.PkHistoryList) {
        if (item.gameStatus === "loading") {
          this.$store.dispatch("PkOnline/reloadPkHistoryList");

          // 如果还有loading的话，则过段时间再检查一次
          setTimeout(() => this.throttle(), 1000);
          return;
        }
      }
    },
    // 重置历史记录
    resetPkHistoryList() {
      const PkHistoryList = [];
      this.$store.commit("PkOnline/SET_PkHistoryList", PkHistoryList);
    },
    reloadSuccess() {
      this.$store.dispatch("PkOnline/reloadPkHistoryList");
      this.throttle();
    },
    throttle() {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this._checkHistoryItemGameStatus();
          this.timer = null;
        }, 5000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.PKHistoryDetail {
  position: relative;
  // height: 340px;
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  // padding-bottom: 40px;
  box-sizing: border-box;

  background: linear-gradient(90deg, #406de4, #7c78b8);
  background-repeat: repeat-y;

  .header {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 18px;
    padding-bottom: 10px;
  }

  .content {
    height: 320px;
    overflow: auto;

    .historyItem {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ffffff;
      color: #ffffff;
      border-radius: 4px;
      padding: 4px 20px;
      margin-bottom: 13px;

      .flexClass {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 75px;
      }

      .center {
        position: relative;
        padding-top: 2px;

        .tagClass {
          padding-top: 2px;
          display: block;
        }
      }
    }
  }
}

.failedTagClass {
  position: absolute;
  right: -84px;
  top: -2px;
  display: block;
}

.noGameContnet {
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;

  .noGameText {
    color: #fff;
    border: 1px solid #ffffff;
    padding: 10px;
    border-radius: 5px;
  }
}

.ellipsis-text {
  white-space: nowrap; /* 禁止换行，防止省略号出现在中间 */
  overflow: hidden; /* 隐藏文本溢出部分 */
  text-overflow: ellipsis; /* 使用省略号表示 */
}

/deep/ .u-tag--medium {
  height: 23px;
}
</style>