<template>
  <div class="scheme-name">
    <p>{{ props.schemeName }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  schemeName: { type: String },
})
</script>
<style lang="scss" scoped>
.scheme-name {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 100%;
  border-right: 0.5mm solid #000;
  border-bottom: 0.5mm solid #000;
  width: 70mm;
  font-size: 3mm;
  height: 6mm;
  p {
    margin: 0;
    margin-left: 3mm;
  }
}
</style>
