<template>
  <div class="text__wrap">
    <p>{{ props.textData?.["Производитель"] }}</p>
    <p>{{ props.textData?.["Автомат"].replace(/\s/g, "") }}</p>
    <div style="display: flex; justify-content: center">
      <p style="text-transform: lowercase">{{ props.textData?.["Класс"] }}</p>
      <p>{{ props.textData?.["Номинал"] ? props.textData?.["Номинал"] + "А" : "" }}</p>
    </div>
    <p>{{ props.textData?.["Ток утечки УЗО"] ? props.textData?.["Ток утечки УЗО"] + "мА " : "" }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  textData: { type: Object },
})
</script>
<style lang="scss" scoped>
.text__wrap {
  position: absolute;
  max-width: 10mm;
  left: -33px;
  top: 0;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    line-height: 100%;
    font-size: 10px;
    text-align: center;
  }
}
</style>
