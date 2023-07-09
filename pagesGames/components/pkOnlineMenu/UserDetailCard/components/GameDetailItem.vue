<template>
  <view class="GameDetailItem">
    <text style="font-size: 18px">{{ gameDetail.value }}</text>
    <text style="font-size: 14px">{{ gameDetail.content }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    gameDetail: { type: Object },
  },
};
</script>

<style lang="scss" scoped>
.GameDetailItem {
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 55px;
}
</style>