<template>
  <view @click="emitIndex()" class="inputClass" :class="{ isActived: actived, rightColor: gameOver }">
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
  },
};
</script>

<style>
.inputClass {
  border: 1px solid #999999;
  width: 100%;
  max-width: 50px;
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

.rightColor {
  background-color: #27ef27 !important;
}
</style>
