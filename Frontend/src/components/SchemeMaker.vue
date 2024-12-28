<template>
  <div class="grid" :style="{ alignItems: checkDoc ? 'flex-start' : 'center' }">
    <SchemeContainer
      v-for="(doc, index) in schemeDataStore.filteredSchemeData(checkDoc)"
      :key="'Щит' + index"
      :tableData="tableData"
      :schemeDataChunk="doc"
      ref="activeRef"
    />
    <div class="logo">
      <img src="./../assets/img/Logo.svg" />
    </div>
    <div :class="checkDoc ? 'service__container--success' : 'service__container'">
      <div class="clouse-ico"></div>
      <div class="handler-file__wrapper">
        <form @submit.prevent="uploadFile">
          <input
            class="upload-file__input"
            id="upload-file__input"
            ref="fileInput"
            type="file"
            @change="handleFileChange"
            accept=".xlsx, .xls"
          />

          <label
            for="upload-file__input"
            class="upload-file__lable"
            :style="{
              border: success ? '1px solid #00ff2f' : error ? '1px solid red' : '1px dashed #fff;',
            }"
            ><span class="upload-file__span" v-if="fileName">{{ fileName }}</span>
            <span class="upload-file__span" v-else> + Добавьте файл Exсel </span></label
          >
          <button class="upload-file__button" type="submit" :disabled="!fileName">
            <p v-if="loading">идет загрузка</p>
            <p v-else>загрузить</p>

            <p class="upload-file__loading" v-if="loading"></p>
            <p v-if="error">{{ error }}</p>
          </button>
        </form>
      </div>
      <div class="list">
        <div class="list__item" v-for="(item, index) in schemeDataStore.schemeData" :key="`item-${index}`">
          <input
            type="checkbox"
            :id="`checkbox-${index}`"
            :value="item['Вводной щит']"
            @change="toogleCheckbox(item['Вводной щит'])"
          />
          <div class="input-label" @click.prevent="changeScheme(item['Вводной щит'])">{{ item["Вводной щит"] }}</div>
        </div>
      </div>
      <button
        class="export-button"
        @click="exportToPDF('Select')"
        v-if="
          schemeDataStore.schemeData.length !== 0 &&
          selectedSchemes.length !== 0 &&
          schemeDataStore.schemeData.length !== selectedSchemes.length
        "
      >
        Экспортировать элементов: {{ selectedSchemes.length }}
      </button>
      <button class="export-button" @click="exportToPDF('All')" v-if="schemeDataStore.schemeData.length !== 0">
        Экспортировать всё
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, nextTick } from "vue"
import { useSchemeDataStore } from "../stores/SchemeData.js"
import axios from "axios"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import SchemeContainer from "./SchemeContainer.vue"

const schemeDataStore = useSchemeDataStore()
const loading = ref(false)
const success = ref(false)
const error = ref("")
const checkDoc = ref("")
const tableData = reactive({})
const schemeData = reactive([])
const collectedFiles = reactive([])
const activeRef = ref(null)
const selectedSchemes = ref([])
const fileName = ref(null)
const fileInput = ref(null)
/* const isSuccess = ref(false)
 */ const changeScheme = (name) => {
  checkDoc.value = name
}

