const multer = require("multer")
const path = require("path")

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/rps",
    filename: (_, file, cb) => {
      const safe = file.originalname.replace(/\s+/g, "_")
      cb(null, Date.now() + "-" + safe)
    },
  }),
  fileFilter: (_, file, cb) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/))
      return cb(new Error("Only xls/xlsx allowed"))
    cb(null, true)
  },
})
