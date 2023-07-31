<template>
  <view class="TimeRecord">
    <text>{{ displayTime }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      intervalId: null,
    };
  },
  computed: {
    displayTime() {
      if (this.startTime && this.endTime) {
        const diff = new Date(this.endTime - this.startTime);
        const minutes = String(diff.getMinutes()).padStart(2, "0");
        const seconds = String(diff.getSeconds()).padStart(2, "0");
        return `${minutes}:${seconds}`;
      } else {
        return "00:00";
      }
    },
  },
  mounted() {
    uni.$on("$gameBegin", () => {
      this.startTimer();
    });

    uni.$on("$stopTimer", () => {
      this.stopTimer();
    });
  },
  methods: {
    startTimer() {
      if (!this.intervalId) {
        this.startTime = new Date();
        this.intervalId = setInterval(() => {
          this.endTime = new Date();
        }, 1000);
      }
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    resetTimer() {
      this.startTime = null;
    },
    getTimer() {
      const time = this.displayTime.replace(":00", ":01");
      return time;
    },
  },
};
</script>

<style lang="scss" scoped>
.TimeRecord {
  display: inline;
}
</style>