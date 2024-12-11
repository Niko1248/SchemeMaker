<template>
  <div class="scheme__container" ref="scalableArea" @wheel.prevent="onWheelHandler">
    <div
      class="pages__wrapper"
      :style="{
        transform: `translate(${positionX}px, ${positionY}px) scale(${scale})`,
      }"
      ref="pages__wrapper"
    >
      <div v-for="(item, index) in groupedItems" class="page" ref="page" :key="index">
        <div class="top-frame">
          <Scheme />

          <CircuitScheme :pageData="item" :listIndex="index + 1" />
          <SchemeOutsideLeftTables />
          <SchemeInsideRightTable :tableData="tableData" :listIndex="index + 1" :totalPages="totalPages" />
          <ConsumerTable :pageData="item" />
        </div>
      </div>
    </div>
  </div>
  <!-- Кнопка для экспорта в PDF -->
  <button @click="exportToPDF">Экспорт в PDF</button>
</template>
<script>
import { defineComponent, ref, computed, watch, reactive } from "vue"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import SchemeOutsideLeftTables from "./SchemeOutsideLeftTables.vue"
import SchemeInsideRightTable from "./SchemeInsideRightTable.vue"
import CircuitScheme from "./CircuitScheme.vue"
import ConsumerTable from "./ConsumerTable.vue"
import Scheme from "./Scheme.vue"

export default defineComponent({
  name: "SchemeContainer",
  components: { SchemeOutsideLeftTables, SchemeInsideRightTable, CircuitScheme, ConsumerTable, Scheme },
  props: {
    tableData: { type: Object },
    schemeDataChunk: { type: Object },
  },
  setup(props, { expose }) {
    const scale = ref(1) // Начальный масштаб для элемента
    const positionX = ref(0) // Позиция по оси X
    const positionY = ref(0) // Позиция по оси Y

    const scalableArea = ref(null) // Ссылка на область
    const pages__wrapper = ref(null) // Ссылка на содержимое

    const inputDeviceData = reactive({})
    const outputDevicesData = reactive([])

    let totalPages = ref(0)
    const itemsPerComponent = 11
    const groupedItems = computed(() => {
      if (!props.schemeDataChunk["Группы"]) {
        return []
      }
      // Создаем копию, чтобы не изменять оригинальный массив
      const groupsCopy = [...props.schemeDataChunk["Группы"]]

      let indexInputDevice = groupsCopy.findIndex((el) => el["Данные"]["Группа"] == -1)

      // Добавляем найденный элемент, но из копии
      Object.assign(inputDeviceData, groupsCopy[indexInputDevice])

      // Удаляем только из копии
      groupsCopy.splice(indexInputDevice, 1)

      // Перезаписываем outputDevicesData
      outputDevicesData.splice(0, outputDevicesData.length, ...groupsCopy)

      const groups = []
      if (outputDevicesData.length !== 0) {
        for (let i = 0; i < outputDevicesData.length; i += itemsPerComponent) {
          groups.push(outputDevicesData.slice(i, i + itemsPerComponent))
        }
      }
      return groups
    })

    watch(
      groupedItems,
      (newGroups) => {
        totalPages.value = newGroups.length
      },
      { immediate: true }
    ) // 'immediate: true' сразу вызовет watch при инициализации

    // Обработчик событий колесика
    const onWheelHandler = (event) => {
      event.preventDefault() // Предотвращаем стандартное поведение (масштаб страницы)

      // Управление положением по оси X при зажатом Shift
      if (event.shiftKey) {
        if (event.deltaY < 0) {
          positionX.value += 20 // Двигаем вправо
        } else {
          positionX.value -= 20 // Двигаем влево
        }
      }

      // Масштабирование
      else if (event.ctrlKey) {
        if (event.deltaY < 0) {
          scale.value += 0.1 // Увеличиваем масштаб
        } else {
          scale.value -= 0.1 // Уменьшаем масштаб
        }
        // Ограничиваем масштаб от 0.5 до 2
        scale.value = Math.max(0.5, Math.min(scale.value, 2))
      }
      // Управление положением по оси Y
      else {
        if (event.deltaY < 0) {
          positionY.value += 50 // Двигаем вверх
        } else {
          positionY.value -= 50 // Двигаем вниз
        }
      }
    }
    // Метод для экспорта в PDF

    const exportToPDF = async (event) => {
      const schemeData = props.schemeDataChunk // Используем либо переданные данные, либо данные из пропсов

      if (pages__wrapper.value) {
        try {
          const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4",
          })
          const pageElements = document.querySelectorAll(".page")

          for (let i = 0; i < pageElements.length; i++) {
            const page = pageElements[i]
            const canvas = await html2canvas(page, {
              scale: 3,
              useCORS: true,
            })

            const imgData = canvas.toDataURL("image/png")
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()

            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST")

            if (i !== pageElements.length - 1) {
              pdf.addPage()
            }
          }

          const fileName = `Схема-${schemeData["Вводной щит"]}.pdf`
          if (event?.target?.innerText === "Экспорт в PDF") {
            pdf.save(fileName)
          } else {
            return {
              file: pdf.output("blob"),
              name: fileName,
            }
          }
        } catch (err) {
          console.error("Ошибка при экспорте PDF:", err)
        }
      }
    }

    expose({
      exportToPDF,
    })
    return {
      scale,
      positionX,
      positionY,
      scalableArea,
      pages__wrapper,
      onWheelHandler,
      exportToPDF,
      groupedItems,
      totalPages,
    }
  },
})
</script>
<style lang="scss">
@use "./../scss/size.scss" as size;
.scheme__container {
  background: #d9d9d9;
  width: 80vw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: type-A;
}
.pages__wrapper {
  transition: 0.2s ease;
}
.page {
  height: size.$height;
  width: size.$width;
  min-height: size.$height;
  min-width: size.$width;
  background: #fff;
  filter: drop-shadow(5px 5px 10px #00000018);
  transform-origin: center; /* Центр для изменения масштаба */
  transition: transform 0.1s ease; /* Гладкая анимация */
  padding: 5mm 5mm 5mm 20mm;
  box-sizing: border-box;
  margin-bottom: 1vw;
}
.top-frame {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 0.5mm solid #000;
  box-sizing: border-box;
  position: relative;
}
</style>
