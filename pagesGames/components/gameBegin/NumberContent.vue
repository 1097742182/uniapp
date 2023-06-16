<template>
  <view class="container">
    <number-content-item
      v-for="(item, index) in NumberList"
      :key="index"
      :value="item"
      :gameOver="gameOver"
      :viewIndex="index"
      @changeIndex="changeIndex"
      :actived="CurrentIndex === index"
    ></number-content-item>
  </view>
</template>

<script>
import NumberContentItem from "./NumberContentItem.vue";

export default {
  data() {
    return {
      // numberList: ["1", "2", "3", "4"],
      // currentIndex: 0
    };
  },
  props: {
    gameOver: { type: Boolean, default: false },
  },
  components: {
    NumberContentItem,
  },
  watch: {},
  methods: {
    changeIndex(i) {
      uni.$u.vuex("CurrentIndex", i);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  border: 1px solid #a96fa9;
  border-radius: 5px;
  margin: 6px 30px;
  background: linear-gradient(90deg, #3b5dba, #7c78b8);
  background-repeat: repeat-y;
}
</style>