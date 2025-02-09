<template>
  <div class="power-line">
    <p v-if="schemeDataStore.checkPhase(schemeDataStore.inputDeviceData).phaseLength > 1" class="powerLine-info">
      ~380/220В
    </p>
    <p v-else class="powerLine-info">~220В</p>
    <div class="L">
      <p>{{ "L" + schemeDataStore.checkPhase(schemeDataStore.inputDeviceData).data.join() }}</p>
    </div>
    <div class="N">
      <div class="N-line">
        <svg width="1000" height="14">
          <line x1="0" y1="2" x2="2000" y2="2" stroke="black" stroke-width="1" />
        </svg>
      </div>
      <p>N</p>
    </div>
    <div v-if="schemeDataStore.checkLinePE(schemeDataStore.inputDeviceData) !== -1" class="PE">
      <div class="PE-line">
        <svg width="1000" height="20">
          <line x1="0" y1="8" x2="2000" y2="8" stroke="black" stroke-width="0.5" stroke-dasharray="40, 10" />
        </svg>
        <p>PE</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSchemeDataStore } from "../../stores/SchemeData"
const schemeDataStore = useSchemeDataStore()
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
    left: -34px;
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
    left: -34px;
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
  margin-top: 9px;
  position: relative;
}
.powerLine-info {
  position: absolute;
  top: -15px;
  font-size: 9px;
  left: -35px;
}
</style>
