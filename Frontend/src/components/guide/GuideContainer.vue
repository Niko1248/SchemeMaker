<template>
  <div class="guide_container transition">
    <div class="close" @click="toggleGuidePopup">✖</div>
    <step1 />
    <div class="gitdes__btns">
      <div class="btn--next">назад</div>
      <div class="btn--down">далее</div>
    </div>
  </div>
</template>

<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData.js"
import step1 from "../guide/Step_1.vue"

const schemeDataStore = useSchemeDataStore()

// Функция для открытия попапа Гайд
const toggleGuidePopup = () => {
  schemeDataStore.toggleGuidePopup(!schemeDataStore.guidePopup)
}
</script>

<style scoped>
.guide_container {
  box-sizing: border-box;
  width: 70vw;
  height: 80svh;
  background: #74b0b055;
  border-radius: 15px;
  box-shadow: 0px 40px 50px #0000007a;
  z-index: 100;
  position: absolute;
  left: 15vw;
  top: 10svh;
  backdrop-filter: blur(35px);
  padding: 3vw 4vw;
}

.close {
  color: #fff;
  font-size: 1.4vw;
  position: absolute;
  right: 10px;
  top: 10px;
  transition: 0.3s ease;

  &:hover {
    transition: 0.3s ease;
    filter: drop-shadow(0px 0px 5px #fff);
  }
}
.transition {
  transform: scale(0);
  animation: transition 0.5s ease forwards;
}
@keyframes transition {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.gitdes__btns {
  position: absolute;
  width: calc(100% - 6vw);
  bottom: 1vw;
  right: 3vw;
  display: flex;
  justify-content: space-between;
  font-family: WixMadeforDisplay-Regular;

  div {
    background: #072422a4;
    border-radius: 10px;
    margin-left: 1vw;
    color: #fff;
    padding: 0.2vw 0 0.5vw 0;
    width: 7vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2vw;
    line-height: 120%;
    transition: 0.3s ease;

    cursor: url(../../public/cursor-pointer.png), auto;
    &:hover {
      transition: 0.2s ease;
      background: #091112bb;
    }
  }
}
</style>
