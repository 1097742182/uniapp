<template>
  <view
    @click="emitIndex()"
    :class="{ inputClass: true, isActived: actived }"
  >
    {{ value }}
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: { type: String },
    viewIndex: { type: Number },
    actived: { type: Boolean, default: false },
    gameOver: { type: Boolean, default: false },
  },
  methods: {
    emitIndex() {
      this.$emit("changeIndex", this.viewIndex);
    },
    getRightBackground() {
      if (this.gameOver) return { background: "#27ef27" };
    },
  },
};
</script>

<style>
.inputClass {
  border: 1px solid #999999;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  font-size: 24px;
  border-radius: 5px;
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
}

.isActived {
  background-color: lightblue;
}
</style>