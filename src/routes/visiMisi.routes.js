const router = require("express").Router();
const upload = require("../config/uploadVisiMisi");
const auth = require("../middleware/auth.middleware");
const c = require("../controllers/visiMisi.controller");

router.get("/:prodi/:tahun", auth, c.get);
router.post("/:prodi", auth, upload.single("file"), c.save);
router.delete("/:id", auth, c.remove);

module.exports = router;
