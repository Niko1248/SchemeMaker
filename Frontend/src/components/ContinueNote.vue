<template>
  <div class="previous-page" v-if="props.listIndex !== 1">Продолжение листа {{ props.listIndex - 1 }}</div>
  <div class="next-page" v-if="props.listIndex < schemeDataStore.totalPages">
    Продолжение на листе {{ props.listIndex + 1 }}
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../stores/SchemeData"

const schemeDataStore = useSchemeDataStore()
const props = defineProps({
  listIndex: { type: Number },
})
</script>
<style lang="scss" scoped>
.previous-page {
  position: absolute;
  top: 3cm;
  left: 5cm;
  font-size: 14px;
}
.next-page {
  position: absolute;
  top: 3cm;
  right: 0.5cm;
  font-size: 14px;
}
</style>
