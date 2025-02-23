import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import parseExcelFile from "./parseExcelFile.js"

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
    const result = await parseExcelFile(filePath)

    // Возвращаем результат
    res.status(200).json({ message: "Файл обработан", result })
    console.timeEnd()
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Сервер запущен, порт:${port}`)
})
