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
    <div class="table__data" :class="`column${index + 1}`" v-for="(data, index) in pageData">
      <div class="item item1"></div>
      <div class="item item2">{{ data["Данные"]?.[0]?.["Группа"] }}</div>
      <div class="item item3">{{ findPower(data["Данные"]) }}</div>
      <div class="item item4">{{ findAmperage(data["Данные"]) }}</div>
      <div class="item item5">{{ findConsumerName(data["Данные"]) }}</div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  pageData: { type: Array },
})
const findAmperage = (data) => {
  const foundElement = data.find((el) => el["Тип"] !== "QD" && el["Расчетный ток"])
  if (foundElement) {
    return foundElement?.["Расчетный ток"]
  }
}
const findPower = (data) => {
  const foundElement = data.find((el) => el["Тип"] !== "QD" && el["Установленная мощность"])
  if (foundElement) {
    return foundElement?.["Установленная мощность"]
  }
}
const findConsumerName = (data) => {
  const foundElement = data.find((el) => el["Тип"] !== "QD" && el["Наименование потребителя"])
  if (foundElement) {
    return foundElement?.["Наименование потребителя"]
  }
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
</style>
