<template>
  <view class="UserInfo">
    <view class="left" style="display: flex">
      <button type="balanced" open-type="chooseAvatar" @chooseavatar="onChooseavatar" class="avatarImage">
        <image :src="avatarUrl" class="userAvatal"> </image>
      </button>
      <view style="margin-left: 10px">
        <view class="nickName">{{ nickName }}</view>
        <view class="tips" @click="resetUserCount()">欢迎使用，祝您玩的开心</view>
      </view>
    </view>

    <view class="right">
      <view class="tag" @click="personalCenterClick()">个人中心</view>
      <!-- <text class="userCount">用户积分：{{ UserCount }}</text> -->
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
  props: {
    resetStatus: { type: Boolean, default: true },
  },
  computed: {
    avatarUrlState() {
      return this.AvatarUrl;
    },
    nickNameState() {
      return this.NickName;
    },
  },
  watch: {
    avatarUrlState() {
      this._initUserInfo();
    },
    nickNameState() {
      this._initUserInfo();
    },
  },
  mounted() {
    this._initUserInfo();
  },
  methods: {
    _initUserInfo() {
      this.avatarUrl = this.AvatarUrl ? this.AvatarUrl : this.ErrorAvatarUrl;
      this.nickName = this.NickName || "";
    },
    resetUserCount() {
      this.$emit("resetBtnClick");
      if (!this.resetStatus) return; // 如果resetStatus为false，则直接返回，不执行后面操作

      uni.showModal({
        cancelText: "取消", // 取消按钮的文字
        confirmText: "确认", // 确认按钮文字
        title: "提示",
        content: "是否重置积分以及关卡?",
        confirmColor: "#3B8BFF",
        cancelColor: "#222222",
        success: (res) => {
          if (res.confirm) {
            this.$store.commit("SET_UserCount", 100);
            this.$store.commit("SET_LevelStep", 1);
            this.$store.commit("SET_HardLevelStep", 1);
            uni.setStorageSync("UserCount", 100);
            uni.setStorageSync("LevelStep", 1);
          } else if (res.cancel) {
            // 取消
            console.log("cancel");
          }
        },
      });
    },
    personalCenterClick() {
      this.$Router.push({ name: "personalCenter", params: {} });
    },
    onChooseavatar(e) {
      this.avatarUrl = e.detail.avatarUrl;
      if (this.avatarUrl) {
        uni.setStorageSync("avatarUrl", this.avatarUrl);
        this.$store.commit("SET_AvatarUrl", this.avatarUrl);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.UserInfo {
  padding: 10px 0px;
  margin: 10px;
  margin-top: -10px;
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

.avatarImage {
  padding: 0;
  height: 100%;
  margin: 0;
  border: 0;
  line-height: 1;
  background: #ffffff00;
  border-radius: 50%;
}
</style>