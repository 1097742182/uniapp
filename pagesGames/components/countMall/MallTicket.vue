<template>
  <div class="demo">
    <div class="stamp stamp03">
      <div class="left">
        <p>杞小白官方旗舰店</p>
        <view class="saleMoneyContent">
          <span class="saleMoney">{{ ticketDetail.money }}.00</span>
        </view>
        <p class="saleTips">{{ ticketDetail.saleTips }}</p>
      </div>
      <div class="right" style="z-index: 10">
        <!-- <span class="rightTitle">有效期</span>
        <p>
          2015-08-13
          <br />
          2016-08-13
        </p> -->
        <p style="font-size: 16px">需{{ ticketDetail.needUserCount }}积分</p>
        <a @click="getTicketBtnClick()"> 立即兑换 </a>
      </div>
      <i></i>
    </div>

    <success-popup-vue v-if="popupShow" @hidePopup="popupShow = false" />
  </div>
</template>

<script>
import successPopupVue from "./successPopup.vue";

export default {
  data() {
    return {
      popupShow: false,
    };
  },
  props: {
    ticketDetail: {
      type: Object,
      default: () => ({
        money: 10,
        saleTips: "无门槛使用",
        needUserCount: 1000,
      }),
    },
  },
  components: { successPopupVue },
  methods: {
    getTicketBtnClick() {
      uni.showModal({
        title: "是否兑换优惠券？",
        content: "使用优惠券可享受更多优惠哦！",
        success: (res) => {
          if (res.confirm) {
            // setTimeout(() => (this.popupShow = true), 200);
            uni.$showMsg("网络异常，请稍后重试");
          } else if (res.cancel) {
            console.log("取消兑换");
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  width: 100%;
  margin: 0 auto;
}
.stamp * {
  padding: 0;
  margin: 0;
  list-style: none;
}

.stamp {
  width: 100%;
  height: 140px;
  padding: 0 10px;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  box-sizing: border-box;
}
.stamp:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  right: 10px;
  z-index: -1;
}

// i标签，是一个背景样式，斜向下的背景样式
.stamp i {
  position: absolute;
  left: 20%;
  top: 45px;
  height: 190px;
  width: 390px;
  background-color: rgba(255, 255, 255, 0.15);
  transform: rotate(-30deg);
}
.stamp .left {
  float: left;
  padding: 16px 15px;
  width: 220px;
  border-right: 2px dashed rgba(255, 255, 255, 0.3);
  text-align: left;
}

.stamp .left p {
  color: #fff;
  font-size: 16px;
  line-height: 21px;
}

.saleMoneyContent {
  display: flex;
  align-items: center;
  position: relative;

  // 销售金额
  .saleMoney {
    font-size: 40px;
    line-height: 50px;
    color: #fff;
    margin-right: 5px;
    margin-top: 10px;

    &::before {
      content: "￥";
      font-size: 34px;
    }

    &::after {
      content: "优惠券";
      position: absolute;
      bottom: -4px;
      width: 100px;
      font-size: 16px;
      margin-left: 4px;
    }
  }
}

.stamp .right {
  display: inline-block;
  padding: 21px 14px;
  width: 100px;
  vertical-align: text-bottom;
  font-size: 30px;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: initial;
  margin: auto;
}
.stamp .right p {
  font-size: 16px;
  margin-top: 15px;
}
.stamp03 {
  background: radial-gradient(transparent 0, transparent 5px, #7eab1e 5px);
  background-size: 15px 15px;
  background-position: 9px 3px;
}
.stamp03:before {
  background-color: #7eab1e;
}
.stamp03 .right {
  padding: 10px 6px 10px 12px;
  font-size: 24px;
}
.stamp03 .right p {
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 8px;
}
.stamp03 .right a {
  background-color: #fff;
  color: #333;
  font-size: 14px;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  display: block;
}
</style>