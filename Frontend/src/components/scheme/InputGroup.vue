<template>
  <div class="input-Q">
    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1" class="input-q-wrapp">
      <img class="" src="../../assets/img/input+PE.svg" />
    </div>
    <div v-else class="input-q-wrapp PE--transformX">
      <img class="input-Q-img" src="../../assets/img/input.svg" />
    </div>

    <!-- Первый объект  -->
    <FirstObjectInput :data="schemeDataStore.inputDeviceData" />

    <!-- Второй объект  -->
    <SecondObjectInput :data="schemeDataStore.inputDeviceData" />

    <!-- Линии фазы -->
    <div class="phase-line__wrap">
      <div v-for="index in checkPhase(schemeDataStore.inputDeviceData)" :key="index" class="phase-line"></div>
    </div>

    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1">
      <img class="connection" src="../../assets/img/connection+PE.svg" alt="" />
    </div>
    <div v-else>
      <img class="connection PE--transformX connection-1" src="../../assets/img/connection.svg" alt="" />
    </div>
  </div>
  <!-- Линия и ввод -->
  <div class="input-line"></div>
  <div class="input-cable">
    <p>
      {{ checkInputCableMarka + checkInputCableSize }}
    </p>
  </div>
  <div class="input-node">
    <img src="../../assets/img/input-connection2.svg" alt="" />

    <div
      contenteditable="true"
      :style="{ fontSize: fontSizes['Ввод'] + 'px' }"
      @click="handleFontSizeInput('Ввод')"
      class="input-name scheme_contenteditable"
      @click.stop="openFontSizePopup"
    >
      {{ "от " + checkInputName["Наименование потребителя"] }}
    </div>
    <div class="input-phase">
      <p class="powerLine-info" v-if="schemeDataStore.inputPhase?.length > 1">~380/220В</p>
      <p v-else class="powerLine-info">~220В</p>
    </div>
    <!--     <div class="font-size__popup" @click.stop v-if="fontSizePopup && schemeDataStore.fontSizeMod">
      <div class="font-size__popup--wrapp">
        <span
          >A
          <p>A</p></span
        >
        <input type="number" min="1" max="11" v-model="activeFontSize" @change="updateFontSize" />
      </div>
    </div> -->
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
import { ref, reactive, computed, onMounted, onUnmounted } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import FirstObjectInput from "./FirstObjectInput.vue"
import SecondObjectInput from "./SecondObjectInput.vue"

const schemeDataStore = useSchemeDataStore()
const fontSizePopup = ref(false)
const activeElement = ref(null)
const fontSizePopupVisible = ref(false)
const activeFontSize = ref(12)
const fontSizes = reactive({
  Ввод: 12,
})
/* const fontSizePopupRef = ref(null) // Ссылка на элемент попапа
 */
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
    fontSizes[activeElement.value] = activeFontSize.value
  }
}

const handleFontSizeInput = (element) => {
  activeElement.value = element
  activeFontSize.value = fontSizes[element]
  fontSizePopup.value = true
}

/* const handleClickOutside = (event) => {
  if (fontSizePopupRef.value && !fontSizePopupRef.value.contains(event.target)) {
    fontSizePopup.value = false
  }
} */

const checkPhase = (data) => {
  const phaseArr = data?.["Данные"]?.[0]?.["Фаза"].split(",").map((el) => el.trim())

  let arrLength = Math.min(phaseArr.length, 3)

  if (phaseArr.includes("N")) {
    arrLength -= 1
  }
  return arrLength
}

const checkInputCableMarka = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})

const checkInputCableSize = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})

const checkInputName = computed(() => {
  return schemeDataStore.inputDeviceData?.["Данные"].find((obj) => obj["Наименование потребителя"])
})
</script>
<style lang="scss" scoped>
.scheme_contenteditable {
  margin: 0;
  padding: 5px 5px 5px 25px;
  box-sizing: border-box;
  line-height: 100%;
  text-align: center;
  background: none;
  border: 0;
  height: 13mm;
  max-height: 13mm;
  width: 38mm;
  box-sizing: border-box;
  outline: none;
  background-color: transparent;
  transition: 0.2s;
  &:focus {
    outline: 1px solid #00000000; /* зеленая обводка */
    transition: 0.5s ease;
    border-radius: 2px;
    box-shadow: 0px 0px 20px #000;
    background: #ffffff00;
  }
}
.input-Q {
  position: relative;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: flex-start;
  }
}
.input-q-wrapp {
  position: relative;
  height: 23px;
}

.input-Q-img {
  margin-bottom: 0.5mm;
  position: absolute;
}
.phase-line__wrap {
  position: absolute;
  top: 10px;
  left: 8px;
  display: flex;
  flex-direction: column;
}
.phase-line {
  border-bottom: 1px solid #000;
  width: 2.5mm;
  margin-top: 3px;
  transform: rotate(45deg);
}
.input-line {
  width: 100%;
  border-top: 1px solid #000;
}
.input-cable {
  position: absolute;
  right: 8cm;
  top: -5mm;
}

.input-node {
  width: 52mm;
  height: 13mm;
  background: url("../../assets/img/input-border.svg");
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-7mm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    position: absolute;
    left: 0;
    top: 19px;
  }
}
.PE--transformX {
  transform: translateX(-8px);
}
.connection-1 {
  width: 27px;
  height: 27px;
  object-fit: cover;
  object-position: bottom;
}
.connection {
  position: absolute;
  top: 100%;
}
.powerLine-info {
  font-size: 3mm;
}
</style>
