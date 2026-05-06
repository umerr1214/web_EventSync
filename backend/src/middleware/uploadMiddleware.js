import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsRoot = path.join(process.cwd(), "src", "..", "uploads");
const postersDir = path.join(uploadsRoot, "posters");

fs.mkdirSync(postersDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, postersDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".png", ".jpg", ".jpeg", ".webp"].includes(ext) ? ext : ".jpg";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith("image/")) return cb(null, true);
  cb(new Error("Only image uploads are allowed"), false);
};

export const posterUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

