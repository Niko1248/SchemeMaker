<template>
  <div class="input-Q">
    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1" class="input-q-wrapp">
      <img class="" src="../../assets/img/input+PE.svg" />
    </div>
    <div v-else class="input-q-wrapp PE--transformX">
      <img class="input-Q-img" src="../../assets/img/input.svg" />
    </div>

    <!-- Первый объект  -->
    <FirstObjectInput :data="schemeDataStore.inputDeviceData" />

    <!-- Второй объект  -->
    <SecondObjectInput :data="schemeDataStore.inputDeviceData" />

    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1">
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
      <p v-if="schemeDataStore.inputPhase?.length > 1" class="powerLine-info">~380/220В</p>
      <p v-else class="powerLine-info">~220В</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import FirstObjectInput from "./FirstObjectInput.vue"
import SecondObjectInput from "./SecondObjectInput.vue"

const schemeDataStore = useSchemeDataStore()

const checkInputCableMarka = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})

const checkInputCableSize = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})

const checkInputName = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Наименование потребителя"])
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
