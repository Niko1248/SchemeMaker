<template>
  <div class="power-line">
    <p v-if="props.inputPhase > 1" class="powerLine-info">~380/220В</p>
    <p v-else class="powerLine-info">~220В</p>
    <div class="L">
      <p>L1,2,3</p>
    </div>
    <div class="N">
      <div class="N-line">
        <svg width="1000" height="14">
          <line x1="0" y1="0" x2="1000" y2="0" stroke="black" stroke-width="1" />
        </svg>
      </div>
      <p>N</p>
    </div>
    <div v-if="props.linePE !== -1" class="PE">
      <div class="PE-line">
        <svg width="1000" height="20">
          <line x1="0" y1="8" x2="1000" y2="8" stroke="black" stroke-width="0.5" stroke-dasharray="40, 10" />
        </svg>
        <p>PE</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  linePE: { type: Number },
  inputPhase: { type: Number },
})
</script>
<style lang="scss" scoped>
.L {
  height: 1mm;
  width: auto;
  border: 0.5px solid #000;
  position: relative;
  p {
    font-size: 12px;
    position: absolute;
    top: -7px;
    left: -35px;
  }
}
.N {
  height: 1mm;
  width: auto;
  margin-top: 5px;
  position: relative;
  p {
    position: absolute;
    top: -6px;
    left: -23px;
    font-size: 12px;
  }
}

.PE {
  height: 1mm;
  width: auto;
  position: relative;
  p {
    position: absolute;
    top: 1px;
    left: -27px;
    font-size: 12px;
  }
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
  position: relative;
}
.powerLine-info {
  position: absolute;
  top: -15px;
  font-size: 9px;
  left: -35px;
}
</style>
