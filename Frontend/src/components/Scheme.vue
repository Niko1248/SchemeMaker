<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp">
        <div class="input-Q">
          <div class="input-q-wrapp"><img class="input-Q-img" src="./../assets/img/input.svg" /></div>
          <div>
            <div v-if="firstObject(props.inputDeviceData)" class="node">
              <img src="./../assets/img/QD.svg" />
              <div class="text__wrap">
                <p>ABB</p>
                <p>{{ firstObject(props.inputDeviceData)?.["Автомат"] }}</p>
                <p>{{ firstObject(props.inputDeviceData)?.["Номинал"] + "А" }}</p>
                <p>{{ firstObject(props.inputDeviceData)?.["Ток утечки УЗО"] }}</p>
              </div>
            </div>
            <img v-else src="./../assets/img/connection-3.svg" />
          </div>
          <div>
            <div class="node" v-if="secondObject(props.inputDeviceData)?.['Тип'] === 'QF'">
              <img src="./../assets/img/QF.svg" />
              <div class="text__wrap">
                <p>ABB</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Автомат"] }}</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Номинал"] + "А" }}</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Ток утечки УЗО"] }}</p>
              </div>
            </div>
            <div class="node" v-else-if="secondObject(props.inputDeviceData)?.['Тип'] === 'QFD'">
              <div class="text__wrap">
                <p>ABB</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Автомат"] }}</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Номинал"] + "А" }}</p>
                <p>{{ secondObject(props.inputDeviceData)?.["Ток утечки УЗО"] }}</p>
              </div>
              <img src="./../assets/img/QFD.svg" alt="" />
            </div>
            <img v-else src="./../assets/img/connection-3.svg" alt="" />
          </div>
          <div><img class="connection" src="./../assets/img/connection-3.svg" alt="" /></div>
        </div>
        <div class="input-line"></div>
        <div class="input-node">
          <div class="input-node-item"><img class="" src="./../assets/img/input-Щит.svg" alt="" /></div>
          <div class="input-node-item"><img class="" src="./../assets/img/connection-Щит.svg" alt="" /></div>
        </div>
      </div>
      <div class="power__wrapp">
        <div class="power-line">
          <div class="L"></div>
          <div class="N">
            <div class="N-line">
              <svg width="1000" height="14">
                <line x1="0" y1="0" x2="1000" y2="0" stroke="black" stroke-width="1" />
              </svg>
            </div>
          </div>
          <div class="PE">
            <div class="PE-line">
              <svg width="1000" height="20">
                <line x1="0" y1="8" x2="1000" y2="8" stroke="black" stroke-width="0.5" stroke-dasharray="70, 30" />
              </svg>
            </div>
          </div>
        </div>
        <div class="power-nodes__wrapp">
          <div class="power-node-item" v-for="(item, index) in props.outputDevicesData" :key="'outputLine-' + index">
            <div class="node-connetcion">
              <img src="./../assets/img/connection-3.svg" alt="" />
            </div>
            <div class="node-el node-connection-line">
              <img src="./../assets/img/connection-line.svg" alt="" />
            </div>
            <div class="node-el node-el-1">
              <div v-if="firstObject(item)">
                <img src="./../assets/img/QD.svg" alt="" />
                <div class="text__wrap">
                  <p>ABB</p>
                  <p>{{ firstObject(item)?.["Автомат"] }}</p>
                  <p>{{ firstObject(item)?.["Номинал"] }}</p>
                  <p>{{ firstObject(item)?.["Ток утечки УЗО"] }}</p>
                </div>
              </div>
              <img v-else src="./../assets/img/connection-line.svg" alt="" />
            </div>
            <div class="node-el node-el-2">
              <div v-if="secondObject(item)?.['Тип'] === 'QF'">
                <img src="./../assets/img/QF-3.svg" alt="" />
                <div class="text__wrap">
                  <p>ABB</p>
                  <p>{{ secondObject(item)?.["Автомат"] }}</p>
                  <p>{{ secondObject(item)?.["Номинал"] }}</p>
                  <p>{{ secondObject(item)?.["Ток утечки УЗО"] }}</p>
                </div>
              </div>
              <div v-else-if="secondObject(item)?.['Тип'] === 'QFD'">
                <img src="./../assets/img/QFD.svg" alt="" />
                <div class="text__wrap">
                  <p>ABB</p>
                  <p>{{ secondObject(item)?.["Автомат"] }}</p>
                  <p>{{ secondObject(item)?.["Номинал"] }}</p>
                  <p>{{ secondObject(item)?.["Ток утечки УЗО"] }}</p>
                </div>
              </div>
              <img v-else src="./../assets/img/connection-line.svg" alt="" />
            </div>
            <div class="node-el node-arrow">
              <img src="./../assets/img/arrow.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
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
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 50mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
  top: 8mm; //     Позицианирование относительно левой таблицы  "Данные питающей сети"
}
.power__wrapp {
  max-width: 220mm;
  display: flex;
  flex-direction: column;
  width: min-content;
}
.input__wrapp {
  margin-bottom: 0mm;
  display: flex;
  flex-direction: row;
  width: 190mm;
  transform: translateX(15mm);
}
.input-Q {
  position: relative;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
  }
}
.input-q-wrapp {
  position: relative;
  height: 35px;
}
.input-Q-img {
  transform: translateX(2.15mm);
  margin-bottom: 0.5mm;
  position: absolute;
}
.input-line {
  width: 100%;
  height: 0.5mm;
  border-top: 0.5mm solid #000;
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
.connection {
  position: absolute;
  top: 100%;
  transform: translateX(8px);
}
.L {
  height: 1mm;
  width: auto;
  border: 0.5px solid #000;
}
.N {
  height: 1mm;
  width: auto;
  margin-top: 5px;
  overflow: hidden;
}

.PE {
  height: 1mm;
  width: auto;
}
.PE-line,
.N-line {
  overflow: hidden;
  svg {
    width: 100%;
  }
}
.power-line {
  margin-top: 3.4mm;
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
  &:nth-child(1) {
  }
}
////

.node-connetcion {
  display: flex;
  position: relative;
  height: 21px;
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
.node-el-2 {
  transform: translateX(-8px);
}
.node {
  position: relative;
}
.text__wrap {
  position: absolute;
  left: -33px;
  top: 0;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    line-height: 120%;
    font-size: 10px;
    text-align: center;
  }
}
</style>
