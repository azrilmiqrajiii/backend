const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    destination: "uploads/kurikulum",
    filename: (_, file, cb) => {
      const safe = file.originalname.replace(/\s+/g, "_");
      cb(null, Date.now() + "-" + safe);
    },
  }),
  fileFilter: (_, file, cb) => {
    if (!file.mimetype.includes("pdf")) return cb(new Error("File harus PDF"));
    cb(null, true);
  },
});
