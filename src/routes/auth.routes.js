const express = require("express");
const router = express.Router();

const { login, me } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

router.post("/login", login);
router.get("/me", auth, me);
router.post("/logout", (req, res) => {
 res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});


  res.json({ message: "Logged out" });
});
module.exports = router;
