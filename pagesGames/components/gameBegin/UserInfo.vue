<template>
  <view class="UserInfo" :class="backgroundType">
    <view class="left" style="display: flex">
      <image :src="avatarUrl" class="userAvatal"> </image>
      <view class="nickName" style="margin-left: 10px"> {{ nickName }} </view>
    </view>

    <!-- 如果不是PK界面，则展示关卡积分 -->
    <view class="right" v-if="!PKLevelStatus">
      <text class="userCount">关卡积分：{{ LevelCount }}</text>
    </view>

    <!-- 如果是PK界面，则展示时间计算 -->
    <view class="right" v-if="PKLevelStatus">
      <view class="userCount">关卡用时：<time-record-vue /> </view>
    </view>
  </view>
</template>

<script>
import TimeRecordVue from "components/TimeRecord/TimeRecord.vue";

export default {
  data() {
    return {
      avatarUrl: "",
      nickName: "",
      levelTime: 0,
    };
  },
  props: {
    backgroundType: { type: String, default: "blueBackground" },
  },
  components: {
    TimeRecordVue,
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
    font-size: 22px;
    display: inline-block;
    color: #ffffff;
  }

  .userCount {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    display: inline-block;
    color: #ffffff;
  }
}

.blueBackground {
  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}

.redBackground {
  background: linear-gradient(0deg, rgb(215, 138, 138) 0%, rgb(225, 89, 89) 100%);
}
</style>