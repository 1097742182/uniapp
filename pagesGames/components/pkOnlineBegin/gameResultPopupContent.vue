<template>
  <view>
    <!-- 成功的dialog展示 -->
    <u-popup
      :show="successDialogShow"
      :round="30"
      mode="center"
      :closeOnClickOverlay="false"
      @close="successDialogShow = false"
      :safeAreaInsetBottom="false"
    >
      <success-dialog @comfirmBtnClick="successDialogShow = false" />
    </u-popup>

    <!-- 失败的dialog展示 -->
    <u-popup
      :show="errorDialogShow"
      :round="30"
      mode="center"
      :closeOnClickOverlay="false"
      @close="errorDialogShow = false"
      :safeAreaInsetBottom="false"
    >
      <error-dialog @confirmBtnClick="errorDialogShow = false" />
    </u-popup>
  </view>
</template>

<script>
import SuccessDialog from "@/components/SuccessDialog/SuccessDialog.vue";
import ErrorDialog from "@/components/ErrorDialog/ErrorDialog.vue";

export default {
  data() {
    return {
      successDialogShow: false,
      errorDialogShow: false,
    };
  },
  components: {
    SuccessDialog,
    ErrorDialog,
  },
  methods: {
    success() {
      this.successDialogShow = true;
    },
    error() {
      this.errorDialogShow = true;
    },
  },
};
</script>

<style>
</style>