import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import ExcelJS from "exceljs"

const app = express()
const port = 7777

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 },
})

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "dist"), { maxAge: "365d" }))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Файл не был загружен" })
      return
    }

    const filePath = path.resolve(req.file.path)

    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const sheet = workbook.getWorksheet("Схема")
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
        rowData[columnHeaderScheme[colNumber - 1]] = value
      })

      if (rowData.Группа != null) {
        data.push(rowData)
      }
    })

    // Преобразую спорные типы, если в экселе будет забито неправильно
    for (const element of data) {
      if (element.Группа && element.Группа !== null) {
        let group = String(element.Группа)
        if (group.toLowerCase() === "ввод") {
          element.Группа = -1
        }
        element.Группа = Number(element.Группа)
      }

      if (element.Фаза && element.Фаза !== null) {
        const redactedPhase = new Set()

        // Приводим значение element.Фаза к строке
        String(element.Фаза)
          .split("")
          .forEach((item) => {
            if (item === "1" || item === "2" || item === "3" || item.toUpperCase() === "N") {
              redactedPhase.add(item)
            }
          })
        element.Фаза = Array.from(redactedPhase)
      }

      ;["Номинал", "PE", "Ток утечки УЗО"].forEach((key) => {
        if (element[key] != null) {
          element[key] = Number(element[key])
        }
      })
    }
    // Объединяю одинаковые группы
    const groupedItems = data.reduce((acc, item) => {
      // Определяем ключ для верхнего уровня группировки (по "Вводной щит")
      let mainKey = item["Вводной щит"]
      if (mainKey === undefined || mainKey === null) {
        mainKey = "Таблица"
      }

      // Если группы с таким "Вводной щит" еще нет, инициализируем пустой объект
      if (!acc[mainKey]) {
        acc[mainKey] = {}
      }

      // Определяем ключ для вложенной группировки (по "Группа")
      const groupKey = item["Группа"]
      if (!acc[mainKey][groupKey]) {
        acc[mainKey][groupKey] = [] // Инициализируем массив для вложенной группы
      }

      // Добавляем элемент в соответствующую вложенную группу
      acc[mainKey][groupKey].push(item)

      return acc
    }, {})

    // Преобразуем объект с вложенной структурой в массив объектов (если требуется)
    const result = Object.keys(groupedItems).map((mainKey) => ({
      "Вводной щит": mainKey,
      Группы: Object.keys(groupedItems[mainKey]).map((groupKey) => ({
        Группа: groupKey,
        Данные: groupedItems[mainKey][groupKey], // Массив данных для вложенной группы
      })),
    }))

    // Возвращаем результат
    res.status(200).json({ message: "Файл обработан", result })
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен, порт:${port}`)
})
