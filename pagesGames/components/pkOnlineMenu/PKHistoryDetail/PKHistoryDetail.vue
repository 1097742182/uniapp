<template>
  <view class="PKHistoryDetail">
    <view class="header">
      <view>历史记录</view>
      <view v-show="false">查看更多 ></view>
    </view>

    <view class="content" v-if="historyList.length != 0">
      <view class="historyItem" v-for="item in historyList" :key="item.roomId">
        <view class="title">{{ item.firstUser }} <text style="margin: 0 16px">VS</text> {{ item.secondUser }}</view>
        <view class="tagClass">
          <u-tag text="胜利" v-if="item.gameStatus === 'success'" type="success"></u-tag>
          <u-tag text="失败" v-else-if="item.gameStatus === 'failed'" type="error"></u-tag>
          <u-tag text="进行中" v-else-if="item.gameStatus === 'loading'" type="warning"></u-tag>
        </view>

        <view class="useTime" style="margin-top: 6px">使用时间：{{ item.firstUseTime }}</view>
        <view class="useStep" style="margin-top: 6px; position: relative; display: inline-block">
          <view>使用步数：{{ item.firstStep }}</view>
          <view class="failedTagClass">
            <u-tag text="闯关失败" v-if="item.firstStep == 0" type="error"></u-tag>
          </view>
        </view>
      </view>
    </view>

    <view class="noGameContnet" v-if="historyList.length === 0">
      <view class="noGameText">暂无游戏对局</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    historyList() {
      const history = this.PkOnline.PkHistoryList.slice(-3);
      history.reverse();
      return history;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.PKHistoryDetail {
  position: relative;
  overflow: hidden;
  // height: 340px;
  min-height: 350px;
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
  }

  .historyItem {
    color: #fff;
    padding: 10px 15px;
    border: 1px solid #eee;
    border-radius: 10px;
    margin: 10px 0;
    position: relative;

    .tagClass {
      position: absolute;
      right: 10px;
      top: 10px;
      display: block;
      width: 50px;
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
</style>