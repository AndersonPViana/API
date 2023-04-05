import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
  // Storing the image
  storage: multer.diskStorage({
    // The way to save
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      // Extension
      const ext = path.extname(file.originalname);
      // Image file name
      const name = path.basename(file.originalname, ext);

      // Formatting the file name
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  })
}