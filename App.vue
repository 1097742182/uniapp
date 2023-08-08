<script>
import { mapActions } from "vuex";

export default {
  onLaunch: function () {
    console.log("App Launch");
    this.createMusicPlayer();
  },
  onShow: function () {
    if (this.$store.state.musicPlayer) {
      // this.$store.state.musicPlayer.play();
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