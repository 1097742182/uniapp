<template>
  <view class="UserInfo">
    <view class="left" style="display: flex" @click="resetUserCount()">
      <image :src="avatarUrl" class="userAvatal"> </image>
      <view style="margin-left: 10px">
        <view class="nickName">{{ nickName }}</view>
        <view class="tips">欢迎使用，祝您玩的开心</view>
      </view>
    </view>

    <view class="right">
      <view class="tag" @click="personalCenterClick()">个人中心</view>
      <!-- <text class="userCount">用户积分：{{ UserCount }}</text> -->
    </view>
  </view>
</template>

<script>
let avatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

export default {
  data() {
    return {
      avatarUrl: uni.getStorageSync("avatarUrl") || avatarUrl,
      nickName: uni.getStorageSync("nickName") || "",
    };
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    resetUserCount() {
      this.$store.commit("SET_UserCount", 100);
      uni.setStorageSync("UserCount", 100);
    },
    personalCenterClick() {
      this.$Router.push({ name: "personalCenter", params: {} });
    },
  },
};
</script>

<style lang="scss" scoped>
.UserInfo {
  padding: 10px 0px;
  margin: 10px;
  margin-top: 0;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;

  .left {
    flex: 1;

    .userAvatal {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .nickName {
      height: 35px;
      line-height: 35px;
      font-size: 20px;
      display: inline-block;
      color: #0e1019;
      font-weight: bold;
    }

    .tips {
      color: #aaaaaa;
      font-size: 12px;
    }
  }

  .right {
    margin: auto;

    .tag {
      border: 1px solid #406de4;
      padding: 4px 12px;
      border-radius: 20px;
      color: #406de4;
    }
    .userCount {
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      display: inline-block;
      color: #606266;
    }
  }
}
</style>