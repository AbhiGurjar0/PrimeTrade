const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  isLoggedIn
} = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/isLoggedIn", isLoggedIn);


module.exports = router;