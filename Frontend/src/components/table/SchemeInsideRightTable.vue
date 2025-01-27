<template>
  <div class="right-inside-table">
    <div class="item" :class="`item${n}`" v-for="n in 100" :key="n">
      <!-- <input type="text" v-if="n === 7" :value="schemeDataStore.tableData['Артикул']" /> -->
      <p v-if="n === 7">{{ schemeDataStore.tableData["Артикул"] }}</p>
      <!-- <input type="text" v-if="n === 27" :value="schemeDataStore.tableData['Поле 1']" /> -->
      <p v-if="n === 27">{{ schemeDataStore.tableData["Поле 1"] }}</p>
      <input type="text" v-if="n === 41" :value="schemeDataStore.tableData['Должность 1']" />
      <input type="text" v-if="n === 43" :value="schemeDataStore.tableData['ФИО 1']" />
      <input type="text" v-if="n === 46" :value="schemeDataStore.tableData['Дата']" />
      <input type="text" v-if="n === 51" :value="schemeDataStore.tableData['Должность 2']" />
      <input type="text" v-if="n === 53" :value="schemeDataStore.tableData['ФИО 2']" />
      <input type="text" v-if="n === 56" :value="schemeDataStore.tableData['Дата']" />
      <!-- <input type="text" v-if="n === 57" :value="schemeDataStore.tableData['Поле 2']" /> -->
      <p v-if="n === 57">{{ schemeDataStore.tableData["Поле 2"] }}</p>
      <!-- <input type="text" v-if="n === 68" :value="schemeDataStore.tableData['Стадия']" /> -->
      <p v-if="n === 68">{{ schemeDataStore.tableData["Стадия"] }}</p>
      <div v-if="n === 87">
        <p>Однолинейная схема</p>
        <p>{{ props.pageData?.[0]?.["Данные"]?.[0]?.["Вводной щит"] }}</p>
      </div>
      <p v-if="n === 88">{{ schemeDataStore.tableData["Фирма"] }}</p>
      <!-- <input type="text" v-if="n === 88" :value="schemeDataStore.tableData['Фирма']" /> -->
      <div v-if="contentMap[n]" v-html="resolveContent(n)" :class="`item${n}-text`"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"

const props = defineProps({
  listIndex: { type: Number },
  pageData: { type: Array },
})
const schemeDataStore = useSchemeDataStore()
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
  69: () => `${props.listIndex}`,
  70: () => `${schemeDataStore.totalPages}`,
}))

// Метод для разрешения контента
const resolveContent = (key) => {
  const resolver = contentMap.value[key]
  return typeof resolver === "function" ? resolver(schemeDataStore.tableData) : ""
}
</script>

<style lang="scss" scoped>
input {
  width: auto;
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  text-align: center;
}
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
  width: 100%;
  font-size: 5mm;
  overflow: visible;
  textarea {
    box-sizing: border-box;
    word-break: break-all;
    overflow-y: hidden;
    resize: none;
    text-align: center;
    border: 0;
    line-height: 0.8;
    background-color: transparent;
    width: 119mm !important;
    height: 14mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}
.item41,
.item51 {
  grid-column: 1/3;
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 20mm;
    height: 5mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}
.item46,
.item56 {
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 10mm;
    height: 5mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}
.item43,
.item53 {
  grid-column: 3/5;
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 20mm;
    height: 5mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}

.item57 {
  grid-row: 6/9;
  grid-column: 7;
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 70mm;
    height: 15mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}
.item68 {
  grid-row: 7/9;
  grid-column: 8;
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 15mm;
    height: 10mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
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
  overflow: visible;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 50mm;
    height: 15mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
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
  overflow: visible;
  font-size: 7mm;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    text-align: center;
    border: 0;
    background-color: transparent;
    width: 120mm;
    height: 10mm;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 2px 20px #000;
      background: #ffffff00;
    }
  }
}
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
// Название фирмы
.item88 {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 5mm;
}
</style>
