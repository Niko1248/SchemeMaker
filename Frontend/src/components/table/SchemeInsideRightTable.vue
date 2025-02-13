<template>
  <div class="right-inside-table">
    <div class="item" v-for="n in 100" :key="n" :class="`item${n}`">
      <TextEditable v-if="editableFields[n]" :element="editableFields[n]" uniqueID="Штамп" class="contenteditable">
        {{ schemeDataStore.tableData[editableFields[n]] }}
      </TextEditable>
      <div v-if="n === 87">
        <p>Однолинейная схема</p>
        <p>{{ props.pageData?.[0]?.["Данные"]?.[0]?.["Вводной щит"] }}</p>
      </div>
      <div v-if="contentMap[n]" v-html="resolveContent(n)" :class="`item${n}-text`"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"
import TextEditable from "../UI/TextEditable.vue"

const props = defineProps({
  listIndex: { type: Number },
  pageData: { type: Array },
})

const schemeDataStore = useSchemeDataStore()

const editableFields = {
  7: "Артикул",
  27: "Поле 1",
  41: "Должность 1",
  43: "ФИО 1",
  46: "Дата 1",
  51: "Должность 2",
  53: "ФИО 2",
  56: "Дата 2",
  57: "Поле 2",
  68: "Стадия",
  88: "Фирма",
}

const contentMap = computed(() => ({
  31: () => "Изм",
  32: () => "Кол",
  33: () => "Лист",
  34: () => "№док",
  35: () => "Подп",
  36: () => "Дата",
  58: () => "Стадия",
  59: () => "Лист",
  60: () => "Листов",
  69: () => props.listIndex,
  70: () => schemeDataStore.totalPages,
}))

const resolveContent = (key) => {
  const resolver = contentMap.value[key]
  return typeof resolver === "function" ? resolver() : ""
}
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
  border: 0.5mm solid #000;
  border-bottom: none;
  border-right: none;
}
.item {
  border: 0.5mm solid #000;
  width: 100%;
  height: 100%;
  font-size: 4mm;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.contenteditable {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  word-break: break-all;
  border: 0;
  line-height: 0.9;
  background-color: transparent;
  padding: 0 5px;
  cursor: auto;
  &:focus {
    outline: 1px solid #00000000; /* зеленая обводка */
    transition: 0.5s ease;
    border-radius: 2px;
    box-shadow: 0px 2px 20px #000;
    background: #ffffff00;
  }
}
// Настройка таблицы
/* prettier-ignore */
.item8,.item9,.item10,.item17,.item18,.item19,.item20,.item28,.item29,.item30,
.item37,.item38,.item39,.item40,.item42,.item44,.item47,.item48,.item49,.item50,
.item52,.item54, .item67, .item77, .item78, .item79, .item80, .item89, .item90,
.item97, .item98, .item99,.item100{
  display: none;
}

.item46,
.item56 {
  overflow: visible;
}
.item43,
.item53 {
  grid-column: 3/5;
  overflow: visible;
}
.item41,
.item51 {
  grid-column: 1/3;
  overflow: visible;
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

.item7,
.item27,
.item41,
.item51,
.item57,
.item87 {
  white-space: wrap;
}
// Стили отдельных элементов

// Объект и заказчик

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
</style>
