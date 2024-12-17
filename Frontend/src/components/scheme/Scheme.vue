<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp">
        <InputGroup
          :checkLinePE="checkLinePE"
          :firstObject="firstObject(props.inputDeviceData)"
          :secondObject="secondObject(props.inputDeviceData)"
        />
      </div>
      <div class="power__wrapp">
        <PowerLine :checkLinePE="checkLinePE" />
        <div class="power-nodes__wrapp">
          <div class="power-node-item" v-for="(item, index) in props.outputDevicesData" :key="'outputLine-' + index">
            <OutputGroupItem
              :checkLinePE="checkLinePE"
              :firstObject="firstObject(item)"
              :secondObject="secondObject(item)"
              :itemData="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import PowerLine from "./PowerLine.vue"
import InputGroup from "./InputGroup.vue"
import OutputGroupItem from "./OutputGroupItem.vue"

const props = defineProps({
  inputDeviceData: { type: Object },
  outputDevicesData: { type: Array },
})
const firstObject = (data) => {
  return data["Данные"].find((obj) => obj?.["Тип"] === "QD")
}
const secondObject = (data) => {
  return data["Данные"].find((obj) => obj?.["Тип"] === "QF" || obj?.["Тип"] === "QFD")
}
const checkLinePE = computed(() => {
  return props.outputDevicesData.findIndex((obj) => obj?.["Данные"][0]["PE"])
})
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 50mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
  top: 8mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
}
.input__wrapp {
  margin-bottom: 0mm;
  display: flex;
  flex-direction: row;
  width: 190mm;
  transform: translateX(15mm);
}
.power__wrapp {
  max-width: 220mm;
  display: flex;
  flex-direction: column;
  width: min-content;
}

.power-nodes__wrapp {
  display: flex;
  flex-direction: row;
  width: inherit;
  justify-content: flex-start;
  margin-left: 27px;
}
.power-node-item {
  width: 20mm;
  position: relative;
}
</style>
