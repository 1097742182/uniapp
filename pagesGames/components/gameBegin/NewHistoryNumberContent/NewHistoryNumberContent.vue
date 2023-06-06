<template>
  <view class="HistoryNumberContent">
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
    };
  },

  mounted() {
    // 根据传入的count对countList进行分隔
    const count = this.HistoryNumberCount;
    this.countList = this.countList.slice(0, count);
  },
  components: {
    NewHistoryNumberContentItem,
  },
};
</script>

<style>
.HistoryNumberContent {
  /* height: 300px; */
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