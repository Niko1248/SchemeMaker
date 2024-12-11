<template>
  <div class="grid">
    <SchemeContainer
      v-for="(doc, index) in filteredSchemeData"
      :key="'Щит' + index"
      :tableData="tableData"
      :schemeDataChunk="doc"
      ref="activeRef"
    />
    <div class="service__container">
      <div class="handler-file__wrapper">
        <form @submit.prevent="uploadFile">
          <input type="file" @change="onFileChange" accept=".xlsx, .xls" />
          <button type="submit" :disabled="!file">Загрузить</button>
        </form>
        <p v-if="loading">Загрузка файла...</p>
        <p v-if="success">Файл успешно загружен и обработан!</p>
        <p v-if="error">{{ error }}</p>
      </div>
      <div class="list">
        <div class="list__item" v-for="(item, index) in schemeData" :key="`item-${index}`">
          <input
            type="checkbox"
            :id="`checkbox-${index}`"
            :value="item['Вводной щит']"
            @change="toogleCheckbox(item['Вводной щит'])"
          />
          <div class="input-label" @click.prevent="changeScheme(item['Вводной щит'])">{{ item["Вводной щит"] }}</div>
        </div>
      </div>
      <button @click="exportToPDF('Select')" v-if="schemeData.length !== 0 && selectedSchemes.length !== 0">
        Экспортировать элементов: {{ selectedSchemes.length }}
      </button>
      <button @click="exportToPDF('All')" v-if="schemeData.length !== 0">Экспортировать всё</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, nextTick } from "vue"
import axios from "axios"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import SchemeContainer from "./SchemeContainer.vue"

const file = ref(null)
const loading = ref(false)
const success = ref(false)
const error = ref("")
const checkDoc = ref("")
const tableData = reactive({})
const schemeData = reactive([])
const collectedFiles = reactive([])
const activeRef = ref(null)
const selectedSchemes = ref([])

const changeScheme = (name) => {
  checkDoc.value = name
}

const onFileChange = (event) => {
  const target = event.target
  if (target.files && target.files.length > 0) {
    file.value = target.files[0]
  }
}

const toogleCheckbox = (name) => {
  if (selectedSchemes.value.includes(name)) {
    selectedSchemes.value = selectedSchemes.value.filter((item) => item !== name)
  } else {
    selectedSchemes.value.push(name)
  }
}

const uploadFile = async () => {
  const formData = new FormData()
  formData.append("file", file.value)

  loading.value = true
  error.value = null
  success.value = false

  try {
    const response = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    success.value = true
    let indexTable
    const excelData = response.data.result

    indexTable = excelData.findIndex((el) => el["Вводной щит"] === "Таблица")
    Object.assign(tableData, excelData[indexTable]["Группы"][0]["Данные"][0])
    schemeData.splice(0, schemeData.length, ...excelData.filter((_, index) => index !== indexTable))
    checkDoc.value = schemeData[0]["Вводной щит"] || null
  } catch (err) {
    error.value = "Ошибка загрузки файла"
    success.value = false
    console.error(err)
  } finally {
    loading.value = false
  }
}

const filteredSchemeData = computed(() => {
  if (!checkDoc.value) return []
  return schemeData.filter((doc) => doc?.["Вводной щит"] == checkDoc.value)
})

const exportToPDF = async (type) => {
  collectedFiles.splice(0, collectedFiles.length)
  if (type === "All") {
    for (const el of schemeData) {
      if (checkDoc.value !== el["Вводной щит"]) {
        checkDoc.value = el["Вводной щит"]
        await nextTick()
      }
      const result = await activeRef.value[0].exportToPDF()
      collectedFiles.push(result)
    }
  } else if (type === "Select") {
    for (const el of selectedSchemes.value) {
      if (checkDoc.value !== el) {
        checkDoc.value = el
        await nextTick()
      }
      const result = await activeRef.value[0].exportToPDF()
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

<style lang="scss">
.grid {
  display: flex;
  width: 100svw;
  overflow: hidden;
}
.service__container {
  width: 20vw;
  padding: 1vw 1vw;
  background: #323232;
  z-index: 99;
}
.handler-file__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3vw;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  button {
    background: #252525;
    width: 50%;
    border: 1px solid #252525;
    border-radius: 3px;
    font-size: 16px;
    height: 30px;
    color: #fff;
    cursor: pointer;
    transition: 0.5s ease;

    &:hover {
      background: #171717;
      transition: 0.3ss ease;
    }
  }
}
.list {
  width: 100%;
  height: fit-content;
  max-height: 60%;
  background-color: #8f8f8f;
  overflow-y: scroll;
  margin-bottom: 20px;
}
.list__item {
  margin-bottom: 5px;
  display: flex;
  input {
    margin-right: 10px;
  }
  .input-label {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
</style>
