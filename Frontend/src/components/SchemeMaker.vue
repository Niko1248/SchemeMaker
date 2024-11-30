<template>
  <div>
    <form>
      <input type="file" accept=".xlsx, .xls" />
      <button type="submit" :disabled="!file">Загрузить</button>
    </form>
    <p v-if="loading">Загрузка файла...</p>
    <p v-if="success">Файл успешно загружен и обработан!</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import axios from "axios"

export default defineComponent({
  name: "SchemeMaker",
  setup() {
    const file = ref<File | null>(null)
    const loading = ref(false)
    const success = ref(false)
    const error = ref<string | null>(null)

    const onFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement
      if (target.files && target.files.length > 0) {
        file.value = target.files[0]
      }
    }

    const uploadFile = async () => {
      if (!file.value) return

      const formData = new FormData()
      formData.append("file", file.value)

      loading.value = true
      error.value = null
      success.value = false

      try {
        const response = await axios.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        success.value = true
        console.log(response.data)
      } catch (err) {
        error.value = "Ошибка загрузки файла"
        console.log(err)
      } finally {
        loading.value = false
      }
    }

    return { file, loading, success, error, onFileChange, uploadFile }
  },
})
</script>
<style lang="css"></style>
