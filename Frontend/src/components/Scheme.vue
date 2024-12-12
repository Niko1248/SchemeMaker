<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp">
        <div class="input-Q">
          <img class="input-Q-img" src="./../assets/img/input.svg" alt="" />
          <img src="./../assets/img/QD.svg" alt="" />
          <img src="./../assets/img/QF.svg" alt="" />
          <img class="connection" src="./../assets/img/connection-3.svg" alt="" />
        </div>
        <div class="input-line"></div>
        <div class="input-node"></div>
      </div>
      <div class="power__wrapp">
        <div class="power-line">
          <div class="L"></div>
          <div class="N"></div>
          <div class="PE">
            <div class="PE-line">
              <svg width="1000" height="20">
                <line x1="0" y1="9" x2="1000" y2="9" stroke="black" stroke-width="1" stroke-dasharray="70, 20" />
              </svg>
            </div>
          </div>
        </div>
        <div class="power-nodes__wrapp"></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
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
}
.input__wrapp {
  margin-bottom: 0mm;
  display: flex;
  flex-direction: row;
  width: 190mm;
  transform: translateX(20mm);
}
.input-Q {
  position: relative;
  display: flex;
  flex-direction: column;
}
.input-Q-img {
  transform: translateX(2.15mm);
}
.input-line {
  width: 100%;
  height: 0.5mm;
  border-top: 0.5mm solid #000;
}
.input-node {
  width: 60mm;
  height: 16mm;
  border: 0.5mm solid #000;
  border-top: none;
  transform: translateY(-8mm);
}
.connection {
  position: absolute;
  top: 100%;
}
.L {
  height: 1mm;
  width: auto;
  border: 0.5mm solid #000;
}
.N {
  height: 1mm;
  width: auto;
  margin-top: 1mm;
  border-bottom: 0.5mm solid #000;
}
.PE {
  height: 1mm;
  width: auto;
}
.PE-line {
  overflow: hidden;
}
.power-line {
  margin-top: 3.4mm;
}
.power-nodes__wrapp {
  display: flex;
  flex-direction: row;
}
</style>
