<template>
  <div class="right-inside-table">
    <div class="item" :class="`item${n}`" v-for="n in 100" :key="n">
      <div v-if="contentMap[n]" v-html="resolveContent(n)" :class="`item${n}-text`"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"
const props = defineProps({
  listIndex: { type: Number },
  pageData: { type: Array },
})
const schemeDataStore = useSchemeDataStore()
const contentMap = computed(() => ({
  7: (data) => data["Артикул"] || "",
  27: (data) => `<p>Объект: ${data["Объект"]}</p><p>Заказчик: ${data["Заказчик"]}</p> ` || "",
  31: () => "Изм",
  32: () => "Кол",
  33: () => "Лист",
  34: () => "№док",
  35: () => "Подп",
  36: () => "Дата",
  41: (data) => data["Должность 1"] || "",
  43: (data) => data["ФИО 1"] || "",
  46: (data) => data["Дата"] || "",
  51: (data) => data["Должность 2"] || "",
  53: (data) => data["ФИО 2"] || "",
  56: (data) => data["Дата"] || "",
  57: (data) => "Адрес: " + data["Адрес"] || "",
  58: () => "Стадия",
  59: () => "Лист",
  60: () => "Листов",
  68: (data) => data["Стадия"] || "",
  69: () => `${props.listIndex}`,
  70: () => `${schemeDataStore.totalPages}`,
  87: () => `<p>Однолинейная схема</p><p>${props.pageData?.[0]?.["Данные"]?.[0]?.["Вводной щит"]}</p> ` || "",
  88: (data) => data["Фирма"] || "",
}))

// Метод для разрешения контента
const resolveContent = (key) => {
  const resolver = contentMap.value[key]
  return typeof resolver === "function" ? resolver(schemeDataStore.tableData) : ""
}
</script>

<style scoped>
/* Ваши стили */
</style>

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
  border: 0.5mm solid #000;
  border-bottom: none;
  border-right: none;
}
.item {
  border: 0.5mm solid #000;
  width: 100%;
  height: 100%;
  font-size: 4mm;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
// Настройка таблицы
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
.item7,
.item27,
.item41,
.item51,
.item57,
.item87 {
  white-space: wrap;
}
// Стили отдельных элементов

// Артикул
.item7 {
  font-size: 7mm;
}
// Объект и заказчик
.item27 {
  width: 100%;
  font-size: 5mm;
}

// Должность 1
.item41 {
  font-size: 3mm;
}
// Фамилия 1
.item43 {
  font-size: 3mm;
}
// Должность 2
.item51 {
  font-size: 3mm;
}
// Фамилия 2
.item53 {
  font-size: 3mm;
}
// Адрес
.item57 {
  font-size: 5mm;
}
// Название схемы
.item87 {
  font-size: 5mm;
}
// Название фирмы
.item88 {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 5mm;
}
</style>
