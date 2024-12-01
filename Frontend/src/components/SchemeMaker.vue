<template>
  <div class="grid">
    <SchemeContainer />
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import axios from "axios"
import SchemeContainer from "./SchemeContainer.vue"
export default defineComponent({
  name: "SchemeMaker",
  components: { SchemeContainer },
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
        const response = await axios.post("http://localhost:3000/upload", formData, {
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
