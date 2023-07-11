<template>
  <view class="PKHistoryDetail">
    <view class="header">
      <view>历史记录</view>
      <view v-show="false">查看更多 ></view>
    </view>

    <view class="content" v-if="historyList.length != 0">
      <view class="historyItem" v-for="item in historyList" :key="item.roomId">
        <view class="title">{{ item.firstUser }} VS {{ item.secondUser }}</view>
        <view>
          <u-tag text="胜利" v-if="item.gameStatus" type="success" class="tagClass"></u-tag>
          <u-tag text="失败" v-if="!item.gameStatus" type="error" class="tagClass"></u-tag>
        </view>

        <view class="useTime" style="margin-top: 2px">使用时间：{{ item.firstUseTime }}</view>
        <view class="useStep" style="margin-top: 2px">使用步数：{{ item.firstStep }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      historyList: [],
    };
  },
  mounted() {
    this.historyList = this.PkOnline.PkHistoryList.slice(0, 3);
  },
};
</script>

<style lang="scss" scoped>
.PKHistoryDetail {
  position: relative;
  overflow: hidden;
  height: 340px;
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  padding-bottom: 40px;
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
</style>