<template>
  <TextEditable
    v-if="checkInputCableMarka"
    class="cable-name"
    :style="{ bottom: schemeDataStore.listFormat === 'A3' ? '34mm' : '12mm' }"
    element="Название кабеля"
    :uniqueID="uniqueID"
  >
    {{ checkInputCableMarka }}
  </TextEditable>
  <div class="cable-pref" :style="{ bottom: schemeDataStore.listFormat === 'A3' ? '128px' : '45px' }">
    <TextEditable v-if="checkInputCableSize" class="cable-size" element="Сечение кабеля" :uniqueID="uniqueID">
      {{ checkInputCableSize }}
    </TextEditable>
    <!-- Специально сделал element="Сечение кабеля" чтобы регулировать шрифт всей строки -->
    <TextEditable v-if="checkInputCableLength" class="cable-length" element="Сечение кабеля" :uniqueID="uniqueID">
      {{ "L=" + checkInputCableLength + "м" }}
    </TextEditable>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"

import TextEditable from "../UI/TextEditable.vue"
const schemeDataStore = useSchemeDataStore()

const props = defineProps({
  data: { type: Object },
})
const uniqueID = computed(() => {
  return props.data["Данные"]?.[0]?.["Вводной щит"] + "-" + props.data["Группа"]
})

const checkInputCableMarka = computed(() => {
  return props.data["Данные"].find((obj) => obj["Марка кабеля"])?.["Марка кабеля"] || ""
})
const checkInputCableSize = computed(() => {
  return props.data["Данные"].find((obj) => obj["Сечение кабеля"])?.["Сечение кабеля"] || ""
})
const checkInputCableLength = computed(() => {
  return props.data["Данные"].find((obj) => obj["Длина кабеля"])?.["Длина кабеля"] || ""
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
  left: -20px;
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
}
.cable-length {
  width: 49%;
  position: unset;
  max-width: 10mm;
  text-align: start;
}
</style>
