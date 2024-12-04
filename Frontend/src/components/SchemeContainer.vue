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
import { defineComponent, ref, computed, watch } from "vue"
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
    inputDeviceData: { type: Object },
    outputDevicesData: { type: Array },
  },
  setup(props) {
    const scale = ref(1) // Начальный масштаб для элемента
    const positionX = ref(0) // Позиция по оси X
    const positionY = ref(0) // Позиция по оси Y

    const scalableArea = ref(null) // Ссылка на область
    const pages__wrapper = ref(0) // Ссылка на содержимое

    let totalPages = ref(0)
    const itemsPerComponent = 14
    const groupedItems = computed(() => {
      const groups = []
      if (props.outputDevicesData.length !== 0) {
        for (let i = 0; i < props.outputDevicesData.length; i += itemsPerComponent) {
          groups.push(props.outputDevicesData.slice(i, i + itemsPerComponent))
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
    const exportToPDF = async () => {
      if (pages__wrapper.value) {
        try {
          // Рендерим элемент в canvas
          const canvas = await html2canvas(pages__wrapper.value, {
            scale: 3, // Увеличиваем масштаб для более высокого разрешения
            useCORS: true, // Разрешаем кросс-домен
          })
          const imgData = canvas.toDataURL("image/png")

          // Создаем новый PDF
          const pdf = new jsPDF({
            orientation: "landscape", // Ориентация страницы
            unit: "mm", // Используем миллиметры
            format: "a4", // Размер страницы
          })

          // Вычисляем размеры изображения
          const pageWidth = 297 // A4 ширина в мм
          const pageHeight = 210 // A4 высота в мм
          const imgWidth = pageWidth
          const imgHeight = (canvas.height * imgWidth) / canvas.width

          // Добавляем изображение в PDF
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST")

          // Сохраняем PDF
          pdf.save("Scheme.pdf")
        } catch (err) {
          console.error("Ошибка при экспорте PDF:", err)
        }
      }
    }

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
