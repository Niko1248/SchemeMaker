<template>
  <div class="step step-3">
    <div class="screenshot_wrapper">
      <img class="guide-screenshot" src="../../assets/img/screenshot/step3.svg" alt="" srcset="" />
      <div class="selection-title"></div>
      <div class="guide-selection selection-title--text-wrapeer">
        <h3>Это основные параметры однолинейной схемы.</h3>
        <p>Заполните соответствующие столбцы для каждого элемента.</p>
      </div>
      <div class="selection-penel">
        <div></div>
        <div></div>
      </div>
      <div class="guide-selection selection-penel--text-wrapeer">
        <p>В этом шаблоне, прописаны параметры для трех щитов (трех схем): АВР1, АВР2 и АВР3.</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.screenshot_wrapper {
  overflow: hidden;
  max-height: 60vh;
  border-radius: 10px;
  background-color: #fff;
}
.guide-screenshot {
  width: 100%;
  animation: screenshot-scale 13s ease forwards;
  animation-delay: 2s;
}
@keyframes screenshot-scale {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(2);
    object-fit: cover;
    transform-origin: 0 0;
  }
  90% {
    transform: scale(2);
    object-fit: cover;
    transform-origin: 100% 0;
  }
  100% {
    transform: scale(1);
    transform-origin: 0 0;
  }
}
.guide-selection {
  width: 60vh;
  height: 10vh;
  box-shadow: 0px 10px 90px #000;
  position: absolute;
  border-radius: 10px;
  background-color: #ffffff;
  top: 30vh;
  left: calc(50% - 30vh);
  padding: 1vw;
  opacity: 0;
  h3 {
    color: #000;
    margin: 0;
    font-size: 1.2vw;
    margin-bottom: 0.5vw;
  }
  p {
    font-size: 1vw;
    color: #000;
  }
}
.selection-title {
  height: 2.5vh;
  position: absolute;
  top: 16vh;
  width: calc(100% - 4vw);
  box-shadow: 0px 5px 50px #000;
  border: 3px solid #00000060;
  box-sizing: border-box;
  border-left: none;
  opacity: 0;
  animation: selection-title 12s ease;
  animation-delay: 3s;
}
@keyframes selection-title {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.selection-title--text-wrapeer {
  animation: selection-title--text-wrapeer 14s ease-in-out;
  animation-delay: 2s;
}
@keyframes selection-title--text-wrapeer {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.selection-penel {
  height: 26.5vh;
  position: absolute;
  top: 13.5vh;
  width: 6.5vh;
  box-shadow: 10px 0px 20px #0000009e;
  border: 2px solid #000000a2;
  box-sizing: border-box;
  border-left: none;
  opacity: 0;
  animation: selection-penel-1 8s ease;
  animation-delay: 19s;
  div:nth-child(1) {
    height: 24vh;
    position: absolute;
    top: 26vh;
    width: 6.5vh;
    box-shadow: 10px 0px 20px #0000009e;
    border: 2px solid #000000b2;
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    opacity: 0;
    animation: selection-penel-2 7s ease;
    animation-delay: 20s;
  }
  div:nth-child(2) {
    height: 5vh;
    position: absolute;
    top: 50vh;
    width: 6.5vh;
    box-shadow: 10px 0px 20px #0000009e;
    border: 2px solid #000000b2;
    box-sizing: border-box;
    border-top: none;
    border-left: none;
    border-radius: 0px 0px 0px 10px;
    opacity: 0;
    animation: selection-penel-3 6s ease;
    animation-delay: 21s;
  }
}
@keyframes selection-penel-1 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes selection-penel-2 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes selection-penel-3 {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.selection-penel--text-wrapeer {
  animation: selection-penel--text-wrapeer 9s ease-in-out;
  height: 5vh;
  animation-delay: 17s;
  left: 10vw;
}
@keyframes selection-penel--text-wrapeer {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
