const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const uploadRPS = require("../config/uploadRPS");
const uploadPDF = require("../config/uploadKurikulumPDF");
const c = require("../controllers/kurikulum.controller");

router.get("/:prodi/:tahun", auth, c.get);

router.post(
  "/:prodi",
  auth,
  uploadPDF.fields([{ name: "pdf", maxCount: 1 }]),
  c.save,
);

router.post("/:prodi/rps/:index", auth, uploadRPS.single("rps"), c.uploadRps);

module.exports = router;
