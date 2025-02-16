<template>
  <div class="node-el node-el-2">
    <!-- Проверка: если тип второго объекта существует -->
    <template v-if="deviceType">
      <img :src="deviceImage" alt="" />
      <DeviceInfo :textData="secondObject" class="secondObjInfo" />
    </template>

    <!-- Если типа устройства нет -->
    <template v-else>
      <img src="../../assets/img/thick/kura.svg" alt="" />
    </template>

    <!-- Проверка на наличие линии PE и соответствие различных условий -->
    <template v-if="schemeDataStore.checkLinePE(data) !== -1">
      <img
        v-if="deviceType === 'QF' || deviceType === undefined"
        class="connection-line-PE_Q"
        src="../../assets/img/thick/connection-line+PE-Q.svg"
      />
      <img
        v-if="deviceType === 'QFD' || deviceType === 'QD'"
        class="connection-line-PE_Q"
        src="../../assets/img/thick/connection-line+PE-QFD.svg"
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

const secondObject = computed(() => schemeDataStore.secondObject(props.data))
const deviceType = computed(() => (secondObject.value ? secondObject.value["Тип"] : null))

const deviceImages = reactive({
  QD: new URL("../../assets/img/thick/QD.svg", import.meta.url).href,
  QF: new URL("../../assets/img/thick/QF.svg", import.meta.url).href,
  QFD: new URL("../../assets/img/thick/QFD.svg", import.meta.url).href,
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
.node-el-2 {
  position: relative;
  transform: translateX(-8px);
}
.secondObjInfo {
  top: 5px;
  left: -41px;
}
.connection-line-PE_Q {
  position: absolute;
  left: 13px;
}
</style>
