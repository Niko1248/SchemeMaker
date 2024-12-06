<template>
  <div class="scheme">
    <RCD />
    <QF_1 />
  </div>
</template>
<script setup>
import RCD from "./legend/RCD.vue"
import QF_1 from "./legend/QF-1.vue"
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 43mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
  top: 4.2mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
}
</style>
