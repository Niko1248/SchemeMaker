<template>
  <div class="standard-file" :class="schemeDataStore.currentStepGuide == 2 ? 'standard-file--active' : 'standard-file'">
    <a href="https://schememaker.ru/Шаблон.xlsm">
      <div
        style="
          display: inline-block;
          border: 2px solid white;
          border-radius: 10px;
          padding: 3px 5px;
          background-color: transparent;
        "
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2V16M12 16L8 12M12 16L16 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M20 20H4V18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </a>
    <p>Cкачать шаблон</p>
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData.js"
const schemeDataStore = useSchemeDataStore()
</script>
<style lang="scss" scoped>
.standard-file {
  position: absolute;
  font-size: 1vw;
  font-family: WixMadeforDisplay-Regular;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  height: 7vh;
  width: 7vh;
  bottom: 10vh;
  left: 1vw;
  border-radius: 15px;
  background: rgb(41 51 50 / 54%);
  overflow: hidden;
  transition: 0.4s;
  cursor: url(/cursor-pointer.png), auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
  &:hover {
    width: 190px;
    transition: 0.2 ease-in-out;
    background: rgba(255, 255, 255, 0.2470588235);
    box-sizing: 0px 0px 0px #00000000 !important;
  }
  a {
    cursor: url(/cursor-pointer.png), auto;
    transform: translateX(calc(3.5vh - 19px));
  }
  p {
    visibility: hidden;
    margin-left: 1vw;
    opacity: 0;
    text-align: center;
  }
  &:hover p {
    animation: standard 1s ease forwards;
  }
  &:hover path,
  &:hover div {
    stroke: black;
    border: 2px solid rgb(0, 0, 0) !important;
    transition: 0.4s ease;
    box-shadow: 0px 0px 10px #000;
  }
  @keyframes standard {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    25% {
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
}
.standard-file--active {
  animation: standard-file--active 3s ease-in-out forwards;
  @keyframes standard-file--active {
    15% {
      box-shadow: 0px 0px 50px #ffffff00;
    }
    50% {
      box-shadow: 0px 0px 50px #fff;
    }
    75% {
      box-shadow: 0px 0px 50px #ffffff00;
    }
    100% {
      box-shadow: 0px 0px 50px #fff;
    }
  }
  &:hover {
    box-shadow: 0px 0px 0px #00000000 !important;
  }
}
</style>
