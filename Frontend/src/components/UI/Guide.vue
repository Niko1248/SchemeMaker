<template>
  <div class="guide">
    <GuideContainer v-if="schemeDataStore.guidePopup" />
  </div>
</template>

<script setup>
import GuideContainer from "../guide/GuideContainer.vue"
import { useSchemeDataStore } from "../../stores/SchemeData.js"
const schemeDataStore = useSchemeDataStore()
</script>
<style scoped>
.guide {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
