<template>
  <div class="right-inside-table">
    <div class="item" :class="`item${n}`" v-for="n in 100" :key="n">
      <span v-if="n === 7">{{ tableData["Данные"]?.[0]?.["?"] || "" }}</span>
      <span v-if="n === 27">{{ tableData["Данные"]?.[0]?.["Объект"] || "" }}</span>
      <span v-if="n === 31">Изм</span>
      <span v-if="n === 32">Кол</span>
      <span v-if="n === 33">Лист</span>
      <span v-if="n === 34">№док</span>
      <span v-if="n === 35">Подп</span>
      <span v-if="n === 36">Дата</span>
      <span v-if="n === 41">{{ tableData["Данные"]?.[0]?.["Должность 1"] || "" }}</span>
      <span v-if="n === 43">{{ tableData["Данные"]?.[0]?.["ФИО 1"] || "" }}</span>
      <span v-if="n === 46">{{ tableData["Данные"]?.[0]?.["Дата"] || "" }}</span>
      <span v-if="n === 51">{{ tableData["Данные"]?.[0]?.["Должность 2"] || "" }}</span>
      <span v-if="n === 53">{{ tableData["Данные"]?.[0]?.["ФИО 2"] || "" }}</span>
      <span v-if="n === 56">{{ tableData["Данные"]?.[0]?.["Дата"] || "" }}</span>
      <span v-if="n === 57">{{ tableData["Данные"]?.[0]?.["Адрес"] || "" }}</span>
      <span v-if="n === 58">Стадия</span>
      <span v-if="n === 59">Лист</span>
      <span v-if="n === 60">Листов</span>
      <span v-if="n === 68">{{ tableData["Данные"]?.[0]?.["Стадия"] || "" }}</span>
      <span v-if="n === 88">{{ tableData["Данные"]?.[0]?.["Фирма"] || "" }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "SchemeInsideRightTable",
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>
<style lang="scss" scoped>
.right-inside-table {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(4, 10mm) 15mm 10mm 70mm 15mm 15mm 20mm;
  grid-template-rows: repeat(9, 5mm) 10mm;
  position: absolute;
  bottom: 0;
  right: 0;
}
.item {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 0 0.5px black;
}
/* prettier-ignore */
.item8,.item9,.item10,.item17,.item18,.item19,.item20,.item28,.item29,.item30,
.item37,.item38,.item39,.item40,.item42,.item44,.item47,.item48,.item49,.item50,
.item52,.item54, .item67, .item77, .item78, .item79, .item80, .item89, .item90,
.item97, .item98, .item99,.item100{
  display: none;
}
.item7 {
  grid-row: 1/3;
  grid-column: 7/11;
}
.item27 {
  grid-row: 3/6;
  grid-column: 7/11;
}
.item41,
.item51 {
  grid-column: 1/3;
}
.item43,
.item53 {
  grid-column: 3/5;
}
.item57 {
  grid-row: 6/9;
  grid-column: 7;
}
.item68 {
  grid-row: 7/9;
  grid-column: 8;
}
.item69 {
  grid-row: 7/9;
  grid-column: 9;
}
.item70 {
  grid-row: 7/9;
  grid-column: 10;
}
.item87 {
  grid-row: 9/11;
  grid-column: 7;
}
.item88 {
  grid-row: 9/11;
  grid-column: 8/11;
}
</style>
