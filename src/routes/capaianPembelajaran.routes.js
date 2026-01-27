const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const uploadSk = require("../config/uploadSkYudisium");
const controller = require("../controllers/capaianPembelajaran.controller");

router.get("/:prodi", auth, controller.list);
router.post("/:prodi/bulk", auth, controller.bulkSave);
router.post(
  "/:id/upload-sk",
  auth,
  uploadSk.single("file"),
  controller.uploadSk,
);
router.delete("/:id", auth, controller.remove);

module.exports = router;
