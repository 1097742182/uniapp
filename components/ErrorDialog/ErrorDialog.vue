<template>
  <div class="container">
    <div class="error-box">
      <div class="dot"></div>
      <div class="dot two"></div>
      <div class="face2">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="shadow move"></div>
      <div class="message">
        <h1 class="alert">Sorry! 你可能掉进坑里了</h1>
        <h1 class="alert">让我们看看答案吧！</h1>
      </div>
      <button class="button-box" @click="confirmBtnClick()">
        <h1 class="red">查看答案</h1>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirmBtnClick() {
      this.$emit("confirmBtnClick");
    },
  },
};
</script>

<style lang="scss" scoped>
$white: #fcfcfc;
$gray: #cbcdd3;
$dark: #777777;
$error: #ef8d9c;
$orange: #ffc39e;
$success: #b0db7d;
$secondary: #99dbb4;

html {
  display: grid;
  min-height: 100%;
}

body {
  display: grid;
  overflow: hidden;
  text-transform: uppercase;
  text-align: center;
}

.container {
  position: relative;
  margin: auto;
  overflow: hidden;
  width: 270px;
  height: 250px;
}

h1 {
  font-size: 0.9em;
  font-weight: 100;
  letter-spacing: 3px;
  color: $white;
  padding-bottom: 5px;
  text-transform: uppercase;
}

.green {
  color: darken($secondary, 20%);
}

.red {
  color: darken($error, 10%);
}

.alert {
  font-weight: 700;
  letter-spacing: 5px;
}

p {
  margin-top: -5px;
  font-size: 0.5em;
  font-weight: 100;
  color: darken($dark, 10%);
  letter-spacing: 1px;
}

button,
.dot {
  cursor: pointer;
}

.error-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom left, $error 40%, $orange 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba($gray, 10%);
}

.dot {
  width: 8px;
  height: 8px;
  background: $white;
  border-radius: 50%;
  position: absolute;
  top: 4%;
  right: 6%;
  &:hover {
    background: darken($white, 20%);
  }
}

.two {
  right: 12%;
  opacity: 0.5;
}

.face {
  position: absolute;
  width: 22%;
  height: 22%;
  background: $white;
  border-radius: 50%;
  border: 1px solid $dark;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: bounce 1s ease-in infinite;
}

.face2 {
  position: absolute;
  width: 22%;
  height: 22%;
  background: $white;
  border-radius: 50%;
  border: 1px solid $dark;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: roll 3s ease-in-out infinite;
}

.eye {
  position: absolute;
  width: 5px;
  height: 5px;
  background: $dark;
  border-radius: 50%;
  top: 40%;
  left: 20%;
}

.right {
  left: 68%;
}

.mouth {
  position: absolute;
  top: 43%;
  left: 41%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.happy {
  border: 2px solid;
  border-color: transparent $dark $dark transparent;
  transform: rotate(45deg);
}

.sad {
  top: 49%;
  border: 2px solid;
  border-color: $dark transparent transparent $dark;
  transform: rotate(45deg);
}

.shadow {
  position: absolute;
  width: 21%;
  height: 3%;
  opacity: 0.5;
  background: $dark;
  left: 40%;
  top: 43%;
  border-radius: 50%;
  z-index: 1;
}

.scale {
  animation: scale 1s ease-in infinite;
}
.move {
  animation: move 3s ease-in-out infinite;
}

.message {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 40%;
  top: 47%;
}

.button-box {
  position: absolute;
  background: $white;
  width: 50%;
  height: 15%;
  border-radius: 20px;
  top: 73%;
  left: 25%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba($dark, 0.5);
  transition: all 0.5s ease-in-out;
  &:hover {
    background: darken($white, 5%);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
}

@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale {
  50% {
    transform: scale(0.9);
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}

@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}

footer {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 1em;
  text-transform: uppercase;
  padding: 10px;
  p {
    color: $error;
    letter-spacing: 2px;
  }
  a {
    color: $success;
    text-decoration: none;
    &:hover {
      color: $orange;
    }
  }
}
</style>