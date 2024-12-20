<template>
  <div class="input-Q">
    <div v-if="props.checkLinePE !== -1" class="input-q-wrapp">
      <img class="" src="../../assets/img/input+PE.svg" />
    </div>
    <div v-else class="input-q-wrapp PE--transformX">
      <img class="input-Q-img" src="../../assets/img/input.svg" />
    </div>
    <!-- Первый объект (УЗО или линия) -->
    <div>
      <div>
        <div v-if="props.firstObject" class="node">
          <img src="../../assets/img/QD.svg" />
          <DeviceInfo :textData="props.firstObject" />
        </div>
        <img v-else src="../../assets/img/connection-line.svg" />
        <div v-if="props.checkLinePE !== -1">
          <img src="../../assets/img/connection-line+PE.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- Второй объект (автомат, дифавтомат или линия) -->
    <div>
      <div class="node" v-if="props.secondObject?.['Тип'] === 'QF'">
        <img src="../../assets/img/QF-1.svg" />
        <DeviceInfo :textData="props.secondObject" />
      </div>
      <div class="node" v-else-if="props.secondObject?.['Тип'] === 'QFD'">
        <DeviceInfo :textData="props.secondObject" />
        <img src="../../assets/img/QFD.svg" alt="" />
      </div>
      <img v-else src="../../assets/img/connection-line.svg" />
      <div v-if="props.checkLinePE !== -1">
        <img src="../../assets/img/connection-line+PE.svg" alt="" />
      </div>
    </div>

    <div v-if="props.checkLinePE !== -1">
      <img class="connection" src="../../assets/img/connection+PE.svg" alt="" />
    </div>
    <div v-else><img class="connection PE--transformX" src="../../assets/img/connection.svg" alt="" /></div>
  </div>
  <!-- Линия и ввод -->
  <div class="input-line"></div>
  <!-- <div class="input-cable">
    <p v-if="props.firstObject?.['Марка кабеля']">
      {{ props.firstObject["Марка кабеля"] + props.firstObject?.["Сечение кабеля"] }}
    </p>
    <p v-else-if="props.secondObject?.['Марка кабеля']">
      {{ props.secondObject["Марка кабеля"] + props.secondObject?.["Сечение кабеля"] }}
    </p>
  </div> -->
  <div class="input-node">
    <div class="input-node-item"><img class="" src="../../assets/img/input-QF.svg" alt="" /></div>
    <div class="input-node-item"><img class="" src="../../assets/img/input-connection.svg" alt="" /></div>
  </div>
</template>

<script setup>
import DeviceInfo from "./DeviceInfo.vue"
const props = defineProps({
  checkLinePE: { type: Number },
  firstObject: { type: Object },
  secondObject: { type: Object },
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
  height: 24px;
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
  top: -1cm;
}
.node {
  position: relative;
}
.input-node {
  width: 60mm;
  height: 20mm;
  border: 0.5mm solid #000;
  transform: translateY(-10mm);
  display: flex;
  flex-direction: row;
  align-items: start;
  div {
    margin-top: 21.5px;
  }
}
.PE--transformX {
  transform: translateX(-8px);
}
.connection {
  position: absolute;
  top: 100%;
}
</style>
