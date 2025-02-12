<template>
  <div class="grid" :style="{ alignItems: checkDoc ? 'flex-start' : 'center' }">
    <!-- Используем массив ref для хранения ссылок на дочерние компоненты -->
    <SchemeContainer
      v-for="(doc, index) in schemeDataStore.filteredSchemeData(checkDoc)"
      :key="'Щит' + index"
      :schemeDataChunk="doc"
      :ref="(el) => setActiveRef(el, index)"
    />
    <Logo />

    <div
      :class="checkDoc ? 'service__container--success' : 'service__container'"
      :style="{
        transform: menuOpen ? 'translateX(0)' : 'translateX(97%)',
      }"
    >
      <div
        v-if="checkDoc"
        class="close-ico"
        @click="toggleMenu"
        :style="{
          transform: menuOpen ? 'scale(-1,1)' : 'scale(1,1)',
        }"
      >
        <img src="/close.svg" alt="" />
      </div>
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
              border: success ? '1px solid #00ff2f' : error ? '1px solid red' : '1px dashed #fff',
            }"
            ><span class="upload-file__span" v-if="fileName">{{ fileName }}</span>
            <span class="upload-file__span" v-else> + Добавьте файл Exсel </span></label
          >
          <button class="upload-file__button" type="submit" :disabled="!fileName">
            <p>{{ loading ? "Идет загрузка" : "Загрузить" }}</p>
            <p class="upload-file__loading" v-if="loading"></p>
            <p v-if="error">{{ error }}</p>
          </button>
        </form>
      </div>

      <div class="wrapp-list">
        <div class="list">
          <div
            class="list__item"
            v-for="(item, index) in schemeDataStore.schemeData"
            :key="`item-${index}`"
            :class="{ selected: selectedItem === item['Вводной щит'] }"
            @click="resetPosition(), selectItem(item['Вводной щит']), changeScheme(item['Вводной щит'])"
          >
            <input
              type="checkbox"
              :id="`checkbox-${index}`"
              :value="item['Вводной щит']"
              @change="toogleCheckbox(item['Вводной щит'])"
            />
            <div class="input-label">{{ item["Вводной щит"] }}</div>
          </div>
        </div>
      </div>
      <div v-if="checkDoc" class="format">
        <p class="format-title">Формат схемы</p>
        <div class="format-wrapper">
          <div class="format__item item-1">
            <label
              :style="{
                backgroundColor: schemeDataStore.listFormat === 'A3' ? 'rgba(255, 255, 255, 0.5137254902)' : '',
                color: schemeDataStore.listFormat === 'A3' ? '#000' : '',
              }"
            >
              <input type="radio" v-model="schemeDataStore.listFormat" value="A3" checked />
              A3
            </label>
          </div>
          <div class="format__item item-2">
            <label
              :style="{
                backgroundColor: schemeDataStore.listFormat === 'A4' ? 'rgba(255, 255, 255, 0.5137254902)' : '',
                color: schemeDataStore.listFormat === 'A4' ? '#000' : '',
              }"
            >
              <input type="radio" v-model="schemeDataStore.listFormat" value="A4" />
              A4
            </label>
          </div>
        </div>
      </div>
      <ExportButtons :selectedSchemes="selectedSchemes" :activeRef="activeRefs" v-model:childCheckDoc="checkDoc" />
    </div>
  </div>
</template>

<script setup>
import SchemeContainer from "./SchemeContainer.vue"
import ExportButtons from "./UI/ExportButtons.vue"
import Logo from "./UI/Logo.vue"
import { ref } from "vue"
import { useSchemeDataStore } from "../stores/SchemeData.js"
import axios from "axios"

const schemeDataStore = useSchemeDataStore()
const loading = ref(false)
const success = ref(false)
const error = ref("")
const checkDoc = ref("")
const activeRefs = ref([]) // Массив для хранения ссылок на дочерние компоненты
const selectedSchemes = ref([])
const fileName = ref(null)
const fileInput = ref(null)
const menuOpen = ref(true)
const selectedItem = ref(null)

// Функция для установки ссылок на дочерние компоненты
const setActiveRef = (el, index) => {
  if (el) {
    activeRefs.value[index] = el
  }
}

const selectItem = (item) => {
  selectedItem.value = item
}

const changeScheme = (name) => {
  checkDoc.value = name
}

// Функция сброса позиции страницы при перелистывании
const resetPosition = () => {
  activeRefs.value.forEach((ref) => {
    if (ref && ref.resetPositionStyles) {
      ref.resetPositionStyles()
      console.log("scs")
    }
  })
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  fileName.value = file ? file.name : null
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

  try {
    const response = await axios.post("http://138.124.31.181:7777/upload", formData, {
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
</script>
<style lang="scss">
.grid {
  display: flex;
  width: 100svw;
  overflow: hidden;
  height: 100svh;
  justify-content: space-between;
}

.close-ico {
  position: absolute;
  cursor: url(../../cursor.png), auto;
  left: 5px;
  top: calc(50% - 10px);
  transition: 0.3s;
  transform: scale(-1, 1);
  img {
    width: 14px;
    height: 14px;
  }
  &:hover {
    filter: drop-shadow(0px 0px 5px #fff);
    transition: 0.3s ease;
  }
}
.service__container {
  width: 20.3vw;
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
  padding: 25px 25px 25px 30px;
  background: #00000089;
  z-index: 99;
  margin: 15px;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  height: fit-content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: -5px 5px 10px #0000006b;
  animation: DocTrue 1s ease;
  will-change: transform;
  transition: 0.5s ease;
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
  cursor: url(../../cursor.png), auto;
}
.upload-file__lable {
  cursor: url(../../cursor.png), auto;
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
  cursor: url(../../cursor.png), auto;
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
.wrapp-list {
  overflow: hidden;
  max-height: 40svh;
}
.list {
  height: fit-content;
  max-height: 60%;
  margin: 10px 0px;
  overflow-y: scroll;
  max-height: 38svh;
  margin-bottom: 20px;
}

.list__item {
  padding-top: 4px;
  display: flex;
  border-radius: 5px;

  font-family: WixMadeforDisplay-Regular;
  color: #fff;
  padding-bottom: 4px;
  border-bottom: 1px dashed #17b07b;
  input {
    margin-right: 10px;
  }
  .input-label {
    cursor: url(../../public/cursor-pointer.png), auto;
    transition: 0.2s;

    &:hover {
      color: #b3d0dd;
      transition: 0.2s;
    }
  }
}
.list__item.selected {
  color: rgb(0, 0, 0);

  background-color: rgba(255, 255, 255, 0.514);
  cursor: url(/cursor.png), auto;
}
.format-wrapper {
  display: inline-block;
  font-family: WixMadeforDisplay-Regular;
  width: 100%;
}
.format__item {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  position: relative;

  label {
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    transition: 0.3s ease;
    display: inline-block;
    line-height: 26px;
    border: 1px solid rgb(0, 255, 47);
    border-radius: 5px 0px 0px 5px;
    border-right: none;
    user-select: none;
    cursor: url(/cursor.png), auto;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2470588235);
    }
  }
  &:nth-child(2) {
    label {
      border-radius: 0px 5px 5px 0px;
      border-left: none;
      border-right: 1px solid rgb(0, 255, 47);
    }
  }
  input {
    position: absolute;
    opacity: 0;
  }
}
</style>
