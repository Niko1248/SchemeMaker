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
          <Scheme :outputDevicesData="item" :listIndex="index + 1" />
          <CircuitScheme :pageData="item" :listIndex="index + 1" />
          <SchemeOutsideLeftTables />
          <SchemeInsideRightTable :listIndex="index + 1" :totalPages="totalPages" :pageData="item" />
          <ConsumerTable :pageData="item" />
          <ContinueNote v-if="totalPages !== 1" :listIndex="index + 1" :totalPages="totalPages" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch, reactive, onMounted } from "vue"
import { useSchemeDataStore } from "../stores/SchemeData"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import ContinueNote from "../components/ContinueNote.vue"
import SchemeOutsideLeftTables from "./table/SchemeOutsideLeftTables.vue"
import SchemeInsideRightTable from "./table/SchemeInsideRightTable.vue"
import CircuitScheme from "./table/CircuitTable.vue"
import ConsumerTable from "./table/ConsumerTable.vue"
import Scheme from "./scheme/Scheme.vue"

export default defineComponent({
  name: "SchemeContainer",
  components: { SchemeOutsideLeftTables, SchemeInsideRightTable, CircuitScheme, ConsumerTable, Scheme, ContinueNote },
  props: {
    tableData: { type: Object },
    schemeDataChunk: { type: Object },
  },

  setup(props, { expose }) {
    const schemeDataStore = useSchemeDataStore()
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

      const groupsCopy = [...props.schemeDataChunk["Группы"]]
      return schemeDataStore.splitInputAndOutputGroups(groupsCopy)
    })

    // watch(
    //   groupedItems,
    //   (newGroups) => {
    //     totalPages.value = newGroups.length
    //   },
    //   { immediate: true }
    // ) // 'immediate: true' сразу вызовет watch при инициализации

    // Обработчик событий колесика
    const onWheelHandler = (event) => {
      event.preventDefault() // Предотвращаем стандартное поведение (масштаб страницы)
      const wrapperRect = pages__wrapper.value.getBoundingClientRect()
      const windowHeight = window.innerHeight
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
        scale.value = Math.max(0.5, Math.min(scale.value, 3))
      }
      // Управление положением по оси Y
      else if (event.deltaY < 0) {
        if (wrapperRect.top + 50 <= 0) {
          positionY.value += 50
        }
      } else {
        if (wrapperRect.bottom - 50 >= windowHeight) {
          positionY.value -= 50
        }
      }
    }
    // Метод для экспорта в PDF

    const exportToPDF = async () => {
      const schemeData = props.schemeDataChunk
      scale.value = 1
      await new Promise((resolve) => setTimeout(resolve, 2000))
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

          return {
            file: pdf.output("blob"),
            name: fileName,
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
      inputDeviceData,
      outputDevicesData,
    }
  },
})
</script>
<style lang="scss">
@use "./../scss/size.scss" as size;
.scheme__container {
  /*   background: #d9d9d9;
 */
  width: 80vw;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: type-A;
}
.pages__wrapper {
  transition: 0.2s ease-out;
  padding: 50px 0;
  box-sizing: border-box;
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
  position: relative;
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
