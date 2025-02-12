import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import ExcelJS from "exceljs"

const app = express()
const port = 3000

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
      // Убираем название заголовков из экселя
      if (rowIndex === 1 || rowIndex === 4) return
      // Добавляем названия колонок в массивы
      if (rowIndex === 2) {
        row.eachCell((cell, colNumber) => {
          columnHeaderTable.push(cell.value)
        })
        return
      }
      if (rowIndex === 3) {
        row.eachCell((cell, colNumber) => {
          if (columnHeaderTable[colNumber - 1] === "Дата 1" || columnHeaderTable[colNumber - 1] === "Дата 2") {
            const date = new Date(cell.value.result)
            const month = String(date.getMonth() + 1).padStart(2, "0")
            const year = String(date.getFullYear()).slice(-2)
            const convertDate = `${month}.${year}`
            rowData[columnHeaderTable[colNumber - 1]] = convertDate
          } else if (cell.value) {
            rowData[columnHeaderTable[colNumber - 1]] = cell.value.result
          }
        })
        data.push(rowData)
        return
      }
      if (rowIndex === 5) {
        row.eachCell((cell, colNumber) => {
          columnHeaderScheme.push(cell.value)
        })
        return
      }
      // Парсим значения ячеек в JSON который уйдет на фронт

      row.eachCell((cell, colNumber) => {
        if (cell.value.result) {
          rowData[columnHeaderScheme[colNumber - 1]] = cell.value.result
        } else if (!cell.value.formula) {
          rowData[columnHeaderScheme[colNumber - 1]] = cell.value
        } else {
          rowData[columnHeaderScheme[colNumber - 1]] = null
        }
      })
      if (rowData.Группа !== null && rowData.Группа !== undefined) {
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
        element.Фаза = String(element.Фаза)
        // Прнинудительно меняю . на , в "Фаза", т.к. при считывании экселя он воспринимает его как десятичное число и никак не правится
        element.Фаза = element.Фаза.replace(".", ",")
      }
      if (element.Номинал && element.Номинал !== null) {
        element.Номинал = Number(element.Номинал)
      }
      if (element.PE && element.PE !== null) {
        element.PE = Number(element.PE)
      }
      if (element["Ток утечки УЗО"] && element["Ток утечки УЗО"] !== null) {
        element["Ток утечки УЗО"] = Number(element["Ток утечки УЗО"])
      }
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
