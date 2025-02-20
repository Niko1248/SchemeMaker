<template>
  <div class="guide-button" @click="toggleGuidePopup">
    <p>Как это работает?</p>
    <div class="guide-button--text">
      <p>пройти гайд →</p>
    </div>
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData.js"
const schemeDataStore = useSchemeDataStore()

// Функция для открытия попапа Гайд
const toggleGuidePopup = () => {
  schemeDataStore.toggleGuidePopup(!schemeDataStore.guidePopup)
}
</script>
<style lang="scss" scoped>
.guide-button {
  position: absolute;
  font-family: WixMadeforDisplay-Regular;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1vw;
  padding: 0 15px;
  height: 60px;
  left: 20vw;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.537254902);
  overflow: hidden;
  transition: 0.4s;
  flex-direction: column;
  cursor: url(../../public/cursor-pointer.png), auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.8);
  p {
    transform: translateY(7px);
  }
  .guide-button--text {
    visibility: hidden;
    opacity: 0;
    transition: 0.1s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2470588235);
    transition: 0.2s;
  }
  &:hover p {
    transform: translateY(0px);
    transition: 0.5s;
  }
  &:hover .guide-button--text {
    visibility: visible;
    transition: 0.6s ease-in-out;
    opacity: 1;
  }
}
</style>
