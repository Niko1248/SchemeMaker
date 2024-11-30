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

    const sheet = workbook.worksheets[0]
    const data = []

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        data.push({
          column1: row.getCell(1).value,
          column2: row.getCell(2).value,
          column3: row.getCell(3).value,
        })
      }
    })

    res.status(200).json({ message: "Файл обработан", data })
  } catch (error) {
    next(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
