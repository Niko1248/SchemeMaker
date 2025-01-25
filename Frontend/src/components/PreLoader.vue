<template>
  <div class="preloader">
    <Vue3Lottie :animationData="currentAnimationData" :loop="false" :height="1080" :width="1920" :autoPlay="true" />
  </div>
</template>

<script setup>
import { ref } from "vue"
import { Vue3Lottie } from "vue3-lottie"
import Preloader from "./../assets/animation/Preloader.json"

const currentAnimationData = ref(Preloader)
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
  height: 100svh;
  z-index: 999;
  background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(57, 113, 110, 1) 100%);
  animation: exit 1s ease-in forwards;
  animation-delay: 1s;
  overflow: hidden;
}
@keyframes exit {
  0% {
    opacity: 1;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    display: none;
  }
}
.lottie-animation-container {
  width: 97vw !important;
  height: 46vw !important;
}
</style>
