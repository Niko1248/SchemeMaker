<template>
  <div class="text__wrap">
    <div
      contenteditable="true"
      class="scheme_contenteditable"
      :style="{ fontSize: schemeDataStore.getFontSize(uniqueID)['Производитель'] + 'px' }"
      @click="handleFontSizeInput('Производитель')"
      @click.stop="openFontSizePopup"
    >
      {{ props.textData["Производитель"] }}
    </div>
    <div
      contenteditable="true"
      class="scheme_contenteditable"
      @input="props.textData['Автомат'] = props.textData['Автомат'].replace(/\s/g, '')"
      :style="{ fontSize: schemeDataStore.getFontSize(uniqueID)['Автомат'] + 'px' }"
      @click="handleFontSizeInput('Автомат')"
      @click.stop="openFontSizePopup"
    >
      {{ props.textData["Автомат"] }}
    </div>

    <div class="text__wrap-class-den">
      <div
        style="text-transform: lowercase"
        contenteditable="true"
        class="scheme_contenteditable"
        :style="{ fontSize: schemeDataStore.getFontSize(uniqueID)['Номинал'] + 'px' }"
        @click="handleFontSizeInput('Номинал')"
        @click.stop="openFontSizePopup"
      >
        {{ nominalInputValue }}
      </div>
    </div>
    <div class="text__wrap-uzo">
      <div
        contenteditable="true"
        class="scheme_contenteditable"
        :style="{ fontSize: schemeDataStore.getFontSize(uniqueID)['Тип УЗО'] + 'px' }"
        @click="handleFontSizeInput('Тип УЗО')"
        @click.stop="openFontSizePopup"
      >
        {{ uzolInputValue }}
      </div>
    </div>
    <div class="font-size__popup" v-if="fontSizePopupVisible" @click.stop>
      <div class="font-size__popup--wrapp">
        <span
          >A
          <p>A</p></span
        >
        <input type="number" min="1" max="11" v-model="activeFontSize" @change="updateFontSize" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"

import { useSchemeDataStore } from "../../stores/SchemeData"

const props = defineProps({
  textData: { type: Object },
})
const schemeDataStore = useSchemeDataStore()
const uniqueID = ref("outputLine" + props.textData["Вводной щит"] + props.textData["Группа"])
const fontSizePopupVisible = ref(false)
const activeElement = ref(null)
const activeFontSize = ref()

// Методы
const openFontSizePopup = () => {
  fontSizePopupVisible.value = true
}

const closeFontSizePopup = () => {
  fontSizePopupVisible.value = false
}
const handleOutsideClick = (event) => {
  if (!event.target.closest(".font-size__popup") && fontSizePopupVisible.value) {
    closeFontSizePopup()
  }
}
onMounted(() => {
  document.addEventListener("click", handleOutsideClick)
})

onUnmounted(() => {
  document.removeEventListener("click", handleOutsideClick)
})
const updateFontSize = () => {
  if (activeElement.value && activeFontSize.value >= 1 && activeFontSize.value <= 20) {
    schemeDataStore.setFontSize(uniqueID.value, activeElement.value, activeFontSize.value)
  }
}
const handleFontSizeInput = (element) => {
  activeElement.value = element
  activeFontSize.value = schemeDataStore.getFontSize(uniqueID.value)[element] || 10
}
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
  .scheme_contenteditable {
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
