<template>
  <div class="text__wrap">
    <input type="text" v-model="props.textData['Производитель']" />
    <input
      type="text"
      v-model="props.textData['Автомат']"
      @input="props.textData['Автомат'] = props.textData['Автомат'].replace(/\s/g, '')"
    />
    <div class="text__wrap-class-den">
      <input type="text" v-model="props.textData['Класс']" style="text-transform: lowercase" />
      <input
        type="text"
        v-model="props.textData['Номинал']"
        @input="
          props.textData['Номинал'] = props.textData['Номинал']
            ? props.textData['Номинал'].replace(/[^0-9]/g, '') + 'А'
            : ''
        "
      />
    </div>
    <input
      type="text"
      v-model="props.textData['Ток утечки УЗО']"
      @input="props.textData['Ток утечки УЗО'] = props.textData['Ток утечки УЗО'].replace(/[^0-9]/g, '') + 'мА'"
    />
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
  max-width: 12mm;
  left: -49px;
  top: 0;
  display: flex;
  flex-direction: column;
  input {
    margin: 0;
    padding: 0;
    line-height: 100%;
    font-size: 10px;
    text-align: center;
    border: 0;
    background-color: transparent;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 0px 20px #000;
      background: #ffffff00;
    }
  }
}
.text__wrap-class-den {
  display: flex;
  justify-content: center;
  input {
    max-width: 5mm;
    border: none;
    box-sizing: border-box;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 0px 20px #000;
      background: #ffffff00;
    }
    &:first-child {
      text-align: center;
      padding-left: 2mm;
    }
    text-align: start;
  }
}
</style>
