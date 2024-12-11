<template>
  <div class="scheme">
    <div class="power__wrapp">
      <div class="power-line"></div>
      <div class="power-nodes__wrapp"></div>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 43mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
  top: 4.2mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
}
.power__wrapp {
  max-width: 220mm;
  display: flex;
  flex-direction: column;
}
.power-line {
  height: 1mm;
  width: 225mm;
  border: 0.5mm solid #000;
}
.power-nodes__wrapp {
  display: flex;
  flex-direction: row;
}
</style>
