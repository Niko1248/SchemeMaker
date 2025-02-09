<template>
  <div class="scheme_contenteditable-wrapper">
    <div
      contenteditable="true"
      class="scheme_contenteditable"
      :style="{ fontSize: dataFontSize + 'px' }"
      @click="handleFontSizeInput"
      @click.stop="openFontSizePopup"
    >
      <slot></slot>
    </div>
    <div class="font-size__popup" v-if="fontSizePopupVisible" @click.stop>
      <div class="font-size__popup--wrapp">
        <span
          >A
          <p>A</p></span
        >
        <input type="number" min="1" max="20" v-model="activeFontSize" @change="updateFontSize" />
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
  textData: { type: [String, Number], default: "" },
})

const schemeDataStore = useSchemeDataStore()
const fontSizePopupVisible = ref(false)
const activeFontSize = ref()

const dataFontSize = computed(() => schemeDataStore.getFontSize(props.uniqueID)[props.element] || 10)

watch(dataFontSize, (newFontSize) => {
  activeFontSize.value = newFontSize
})

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
  if (activeFontSize.value >= 1 && activeFontSize.value <= 20) {
    schemeDataStore.setFontSize(props.uniqueID, props.element, activeFontSize.value)
  }
}

const handleFontSizeInput = () => {
  activeFontSize.value = dataFontSize.value
}
</script>

<style scoped>
.scheme_contenteditable-wrapper {
  position: relative;
}
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
</style>
