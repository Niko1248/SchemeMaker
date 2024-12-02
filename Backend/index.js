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
  limits: { fileSize: 5 * 1024 * 1024 },
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
      // Убираем название заголовков из экселя
      if (rowIndex === 1 || rowIndex === 4) return
      // Добавляем названия колонок в массивы
      if (rowIndex === 2) {
        row.eachCell((cell, colNumber) => {
          columnHeaderTable.push(cell.value)
        })
        return
      } else if (rowIndex === 5) {
        row.eachCell((cell, colNumber) => {
          columnHeaderScheme.push(cell.value)
        })
        return
      }
      // Парсим значения ячеек в JSON который уйдет на фронт
      const rowData = {}
      if (rowIndex === 3) {
        row.eachCell((cell, colNumber) => {
          rowData[columnHeaderTable[colNumber - 1]] = cell.value
        })
        data.push(rowData)
      } else {
        row.eachCell((cell, colNumber) => {
          if (cell.value.result) {
            rowData[columnHeaderScheme[colNumber - 1]] = cell.value.result
          } else {
            rowData[columnHeaderScheme[colNumber - 1]] = null
          }
        })
        if (rowData.Группа && rowData.Группа !== null) {
          data.push(rowData)
        }
      }
    })
    // Преобразую спорные типы, если в экселе будет забито неправильно
    for (const element of data) {
      if (element.Группа && element.Группа !== null) {
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
      let key = item.Группа
      if (key === undefined || key === null) {
        key = "Таблица"
      }
      if (!acc[key]) {
        acc[key] = [] // Инициализируем массив для нового ключа
      }

      acc[key].push(item) // Добавляем элемент в соответствующую группу

      return acc
    }, {})

    const result = Object.keys(groupedItems).map((key) => ({
      Группа: isNaN(parseInt(key)) ? key : parseInt(key), // Преобразуем ключ к числу, если требуется
      Данные: groupedItems[key], // Массив объектов для текущего ключа
    }))

    res.status(200).json({ message: "Файл обработан", result })
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
