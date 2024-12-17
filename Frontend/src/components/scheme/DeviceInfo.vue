<template>
  <div class="text__wrap">
    <p>ABB</p>
    <p>{{ props.textData?.["Автомат"].replace(/\s/g, "") }}</p>
    <p>{{ props.textData?.["Номинал"] ? props.textData?.["Номинал"] + "А" : "" }}</p>
    <p>{{ props.textData?.["Ток утечки УЗО"] }}</p>
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
