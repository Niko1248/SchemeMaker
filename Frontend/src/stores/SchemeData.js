import { defineStore } from "pinia"
import { watch, reactive, ref } from "vue"
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

  // Расчет фазы входной группы
  watch(
    () => inputDeviceData["Данные"],
    (newData) => {
      for (const el of newData) {
        if (!el?.["Фаза"]) continue

        // Разбиваем строку по запятой и убираем пробелы
        const phaseArr = el["Фаза"].split(",").map((phase) => phase.trim())
        let arrLength = phaseArr.length

        // Считаем длину массива, уменьшая на 1, если есть "N"
        if (phaseArr.includes("N")) {
          arrLength -= 1
        }
        // Ограничиваем длину до 3
        arrLength = Math.min(arrLength, 3)
        // Если длина больше 0, возвращаем результат
        if (arrLength > 0) {
          inputPhase.value = { data: phaseArr, length: arrLength }
          return
        }
      }

      inputPhase.value = undefined // Если ничего не найдено
    },
    { deep: true } // Для вложенных изменений
  )
  const setFontSize = (id, key, value) => {
    if (!fontSizesArray[id]) {
      fontSizesArray[id] = {}
    }
    fontSizesArray[id][key] = value
  }
  const getFontSize = (id) => {
    return fontSizesArray[id] || {}
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
    fontSizesArray,
    amountExportScheme,
    setAmountExportScheme,
    amountReadyScheme,
  }
})
