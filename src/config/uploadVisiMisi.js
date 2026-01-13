const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/visi-misi",
  filename: (_, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.includes("pdf")) {
      cb(new Error("Only PDF allowed"));
    }
    cb(null, true);
  },
});
