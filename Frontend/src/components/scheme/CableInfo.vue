<template>
  <div>
    <!-- Название кабеля -->
    <TextEditable
      v-if="checkInputCableMarka"
      class="cable-name"
      :style="{ bottom: schemeDataStore.listFormat === 'A3' ? '34mm' : '12mm' }"
      element="Название кабеля"
      :uniqueID="uniqueID"
      v-model="cableMarka"
    >
      {{ cableMarka }}
    </TextEditable>

    <!-- Сечение и длина кабеля -->
    <div class="cable-pref" :style="{ bottom: schemeDataStore.listFormat === 'A3' ? '128px' : '45px' }">
      <!-- Сечение кабеля -->
      <TextEditable
        v-if="checkInputCableSize"
        class="cable-size"
        :element="`Сечение кабеля-${uniqueID}-size`"
        :uniqueID="uniqueID"
        v-model="cableSize"
      >
        {{ cableSize }}
      </TextEditable>

      <!-- Длина кабеля -->
      <TextEditable
        v-if="checkInputCableLength"
        class="cable-length"
        :element="`Длина кабеля-${uniqueID}-length`"
        :uniqueID="uniqueID"
        v-model="cableLength"
        :formatter="formatCableLength"
      >
        {{ formatCableLength(cableLength) }}
      </TextEditable>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
import TextEditable from "../UI/TextEditable.vue"

const schemeDataStore = useSchemeDataStore()

const props = defineProps({
  data: { type: Object },
})

const uniqueID = computed(() => {
  return props.data["Данные"]?.[0]?.["Вводной щит"] + "-" + props.data["Группа"]
})

// Реактивные переменные для редактирования
const cableMarka = ref("")
const cableSize = ref("")
const cableLength = ref("")

// Вычисляемые свойства для проверки наличия данных
const checkInputCableMarka = computed(() => {
  return props.data["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})

const checkInputCableSize = computed(() => {
  return props.data["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})

const checkInputCableLength = computed(() => {
  return props.data["Данные"].find((obj) => obj["Длина кабеля"])?.["Длина кабеля"] || ""
})

const formatCableLength = (value) => {
  if (value === undefined || value === null || value === "") {
    return "" // Возвращаем пустую строку, если значение отсутствует
  }

  // Проверяем, соответствует ли значение формату
  const isValidFormat = /^L=\d+м$/.test(value)

  // Если формат корректен, возвращаем значение как есть
  if (isValidFormat) {
    return value
  }

  // Удаляем все, кроме цифр
  const cleanedValue = value.replace(/\D/g, "")

  // Добавляем "L=" и "м" только если значение не пустое
  return cleanedValue ? `L=${cleanedValue}м` : ""
}

// Инициализация значений при монтировании
watch(
  () => props.data,
  (newData) => {
    cableMarka.value = newData["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
    cableSize.value = newData["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
    cableLength.value = newData["Данные"].find((obj) => obj["Длина кабеля"])?.["Длина кабеля"] || ""
  },
  { immediate: true, deep: true }
)

// Обновление данных при изменении значений
watch([cableMarka, cableSize, cableLength], ([newMarka, newSize, newLength]) => {
  const updatedData = props.data["Данные"].map((obj) => {
    if (obj["Марка кабеля"]) obj["Марка кабеля"] = newMarka
    if (obj["Сечение кабеля"]) obj["Сечение кабеля"] = newSize
    if (obj["Длина кабеля"]) obj["Длина кабеля"] = newLength
    return obj
  })
})
</script>
<style lang="scss" scoped>
.cable-name,
.cable-size,
.cable-length {
  position: absolute;
  width: 100%;
  font-size: 11px;
}
.cable-name {
  bottom: 12mm;
  transform: rotate(-90deg);
  text-align: center;
  left: -10mm;
  max-width: 70px;
  word-break: break-word;
}
.cable-pref {
  position: absolute;
  bottom: 45px;
  left: -23px;
  width: 75px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
}
.cable-size {
  width: 49%;
  position: unset;
  max-width: 10mm;
  word-break: break-all;
}
.cable-length {
  width: 49%;
  position: unset;
  max-width: 10mm;
  text-align: start;
}
</style>
