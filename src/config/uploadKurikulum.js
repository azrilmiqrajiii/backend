const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/kurikulum",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

module.exports = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
