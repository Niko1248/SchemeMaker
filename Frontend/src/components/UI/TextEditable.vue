<template>
  <div class="scheme_contenteditable-wrapper">
    <div
      contenteditable="true"
      class="scheme_contenteditable"
      ref="editableDiv"
      :style="{ fontSize: dataFontSize + 'px', lineHeight: dataLineHeight }"
      @click="handleFontSizeInput"
      @click.stop="openFontSizePopup"
      @input="handleInput"
    >
      <slot></slot>
    </div>
    <div class="font-size__popup" v-if="isPopupOpen">
      <div class="popup--wrapp">
        <span
          >A
          <p>A</p></span
        >
        <input type="number" min="1" max="72" v-model="activeFontSize" @change="updateFontSize" />
      </div>
      <div class="popup--wrapp">
        <p class="--lh">↨</p>
        <input type="number" step="0.1" min="0" max="10" v-model="activeLineHeight" @change="updateLineHeight" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"

const props = defineProps({
  element: { type: String, required: true },
  uniqueID: { type: String, required: true },
  modelValue: { type: String },
  formatter: { type: Function, default: (value) => value || "" },
})

const editableDiv = ref(null)
const schemeDataStore = useSchemeDataStore()
const activeFontSize = ref(null)
const activeLineHeight = ref()
const emit = defineEmits(["update:modelValue"]) // Определяем событие для обновления значения

// Font-size , line-height попап
// Управление состоянием попапа
const openFontSizePopup = () => {
  schemeDataStore.setOpenPopupId(contentEditableId.value) // Открываем попап для текущего элемента
}

const closeFontSizePopup = () => {
  schemeDataStore.closePopup() // Закрываем попап
}

const handleOutsideClick = (event) => {
  // Закрываем попап при нажатии вне его
  if (!event.target.closest(".font-size__popup")) {
    closeFontSizePopup()
  }
}

// Генерация уникального идентификатора для текущего .scheme_contenteditable
const contentEditableId = computed(() => `${props.uniqueID}-${props.element}`)
// Проверяем, открыт ли попап для текущего .scheme_contenteditable
const isPopupOpen = computed(() => schemeDataStore.openPopupId === contentEditableId.value)

//Работа с даннымми попапа
// Получаем размер шрифта и межстрочный интервал для текущего элемента
const dataFontSize = computed(
  () => schemeDataStore.getFontSize(contentEditableId.value)[props.element] || activeFontSize.value
)
const dataLineHeight = computed(() => schemeDataStore.getLineHeight(contentEditableId.value)[props.element] || 1.2)

const handleFontSizeInput = () => {
  activeFontSize.value = dataFontSize.value
  activeLineHeight.value = dataLineHeight.value
}

const updateFontSize = () => {
  if (activeFontSize.value >= 1 && activeFontSize.value <= 72) {
    schemeDataStore.setFontSize(contentEditableId.value, props.element, activeFontSize.value)
  }
}

const updateLineHeight = () => {
  if (activeLineHeight.value >= 0 && activeLineHeight.value <= 3) {
    schemeDataStore.setLineHeight(contentEditableId.value, props.element, activeLineHeight.value)
  }
}

// Работа с переаднными данными
const handleInput = (event) => {
  const newValue = event.target.innerText
  emit("update:modelValue", newValue) // Вызываем событие для обновления значения
}

// Отслеживание изменений dataFontSize и dataLineHeight
watch([dataFontSize, dataLineHeight], ([newFontSize, newLineHeight]) => {
  activeFontSize.value = newFontSize
  activeLineHeight.value = newLineHeight
})

// Отслеживание изменений modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    if (editableDiv.value) {
      const formattedValue = props.formatter(newValue) // Форматируем значение
      if (editableDiv.value.innerText !== formattedValue) {
        editableDiv.value.innerText = formattedValue
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (editableDiv.value) {
    editableDiv.value.innerText = props.formatter(props.modelValue) // Форматируем начальное значение
  }
  const computedStyle = window.getComputedStyle(editableDiv.value)
  const fontSizeWithPx = computedStyle.getPropertyValue("font-size")
  activeFontSize.value = parseFloat(fontSizeWithPx) // Преобразуем в число

  document.addEventListener("click", handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick)
})
</script>

<style scoped>
.scheme_contenteditable-wrapper {
  position: relative;
}
.scheme_contenteditable {
  margin: 0;
  padding: 0;
  line-height: 1;
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
</style>
