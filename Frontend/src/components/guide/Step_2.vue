<template>
  <div class="step step-2">
    <h1>Скачайте готовую таблицу</h1>
    <p>
      Мы подготовили для вас таблицу - пример в виде excel документа, в формате xlsm. Скачайте шаблон и заполните его
      согласно вашей схемы.
    </p>
    <p class="makross">
      Для вашего удобства в шаблоне используются макросы. Перед началом работы с файлом рекомендуется включить их
      поддержку.
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.step {
  font-family: WixMadeforDisplay-Regular;
  color: #fff;
}
.makross {
  margin-top: 3vw;
  margin-left: 2vw;
  font-size: 1.05vw;
  margin-right: 2vw;
  position: relative;
  &::before {
    content: "!";
    display: block;
    position: absolute;
    left: -1.5vw;
    top: -5px;
    font-size: 50px;
    font-weight: bold;
  }
}
/* .step-1 {
  h1 {
    font-size: 2.3vw;
    margin-bottom: 3vw;
  }
  p {
    font-size: 1.4vw;
    max-width: 60vw;
    display: block;
    margin-bottom: 1.2vw;
  }
} */
</style>
