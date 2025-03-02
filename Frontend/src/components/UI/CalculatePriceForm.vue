<template>
  <div>Цена за одну схему - {{ SCHEME_PRICE }} Р.</div>
  <div v-if="props.selectedSchemesLength === 0" class="">Всего схем: {{ amountSelectedSchemes }}</div>
  <div v-else class="">Выбрано схем: {{ amountSelectedSchemes }}</div>
  <div class="">Цена: {{ amountSelectedSchemes }} X {{ SCHEME_PRICE }} = {{ calculatePrice }} Р.</div>
</template>
<script setup>
import { computed } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"
const schemeDataStore = useSchemeDataStore()

const props = defineProps({
  selectedSchemesLength: Number,
})

const SCHEME_PRICE = 100

const amountSelectedSchemes = computed(() => {
  const selectedSchemesLength = props.selectedSchemesLength || schemeDataStore.schemeData.length
  schemeDataStore.setAmountSelectedSchemes(selectedSchemesLength)
  return selectedSchemesLength
})

const calculatePrice = computed(() => {
  const price = amountSelectedSchemes.value * SCHEME_PRICE
  schemeDataStore.setTotalPrice(price)
  return price
})
</script>
<style lang="scss" scoped></style>
