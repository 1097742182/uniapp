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
import { checkUseTimeLarge20 } from "@/utils/index.js";

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

  // 离开界面时
  onUnload() {
    clearInterval(this.timer);
  },
  destroyed() {
    clearInterval(this.timer);
  },

  methods: {
    // 检查是否有loading状态的历史记录
    async _checkHistoryItemGameStatus() {
      console.log("监测历史中");
      for (let item of this.PkOnline.PkHistoryList) {
        if (item.gameStatus === "loading") {
          // 如果这条历史记录同事有两个时间，说明是fake数据，则直接reload这条数据
          if (item.firstUseTime && item.secondUseTime) {
            this.$store.dispatch("PkOnline/reloadOnePkHistoryList", item);
          }

          /* 假数据不会走到这个if，因为假数据有两个useTime */

          // 如果其中一个没有时间，则需要去后台获取时间
          if (!item.firstUseTime || !item.secondUseTime) {
            checkUseTimeLarge20(item); // 查看是否已经大于20分钟
            let roomDetail;
            // 如果有roomId，则去数据库获取
            if (item.roomId) {
              const data = { roomId: item.roomId };
              roomDetail = await this.$api.user.getRoomDetail(data).catch((error) => {});
            }

            // 如果没有获取到数据，则直接以20分钟处理
            if (!roomDetail) roomDetail = { firstUseTime: "20:00", secondUseTime: "20:00" };

            // 如果原数据没有firstUseTime，并且返回数据有firstUseTime，则直接赋值
            if (!item.firstUseTime && roomDetail.firstUseTime) item.firstUseTime = roomDetail.firstUseTime;
            if (!item.secondUseTime && roomDetail.secondUseTime) item.secondUseTime = roomDetail.secondUseTime;
            this.$store.dispatch("PkOnline/reloadOnePkHistoryList", item);
          }
        }
      }
    },
    // 重置历史记录
    resetPkHistoryList() {
      const PkHistoryList = [];
      this.$store.commit("PkOnline/SET_PkHistoryList", PkHistoryList);
    },
    reloadSuccess() {
      this._checkHistoryItemGameStatus();
    },
    throttle() {
      setTimeout(() => this._checkHistoryItemGameStatus(), 1000);

      if (!this.timer) {
        this.timer = setInterval(() => {
          this._checkHistoryItemGameStatus();
        }, 10000);
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