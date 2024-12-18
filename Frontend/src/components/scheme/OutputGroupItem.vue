<template>
  <div>
    <div v-if="props.checkLinePE !== -1" class="node-connection">
      <img class="connection" src="../../assets/img/connection+PE.svg" alt="" />
    </div>
    <div v-else class="node-connection">
      <img class="connection" src="../../assets/img/connection.svg" alt="" />
    </div>
    <img
      v-if="props.checkLinePE !== -1"
      class="connection-line-PE_node"
      src="../../assets/img/connection-line+PE.svg"
    />
    <div class="node-el node-connection-line">
      <img src="../../assets/img/connection-line.svg" alt="" />
    </div>
    <!-- Первый объект (УЗО или линия) -->
    <div class="node-el node-el-1">
      <div v-if="props.firstObject">
        <img class="node-el-1-Q" src="../../assets/img/QD.svg" alt="" />
        <DeviceInfo :textData="firstObject" />
      </div>
      <div v-else>
        <img src="../../assets/img/connection-line.svg" alt="" />
        <img
          v-if="props.checkLinePE !== -1"
          class="connection-line-PE_node"
          src="../../assets/img/connection-line+PE.svg"
        />
      </div>
    </div>
    <!-- Второй объект (автомат, дифавтомат или линия) -->
    <div class="node-el node-el-2">
      <div v-if="props.secondObject?.['Тип'] === 'QF'">
        <img src="../../assets/img/QF.svg" alt="" />
        <DeviceInfo :textData="secondObject" />
      </div>
      <div v-else-if="props.secondObject?.['Тип'] === 'QFD'">
        <img src="../../assets/img/QFD.svg" alt="" />
        <DeviceInfo :textData="secondObject" />
      </div>
      <img v-else src="../../assets/img/connection-line.svg" alt="" />
      <img
        v-if="props.checkLinePE !== -1 && props.secondObject?.['Тип'] === 'QF'"
        class="connection-line-PE_Q"
        src="../../assets/img/connection-line+PE-Q.svg"
      />
      <img
        v-if="props.checkLinePE !== -1 && props.secondObject?.['Тип'] === 'QFD'"
        class="connection-line-PE_Q"
        src="../../assets/img/connection-line+PE-QFD.svg"
      />
    </div>
    <!-- Стрелка + кабель -->
    <div class="node-el node-arrow">
      <img src="../../assets/img/arrow2.svg" alt="" />
    </div>
    <div class="cable-info">
      {{ props.itemData?.["Данные"]?.[0]?.["Провод"] }}
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
import DeviceInfo from "./DeviceInfo.vue"
const props = defineProps({
  checkLinePE: { type: Number },
  firstObject: { type: Object },
  secondObject: { type: Object },
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
  top: 20px;
  display: flex;
  flex-direction: column;
}
.phase-line {
  border-bottom: 1px solid #000;
  width: 3mm;
  margin-top: 5px;
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
.cable-info {
  position: absolute;
  bottom: 0;
  left: -50px;
  transform: rotate(-90deg);
  width: max-content;
  font-size: 12px;
}
</style>
