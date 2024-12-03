<template>
  <div class="consumer-table">
    <div class="table__header column0">
      <div class="item item1">ЭЛЕКТРОПРИЁМНИК</div>
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
      <div class="item item3"></div>
      <div class="item item4"></div>
      <div class="item item5"></div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "ConsumerTable",
  props: {
    pageData: { type: Array },
  },
  setup() {
    return {}
  },
})
</script>
<style lang="scss" scoped>
.consumer-table {
  display: flex;
  position: absolute;
  bottom: 60mm;
}
.table__header {
  display: grid;
  grid-template-rows: 10mm 7mm 7mm 7mm 13mm;
  grid-template-columns: 6mm 44mm;
  grid-auto-flow: column;
}
.table__data {
  display: grid;
  grid-template-rows: 10mm 7mm 7mm 7mm 13mm;
  grid-template-columns: repeat(1, 15.5mm);
  grid-auto-flow: column;
}
.item {
  border: 1px solid #000;
}
.column0 {
  .item1 {
    grid-row: 1/6;
    grid-column: 1;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
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
