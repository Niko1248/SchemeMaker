import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import multer from "multer"
import parseExcelFile from "./parseExcelFile.js"

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
    const result = await parseExcelFile(filePath)

    // Удаляем временный файл после обработки
    fs.unlinkSync(filePath)

    // Отправка результата
    res.status(200).json({ message: "Файл обработан", result })
    console.timeEnd("File processing time")
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(error)
  }
})

// Запуск HTTP-сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://schememaker.ru:${port}`)
})
