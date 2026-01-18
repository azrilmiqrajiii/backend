const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/kurikulum",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(null, false);
    }
    cb(null, true);
  },
});
