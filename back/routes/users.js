const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  registerUser,
  userLogin,
  userLogout,
  userCookie,
  findAllUsers,
} = require("../controllers/userControllers");

router.post("/register", registerUser);

router.post("/login", passport.authenticate("local"), userLogin);

router.post("/logout", userLogout);

router.get("/cookieuser", userCookie);

router.get("/admin", findAllUsers);

module.exports = router;
