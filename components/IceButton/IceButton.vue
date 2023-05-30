<template>
  <view class="IceButton">
    <button
      @click="ButtonClick()"
      v-if="buttonType === 'fire'"
      class="button fire"
    >
      {{ buttonText }}
    </button>

    <button
      @click="ButtonClick()"
      v-if="buttonType === 'ice'"
      class="button ice"
    >
      {{ buttonText }}
    </button>

    <button
      @click="disabledButtonClick()"
      v-if="buttonType === 'disabled'"
      class="button disabled"
    >
      {{ buttonText }}
    </button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    buttonType: { type: String, default: "ice" },
    buttonText: { type: String, default: "ICE" },
  },
  methods: {
    ButtonClick() {
      this.$emit("click");
    },
    disabledButtonClick() {
      if (this.buttonText === "第二关") {
        uni.$showMsg("当前关卡需要积分200分");
      }

      if (this.buttonText === "第三关") {
        uni.$showMsg("当前关卡需要积分500分");
      }

      if (this.buttonText === "第四关") {
        uni.$showMsg("当前关卡需要积分800分");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  border: 1px solid green;
  backdrop-filter: blur(10px);
  transform: skewX(-10deg);
  height: 50px;
  width: 100%;
  border-radius: 20px 5px 20px 0px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font: 15px sans-serif;
  font-weight: 300;
  text-shadow: 0 0 20px #fff;
  text-transform: uppercase;
  animation: breath2 2s 0.5s infinite alternate;
  transition: all 0.2s ease;
  cursor: pointer;
}
.button:before {
  content: "";
  display: block;
  width: calc(100% - 22px);
  height: calc(50px - 8px);
  animation: breath 2s infinite alternate;
  left: 10px;
  top: 3px;
  position: absolute;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 15px 3px 15px 3px;
}
.button.fire {
  border-color: #ffeca8;
  background-image: linear-gradient(
    to bottom,
    rgba(161, 161, 161, 1),
    rgba(240, 96, 29, 0.6)
  );
  box-shadow: 0 0 70px rgba(255, 138, 48, 0.6),
    0 5px 20px rgba(255, 138, 48, 0.6), inset 0 1px #ffeca8,
    inset 0 -1px #ffeca8;
  color: #ffeca8;
}
.button.fire:before {
  box-shadow: inset 0 0 30px 0 #ffeca8;
}

.button.disabled {
  border-color: #ffeca8;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(5, 5, 5, 0.6)
  );
  box-shadow: 0 0 70px rgba(0, 0, 0, 0.6), 0 5px 20px rgba(0, 0, 0, 0.6),
    inset 0 1px #ffeca8, inset 0 -1px #ffeca8;
  color: #ffeca8;
}
.button.disabled:before {
  box-shadow: inset 0 0 30px 0 #ffeca8;
}

.button.ice {
  border-color: #a8ecff;
  background-image: linear-gradient(
    to bottom,
    rgba(48, 138, 255, 0.5),
    rgba(29, 96, 240, 0.5)
  );
  box-shadow: 0 0 70px rgba(48, 138, 255, 0.5),
    0 5px 20px rgba(48, 138, 255, 0.5), inset 0 1px #ffeca8,
    inset 0 -1px #ffeca8;
  color: #ffffff;
}
.button.ice:before {
  box-shadow: inset 0 0 30px 0 #a8ecff;
}
.button:hover.fire {
  box-shadow: 0 0 70px rgba(255, 138, 48, 0.8),
    0 5px 20px rgba(255, 138, 48, 0.8), inset 0 1px #ffeca8,
    inset 0 -1px #ffeca8;
}
.button:hover.fire:before {
  box-shadow: inset 0 0 50px 0 #ffeca8;
}
.button:hover.ice {
  box-shadow: 0 0 70px rgba(48, 138, 255, 0.8),
    0 5px 20px rgba(48, 138, 255, 0.8), inset 0 1px #a8ecff,
    inset 0 -1px #a8ecff;
}
.button:hover.ice:before {
  box-shadow: inset 0 0 50px 0 #a8ecff;
}
.button + .button {
  margin-top: 15px;
  animation-delay: 0.3s;
}

@keyframes breath {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0.95);
  }
}

@keyframes breath2 {
  0% {
    transform: skewX(-10deg) scaleX(1);
  }
  100% {
    transform: skewX(-10deg) scaleX(0.95);
  }
}

.ref {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 3px;
  padding: 5px 8px;
  position: absolute;
  font-size: 16px;
  bottom: 10px;
  right: 10px;
  color: #fff;
  font-weight: 300;
  font-family: sans-serif;
  text-decoration: none;
}
.ref::first-letter {
  font-size: 12px;
}
</style>