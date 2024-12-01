<template>
  <div class="scheme__container" ref="scalableArea" @wheel.prevent="onWheelHandler">
    <div
      class="page"
      ref="page"
      :style="{
        transform: `translate(${positionX}px, ${positionY}px) scale(${scale})`,
      }"
    >
      <div class="top-frame">
        <SchemeOutsideLeftTables />
        <SchemeInsideRightTable :tableData="tableData" />
      </div>
    </div>
  </div>
  <!-- Кнопка для экспорта в PDF -->
  <button @click="exportToPDF">Экспорт в PDF</button>
</template>
<script>
import { defineComponent, ref } from "vue"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import SchemeOutsideLeftTables from "./SchemeOutsideLeftTables.vue"
import SchemeInsideRightTable from "./SchemeInsideRightTable.vue"

export default defineComponent({
  name: "SchemeContainer",
  components: { SchemeOutsideLeftTables, SchemeInsideRightTable },
  props: {
    tableData: { type: Object },
    schemeData: { type: Array },
  },
  setup() {
    const scale = ref(1) // Начальный масштаб для элемента
    const positionX = ref(0) // Позиция по оси X
    const positionY = ref(0) // Позиция по оси Y

    const scalableArea = ref(null) // Ссылка на область
    const page = ref(null) // Ссылка на содержимое

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
      // Управление положением по оси Y при зажатом Ctrl
      else if (event.ctrlKey) {
        if (event.deltaY < 0) {
          positionY.value += 20 // Двигаем вверх
        } else {
          positionY.value -= 20 // Двигаем вниз
        }
      }
      // Масштабирование без нажатия клавиш
      else {
        if (event.deltaY < 0) {
          scale.value += 0.1 // Увеличиваем масштаб
        } else {
          scale.value -= 0.1 // Уменьшаем масштаб
        }
        // Ограничиваем масштаб от 0.5 до 2
        scale.value = Math.max(0.5, Math.min(scale.value, 2))
      }
    }
    // Метод для экспорта в PDF
    const exportToPDF = async () => {
      console.log("asas")
      if (page.value) {
        try {
          // Рендерим элемент в canvas
          const canvas = await html2canvas(page.value, {
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
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "MEDIUM")

          // Сохраняем PDF
          pdf.save("export.pdf")
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
      page,
      onWheelHandler,
      exportToPDF,
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
