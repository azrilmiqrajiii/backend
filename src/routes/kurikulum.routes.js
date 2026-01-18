const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../config/uploadKurikulum");
const c = require("../controllers/kurikulum.controller");

router.get("/:prodi/:tahun", auth, c.get);

router.post(
  "/:prodi",
  auth,
  (req, res, next) => {
    if (req.headers["content-type"]?.includes("multipart/form-data")) {
      upload.single("file")(req, res, next);
    } else {
      next();
    }
  },
  c.save
);

module.exports = router;
