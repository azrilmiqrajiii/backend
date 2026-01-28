const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const upload = require("../config/uploadTracerStudy")
const c = require("../controllers/waktuTungguLulusan.controller")

router.get("/:prodi/:tahun", auth, c.get)
router.post("/:prodi", auth, upload.single("file"), c.save)

module.exports = router
