<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp" :style="listIndex > 1 ? 'visibility: hidden;' : ''">
        <InputGroup />
      </div>
      <div class="power__wrapp">
        <PowerLine />
        <div class="power-nodes__wrapp">
          <div
            class="power-node-item"
            v-for="(item, index) in props.outputDevicesData"
            :key="item['Данные']?.[0]?.['Вводной щит'] + 'outputLine-' + index"
          >
            <OutputGroupItem :itemData="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import PowerLine from "./PowerLine.vue"
import InputGroup from "./InputGroup.vue"
import OutputGroupItem from "./OutputGroupItem.vue"

const props = defineProps({
  outputDevicesData: { type: Array },
  listIndex: { type: Number },
})
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 55mm; //     Позиционирование относительно левой таблицы  "Данные питающей сети"
  top: 8mm; //     Позиционирование относительно левой таблицы  "Данные питающей сети"
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
