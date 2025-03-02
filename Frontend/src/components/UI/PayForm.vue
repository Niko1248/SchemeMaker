<template>
  <div class="scheme-download">
    <div class="">Ваши схемы готовы к скачиванию</div>
    <button @click="pay">Оплатить и скачать</button>
  </div>
  <div>
    <!--HTML-элемент, в котором будет отображаться платежная форма-->
    <div id="payment-form" class="payment-form"></div>
  </div>
</template>
<script setup>
import { saveAs } from "file-saver"
import axios from "axios"
import { ref } from "vue"
import { useSchemeDataStore } from "../../stores/SchemeData"

const schemeDataStore = useSchemeDataStore()
const confirmationToken = ref("")

const getConfirmationToken = async () => {
  try {
    const response = await axios.get("http://localhost:7777/getToken")
    confirmationToken.value = response.data
  } catch (error) {
    console.log(error)
  }
}

//Отображение платежной формы в контейнере

const pay = async (req, res) => {
  try {
    await getConfirmationToken()
    //Инициализация виджета. Все параметры обязательные.
    const checkout = new window.YooMoneyCheckoutWidget({
      confirmation_token: confirmationToken.value, //Токен, который перед проведением оплаты нужно получить от ЮKassa
      error_callback: function (error) {
        console.log(error)
      },
    })

    checkout
      .render("payment-form")
      //Метод возвращает Promise, исполнение которого говорит о полной загрузке платежной формы (можно не использовать).
      .then(() => {
        //Код, который нужно выполнить после отображения платежной формы.
      })

    checkout.on("success", () => {
      //Код, который нужно выполнить после успешной оплаты.
      console.log("ok")
      saveAs(schemeDataStore.exportZip, "Schemes.zip")
      //Удаление инициализированного виджета
      checkout.destroy()
      schemeDataStore.setExportSchemeReady(false)
    })

    checkout.on("fail", () => {
      //Код, который нужно выполнить после неудачной оплаты.
      console.log("fail")

      //Удаление инициализированного виджета
      checkout.destroy()
    })
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss" scoped>
.scheme-download {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
