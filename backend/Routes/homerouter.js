const express = require("express");

const router=express.Router();

const { getHomeData, createHomeData, updateHomeData }= require("../controllers/homeController");

const adminAuth=require("../middleware/adminAuth");

//                                          GET HOME PAGE

router.get("/", getHomeData );

//                                         CREATE HOME PAGE

router.post("/", adminAuth, createHomeData );

//                                          UPDATE HOME PAGE

router.put("/", adminAuth, updateHomeData );

module.exports = router;