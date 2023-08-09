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
      musicPlayer: null,
    };
  },
  components: {
    SuccessDialog,
    ErrorDialog,
  },
  mounted() {
    this._initGameWinMusic();
  },
  methods: {
    success() {
      this.successDialogShow = true;
      this.musicPlay();
    },
    error() {
      this.errorDialogShow = true;
    },
    _initGameWinMusic() {
      this.musicPlayer = uni.createInnerAudioContext();
      this.musicPlayer.loop = false;
      this.musicPlayer.volume = 0.2;
      this.musicPlayer.src = "https://www.xinyongji.com:9898/media/MP3/gameWin.MP3";
    },
    musicPlay() {
      this.musicPlayer.play();
    },
  },
};
</script>

<style>
</style>