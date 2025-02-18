<template>
  <div>
    <div v-if="schemeDataStore.checkLinePE(itemData) !== -1" class="node-connection">
      <img class="connection" src="../../assets/img/thick/connection+PE-output.svg" alt="" />
    </div>
    <div v-else class="node-connection">
      <img class="connection" src="../../assets/img/thick/connection-output.svg" alt="" />
    </div>
    <div class="node-el-connection-line">
      <img
        v-if="schemeDataStore.checkLinePE(itemData) !== -1"
        style="width: 8px; object-position: 0px 14px"
        class="connection-line-PE_node"
        src="../../assets/img/thick/connection-line+PE.svg"
      />
      <div class="node-el">
        <img
          style="width: 18px"
          src="../../assets/img/thick/connection-line.svg"
          :style="{
            objectPosition: schemeDataStore.checkLinePE(itemData) !== -1 ? '0px 8px' : '0px 3px',
          }"
        />
      </div>
    </div>

    <!-- Первый объект  -->
    <FirstObjectOutput :data="itemData" />

    <!-- Второй объект -->
    <SecondObjectOutput :data="itemData" />

    <!-- Стрелка + кабель -->
    <div class="node-el node-arrow">
      <img :src="schemeDataStore.listFormat === 'A4' ? arrow2 : arrowA3" />
    </div>
    <div class="--transformRotate90"><CableInfo :data="itemData" /></div>

    <!-- Фазы (линии + текст) -->
    <div class="phase-line__wrap">
      <div
        v-for="index in schemeDataStore.checkPhase(props.itemData).phaseLength"
        :key="index"
        class="phase-line"
      ></div>
    </div>
    <div class="phase-text">
      {{ swapPhase(props.itemData) }}
    </div>
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData"
import FirstObjectOutput from "./FirstObjectOutput.vue"
import SecondObjectOutput from "./SecondObjectOutput.vue"
import arrow2 from "../../assets/img/thick/arrow2.svg"
import arrowA3 from "../../assets/img/thick/arrowA3.svg"
import CableInfo from "./CableInfo.vue"
const schemeDataStore = useSchemeDataStore()

const props = defineProps({
  itemData: { type: Object },
})

const swapPhase = (data) => {
  return String(
    data?.["Данные"]?.[0]?.["Фаза"]
      .map((el) => el.trim()) // Убираем пробелы
      .filter((el) => el !== "N") // Удаляем все элементы "N"
      .map((el) => {
        // Заменяем значения
        if (el === "1") return "A"
        if (el === "2") return "B"
        if (el === "3") return "C"
        return el // Возвращаем неизменное значение, если это не 1, 2 или 3
      })
  )
}
</script>
<style lang="scss" scoped>
.connection {
  position: absolute;
  top: 100%;
}
.node-connection {
  display: flex;
  position: relative;
  height: 10px;
  img {
    position: absolute;
    top: -18px;
  }
}
.node-el {
  display: flex;
  div {
    display: flex;
  }
}
.node-el-1 {
  position: relative;
}
.node-el-2 {
  position: relative;
  transform: translateX(-8px);
}
.phase-line__wrap {
  position: absolute;
  top: 10px;
  display: flex;
  flex-direction: column;
}
.phase-line {
  border-bottom: 1px solid #000;
  width: 3mm;
  margin-top: 3px;
  transform: rotate(45deg);
}
.phase-text {
  position: absolute;
  top: -38px;
}
.connection-line-PE_node {
  position: absolute;
  left: 18px;
}
.connection-line-PE_Q {
  position: absolute;
  left: 13px;
}
.node-el-1-Q {
  transform: translateX(-8px);
}
.node-el-connection-line {
  img {
    height: 20px;
    width: 18px;
    object-fit: cover;
    object-position: 0px 3px;
  }
}
.cable-name,
.cable-size,
.cable-length {
  position: absolute;
  width: 100%;
  font-size: 11px;
}
.cable-name {
  bottom: 12mm;
  transform: rotate(-90deg);
  text-align: center;
  left: -10mm;
  max-width: 70px;
  word-break: break-word;
}
.cable-pref {
  position: absolute;
  bottom: 45px;
  left: -23px;
  width: 75px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
}

.cable-size {
  width: 49%;
  position: unset;
  max-width: 10mm;
  word-break: break-all;
}
.cable-length {
  width: 49%;
  position: unset;
  max-width: 10mm;
  text-align: start;
}
.secondObjInfo {
  top: 5px;
}
</style>
