<template>
  <div class="left-table-outside-the-frame">
    <div class="left-table-outside-the-frame__one">
      <div class="left-table-outside-the-frame__one--row-1">
        <div>Инв.№ подл.</div>
        <div>Подпись и дата</div>
        <div>Взам.инв.№</div>
      </div>
      <div class="left-table-outside-the-frame__one--row-2">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="left-table-outside-the-frame__two">
      <div class="left-table-outside-the-frame__two--row-1">СОГЛАСОВАНО</div>
      <div class="left-table-outside-the-frame__two--row-2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="left-table-outside-the-frame__two--row-3">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="left-table-outside-the-frame__two--row-4">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
@use "../../scss/size.scss" as size;

.left-table-outside-the-frame {
  position: absolute;
  bottom: 0;
  transform: rotate(-90deg) translate(-0.3mm, -0.3mm);
  transform-origin: bottom left; /* Центр для изменения масштаба */
  display: flex;
  height: 20mm;
  width: 150mm;
  align-items: end;
}
.left-table-outside-the-frame__one {
  width: 60%;
  height: 12mm;
  border: 0.5mm solid #000;
  border-right: none;
  border-bottom: none;
  display: flex;
  flex-direction: column;
}
.left-table-outside-the-frame__two--row-1 {
  border-top: 1px solid #000;
}
.left-table-outside-the-frame__one--row-1,
.left-table-outside-the-frame__one--row-2 {
  display: flex;
  width: 100%;
  height: 5mm;
  box-sizing: border-box;
  border-bottom: 0.5mm solid #000;
  div {
    text-align: center;
    width: 25mm;
    &:nth-child(2) {
      width: 35mm;
      border-left: 0.5mm solid #000;
      border-right: 0.5mm solid #000;
    }
  }
}
.left-table-outside-the-frame__one--row-2 {
  height: 7mm;
  border-bottom: none;
}

.left-table-outside-the-frame__two {
  height: 20mm;
  border: 0.5mm solid #000;
  border-bottom: none;
  display: flex;
  flex-direction: column;
  letter-spacing: 1.2mm;

  div {
    height: 5mm;
    border-bottom: 0.5mm solid #000;
    text-align: center;
    &:nth-child(4) {
      border-bottom: none;
    }
  }
}

.left-table-outside-the-frame__two--row-2,
.left-table-outside-the-frame__two--row-3,
.left-table-outside-the-frame__two--row-4 {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  div {
    &:nth-child(1) {
      width: 12.4mm;
      border-right: 0.5mm solid #000;
      border-bottom: none;
    }
    &:nth-child(2) {
      width: 27.6mm;
      border-right: 0.5mm solid #000;
      border-bottom: none;
    }
    &:nth-child(3) {
      width: 15mm;
      border-right: 0.5mm solid #000;
      border-bottom: none;
    }
    &:nth-child(4) {
      width: 10mm;
      border-right: none;
      border-bottom: none;
    }
  }
}
.left-table-outside-the-frame__two--row-4 {
  div {
    height: 17px;
  }
}
</style>
