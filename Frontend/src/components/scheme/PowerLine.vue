<template>
  <div class="power-line">
    <p class="powerLine-info">~380/220В</p>
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
    <div v-if="props.checkLinePE !== -1" class="PE">
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
  checkLinePE: { type: Number },
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
    top: -20px;
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
    top: -19px;
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
    top: -12px;
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
  top: -23px;
  font-size: 9px;
  left: -35px;
}
</style>
