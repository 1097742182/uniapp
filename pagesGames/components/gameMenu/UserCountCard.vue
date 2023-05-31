<template>
  <view class="UserCountCard">
    <view class="left">
      <view class="leftTitle">我的积分</view>
      <view class="UserCount">{{ UserCount }}</view>
    </view>
    <view class="right">
      <view class="iconContent" @click="reloadBtnClick()">
        <u-icon name="reload" color="#ffffff" size="32"></u-icon>
      </view>
    </view>

    <view class="bottom">
      <view class="bottomLeft">我的排名：{{ UserRank }}</view>
      <view class="bottomRight">积分明细 ></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      UserRank: 1,
    };
  },
  methods: {
    reloadBtnClick() {
      const userCount = uni.getStorageSync("UserCount");
      this.$store.commit("SET_UserCount", userCount);
    },
  },
};
</script>

<style lang="scss" scoped>
.UserCountCard {
  position: relative;
  overflow: hidden;
  height: 160px;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  padding-bottom: 40px;
  box-sizing: border-box;

  background: #406de4;
  background-image: linear-gradient(90deg, #8e6 10%, rgba(0, 0, 0, 0) 10%);
  background-repeat: repeat-y;

  display: flex;
  justify-content: space-between;

  .left {
    flex: 1;
    .leftTitle {
      color: #fff;
      font-size: 18px;
      margin-top: 10px;
    }

    .UserCount {
      color: #fff;
      font-weight: bold;
      font-size: 30px;
      margin-top: 10px;
    }
  }

  .right {
    margin: auto;
    margin-right: 10px;

    .iconContent {
      padding: 8px;
      background: #ffffff10;
      border-radius: 50%;
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
    left: 0;
    background: #ffffff10;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;

    .bottomLeft,
    .bottomRight {
      margin: auto 0;
    }
  }
}
</style>