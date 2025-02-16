<template>
  <div class="input-Q">
    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1" class="input-q-wrapp">
      <img class="" src="../../assets/img/thick/input+PE.svg" />
    </div>
    <div v-else class="input-q-wrapp PE--transformX">
      <img class="input-Q-img" src="../../assets/img/thick/input.svg" />
    </div>

    <!-- Первый объект  -->
    <FirstObjectInput :data="schemeDataStore.inputDeviceData" />

    <!-- Второй объект  -->
    <SecondObjectInput :data="schemeDataStore.inputDeviceData" />

    <!-- Линии фазы -->
    <div
      :style="{ left: schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1 ? '8.5px' : '0.5px' }"
      class="phase-line__wrap"
    >
      <div
        v-for="index in schemeDataStore.checkPhase(schemeDataStore.inputDeviceData).phaseLength"
        :key="index"
        class="phase-line"
      ></div>
    </div>

    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1">
      <img style="top: 100%" class="connection" src="../../assets/img/thick/connection+PE.svg" alt="" />
    </div>
    <div v-else>
      <img
        style="top: calc(100% - 4px)"
        class="connection PE--transformX connection-1"
        src="../../assets/img/thick/connection.svg"
        alt=""
      />
    </div>
  </div>
  <!-- Линия и ввод -->
  <div class="input-line"></div>
  <div class="input-cable">
    <div class="--input"><CableInfo :data="schemeDataStore.inputDeviceData" /></div>
  </div>
  <div class="input-node">
    <svg width="155" height="55" style="border: 1px solid transparent; position: absolute; top: 0; left: 0">
      <rect x="1" y="1" width="153" height="53" fill="none" stroke="black" stroke-width="1" stroke-dasharray="10 8" />
    </svg>
    <img src="../../assets/img/thick/input-connection2.svg" alt="" />
    <TextEditable class="input-name scheme_contenteditable" element="Наименование потребителя" :uniqueID="uniqueID">
      {{ "от " + checkInputName["Наименование потребителя"] }}
    </TextEditable>

    <div class="input-phase">
      <p class="powerLine-info" v-if="schemeDataStore.checkPhase(schemeDataStore.inputDeviceData).phaseLength > 1">
        ~380/220В
      </p>
      <p v-else class="powerLine-info">~220В</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import FirstObjectInput from "./FirstObjectInput.vue"
import SecondObjectInput from "./SecondObjectInput.vue"
import TextEditable from "../UI/TextEditable.vue"
import CableInfo from "./CableInfo.vue"

const schemeDataStore = useSchemeDataStore()
const uniqueID = computed(() => {
  return (
    "inputLine" +
    schemeDataStore.inputDeviceData["Данные"]?.[0]?.["Вводной щит"] +
    schemeDataStore.inputDeviceData["Группа"]
  )
})
const checkInputName = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Наименование потребителя"])
})
</script>
<style lang="scss" scoped>
.scheme_contenteditable {
  margin: 0;
  padding: 5px 5px 5px 25px;
  box-sizing: border-box;
  line-height: 100%;
  text-align: center;
  background: none;
  border: 0;
  height: 9mm;
  width: 38mm;
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  transition: 0.2s;
  &:focus {
    outline: 1px solid #00000000; /* зеленая обводка */
    transition: 0.5s ease;
    border-radius: 2px;
    box-shadow: 0px 0px 20px #000;
    background: #ffffff00;
  }
}
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
.phase-line__wrap {
  position: absolute;
  top: 10px;
  left: 8px;
  display: flex;
  flex-direction: column;
}
.phase-line {
  border-bottom: 1px solid #000;
  width: 2.5mm;
  margin-top: 3px;
  transform: rotate(45deg);
}
.input-line {
  width: 100%;
  border-top: 2px solid #000;
}
.input-cable {
  position: absolute;
  right: 8cm;
  top: 4cm;
}

.input-node {
  width: 155px;
  height: 55px;
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
  object-fit: cover;
  object-position: bottom;
}
.connection {
  position: absolute;
}

.powerLine-info {
  font-size: 3mm;
}
</style>
