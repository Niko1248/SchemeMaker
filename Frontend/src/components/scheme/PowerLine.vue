<template>
  <div class="power-line">
    <div class="L"></div>
    <div class="N">
      <div class="N-line">
        <svg width="1000" height="14">
          <line x1="0" y1="0" x2="1000" y2="0" stroke="black" stroke-width="1" />
        </svg>
      </div>
    </div>
    <div v-if="props.checkLinePE !== -1" class="PE">
      <div class="PE-line">
        <svg width="1000" height="20">
          <line x1="0" y1="8" x2="1000" y2="8" stroke="black" stroke-width="0.5" stroke-dasharray="70, 30" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  checkLinePE: { type: Number },
})
</script>
<style lang="scss" scoped>
.L {
  height: 1mm;
  width: auto;
  border: 0.5px solid #000;
}
.N {
  height: 1mm;
  width: auto;
  margin-top: 5px;
  overflow: hidden;
}

.PE {
  height: 1mm;
  width: auto;
}
.PE-line,
.N-line {
  overflow: hidden;
  svg {
    width: 100%;
  }
}
.power-line {
  margin-top: 3.4mm;
}
</style>
