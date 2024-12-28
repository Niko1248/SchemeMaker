<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp" :style="listIndex > 1 ? 'visibility: hidden;' : ''">
        <InputGroup :inputPhase="checkInputPhase(schemeDataStore.inputDeviceData)" />
      </div>
      <div class="power__wrapp">
        <PowerLine :inputPhase="checkInputPhase(schemeDataStore.inputDeviceData)" />
        <div class="power-nodes__wrapp">
          <div class="power-node-item" v-for="(item, index) in props.outputDevicesData" :key="'outputLine-' + index">
            <OutputGroupItem :itemData="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import PowerLine from "./PowerLine.vue"
import InputGroup from "./InputGroup.vue"
import OutputGroupItem from "./OutputGroupItem.vue"

const schemeDataStore = useSchemeDataStore()
const props = defineProps({
  outputDevicesData: { type: Array },
  listIndex: { type: Number },
})

// Фаза входной группы
const checkInputPhase = (data) => {
  for (const el of data["Данные"]) {
    // Проверяем, есть ли поле "Фаза"
    if (!el?.["Фаза"]) continue

    // Разбиваем строку по запятой и убираем пробелы
    const phaseArr = el["Фаза"].split(",").map((phase) => phase.trim())

    // Считаем длину массива, уменьшая на 1, если есть "N"
    let arrLength = phaseArr.length
    if (phaseArr.includes("N")) {
      arrLength -= 1
    }

    // Ограничиваем длину до 3
    arrLength = Math.min(arrLength, 3)

    // Если длина больше 0, возвращаем результат
    if (arrLength > 0) {
      return { data: phaseArr, length: arrLength }
    }
  }

  // Если ничего не найдено, возвращаем undefined
  return undefined
}
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 55mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
  top: 8mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
}
.input__wrapp {
  margin-bottom: 0mm;
  display: flex;
  flex-direction: row;
  width: 190mm;
  transform: translateX(11mm);
  position: relative;
}
.power__wrapp {
  max-width: 215mm;
  display: flex;
  flex-direction: column;
  width: min-content;
}

.power-nodes__wrapp {
  display: flex;
  flex-direction: row;
  width: inherit;
  justify-content: flex-start;
  margin-left: 10px;
}
.power-node-item {
  width: 20mm;
  position: relative;
}
</style>
