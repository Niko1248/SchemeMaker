import { defineStore } from "pinia"
import { reactive, ref, computed } from "vue"
export const useSchemeDataStore = defineStore("schemeData", () => {
  const tableData = reactive({})
  const schemeData = reactive([])
  const inputDeviceData = reactive({})
  const outputDevicesData = reactive([])
  const totalPages = ref(0)
  const listFormat = ref("A3")
  const amountReadyScheme = ref(0)
  const amountExportScheme = ref(0)
  const fontSizesArray = reactive({})
  const lineHeightArray = reactive({})
  const openPopupId = ref(null)
  const guidePopup = ref(false)
  const currentStepGuide = ref(1)

  // Методы для управления попапами
  const setOpenPopupId = (id) => (openPopupId.value = id)
  const closePopup = () => (openPopupId.value = null)
  const toggleGuidePopup = (value) => (guidePopup.value = value)

  // Методы для управления шагами гайда
  const nextStepGuide = () => {
    currentStepGuide.value++
  }
  const backStepGuide = () => {
    currentStepGuide.value--
  }

  //Методы для управления стилями
  const setFontSize = (id, key, value) => {
    if (!fontSizesArray[id]) {
      fontSizesArray[id] = {}
    }
    fontSizesArray[id][key] = value
  }
  const getFontSize = (id) => {
    return fontSizesArray[id] || {}
  }
  const setLineHeight = (id, key, value) => {
    if (!lineHeightArray[id]) {
      lineHeightArray[id] = {}
    }
    lineHeightArray[id][key] = value
  }
  const getLineHeight = (id) => {
    return lineHeightArray[id] || {}
  }

  // Методы для работы с данными
  const firstObject = (data) => data["Данные"][0] || []
  const secondObject = (data) => data["Данные"][1] || []

  // Метод для проверки линии PE
  const checkLinePE = (data) => {
    const isLinePE = data["Данные"].findIndex((obj) => obj?.["PE"])

    return isLinePE
  }

  // Метод для определения фазы устройства
  const checkPhase = (data) => {
    const phaseArr = data?.["Данные"]?.[0]?.["Фаза"]
    const arrLength = phaseArr.length
    if (phaseArr.includes("N")) {
      arrLength -= 1 // Уменьшаем значение на 1, если есть "N".
    }

    return { data: phaseArr, phaseLength: arrLength }
  }

  const filteredSchemeData = computed(() => (checkDoc) => {
    if (!checkDoc) return []
    return schemeData.filter((doc) => doc?.["Вводной щит"] === checkDoc)
  })

  // Метод для разделения штампа и данных устройств
  const splitTableAndSchemeData = (excelData, indexTable) => {
    Object.assign(tableData, excelData[indexTable]["Группы"][0]["Данные"][0])
    schemeData.splice(0, schemeData.length, ...excelData.filter((_, index) => index !== indexTable))
  }

  // метод для разделения входной и выходной групп
  const splitInputAndOutputGroups = (data) => {
    let itemsPerComponent
    if (listFormat.value === "A4") {
      itemsPerComponent = 11
    } else {
      itemsPerComponent = 17
    }

    let indexInputDevice = data.findIndex((el) => el["Группа"] == -1)
    // Добавляем найденный элемент
    Object.assign(inputDeviceData, data[indexInputDevice])
    // Удаляем
    data.splice(indexInputDevice, 1)
    // Перезаписываем outputDevicesData
    outputDevicesData.splice(0, outputDevicesData.length, ...data)
    const groups = []
    if (outputDevicesData.length !== 0) {
      for (let i = 0; i < outputDevicesData.length; i += itemsPerComponent) {
        groups.push(outputDevicesData.slice(i, i + itemsPerComponent))
      }
    }
    return groups
  }

  const setTotalPages = (value) => {
    totalPages.value = value
  }

  const setAmountExportScheme = (value) => {
    amountExportScheme.value = value
  }

  return {
    tableData,
    schemeData,
    inputDeviceData,
    outputDevicesData,
    firstObject,
    secondObject,
    splitTableAndSchemeData,
    splitInputAndOutputGroups,
    filteredSchemeData,
    checkLinePE,
    setTotalPages,
    totalPages,
    listFormat,
    setFontSize,
    getFontSize,
    getLineHeight,
    setLineHeight,
    fontSizesArray,
    lineHeightArray,
    amountExportScheme,
    setAmountExportScheme,
    amountReadyScheme,
    checkPhase,
    openPopupId,
    setOpenPopupId,
    closePopup,
    toggleGuidePopup,
    guidePopup,
    currentStepGuide,
    nextStepGuide,
    backStepGuide,
  }
})
