const { Router } = require("express");
const User = require("../models/user");

const router = Router();

const {
  userSignin,
  userSignup,
  handleUserSignup,
  handleUserSignin,
} = require("../controllers/user");

router.get("/signin", userSignin);
router.get("/signup", userSignup);
router.post("/signup", handleUserSignup);
router.post("/signin", handleUserSignin);
router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

module.exports = router;
