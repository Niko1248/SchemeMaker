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
  console.time()
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
    // Вытаскиваем нужные фазы
    const validPhases = new Set(["1", "2", "3", "N"])
    for (const element of data) {
      if (element.Группа && element.Группа !== null) {
        let group = String(element.Группа).trim()
        element.Группа = group.toLowerCase() === "ввод" ? -1 : Number(group)
      }

      if (element.Фаза) {
        element.Фаза = Array.from(
          new Set([...String(element.Фаза)].filter((item) => validPhases.has(item.toUpperCase())))
        )
      }
    }
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
    const result = Object.values(groupedResult).map((group) => ({
      ...group,
      Группы: Object.values(group.Группы),
    }))

    // Возвращаем результат
    res.status(200).json({ message: "Файл обработан", result })
    console.timeEnd()
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен, порт:${port}`)
})
