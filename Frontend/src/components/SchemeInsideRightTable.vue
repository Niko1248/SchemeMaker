<template>
  <div class="right-inside-table">
    <div class="item" :class="`item${n}`" v-for="n in 100" :key="n">
      <span v-if="contentMap[n]">
        {{ resolveContent(n) }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue"

export default {
  name: "SchemeInsideRightTable",
  props: {
    tableData: {
      type: Object,
      default: () => ({}),
    },
    listIndex: { type: Number },
    totalPages: { type: Number },
  },
  setup(props) {
    const contentMap = computed(() => ({
      7: (data) => data["Данные"]?.[0]?.["?"] || "",
      27: (data) => data["Данные"]?.[0]?.["Объект"] || "",
      31: () => "Изм",
      32: () => "Кол",
      33: () => "Лист",
      34: () => "№док",
      35: () => "Подп",
      36: () => "Дата",
      41: (data) => data["Данные"]?.[0]?.["Должность 1"] || "",
      43: (data) => data["Данные"]?.[0]?.["ФИО 1"] || "",
      46: (data) => data["Данные"]?.[0]?.["Дата"] || "",
      51: (data) => data["Данные"]?.[0]?.["Должность 2"] || "",
      53: (data) => data["Данные"]?.[0]?.["ФИО 2"] || "",
      56: (data) => data["Данные"]?.[0]?.["Дата"] || "",
      57: (data) => data["Данные"]?.[0]?.["Адрес"] || "",
      58: () => "Стадия",
      59: () => "Лист",
      60: () => "Листов",
      68: (data) => data["Данные"]?.[0]?.["Стадия"] || "",
      87: (data) => data["Данные"]?.[0]?.["Название"] || "",
      88: (data) => data["Данные"]?.[0]?.["Фирма"] || "",
    }))

    const resolveContent = (key) => {
      const resolver = contentMap.value[key]
      return typeof resolver === "function" ? resolver(props.tableData) : ""
    }

    return {
      contentMap,
      resolveContent,
    }
  },
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
  text-align: center;
}
.item {
  border: 0.5mm solid #000;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 4mm;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item43,
.item53 {
  justify-content: flex-start;
}
.item7,
.item27,
.item57,
.item87 {
  font-size: 7mm;
  white-space: wrap;
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
