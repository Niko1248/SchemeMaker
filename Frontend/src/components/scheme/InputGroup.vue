<template>
  <div class="input-Q">
    <div v-if="props.linePE !== -1" class="input-q-wrapp">
      <img class="" src="../../assets/img/input+PE.svg" />
    </div>
    <div v-else class="input-q-wrapp PE--transformX">
      <img class="input-Q-img" src="../../assets/img/input.svg" />
    </div>
    <!-- Первый объект (УЗО или линия) -->
    <div>
      <div>
        <div v-if="props.firstObject['Тип'] === 'QD'" class="node">
          <img src="../../assets/img/QD.svg" />
          <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[0]" />
        </div>
        <div v-else-if="props.firstObject['Тип'] === 'QF'" class="node">
          <img src="../../assets/img/QF-1.svg" />
          <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[0]" />
        </div>
        <div v-else-if="props.firstObject['Тип'] === 'QFD'" class="node">
          <img src="../../assets/img/QFD.svg" />
          <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[0]" />
        </div>
        <img
          v-else
          src="../../assets/img/connection-line.svg"
          :style="{ marginLeft: props.linePE !== -1 ? '8px' : '0px' }"
        />
        <div v-if="props.linePE !== -1">
          <img src="../../assets/img/connection-line+PE.svg" />
        </div>
      </div>
    </div>
    <!-- Второй объект (автомат, дифавтомат или линия) -->
    <div>
      <div class="node" v-if="props.secondObject?.['Тип'] === 'QF'">
        <img src="../../assets/img/QF-1.svg" />
        <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[1]" />
      </div>
      <div class="node" v-else-if="props.secondObject?.['Тип'] === 'QD'">
        <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[1]" />
        <img src="../../assets/img/QD.svg" alt="" />
      </div>
      <div class="node" v-else-if="props.secondObject?.['Тип'] === 'QFD'">
        <DeviceInfo :textData="props.inputDeviceData?.['Данные']?.[1]" />
        <img src="../../assets/img/QFD.svg" alt="" />
      </div>
      <img
        v-else
        :style="{ marginLeft: props.linePE !== -1 ? '8px' : '0px' }"
        src="../../assets/img/connection-line.svg"
      />
      <div v-if="props.linePE !== -1">
        <img src="../../assets/img/connection-line+PE.svg" alt="" />
      </div>
    </div>

    <div v-if="props.linePE !== -1">
      <img class="connection" src="../../assets/img/connection+PE.svg" alt="" />
    </div>
    <div v-else>
      <img class="connection PE--transformX connection-1" src="../../assets/img/connection.svg" alt="" />
    </div>
  </div>
  <!-- Линия и ввод -->
  <div class="input-line"></div>
  <div class="input-cable">
    <p>
      {{ checkInputCableMarka + checkInputCableSize }}
    </p>
  </div>
  <div class="input-node">
    <img src="../../assets/img/input-connection2.svg" alt="" />
    <div class="input-name">{{ "от " + checkInputName["Наименование потребителя"] }}</div>
    <div class="input-phase">
      <p v-if="props.inputPhase.length > 1" class="powerLine-info">~380/220В</p>
      <p v-else class="powerLine-info">~220В</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import DeviceInfo from "./DeviceInfo.vue"
const props = defineProps({
  linePE: { type: Number },
  firstObject: { type: Object },
  secondObject: { type: Object },
  inputDeviceData: { type: Object },
  inputPhase: { type: Object },
})
const checkInputCableMarka = computed(() => {
  return props.inputDeviceData?.["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})

const checkInputCableSize = computed(() => {
  return props.inputDeviceData?.["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})

const checkInputName = computed(() => {
  return props.inputDeviceData?.["Данные"].find((obj) => obj["Наименование потребителя"])
})
</script>
<style lang="scss" scoped>
.input-Q {
  position: relative;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: flex-start;
  }
}
.input-q-wrapp {
  position: relative;
  height: 23px;
}

.input-Q-img {
  margin-bottom: 0.5mm;
  position: absolute;
}
.input-line {
  width: 100%;
  border-top: 1px solid #000;
}
.input-cable {
  position: absolute;
  right: 8cm;
  top: -5mm;
}
.node {
  position: relative;
}
.input-node {
  width: 52mm;
  height: 13mm;
  background: url("../../assets/img/input-border.svg");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-7mm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    position: absolute;
    left: 0;
    top: 19px;
  }
}
.PE--transformX {
  transform: translateX(-8px);
}
.connection-1 {
  width: 27px;
  height: 27px;
  object-fit: cover;
  object-position: bottom;
}
.connection {
  position: absolute;
  top: 100%;
}
.powerLine-info {
  font-size: 3mm;
}
</style>
