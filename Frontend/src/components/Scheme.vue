<template>
  <div class="scheme">
    <RCD />
  </div>
</template>
<script>
import { defineComponent } from "vue"
import RCD from "./legend/RCD.vue"

export default defineComponent({
  components: { RCD },
  name: "Scheme",
  setup() {},
})
</script>
<style lang="scss" scoped>
.scheme {
  position: absolute;
  left: 43mm;
  top: 4.2mm;
}
</style>
