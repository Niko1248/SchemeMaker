<template>
  <div class="text__wrap">
    <input
      type="text"
      v-model="props.textData['Производитель']"
      :style="{ fontSize: fontSizes['Производитель'] + 'px' }"
      @click="handleFontSizeInput('Производитель')"
    />
    <input
      type="text"
      v-model="props.textData['Автомат']"
      @input="props.textData['Автомат'] = props.textData['Автомат'].replace(/\s/g, '')"
      :style="{ fontSize: fontSizes['Автомат'] + 'px' }"
      @click="handleFontSizeInput('Автомат')"
    />
    <div class="text__wrap-class-den">
      <input
        type="text"
        v-model="nominalInputValue"
        :style="{ fontSize: fontSizes['Номинал'] + 'px' }"
        @click="handleFontSizeInput('Номинал')"
        style="text-transform: lowercase"
      />
    </div>
    <div class="text__wrap-uzo">
      <input
        type="text"
        v-model="uzolInputValue"
        :style="{ fontSize: fontSizes['Тип УЗО'] + 'px' }"
        @click="handleFontSizeInput('Тип УЗО')"
      />
    </div>
    <div class="font-size__popup" @click.stop v-if="fontSizePopup && schemeDataStore.fontSizeMod">
      <label>Размер шрифта:</label>
      <input type="number" min="1" max="11" v-model="activeFontSize" @change="updateFontSize" />
      <button @click.prevent="closeFontSizePopup">ok</button>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"

const props = defineProps({
  textData: { type: Object },
})
const schemeDataStore = useSchemeDataStore()

const fontSizePopup = ref(false)
const activeElement = ref(null)
const activeFontSize = ref(10)
const fontSizes = reactive({
  Производитель: 10,
  Автомат: 10,
  Класс: 10,
  Номинал: 10,
  "Тип УЗО": 10,
  "Ток утечки УЗО": 10,
})

const closeFontSizePopup = () => {
  fontSizePopup.value = false
}
const updateFontSize = () => {
  if (activeElement.value && activeFontSize.value >= 1 && activeFontSize.value <= 20) {
    fontSizes[activeElement.value] = activeFontSize.value
  }
}
const handleFontSizeInput = (element) => {
  activeElement.value = element
  activeFontSize.value = fontSizes[element]
  fontSizePopup.value = true
}
const nominalInputValue = computed(() => {
  const classValue = props.textData["Класс"] || ""
  const nominalValue = props.textData["Номинал"]
  let result = classValue
  if (nominalValue) {
    result += `${nominalValue}мА`
  }
  return result.trim()
})
const uzolInputValue = computed(() => {
  const classValue = props.textData["Тип УЗО"] || ""
  const nominalValue = props.textData["Ток утечки УЗО"]
  let result = classValue
  if (nominalValue) {
    result += `${nominalValue}мА`
  }
  return result.trim()
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
    background: none;
    border: 0;
    height: 15px;
    box-sizing: border-box;
    outline: none;
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
  max-width: 20mm;
  input {
    max-width: 10mm;
    border: none;
    box-sizing: border-box;
    &:focus {
      outline: 1px dashed #000000; /* зеленая обводка */
      transition: 0.5s ease;
      border-radius: 2px;
      box-shadow: 0px 0px 20px #000;
      background: #ffffff00;
    }
  }
}
.text__wrap-uzo {
  display: flex;
  justify-content: center;
  input {
    max-width: 10mm;
  }
}
.font-size__popup {
  position: absolute;
  top: 110%;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 999;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: spa;
  input {
    font-size: 13px;
  }
  button {
    width: 100%;
  }
}
</style>
