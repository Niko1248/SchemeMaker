<template>
  <div class="text__wrap">
    <TextEditable
      class="text__wrap-item"
      element="Производитель"
      :uniqueID="uniqueID"
      v-model="props.textData['Производитель']"
    />
    <TextEditable class="text__wrap-item" element="Автомат" :uniqueID="uniqueID" v-model="props.textData['Автомат']" />
    <div class="text__wrap-class-den text__wrap-item">
      <TextEditable
        class="text__wrap-item"
        element="Номинал"
        :uniqueID="uniqueID"
        v-model="props.textData['Номинал']"
      />
      <TextEditable class="text__wrap-item" element="Класс" :uniqueID="uniqueID" v-model="props.textData['Класс']" />
    </div>
    <div class="text__wrap-class-den text__wrap-item">
      <TextEditable
        class="text__wrap-item"
        element="Тип УЗО"
        :uniqueID="uniqueID"
        v-model="props.textData['Тип УЗО']"
      />
      <TextEditable
        class="text__wrap-item"
        element="Ток утечки УЗО"
        :uniqueID="uniqueID"
        v-model="props.textData['Ток утечки УЗО']"
        :formatter="formatUZOCurrent"
      />
    </div>
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

// Форматирование значения для "Ток утечки УЗО"
const formatUZOCurrent = (value) => {
  if (value === undefined || value === null || value === "") {
    return "" // Возвращаем пустую строку, если значение отсутствует
  }

  // Проверяем, содержит ли значение "мА"
  const hasMA = value.includes("м") && value.includes("А")

  // Если "мА" уже есть, возвращаем значение как есть
  if (hasMA) {
    return value
  }

  // Удаляем "м" и "А", если они есть в значении
  const cleanedValue = value.replace(/м|А/g, "").trim()

  // Добавляем "мА" только если значение не пустое
  return cleanedValue ? `${cleanedValue}мА` : ""
}
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
  height: 11px;
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
  .text__wrap-item {
    min-width: 2mm;
    word-break: break-all;
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
