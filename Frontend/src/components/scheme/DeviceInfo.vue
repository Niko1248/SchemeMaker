<template>
  <div class="text__wrap">
    <TextEditable element="Производитель" :uniqueID="uniqueID">
      {{ props.textData["Производитель"] }}
    </TextEditable>
    <TextEditable element="Автомат" :uniqueID="uniqueID">
      {{ props.textData["Автомат"] }}
    </TextEditable>
    <div class="text__wrap-class-den">
      <TextEditable element="Номинал" :uniqueID="uniqueID">
        {{ nominalInputValue }}
      </TextEditable>
    </div>
    <TextEditable element="Тип УЗО" :uniqueID="uniqueID">
      {{ uzolInputValue }}
    </TextEditable>
  </div>
</template>
<script setup>
import { computed } from "vue"
import TextEditable from "../UI/TextEditable.vue"

const props = defineProps({
  textData: { type: Object },
})

const uniqueID = computed(() => {
  return (
    "Line" +
    "-" +
    props.textData["Вводной щит"] +
    "-" +
    props.textData["Группа"] +
    "-" +
    props.textData["Тип"] +
    "-" +
    props.textData["Номинал"]
  )
})

// Методы
const nominalInputValue = computed(() => {
  const classValue = props.textData["Класс"] || ""
  const nominalValue = props.textData["Номинал"]
  let result = classValue
  if (nominalValue) {
    result += `${nominalValue}`
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
  width: 46px;
  right: 80px;
  top: 0;
  display: flex;
  flex-direction: column;
}
.text__wrap-item {
  height: 12px;
}
.text__wrap-class-den {
  display: flex;
  justify-content: center;
  max-width: 20mm;
  .scheme_contenteditable {
    max-width: 10mm;
    border: none;
    box-sizing: border-box;
  }
}
.text__wrap-uzo {
  display: flex;
  justify-content: center;
  .scheme_contenteditable {
    max-width: 10mm;
  }
}

.text__wrap-class-den {
  display: flex;
  justify-content: center;
  max-width: 20mm;
  .scheme_contenteditable {
    max-width: 10mm;
    border: none;
    box-sizing: border-box;
  }
}
.text__wrap-uzo {
  display: flex;
  justify-content: center;
  .scheme_contenteditable {
    max-width: 10mm;
  }
}
</style>
