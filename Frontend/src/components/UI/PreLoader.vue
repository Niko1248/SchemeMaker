<template>
  <div v-if="showPreloader" class="preloader">
    <Vue3Lottie
      :animationData="currentAnimationData"
      :loop="false"
      :height="1080"
      :width="1920"
      :autoPlay="true"
      @onComplete="hidePreloader"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Vue3Lottie } from "vue3-lottie"
import Preloader from "../../assets/animation/Preloader.json"

const currentAnimationData = ref(Preloader)
const showPreloader = ref(true)

const hidePreloader = () => {
  setTimeout(() => {
    showPreloader.value = false
  }, 2000)
}
</script>

<style lang="scss">
.preloader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(57, 113, 110, 1) 100%);
  animation: exit 1s ease-in forwards;
  animation-delay: 4.5s;
  overflow: hidden;
}

@keyframes exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    z-index: -1;
  }
}
</style>
