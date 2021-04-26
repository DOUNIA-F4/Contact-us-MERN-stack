const express = require("express");
const controllers = require("../Controllers/contactController");
const router = express.Router();

router.get("/list", controllers.list);
router.post("/create", controllers.create);

module.exports = router;
