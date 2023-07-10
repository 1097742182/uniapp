<template>
  <view class="startGameMessageBox">
    <MessageBox ref="startGame">
      <view slot="body" class="content">
        <view class="user1"> </view>
        <view class="user2"></view>
      </view>
    </MessageBox>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$refs.startGame.open();
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
}
</style>