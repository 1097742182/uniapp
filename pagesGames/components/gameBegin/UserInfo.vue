<template>
  <view class="UserInfo">
    <view class="left" style="display: flex">
      <image :src="avatarUrl" class="userAvatal"> </image>
      <view class="nickName" style="margin-left: 10px"> {{ nickName }} </view>
    </view>

    <view class="right">
      <text class="userCount">关卡积分：{{ LevelCount }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      nickName: "",
    };
  },
  mounted() {
    this._initUserInfo();
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
  },
};
</script>

<style lang="scss" scoped>
.UserInfo {
  background: #63a2e6;

  background: radial-gradient(circle, rgb(207, 107, 170) 0%, rgb(247, 150, 192) 100%);
  // box-shadow: 0px 3px 3px #e0b6de, 0px -3px 3px #e6c9e4, inset 0px -1px 3px #e2cfe1;

  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);

  padding: 10px 20px;
  margin: 10px;
  margin-top: 0;
  border-radius: 16px;
  display: flex;
  justify-content: space-between;

  .userAvatal {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .nickName {
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    display: inline-block;
    color: #ffffff;
  }

  .userCount {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    display: inline-block;
    color: #ffffff;
  }
}
</style>