// Функция обработки выбора файла
const handleFileChange = (event) => {
  const file = event.target.files[0]
  fileName.value = file ? file.name : null // Отображаем имя файла
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
  formData.append("file", fileInput.value.files[0])

  loading.value = true
  error.value = null
  success.value = false
  // http://138.124.31.181:3000/upload
  try {
    const response = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    success.value = true

    const excelData = response.data.result

    let indexTable
    indexTable = excelData.findIndex((el) => el["Вводной щит"] === "Таблица")
    schemeDataStore.splitTableAndSchemeData(excelData, indexTable)
    checkDoc.value = schemeDataStore.schemeData[0]["Вводной щит"] || null
  } catch (err) {
    error.value = "Ошибка загрузки файла"
    success.value = false
    console.error(err)
  } finally {
    loading.value = false
  }
}

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
  height: 100svh;
  justify-content: space-between;
}
.logo {
  position: absolute;
  top: 71vh;
  left: 18vw;
  z-index: 1000;
  opacity: 0;
  animation: logo 3.3s ease forwards;
  animation-delay: 3s;
  will-change: transform;

  img {
    width: 15vw;
    height: 3.1vw;
    max-width: 250px;
    max-height: 52px;
    object-fit: cover;
    filter: drop-shadow(3px 2px 10px black);
  }
}
@keyframes logo {
  0% {
    opacity: 0;
    top: 76vh;
    left: 15vw;
  }
  90% {
    opacity: 1;
    top: 76vh;
    left: 15vw;
  }
  100% {
    opacity: 1;
    top: 25px;
    left: 25px;
  }
}
.clouse-ico {
  position: absolute;
}
.service__container {
  width: 20.5vw;
  padding: 1.6vw 1vw;
  background: #00000089;
  z-index: 99;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid #fff;
  height: fit-content;
  animation: borderNone 0.5s ease forwards;
  animation-delay: 6s;
  box-shadow: 0px 0px 15px #000000d9;
  will-change: transform;

  box-sizing: border-box;
  .list {
    margin: 0;
  }
}
@keyframes borderNone {
  0% {
    border: 5px solid #fff;
  }
  100% {
    border: 0px solid #ffffff00;
  }
}
.service__container--success {
  width: 14vw;
  padding: 25px 25px;
  margin-right: 25px;
  background: #00000089;
  transform: translateX(200%);
  z-index: 99;
  margin-top: 25px;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: -5px 5px 10px #0000006b;
  animation: DocTrue 1s ease forwards;
  will-change: transform;
}
@keyframes DocTrue {
  from {
    transform: translateX(150%);
  }
  to {
    transform: translateX(0%);
  }
}
.handler-file__wrapper {
  font-family: WixMadeforDisplay-Regular;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
  }
  input {
    width: 100%;
    height: 4vw;
  }
}
.upload-file__input {
  z-index: 999;
  visibility: hidden;
  cursor: pointer;
}
.upload-file__lable {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px dashed #fff;
  width: 100%;
  height: 4vw;
  border-radius: 10px;
  transition: 0.2s ease-in;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-wrap: wrap;
  &:hover {
    transition: 0.1s ease-in;
    background: #ffffff3f;
    border: 1px solid #00f7ff;
  }
}

.upload-file__span {
  font-size: 1.1vw;
  top: 1.4vw;
  left: 2.5vw;
  width: 15vw;
  text-align: center;
  color: #fff;
  overflow: hidden;
}
.upload-file__button {
  box-sizing: border-box;
  margin-top: 10px;
  width: 100%;
  height: 1.85vw;
  border: none;
  background: #ffffff83;
  border-radius: 5px;
  position: relative;
  p {
    margin-bottom: 3px;
  }
  &:hover {
    transition: 0.1s ease-in;
    background: #ffffffeb;
  }
}
.upload-file__loading {
  display: block;
  position: absolute;
  right: 10px;
  top: 0.425vw;
  width: 1vw;
  height: 1vw;
  border: 2px solid #00ddff;
  border-radius: 50%;
  border-top: 1px solid #dff2ff;
  animation: rotate 1s linear infinite;
  box-shadow: 0px 0px 10px #00ddff;
  box-sizing: border-box;
}
@keyframes rotate {
  from {
    transform: rotate(-360deg);
  }
}
.list {
  width: 100%;
  height: fit-content;
  max-height: 60%;
  margin: 20px 0px;
}
.export-button {
  box-sizing: border-box;
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
.list__item {
  margin-bottom: 5px;
  display: flex;
  font-family: WixMadeforDisplay-Regular;
  color: #fff;
  padding-bottom: 6px;
  border-bottom: 1px dashed #17b07b;
  input {
    margin-right: 10px;
  }
  .input-label {
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      color: #b3d0dd;
      transition: 0.2s;
    }
  }
}
</style>
