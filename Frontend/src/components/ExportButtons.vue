<template>
  <div>
    <button
      class="export-button"
      v-if="
        schemeDataStore.schemeData.length > 0 &&
        props.selectedSchemes.length > 0 &&
        schemeDataStore.schemeData.length !== props.selectedSchemes.length
      "
      @click="exportToPDF('Select')"
    >
      Экспортировать элементов:{{ props.selectedSchemes.length }}
    </button>
    <button class="export-button" @click="exportToPDF('All')" v-if="schemeDataStore.schemeData.length !== 0">
      Экспортировать всё
    </button>
  </div>
</template>
<script setup>
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { reactive, nextTick } from "vue"
import { useSchemeDataStore } from "../stores/SchemeData"

const props = defineProps({
  selectedSchemes: Array,
  childCheckDoc: String,
  activeRef: Object,
})
const emit = defineEmits(["update:childCheckDoc"])

const schemeDataStore = useSchemeDataStore()
const collectedFiles = reactive([])

const exportToPDF = async (type) => {
  collectedFiles.splice(0, collectedFiles.length)
  if (type === "All") {
    for (const el of schemeDataStore.schemeData) {
      if (props.childCheckDoc !== el["Вводной щит"]) {
        emit("update:childCheckDoc", el["Вводной щит"])
        await nextTick()
      }
      const result = await props.activeRef[0].exportToPDF()
      collectedFiles.push(result)
    }
  } else if (type === "Select") {
    for (const el of props.selectedSchemes) {
      if (props.childCheckDoc !== el) {
        emit("update:childCheckDoc", el)
        await nextTick()
      }
      const result = await props.activeRef[0].exportToPDF()
      collectedFiles.push(result)
    }
  }
  saveToZIP()
}

const saveToZIP = async () => {
  const zip = new JSZip()
  collectedFiles.forEach(({ file, name }) => {
    zip.file(name, file)
  })
  try {
    const zipBlob = await zip.generateAsync({ type: "blob" })
    saveAs(zipBlob, "Schemes.zip")
  } catch (err) {
    console.error("Ошибка создания ZIP:", err)
  }
}
</script>
<style lang="scss" scoped>
.export-button {
  box-sizing: border-box;
  cursor: url(../../public/cursor-pointer.png), auto;
  width: 100%;
  height: auto;
  border: none;
  padding: 5px 0px;
  margin-top: 5px;
  background: #ffffff83;
  border-radius: 5px;
  font-family: WixMadeforDisplay-Regular;
  transition: 0.2s;

  &:hover {
    transition: 0.2s ease-in;
    background: #ffffffeb;
  }
}
</style>
