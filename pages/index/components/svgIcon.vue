<template>
  <div class="music-icon" @click="changeMusicStatus()" ref="musicIcon" id="musicIcon">
    <svg
      t="1691509346479"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4918"
      width="30"
      height="30"
    >
      <path
        d="M512 910.2336c-219.5456 0-398.2336-178.688-398.2336-398.2336S292.4544 113.7664 512 113.7664 910.2336 292.4544 910.2336 512 731.5456 910.2336 512 910.2336m0-853.2992c-251.2896 0-455.0656 203.776-455.0656 455.0656s203.776 455.0656 455.0656 455.0656 455.0656-203.776 455.0656-455.0656S763.2896 56.9344 512 56.9344m-49.7664 682.5984H391.168c-27.4432 0-49.7664-22.3232-49.7664-49.7664S363.7248 640 391.168 640h71.0656c27.4432 0 49.7664 22.3232 49.7664 49.7664s-22.3232 49.7664-49.7664 49.7664M673.6896 300.032l-116.4288-67.1744c-4.4032-3.072-9.4208-5.3248-15.1552-5.3248h-3.1744c-13.7216 0-24.576 10.4448-26.2144 23.6544-0.1024 0.7168-0.3072 1.2288-0.3072 1.8432-0.1024 0.4096-0.3072 0.8192-0.3072 1.3312V595.968c-14.9504-7.9872-31.6416-12.9024-49.7664-12.9024h-71.0656c-58.88 0-106.7008 47.8208-106.7008 106.7008s47.8208 106.7008 106.7008 106.7008h71.0656c58.88 0 106.7008-47.8208 106.7008-106.7008 0-2.4576-0.6144-4.7104-0.7168-7.0656h0.7168V305.2544l76.3904 44.1344c4.3008 2.4576 9.216 3.7888 14.1312 3.7888 9.8304 0 19.3536-5.12 24.6784-14.2336 7.68-13.6192 3.072-31.0272-10.5472-38.912"
        fill="#3c9cff"
        p-id="4919"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotateDeg: 0,
    };
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query
      .select("#musicIcon")
      .boundingClientRect((data) => {
        console.log("得到布局位置信息" + JSON.stringify(data));
        console.log("节点离页面顶部的距离为" + data.top);
      })
      .exec();

    setInterval(() => {
      this.rotateDeg += 10;

      // let icon = document.querySelector(".music-icon");
      // let icon = this.$el.querySelector(".music-icon");
      // console.log(icon);
      // icon.style.transform = `rotate(${this.rotateDeg}deg)`;
    }, 100);
  },
  methods: {
    changeMusicStatus() {
      if (this.$store.state.musicPlayer) {
        this.$store.commit("setMusicPlayer", "");
      } else {
        this.$store.dispatch("createMusicPlayer");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.music-icon {
  position: absolute;
  right: 10px;
  top: 150px;
  width: 30px;
  height: 30px;
  // transition: transform 0.5s linear;
}
</style>