<template lang="">
  <div class="circuit-scheme">
    <div class="circuit-scheme-item1">Данные питающей сети</div>
    <div class="circuit-scheme-item2"><p>ЩИТ РАСПРЕДЕЛИТЕЛЬНЫЙ, НОМЕР ПО ПЛАНУ, ТИП</p></div>
    <div class="circuit-scheme-item3">
      <div class="flex--wrapper">
        <div>Аппарат отходящей линии</div>
        <div>Аппарат учета, вводной защитный аппарат</div>
      </div>
    </div>
    <div class="circuit-scheme-item4">
      <p>Прибор учета эл. энергии</p>
      <p>Вводной коммут. аппарат</p>
      <p>Тип вводного УЗО</p>
      <p>номинальный рабочий ток</p>
      <p>ном. дифференциальный ток</p>
      <p>Тип вводного автомат. выкл</p>
      <p>ток эл. магн. расцепителя</p>
    </div>
    <div class="circuit-scheme-item5">
      <p>Фазность</p>
      <p>Рабочее напряжение</p>
      <p>Общегрупповое УЗО</p>
      <p>(Общегрупповой авт. выкл.)</p>
      <p>номинальный рабочий ток</p>
      <p>(ток эл. магн. расцепителя)</p>
      <p>ном. дифференциальный ток</p>
      <p>Выкл. автоматический</p>
      <p>(Дифф. автоматич. выкл.)</p>
      <p>ток эл. магн. расцепителя</p>
      <p>ном. дифференциальный ток</p>
      <p>Фазность</p>
    </div>
    <div class="circuit-scheme-item6">
      Марка и сечение провода (кабеля), <span>мм.</span> Длина участка сети, м.<br />
      Способ прокладки
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "SchemeContainer",
  props: {
    pageData: { type: Array },
    listIndex: { type: Number },
  },
  setup(props) {
    console.log(props.pageData)
  },
})
</script>
<style lang="scss" scoped>
.circuit-scheme {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(2, 5.7mm) 31.5mm;
  grid-template-rows: 4.3mm 27.23mm 49.2mm 15mm;
  border: 0.5mm solid #000;
  width: fit-content;
  border-left: none;
  border-top: none;
}
.circuit-scheme-item1 {
  grid-column: span 3;
  border: 0.5mm solid #000;
  width: 100%;
  font-size: 3mm;
  text-align: center;
  height: 100%;
}

.circuit-scheme-item2,
.circuit-scheme-item3 {
  grid-row: span 2;
  border-right: 0.5mm solid #000;
  width: 100%;
  height: 100%;
  position: relative;
  p {
    display: block;
    position: absolute;
    transform: rotate(-90deg);
    width: calc(27.23mm + 49.2mm);
    font-size: 3mm;
    text-align: center;
    bottom: 0;
    left: 0;
    transform-origin: 3mm 2mm;
    margin: 0;
  }
}
.circuit-scheme-item3 {
  position: relative;
  .flex--wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    transform: rotate(-90deg);
    width: calc(27.23mm + 49.2mm);
    font-size: 3mm;
    transform-origin: 2mm 2mm;
    div {
      width: 47%;
      &:nth-child(2) {
        height: 4mm;
        display: flex;
        justify-content: center;
        text-align: center;
        line-height: 0.9;
      }
    }
  }
}
.circuit-scheme-item4 {
  width: 100%;
  height: 100%;
  border-bottom: 0.5mm solid #000;
}
.circuit-scheme-item4,
.circuit-scheme-item5 {
  box-sizing: border-box;
  padding: 1mm 1mm;
  p {
    margin: 0;
    font-size: 2.4mm;
    font-family: "Times New Roman", Times, serif;
    font-weight: lighter;
    &:nth-child(2) {
      margin-bottom: 2mm;
    }
    &:nth-child(5) {
      margin-bottom: 2mm;
    }
  }
}
.circuit-scheme-item5 {
  display: flex;
  flex-direction: column;
  justify-content: start;
  p {
    &:nth-child(2) {
      margin-bottom: 4mm;
    }
    &:nth-child(5) {
      margin-bottom: 0mm;
    }
    &:nth-child(7) {
      margin-bottom: 4mm;
    }
    &:nth-child(11) {
      margin-bottom: 4mm;
    }
  }
}
.circuit-scheme-item6 {
  grid-column: span 3;
  box-sizing: border-box;
  padding: 1mm 1mm;
  width: 100%;
  height: 100%;
  border-top: 0.5mm solid #000;
  font-size: 2.4mm;
  line-height: 1.4;
  font-family: "Times New Roman", Times, serif;
  span {
    position: relative;
    &::after {
      content: "2";
      position: absolute;
      font-size: 2mm;
      top: -1.3mm;
      left: 3mm;
    }
  }
}
</style>
