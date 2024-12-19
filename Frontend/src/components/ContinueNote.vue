<template>
  <div class="previous-page" v-if="props.listIndex !== 1">Продолжение листа {{ props.listIndex - 1 }}</div>
  <div class="next-page" v-if="props.listIndex < totalPages">Продолжение на листе {{ props.listIndex + 1 }}</div>
</template>
<script setup>
const props = defineProps({
  listIndex: { type: Number },
  totalPages: { type: Number },
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
