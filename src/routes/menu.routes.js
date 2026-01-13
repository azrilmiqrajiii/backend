const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const menuController = require("../controllers/menu.controller");

router.get("/", menuController.getMenus);

router.post("/", upload.single("image"), menuController.createMenu);
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
