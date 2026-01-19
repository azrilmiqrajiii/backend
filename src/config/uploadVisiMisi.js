const multer = require("multer");

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
      return cb(new Error("File harus PDF"));
    }
    cb(null, true);
  },
});
