<template>
  <div class="scheme">
    <div class="scheme__wrapp">
      <div class="input__wrapp">
        <div class="input-Q">
          <div class="input-q-wrapp"><img class="input-Q-img" src="./../assets/img/input.svg" alt="" /></div>
          <div><img src="./../assets/img/QD.svg" alt="" /></div>
          <div><img src="./../assets/img/QF.svg" alt="" /></div>
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
          <div class="N"></div>
          <div class="PE">
            <div class="PE-line">
              <svg width="1000" height="20">
                <line x1="0" y1="9" x2="1000" y2="9" stroke="black" stroke-width="1" stroke-dasharray="70, 20" />
              </svg>
            </div>
          </div>
        </div>
        <div class="power-nodes__wrapp">
          <div class="power-node-item">
            <div class="node-connetcion">
              <img src="./../assets/img/connection-3.svg" alt="" />
            </div>
            <div class="node-el node-el-1">
              <img src="./../assets/img/connection-line.svg" alt="" />
            </div>
            <div class="node-el node-el-2">
              <div class="node-el-2-param__wrapp">
                <p>ABB</p>
                <p>sh201l</p>
                <p>с32А</p>
              </div>
              <img src="./../assets/img/QF-3.svg" alt="" />
            </div>
            <div class="node-el node-el-3">
              <div class="node-el-3-param__wrapp">
                <p>ВВГнг(А)-LS</p>
                <p>3х6</p>
              </div>

              <img src="./../assets/img/arrow.svg" alt="" />
            </div>
          </div>
        </div>
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
.power-node-item {
  margin-left: 30px;
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
  position: relative;
}
.node-el-2 {
  transform: translateX(-8px);
}
.node-el-2-param__wrapp {
  position: absolute;
  text-align: center;
  width: 80px;
  top: -20%;
  left: -200%;
  p {
    margin: 0;
    font-size: 14px;
  }
}
.node-el-3-param__wrapp {
  transform: rotate(-90deg);
  position: absolute;
  text-align: center;
  width: 80px;
  top: 25%;
  left: -115%;
  p {
    margin: 0;
    font-size: 10px;
  }
}
</style>
