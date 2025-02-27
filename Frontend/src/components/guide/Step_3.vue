<template>
  <div class="step step-3">
    <div class="screenshot_wrapper">
      <iframe
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const videoUrl = ref("https://rutube.ru/video/embed/b6488c1cee0d2b7742748590af572bfa")
</script>

<style scoped>
.screenshot_wrapper {
  overflow: hidden;
  height: 60vh;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.screenshot_wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.play-button {
  font-size: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
