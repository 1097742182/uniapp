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
  // border: 1px solid #a96fa9;
  border-radius: 5px;
  margin: 6px 30px;

  // background: radial-gradient(circle, rgb(207, 107, 170) 0%, rgb(247, 150, 192) 100%);
  // box-shadow: 0px 3px 3px #e0b6de, 0px -3px 3px #e6c9e4, inset 0px -1px 3px #e2cfe1;

  background: linear-gradient(0deg, rgba(0, 172, 238, 1) 0%, rgb(40, 131, 221) 100%);
}
</style>