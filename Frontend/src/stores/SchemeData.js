import { defineStore } from "pinia"
import { reactive, ref } from "vue"
export const useSchemeDataStore = defineStore("schemeData", () => {
  const tableData = reactive({})
  const schemeData = reactive([])
  const inputDeviceData = reactive({})
  const outputDevicesData = reactive([])
  const totalPages = ref(0)
  const inputPhase = ref(undefined)
  const fontSizeMod = ref(false)
  const listFormat = ref("A3")
  const amountReadyScheme = ref(0)
  const amountExportScheme = ref(0)
  const fontSizesArray = reactive({})
  const lineHeightArray = reactive({})
  const setAmountExportScheme = (value) => {
    amountExportScheme.value = value
  }

  const splitTableAndSchemeData = (excelData, indexTable) => {
    Object.assign(tableData, excelData[indexTable]["Группы"][0]["Данные"][0])
    schemeData.splice(0, schemeData.length, ...excelData.filter((_, index) => index !== indexTable))
  }

  const filteredSchemeData = (checkDoc) => {
    if (!checkDoc) return []
    const checkScheme = schemeData.filter((doc) => doc?.["Вводной щит"] == checkDoc)
    return checkScheme
  }

  const setTotalPages = (value) => {
    totalPages.value = value
  }

  const fontSizeModToggle = (value) => {
    fontSizeMod.value = value
  }
  const lineHeightModToggle = (value) => {
    lineHeightMod.value = value
  }
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

  const firstObject = (data) => data["Данные"][0] || []
  const secondObject = (data) => data["Данные"][1] || []

  const checkLinePE = (data) => {
    const isLinePE = data["Данные"].findIndex((obj) => obj?.["PE"])
    return isLinePE
  }
  const checkPhase = (data) => {
    const phaseArr = data?.["Данные"]?.[0]?.["Фаза"]
      .split(",") // Разбиваем строку в массив
      .map((el) => el.trim()) // Убираем пробелы у каждого элемента

    let arrLength = Math.min(phaseArr.length, 3) // Ограничиваем длину максимум 3.

    if (phaseArr.includes("N")) {
      arrLength -= 1 // Уменьшаем значение на 1, если есть "N".
    }
    return { data: phaseArr, phaseLength: arrLength }
  }

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
    inputPhase,
    fontSizeMod,
    fontSizeModToggle,
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
  }
})
