<template>
  <div>
    <div v-if="schemeDataStore.checkLinePE(itemData) !== -1" class="node-connection">
      <img class="connection" src="../../assets/img/connection+PE.svg" alt="" />
    </div>
    <div v-else class="node-connection">
      <img class="connection" src="../../assets/img/connection.svg" alt="" />
    </div>
    <div class="node-el-connection-line">
      <img
        v-if="schemeDataStore.checkLinePE(itemData) !== -1"
        style="width: 8px; object-position: 0px 14px"
        class="connection-line-PE_node"
        src="../../assets/img/connection-line+PE.svg"
      />
      <div class="node-el">
        <img
          style="width: 18px"
          src="../../assets/img/connection-line.svg"
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
      <img src="../../assets/img/arrow2.svg" />
    </div>
    <div class="cable-name" v-if="checkInputCableMarka">
      <input type="text" :value="checkInputCableMarka" />
    </div>

    <div class="cable-size" v-if="checkInputCableSize">
      <input type="text" :value="checkInputCableSize" />
    </div>
    <div class="cable-length" v-if="checkInputCableLength">
      <input type="text" :value="'L=' + checkInputCableLength + 'м'" />
    </div>

    <!-- Фазы (линии + текст) -->
    <div class="phase-line__wrap">
      <div v-for="index in checkPhase(props.itemData)" :key="index" class="phase-line"></div>
    </div>
    <div class="phase-text">
      {{ swapPhase(props.itemData) }}
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import FirstObjectOutput from "./FirstObjectOutput.vue"
import SecondObjectOutput from "./SecondObjectOutput.vue"

const schemeDataStore = useSchemeDataStore()
const props = defineProps({
  itemData: { type: Object },
})

const checkPhase = (data) => {
  const phaseArr = data?.["Данные"]?.[0]?.["Фаза"]
    .split(",") // Разбиваем строку в массив
    .map((el) => el.trim()) // Убираем пробелы у каждого элемента

  let arrLength = Math.min(phaseArr.length, 3) // Ограничиваем длину максимум 3.

  if (phaseArr.includes("N")) {
    arrLength -= 1 // Уменьшаем значение на 1, если есть "N".
  }
  return arrLength
}
const swapPhase = (data) => {
  return String(
    data?.["Данные"]?.[0]?.["Фаза"]
      .split(",") // Разбиваем строку на массив
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

const checkInputCableMarka = computed(() => {
  return props.itemData["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})
const checkInputCableSize = computed(() => {
  return props.itemData["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})
const checkInputCableLength = computed(() => {
  return props.itemData["Данные"].find((obj) => obj["Длина кабеля"])?.["Длина кабеля"] || ""
})
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
    transform: rotate(180deg);
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
.cable-size {
  position: absolute;
  bottom: 8mm;
  left: -7mm;
  transform: rotate(-90deg);
  display: flex;
  justify-content: center;
  input {
    max-width: 10mm;
  }
}
.cable-length {
  position: absolute;
  bottom: 18mm;
  left: -7mm;
  transform: rotate(-90deg);
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    max-width: 10mm;
    text-align: start;
  }
}
.secondObjInfo {
  top: 5px;
}
input {
  padding: 0;
  width: 100%;
  border: 0;
  background: none;
  text-align: center;
  height: 15px;
  &:focus {
    outline: 1px dashed #000000; /* зеленая обводка */
    transition: 0.5s ease;
    border-radius: 2px;
    box-shadow: 0px 0px 20px #000;
    background: #ffffff00;
  }
}
</style>
