const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/kurikulum",
    filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  }),
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.includes("pdf")) return cb(new Error("File harus PDF"));
    cb(null, true);
  },
});
