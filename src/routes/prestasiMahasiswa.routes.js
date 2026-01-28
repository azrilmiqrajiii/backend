const router = require("express").Router()
const auth = require("../middleware/auth.middleware")
const upload = require("../config/uploadPrestasi")
const c = require("../controllers/prestasiMahasiswa.controller")

router.get("/:prodi/:jenis", auth, c.list)
router.post("/", auth, c.create)
router.post("/:id/upload", auth, upload.single("file"), c.upload)
router.delete("/:id", auth, c.remove)

module.exports = router
