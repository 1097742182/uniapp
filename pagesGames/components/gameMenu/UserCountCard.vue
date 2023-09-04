<template>
  <view class="UserCountCard">
    <view class="left">
      <view class="leftTitle">我的积分</view>
      <view class="UserCount">
        {{ UserCount }}
        <span style="font-size: 18px; margin-left: 10px">{{ getUserLevelName() }}</span>
      </view>
    </view>
    <view class="right">
      <view class="iconContent" :class="{ rotate: isRotating }" @click="reloadBtnClick()">
        <u-icon name="reload" color="#ffffff" size="32"></u-icon>
      </view>
    </view>

    <view class="bottom">
      <slot name="bottom">
        <view class="bottomLeft" @tap="checkRankBtnClick()">
          <view style="display: inline-block">我的排名：</view>
          <view style="display: inline-block; border-bottom: 1px solid; padding: 1px 3px">{{ UserRank }}</view>
        </view>
        <view class="bottomRight">
          <view @click="countMallBtnClick()" class="linkItem">积分商城 ></view>
        </view>
      </slot>
    </view>

    <view class="screen_background">
      <view class="screen_background_shape1"></view>
      <view class="screen_background_shape2"></view>
    </view>
  </view>
</template>

<script>
import rankDetailVue from "pagesGames/rankDetail.vue";
export default {
  data() {
    return {
      UserRank: "",
      isRotating: false,
    };
  },

  mounted() {
    this._initUserRank();
  },
  methods: {
    async _initUserRank() {
      if (this.UserCount < 100) return (this.UserRank = "999+");
      if (!this.OpenId) return (this.UserRank = "999+");

      const getRankRes = await this.$api.user.getRank(this.OpenId);
      this.UserRank = getRankRes.rank || "-";
    },
    reloadBtnClick() {
      this.isRotating = true; // 改变 isRotating 状态，标记为正在旋转
      setTimeout(() => {
        this.isRotating = false; // 2 秒钟后标记为停止旋转
        uni.$showMsg("用户积分已更新");
      }, 1000);
      const userCount = uni.getStorageSync("UserCount");
      this.$store.commit("SET_UserCount", userCount);
    },
    // 积分商城按钮点击
    countMallBtnClick() {
      this.$Router.push({ name: "countMall", params: {} });
    },
    // 查看排名按钮点击
    checkRankBtnClick() {
      let pages = getCurrentPages(); //获取当前页面信息栈
      const currentPage = pages[pages.length - 1];
      if (currentPage.route != "pagesGames/rankDetail") this.$Router.push({ name: "rankDetail", params: {} });
    },
    getUserLevelName() {
      if (this.UserCount < 1000) return "实习探员";
      if (this.UserCount > 1000 && this.UserCount < 3000) return "探员";
      if (this.UserCount > 3000 && this.UserCount < 8000) return "副探长";
      if (this.UserCount > 8000) return "探长";
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

  // background: #406de4;
  // background-image: linear-gradient(90deg, #8e6 10%, rgba(0, 0, 0, 0) 10%);
  background: linear-gradient(90deg, #406de4, #7c78b8);
  background-repeat: repeat-y;

  display: flex;
  justify-content: space-between;

  .left {
    flex: 1;
    z-index: 10;

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
    z-index: 10;

    .iconContent {
      padding: 8px;
      background: #ffffff10;
      border-radius: 50%;
    }
  }

  .bottom {
    position: absolute;
    z-index: 10;
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

    .bottomLeft {
      margin: auto 0;
      overflow: hidden;
    }

    .bottomRight {
      margin: auto 0;
      overflow: hidden;
      position: relative;
      width: 200px;
      height: 40px;
      display: flex;
      justify-content: end;

      .linkItem {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}

.screen_background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  .screen_background_shape1 {
    height: 200px;
    width: 200px;
    background: #7e7bb9;
    top: -105px;
    right: -44px;
    border-radius: 60px;
    z-index: 0;

    transform: rotate(45deg);
    position: absolute;
  }

  .screen_background_shape2 {
    height: 100px;
    width: 100px;
    background: #5ca6f34d;
    top: -50px;
    left: -14px;
    border-radius: 50%;
    z-index: 0;

    transform: rotate(45deg);
    position: absolute;
  }
}

.rotate {
  animation: rotate 0.5s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
