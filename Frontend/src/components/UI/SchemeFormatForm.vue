<template>
  <div class="format">
    <p class="format-title">Формат схемы</p>
    <div class="format-wrapper">
      <div class="format__item item-1">
        <label
          :style="{
            backgroundColor: schemeDataStore.listFormat === 'A3' ? 'rgba(255, 255, 255, 0.5137254902)' : '',
            color: schemeDataStore.listFormat === 'A3' ? '#000' : '',
          }"
        >
          <input type="radio" v-model="schemeDataStore.listFormat" value="A3" checked />
          A3
        </label>
      </div>
      <div class="format__item item-2">
        <label
          :style="{
            backgroundColor: schemeDataStore.listFormat === 'A4' ? 'rgba(255, 255, 255, 0.5137254902)' : '',
            color: schemeDataStore.listFormat === 'A4' ? '#000' : '',
          }"
        >
          <input type="radio" v-model="schemeDataStore.listFormat" value="A4" />
          A4
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData.js"
const schemeDataStore = useSchemeDataStore()
</script>
<style lang="scss" scoped>
.format {
  font-family: WixMadeforDisplay-Regular;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
}

.format-title {
  margin-bottom: 5px;
}
.format-wrapper {
  display: inline-block;
  font-family: WixMadeforDisplay-Regular;
  width: 100%;
}
.format__item {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  position: relative;

  label {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    transition: 0.3s ease;
    display: inline-block;
    line-height: 26px;
    border: 1px solid rgb(0, 255, 47);
    border-radius: 5px 0px 0px 5px;
    border-right: none;
    user-select: none;
    cursor: url(/cursor-pointer.png), auto;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2470588235);
    }
  }
  &:nth-child(2) {
    label {
      border-radius: 0px 5px 5px 0px;
      border-left: none;
      border-right: 1px solid rgb(0, 255, 47);
    }
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: url(/cursor-pointer.png), auto;
  }
}
</style>
