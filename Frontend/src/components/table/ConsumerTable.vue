<template>
  <div class="consumer-table">
    <div class="table__header column0">
      <div class="item item1"><p>ЭЛЕКТРОПРИЁМНИК</p></div>
      <div class="item item2"></div>
      <div class="item item3"></div>
      <div class="item item4"></div>
      <div class="item item5"></div>
      <div class="item item6">Условное обозначение на плане</div>
      <div class="item item7">Номер группы по плану</div>
      <div class="item item8">Установленная мощность, кВт</div>
      <div class="item item9">Расчетный ток, А</div>
      <div class="item item10">Наименование потребителя</div>
    </div>
    <div class="table__data" :class="`column${index + 1}`" v-for="(data, index) in props.pageData" :key="index">
      <div class="item item1">
        <img :src="getLegend(data['Данные'])" alt="" />
      </div>
      <div class="item item2" contenteditable="true">
        {{ findGroupInPlan(data["Данные"]) }}
      </div>
      <div class="item item3" contenteditable="true">{{ findPower(data["Данные"]) }}</div>
      <div class="item item4" contenteditable="true">{{ findAmperage(data["Данные"]) }}</div>
      <div class="item item5" contenteditable="true">{{ findConsumerName(data["Данные"]) }}</div>
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps } from "vue"

const legendObj = reactive({
  1: new URL("../../assets/img/legend/svet.svg", import.meta.url).href,
  2: new URL("../../assets/img/legend/shit.svg", import.meta.url).href,
  3: new URL("../../assets/img/legend/rozetka.svg", import.meta.url).href,
  4: new URL("../../assets/img/legend/pig.svg", import.meta.url).href,
})

const props = defineProps({
  pageData: { type: Array, required: true },
})

const findPropertyValue = (data, property) => {
  const foundElement = data.find((el) => el[property])
  return foundElement ? foundElement[property] : null
}

const findGroupInPlan = (data) => findPropertyValue(data, "Номер по плану")
const findAmperage = (data) => findPropertyValue(data, "Расчетный ток")
const findPower = (data) => findPropertyValue(data, "Установленная мощность")
const findConsumerName = (data) => findPropertyValue(data, "Наименование потребителя")
const getLegend = (data) => {
  const foundElement = data.find((el) => el["Условное обозначение"])
  return foundElement ? legendObj[foundElement["Условное обозначение"]] : null
}
</script>

<style lang="scss" scoped>
.consumer-table {
  display: flex;
}
.table__header {
  display: grid;
  grid-template-rows: 10mm 6mm 6mm 6mm 14mm;
  grid-template-columns: 6mm 43mm;
  grid-auto-flow: column;
}
.table__data {
  display: grid;
  grid-template-rows: 10mm 6mm 6mm 6mm 14mm;
  grid-template-columns: repeat(1, 20mm);
  grid-auto-flow: column;
  text-align: center;
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-word;
  }
}
.item {
  border: 1px solid #000;
  border-left: none;
}
.item5 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3mm;
}
.column0 {
  font-size: 3mm;
  .item {
    display: flex;
    align-items: center;
  }
  .item1 {
    p {
      transform: rotate(-90deg);
    }
    grid-row: 1/6;
    grid-column: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item2,
  .item3,
  .item4,
  .item5 {
    display: none;
  }
}
input {
  text-align: center;
  border: 0;
  background-color: transparent;
  width: 19mm;
  &:focus {
    outline: 1px dashed #000000; /* зеленая обводка */
    transition: 0.5s ease;
    border-radius: 2px;
    box-shadow: 0px 0px 20px #000;
    background: #ffffff00;
  }
}
</style>
