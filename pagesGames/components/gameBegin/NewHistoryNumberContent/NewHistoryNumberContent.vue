<template>
  <view class="HistoryNumberContent" :style="'height:' + contentHeight">
    <new-history-number-content-item
      v-for="item in countList"
      :value="item"
      :key="item"
      class="contentItem"
    />
  </view>
</template>

<script>
import NewHistoryNumberContentItem from "./NewHistoryNumberContentItem.vue";

export default {
  data() {
    return {
      countList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      contentHeight: "320px",
    };
  },
  props: {
    secondHistory: { type: Boolean, default: false },
  },
  computed: {
    currentLevelNumberResultShowState() {
      return this.CurrentLevelNumberResultShow;
    },
  },
  watch: {
    currentLevelNumberResultShowState() {
      this.contentHeight = "400px";
    },
  },

  mounted() {
    // 根据传入的count对countList进行分隔
    const count = this.HistoryNumberCount;
    this.countList = this.countList.slice(0, count);

    if (this.secondHistory) this.countList = this.countList.map((item) => item + count);
  },
  components: {
    NewHistoryNumberContentItem,
  },
};
</script>

<style lang="scss" scoped>
.HistoryNumberContent {
  height: 320px;
  border: 1px solid red;
  margin: 0 10px;
  padding: 10px;
  border-radius: 5px;
  padding-bottom: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  max-height: 440px;
  overflow: auto;
}

.contentItem {
  width: 80%;
}
</style>