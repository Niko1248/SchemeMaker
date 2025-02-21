<template>
  <div class="step step-3">
    <div class="screenshot_wrapper">
      <img class="guide-screenshot" src="../../assets/img/screenshot/step3.png" alt="" srcset="" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.screenshot_wrapper {
  overflow: hidden;
  width: 100%;
}
.guide-screenshot {
  width: 100%;
  animation: screenshot-scale 1s ease-in-out forwards;
  animation-delay: 3s;
}
@keyframes screenshot-scale {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(2);
    object-fit: cover; /* Сохраняем пропорции изображения */
    transform-origin: top; /* Указываем точку масштабирования (верхний центр) */
  }
}
</style>
