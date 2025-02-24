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
    <div
      class="table__data"
      :class="`column${index + 1}`"
      v-for="(data, index) in props.pageData"
      :key="data['Данные']?.[0]?.['Вводной щит'] + data['Группа']"
    >
      <div class="item item1">
        <img :src="getLegend(data['Данные'])" alt="" />
      </div>

      <!-- Номер по плану -->
      <TextEditable
        class="item item2"
        element="Таблица потребителей"
        :uniqueID="'Номер по плану-' + data['Данные']?.[0]?.['Вводной щит'] + data['Группа']"
        v-model="editableData[index].groupInPlan"
      >
        {{ editableData[index].groupInPlan }}
      </TextEditable>

      <!-- Установленная мощность -->
      <TextEditable
        class="item item3"
        element="Таблица потребителей"
        :uniqueID="'Мощность-' + data['Данные']?.[0]?.['Вводной щит'] + data['Группа']"
        v-model="editableData[index].power"
      >
        {{ editableData[index].power }}
      </TextEditable>

      <!-- Расчетный ток -->
      <TextEditable
        class="item item4"
        element="Таблица потребителей"
        :uniqueID="'Ток-' + data['Данные']?.[0]?.['Вводной щит'] + data['Группа']"
        v-model="editableData[index].amperage"
      >
        {{ editableData[index].amperage }}
      </TextEditable>

      <!-- Наименование потребителя -->
      <TextEditable
        class="item item5"
        element="Таблица потребителей"
        :uniqueID="'Потребитель-' + data['Данные']?.[0]?.['Вводной щит'] + '-' + data['Группа']"
        v-model="editableData[index].consumerName"
      >
        {{ editableData[index].consumerName }}
      </TextEditable>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue"
import TextEditable from "../UI/TextEditable.vue"

const legendObj = {
  Освещение: new URL("../../assets/img/legend/svet.svg", import.meta.url).href,
  Щит: new URL("../../assets/img/legend/shit.svg", import.meta.url).href,
  Розетка: new URL("../../assets/img/legend/rozetka.svg", import.meta.url).href,
  Электровывод: new URL("../../assets/img/legend/pig.svg", import.meta.url).href,
  1: new URL("../../assets/img/legend/svet.svg", import.meta.url).href,
  2: new URL("../../assets/img/legend/shit.svg", import.meta.url).href,
  3: new URL("../../assets/img/legend/rozetka.svg", import.meta.url).href,
  4: new URL("../../assets/img/legend/pig.svg", import.meta.url).href,
}

const props = defineProps({
  pageData: { type: Array, required: true },
})

// Реактивные данные для редактирования
const editableData = ref([])

// Инициализация редактируемых данных
const initializeEditableData = () => {
  editableData.value = props.pageData.map((data) => ({
    groupInPlan: findPropertyValue(data["Данные"], "Номер по плану") || "",
    power: findPropertyValue(data["Данные"], "Установленная мощность") || "",
    amperage: findPropertyValue(data["Данные"], "Расчетный ток") || "",
    consumerName: findPropertyValue(data["Данные"], "Наименование потребителя") || "",
  }))
}

// Поиск значения свойства в данных
const findPropertyValue = (data, property) => {
  const foundElement = data.find((el) => el[property])
  return foundElement ? foundElement[property] : null
}

// Получение изображения для легенды
const getLegend = (data) => {
  const foundElement = data.find((el) => el["Условное обозначение"])
  return foundElement ? legendObj[foundElement["Условное обозначение"]] : null
}

// Инициализация данных при монтировании
watch(
  () => props.pageData,
  (newData) => {
    initializeEditableData()
  },
  { immediate: true, deep: true }
)

// Обновление исходных данных при изменении редактируемых данных
watch(
  editableData,
  (newEditableData) => {
    newEditableData.forEach((editableItem, index) => {
      const data = props.pageData[index]["Данные"]
      data.forEach((obj) => {
        if (obj["Номер по плану"]) obj["Номер по плану"] = editableItem.groupInPlan
        if (obj["Установленная мощность"]) obj["Установленная мощность"] = editableItem.power
        if (obj["Расчетный ток"]) obj["Расчетный ток"] = editableItem.amperage
        if (obj["Наименование потребителя"]) obj["Наименование потребителя"] = editableItem.consumerName
      })
    })
  },
  { deep: true }
)
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
  line-height: 0.9;
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
