<script>
import { mapActions } from "vuex";

export default {
  onLaunch: function () {
    console.log("App Launch");
    this.createMusicPlayer();
    this.$store.commit("setMusicPlayStatus", true);
  },
  onShow: function () {
    if (this.$store.state.MusicPlayer) {
      // this.$store.state.MusicPlayer.play();
    }
  },
  onHide: function () {
    // console.log('App Hide')
  },
  methods: {
    ...mapActions(["createMusicPlayer"]),
  },
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
</style>