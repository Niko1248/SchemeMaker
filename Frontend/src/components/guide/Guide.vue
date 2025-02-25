<template>
  <div class="guide_container transition">
    <div class="close" @click="toggleGuidePopup">✖</div>
    <template v-for="(step, index) in steps" :key="index">
      <component v-if="schemeDataStore.currentStepGuide === index + 1" :is="step.component" />
    </template>
    <div
      class="guides__btns"
      :style="{ justifyContent: schemeDataStore.currentStepGuide !== 1 ? 'space-between' : 'flex-end' }"
    >
      <div class="btn-guide" v-if="schemeDataStore.currentStepGuide !== 1" @click="schemeDataStore.backStepGuide">
        Назад
      </div>
      <div class="btn-guide" v-if="schemeDataStore.currentStepGuide !== 6" @click="schemeDataStore.nextStepGuide">
        Далее
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData.js"
import Step1 from "./Step_1.vue"
import Step2 from "./Step_2.vue"
import Step3 from "./Step_3.vue"
import Step4 from "./Step_4.vue"
import Step5 from "./Step_5.vue"
import Step6 from "./Step_6.vue"

const schemeDataStore = useSchemeDataStore()

const steps = [
  { component: Step1 },
  { component: Step2 },
  { component: Step3 },
  { component: Step4 },
  { component: Step5 },
  { component: Step6 },
]

// Функция для открытия попапа Гайд
const toggleGuidePopup = () => {
  schemeDataStore.toggleGuidePopup(!schemeDataStore.guidePopup)
}
</script>

<style scoped>
.guide_container {
  box-sizing: border-box;
  width: 65vw;
  height: 80vh;
  background: #74b0b055;
  border-radius: 15px;
  box-shadow: 0px 40px 50px #0000007a;
  z-index: 100;
  position: absolute;
  left: 17.5vw;
  bottom: 10vh;
  backdrop-filter: blur(35px);
  padding: 4vw 2vw;
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
.guides__btns {
  position: absolute;
  width: calc(100% - 4vw);
  bottom: 1.5vw;
  right: 2vw;
  display: flex;
  justify-content: space-between;
  font-family: WixMadeforDisplay-Regular;

  div {
    background: #072422a4;
    border-radius: 10px;
    color: #fff;
    padding: 0.3vw 0 0.7vw 0;
    width: 7vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2vw;
    line-height: 120%;
    transition: 0.3s ease;

    cursor: url(/cursor-pointer.png), auto;
    &:hover {
      transition: 0.2s ease;
      background: #091112bb;
    }
  }
}
</style>
