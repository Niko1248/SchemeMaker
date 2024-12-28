<template>
  <div class="node-el node-el-1">
    <!-- Проверка: если тип устройства существует -->
    <template v-if="deviceType">
      <img class="node-el-1-Q" :src="deviceImage" alt="" />
      <!-- Проверяем наличие линии PE -->
      <img
        v-if="schemeDataStore.checkLinePE(data) !== -1"
        src="../../assets/img/connection-line+PE.svg"
        style="transform: translateX(-8px)"
      />
      <DeviceInfo :textData="firstObject" />
    </template>

    <!-- Если тип устройства не найден -->
    <template v-else>
      <img src="../../assets/img/connection-line.svg" alt="" />
      <img
        v-if="schemeDataStore.checkLinePE(data) !== -1"
        class="connection-line-PE_node"
        style="width: 8px"
        src="../../assets/img/connection-line+PE.svg"
      />
    </template>
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

const firstObject = computed(() => schemeDataStore.firstObject(props.data))
const deviceType = computed(() => (firstObject.value ? firstObject.value["Тип"] : null))

const deviceImages = reactive({
  QD: new URL("../../assets/img/QD.svg", import.meta.url).href,
  QF: new URL("../../assets/img/QF-1.svg", import.meta.url).href,
  QFD: new URL("../../assets/img/QFD.svg", import.meta.url).href,
})

const deviceImage = computed(() => (deviceType.value ? deviceImages[deviceType.value] : ""))
</script>

<style lang="scss" scoped>
.node-el {
  display: flex;
  div {
    display: flex;
  }
}
.node-el-1 {
  position: relative;
}
.node-el-1-Q {
  transform: translateX(-8px);
}
.connection-line-PE_node {
  position: absolute;
  left: 18px;
}
</style>
