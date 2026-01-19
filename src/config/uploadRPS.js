const multer = require("multer")
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/rps",
    filename: (_, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname))
  }),
  fileFilter: (_, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/))
      return cb(new Error("Only xlsx/xls allowed"))
    cb(null, true)
  }
})
