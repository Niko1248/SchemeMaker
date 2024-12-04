<template>
  <div class="rdc__wrapper">
    <div class="parallelogram-1">
      <div class="parallelogram-2"></div>
      <div class="rectangle"></div>
      <div class="oval"></div>
      <div class="arrow"></div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: "RCD",
  setup() {},
})
</script>
<style lang="scss" scoped>
.rdc__wrapper {
  margin: 10mm;
}
.parallelogram-1 {
  width: 3mm;
  height: 5mm;
  transform: skew(30deg);
  border-right: 0.5mm solid #000;
  border-left: 0.5mm solid #000;
  position: relative;
  box-sizing: border-box;
}
.parallelogram-2 {
  width: 2.5mm;
  height: 1.3mm;
  transform: translateY(2mm);
  border-top: 0.5mm solid #000;
  border-bottom: 0.5mm solid #000;
  box-sizing: border-box;
}
.rectangle {
  position: absolute;
  box-sizing: border-box;
  top: 100%;
  right: 1.8mm;
  width: 3mm;
  height: 7mm;
  transform: translateY(2mm);
  border-right: 0.5mm solid #000;
  border-left: 0.5mm solid #000;
  transform: skew(-30deg);
}
.oval {
  width: 5.5mm;
  height: 1.5mm;
  border: 0.5mm solid #000;
  transform: skew(-30deg);
  border-radius: 50%;
  position: absolute;
  top: 140%;
  right: 0%;
}
.arrow {
  position: absolute;
  width: 3mm;
  height: 5mm;
  top: 2.5mm;
  left: -5mm;
  border: 0.5mm solid #000;
  border-right: none;
  transform: skew(-30deg);
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    width: 1.5mm;
    height: 1px;
    background: #000;
    transform: rotate(-30deg);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -0.6mm;
    right: 0;
    width: 1.5mm;
    height: 1px;
    background: #000;
    transform: rotate(30deg);
  }
}
</style>
