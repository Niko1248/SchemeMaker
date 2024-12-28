import { defineStore } from "pinia"
import { reactive, computed } from "vue"
export const useSchemeDataStore = defineStore("schemeData", () => {
  const tableData = reactive({})
  const schemeData = reactive([])
  const inputDeviceData = reactive({})
  const outputDevicesData = reactive([])

  const splitTableAndSchemeData = (excelData, indexTable) => {
    Object.assign(tableData, excelData[indexTable]["Группы"][0]["Данные"][0])
    schemeData.splice(0, schemeData.length, ...excelData.filter((_, index) => index !== indexTable))
  }

  const filteredSchemeData = (checkDoc) => {
    if (!checkDoc) return []
    const checkScheme = schemeData.filter((doc) => doc?.["Вводной щит"] == checkDoc)
    return checkScheme
  }

  const splitInputAndOutputGroups = (data) => {
    const itemsPerComponent = 11
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
    console.log(isLinePE)

    return isLinePE
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
  }
})
