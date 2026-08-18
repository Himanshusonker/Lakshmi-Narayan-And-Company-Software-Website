const express= require("express");
const router= express.Router();

const {clientRegister, clientLogin}= require("../controllers/clientAuthController");

// ============================================================
// CLIENT REGISTER
// ============================================================

router.post("/register", clientRegister);

// ============================================================
// CLIENT LOGIN
// ============================================================

router.post("/login", clientLogin);

module.exports=router;