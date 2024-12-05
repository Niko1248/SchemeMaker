<template>
  <div class="grid">
    <SchemeContainer
      :tableData="tableData"
      :schemeDataChunk="doc"
      v-for="(doc, index) in filteredSchemeData"
      :key="`Щит${index}`"
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
        <label v-for="(item, index) in schemeData" :key="'radio' + index" :for="'radio' + index"
          ><input
            type="radio"
            name="checkDoc"
            :value="item['Вводной щит']"
            :id="'radio' + index"
            v-model="checkDoc"
          />{{ item["Вводной щит"] }}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from "vue"
import axios from "axios"
import SchemeContainer from "./SchemeContainer.vue"
export default defineComponent({
  name: "SchemeMaker",
  components: { SchemeContainer },
  setup() {
    const file = ref(null)
    const loading = ref(false)
    const success = ref(false)
    const error = ref("")
    const checkDoc = ref()
    const tableData = reactive({})
    const schemeData = reactive([])

    const onFileChange = (event) => {
      const target = event.target
      if (target.files && target.files.length > 0) {
        file.value = target.files[0]
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

        // Работаем с таблицами
        let indexTable
        const excelData = response.data.result
        console.log(excelData)

        indexTable = excelData.findIndex((el) => el["Вводной щит"] === "Таблица")
        Object.assign(tableData, excelData[indexTable]["Группы"][0]["Данные"][0]) // Корректное обновление reactive объекта
        schemeData.splice(0, schemeData.length, ...excelData.filter((_, index) => index !== indexTable)) // Обновление массива

        checkDoc.value = schemeData[0]["Вводной щит"] || null
        // Object.assign(inputDeviceData, schemeData[0])
        // outputDevicesData.splice(0, outputDevicesData.length, ...schemeData.slice(1))

        console.log("tableData:", tableData)
        console.log("schemeData:", schemeData)
      } catch (err) {
        error.value = "Ошибка загрузки файла"
        success.value = false // Сбрасываем флаг успеха
        console.error(err)
      } finally {
        loading.value = false
      }
    }
    const filteredSchemeData = computed(() => {
      if (!checkDoc.value) return []
      return schemeData.filter((doc) => doc?.["Вводной щит"] == checkDoc.value)
    })
    return {
      file,
      loading,
      success,
      error,
      onFileChange,
      uploadFile,
      tableData,
      schemeData,
      checkDoc,
      filteredSchemeData,
    }
  },
})
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
  input {
    width: 100%;
    margin-bottom: 10px;
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
</style>
