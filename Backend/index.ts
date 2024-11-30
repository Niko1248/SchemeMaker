import express, { Request, Response } from "express";
import "express-async-errors";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
import multer from 'multer'
import ExcelJS from "exceljs";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Настройка multer для обработки файлов
const upload = multer({
  dest: "uploads/", // Папка для загрузки файлов
  limits: { fileSize: 5 * 1024 * 1024 }, // Максимальный размер файла - 5 MB
});

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, "dist"), { maxAge: "365d" }))

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"))
});
// Создаем маршрут для загрузки файла
app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "Файл не был загружен" });
        return;
      }

      const filePath = path.resolve(req.file.path);

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);

      const sheet = workbook.worksheets[0];
      const data: Array<Record<string, any>> = [];

      sheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
        if (rowNumber > 1) {
          data.push({
            column1: row.getCell(1).value,
            column2: row.getCell(2).value,
            column3: row.getCell(3).value,
          });
        }
      });

      res.status(200).json({ message: "Файл обработан", data });
    } catch (error) {
      next(error); // Передаем ошибку в middleware для обработки
    }
  }
);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

