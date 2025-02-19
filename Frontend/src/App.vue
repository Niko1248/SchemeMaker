<template>
  <SchemeMaker />
  <Preloader />
  <Guide />
</template>

<script setup>
import SchemeMaker from "./components/SchemeMaker.vue"
import Preloader from "./components/UI/PreLoader.vue"
import Guide from "./components/UI/Guide.vue"

document.addEventListener(
  "wheel",
  (event) => {
    if (event.ctrlKey) {
      event.preventDefault() // Запрещаем зум при использовании колеса мыши
    }
  },
  { passive: false }
)

document.addEventListener("gesturestart", (event) => {
  event.preventDefault() // Запрещаем зум на сенсорных устройствах
})

document.addEventListener("gesturechange", (event) => {
  event.preventDefault() // Запрещаем зум на сенсорных устройствах
})

document.addEventListener("gestureend", (event) => {
  event.preventDefault() // Запрещаем зум на сенсорных устройствах
})
</script>

<style scoped></style>
