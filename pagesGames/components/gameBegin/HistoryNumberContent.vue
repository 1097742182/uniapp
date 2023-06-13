<template>
  <view class="HistoryNumberContent" :style="'height:' + contentHeight">
    <history-number-content-item
      v-for="item in countList"
      :value="item"
      :key="item"
      class="contentItem"
    ></history-number-content-item>
  </view>
</template>

<script>
import HistoryNumberContentItem from "./HistoryNumberContentItem.vue";

export default {
  data() {
    return {
      countList: Array.from({ length: 20 }, (_, index) => index), // 初始化0-19的数字
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
      this.contentHeight = "370px";
    },
  },
  mounted() {
    // 根据传入的count对countList进行分隔
    const count = this.HistoryNumberCount;
    this.countList = this.countList.slice(0, count);

    // 如果是二次机会，则需要加上count，作为index
    if (this.secondHistory) this.countList = this.countList.map((item) => item + count);
  },
  components: {
    HistoryNumberContentItem,
  },
};
</script>

<style>
.HistoryNumberContent {
  height: 320px;
  border: 1px solid red;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  padding-bottom: 0;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.contentItem {
  width: 48%;
}
</style>