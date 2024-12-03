<template lang="">
  <div class="circuit-scheme"></div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: "SchemeContainer",
  props: {
    pageData: { type: Array },
    listIndex: { type: Number },
  },
  setup(props) {
    console.log(props.pageData)
  },
})
</script>
<style lang="scss" scoped>
.circuit-scheme {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(4, 10mm) 15mm 10mm 70mm 15mm 15mm 20mm;
  grid-template-rows: repeat(9, 5mm) 10mm;
  border: 0.5mm solid #000;
}
</style>
