<template lang="">
  <div></div>
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
<style lang="scss" scoped></style>
