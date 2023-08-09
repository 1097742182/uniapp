<template>
  <view class="music-icon" :class="isRotate" @click="changeMusicStatus()" ref="musicIcon" id="musicIcon">
    <img class="svg-icon" src="./music.svg" />
  </view>
</template>

<script>
export default {
  data() {
    return {
      isRotate: "",
    };
  },
  computed: {
    musicPlayStatus() {
      return this.MusicPlayStatus;
    },
  },
  watch: {
    musicPlayStatus: {
      handler() {
        this._initMusicRotate();
      },
    },
  },
  mounted() {
    this._initMusicRotate();
  },
  methods: {
    _initMusicRotate() {
      if (this.musicPlayStatus) {
        this.isRotate = "rotate";
      } else {
        this.isRotate = "";
      }
    },
    changeMusicStatus() {
      if (this.MusicPlayStatus) {
        this.MusicPlayer.pause();
        this.$store.commit("setMusicPlayStatus", false);
      } else {
        this.$store.commit("setMusicPlayStatus", true);
        this.MusicPlayer.play();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.music-icon {
  width: 30px;
  height: 30px;
  color: #3c9cff;
  // transition: transform 0.5s linear;
}

.svg-icon {
  width: 100%;
  height: 100%;
}

.rotate {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>