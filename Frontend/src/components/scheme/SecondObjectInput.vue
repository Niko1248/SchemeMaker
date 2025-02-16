<template>
  <div class="node">
    <div v-if="deviceType" class="node">
      <img :src="deviceImage" />
      <DeviceInfo :textData="deviceData" />
    </div>
    <img
      v-else
      src="../../assets/img/thick/connection-line.svg"
      :style="{ marginLeft: schemeDataStore.checkLinePE(data) !== -1 ? '8px' : '0px' }"
    />
    <div v-if="schemeDataStore.checkLinePE(data) !== -1">
      <img src="../../assets/img/thick/connection-line+PE.svg" />
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"
import DeviceInfo from "./DeviceInfo.vue"

const schemeDataStore = useSchemeDataStore()

const props = defineProps({
  data: { type: Object },
})

const deviceData = computed(() => schemeDataStore.secondObject(props.data))
const deviceType = computed(() => (deviceData.value ? deviceData.value["Тип"] : null))

const deviceImages = reactive({
  QD: new URL("../../assets/img/thick/QD.svg", import.meta.url).href,
  QF: new URL("../../assets/img/thick/QF.svg", import.meta.url).href,
  QFD: new URL("../../assets/img/thick/QFD.svg", import.meta.url).href,
})

const deviceImage = computed(() => (deviceType.value ? deviceImages[deviceType.value] : ""))
</script>

<style lang="scss" scoped></style>
