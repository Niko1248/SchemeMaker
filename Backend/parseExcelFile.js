import ExcelJS from "exceljs"
import validateDeviceData from "./validateDeviceData.js"
export default async function parseExcelFile(filePath) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.readFile(filePath)
  const sheet = workbook.getWorksheet("Схема")
  if (!sheet) {
    throw new Error('Лист "Схема" не найден')
  }

  const data = []
  const columnHeaderTable = []
  const columnHeaderScheme = []

  sheet.eachRow((row, rowIndex) => {
    const rowData = {}
    // Пропускаем 1 и 4 строку
    if ([1, 4].includes(rowIndex)) return

    // Добавляем заголовки таблиц
    if ([2, 5].includes(rowIndex)) {
      row.eachCell((cell) => {
        ;(rowIndex === 2 ? columnHeaderTable : columnHeaderScheme).push(cell.value)
      })
      return
    }

    // Добавляем значения штампа
    if (rowIndex === 3) {
      row.eachCell((cell, colNumber) => {
        const header = columnHeaderTable[colNumber - 1]
        // Приводим дату в правильный вид
        if (["Дата 1", "Дата 2"].includes(header)) {
          const date = new Date(cell.value.result)
          const month = String(date.getMonth() + 1).padStart(2, "0")
          const year = String(date.getFullYear()).slice(-2)
          rowData[header] = `${month}.${year}`
        } else if (cell.value) {
          rowData[header] = cell.value.result
        }
      })
      data.push(rowData)
      return
    }
    // Добавляем значения устройств
    row.eachCell((cell, colNumber) => {
      const value = cell.value.result ?? (cell.value.formula ? null : cell.value)
      rowData[columnHeaderScheme[colNumber - 1]] = String(value).trim()
    })
    rowData.Строка = String(row._number)
    if (rowData.Группа != null) {
      data.push(rowData)
    }
  })
  // Вытаскиваем нужные фазы
  // const validPhases = new Set(["1", "2", "3", "N"])
  validateDeviceData(data)

  // Объединяю одинаковые группы
  const groupedResult = data.reduce((acc, item) => {
    // Определяем ключ для верхнего уровня группировки (по "Вводной щит" и Группа)
    const mainKey = item["Вводной щит"] || "Таблица"
    const groupKey = item["Группа"]
    // Если группы с таким "Вводной щит" еще нет, инициализируем пустой объект
    if (!acc[mainKey]) {
      acc[mainKey] = { "Вводной щит": mainKey, Группы: {} }
    }

    if (!acc[mainKey].Группы[groupKey]) {
      acc[mainKey].Группы[groupKey] = { Группа: groupKey, Данные: [] }
    }
    // Добавляем элемент в соответствующую вложенную группу
    acc[mainKey].Группы[groupKey].Данные.push(item)

    return acc
  }, {})

  // Преобразуем объект в массив только в конце
  return Object.values(groupedResult).map((group) => ({
    ...group,
    Группы: Object.values(group.Группы),
  }))
}
