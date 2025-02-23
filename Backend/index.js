import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import ExcelJS from "exceljs"
import fs from "fs" // Для работы с файловой системой

const app = express()
const port = 7777 // Используем порт 80 для HTTP

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Настройка Multer для загрузки файлов
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 20 * 1024 * 1024 }, // Ограничение на размер файла (20 МБ)
})

// Middleware
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "dist"), { maxAge: "365d" }))

// Роут для главной страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})

// Роут для загрузки и обработки файла
app.post("/upload", upload.single("file"), async (req, res) => {
  console.time("File processing time")
  try {
    // Проверка наличия файла
    if (!req.file) {
      return res.status(400).json({ error: "Файл не был загружен" })
    }

    const filePath = path.resolve(req.file.path)

    // Чтение Excel-файла
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.readFile(filePath)
    const sheet = workbook.getWorksheet("Схема")
    if (!sheet) {
      // Удаляем временный файл, если лист не найден
      fs.unlinkSync(filePath)
      return res.status(400).json({ error: "Лист 'Схема' не найден в файле" })
    }

    const data = []
    const columnHeaderTable = []
    const columnHeaderScheme = []

    // Обработка строк Excel-файла
    sheet.eachRow((row, rowIndex) => {
      const rowData = {}

      // Пропускаем строки 1 и 4
      if ([1, 4].includes(rowIndex)) return

      // Обработка заголовков таблиц
      if ([2, 5].includes(rowIndex)) {
        row.eachCell((cell) => {
          ;(rowIndex === 2 ? columnHeaderTable : columnHeaderScheme).push(cell.value)
        })
        return
      }

      // Обработка строки штампа (строка 3)
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

      // Обработка строк устройств
      row.eachCell((cell, colNumber) => {
        const value = cell.value.result ?? (cell.value.formula ? null : cell.value)
        rowData[columnHeaderScheme[colNumber - 1]] = value
      })

      if (rowData.Группа != null) {
        data.push(rowData)
      }
    })

    // Обработка фаз
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

    // Группировка данных
    const groupedResult = data.reduce((acc, item) => {
      const mainKey = item["Вводной щит"] || "Таблица"
      const groupKey = item["Группа"]

      if (!acc[mainKey]) {
        acc[mainKey] = { "Вводной щит": mainKey, Группы: {} }
      }

      if (!acc[mainKey].Группы[groupKey]) {
        acc[mainKey].Группы[groupKey] = { Группа: groupKey, Данные: [] }
      }

      acc[mainKey].Группы[groupKey].Данные.push(item)
      return acc
    }, {})

    // Преобразование объекта в массив
    const result = Object.values(groupedResult).map((group) => ({
      ...group,
      Группы: Object.values(group.Группы),
    }))

    // Удаляем временный файл после обработки
    fs.unlinkSync(filePath)

    // Отправка результата
    res.status(200).json({ message: "Файл обработан", result })
    console.timeEnd("File processing time")
  } catch (error) {
    console.error("Ошибка при обработке файла:", error)
    res.status(500).json({ error: "Ошибка при обработке файла" })

    // Удаляем временный файл в случае ошибки
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
  }
})

// Запуск HTTP-сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://schememaker.ru:${port}`)
})
