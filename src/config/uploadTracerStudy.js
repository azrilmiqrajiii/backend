const multer = require("multer")

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/tracer-study",
    filename: (_, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"))
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.includes("pdf")) return cb(new Error("File harus PDF"))
    cb(null, true)
  },
})
