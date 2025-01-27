<template>
  <div class="popup" @click.stop>
    <label>Размер шрифта:</label>
    <input type="number" min="1" max="20" v-model="activeFontSize" @change="updateFontSize" />
    <button @click="closeFontSizePopup">ok</button>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue"

const fontSizePopup = ref(false)
const activeElement = ref(null)
const activeFontSize = ref(10)
const fontSizes = reactive({
  Производитель: 10,
  Автомат: 10,
  Класс: 10,
  Номинал: 10,
})
const closeFontSizePopup = () => {
  fontSizePopup.value = false
}
const updateFontSize = () => {
  if (activeElement.value && activeFontSize.value >= 1 && activeFontSize.value <= 20) {
    fontSizes[activeElement.value] = activeFontSize.value
  }
}
</script>
<style lang="scss"></style>
