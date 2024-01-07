const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/create/", categoryController.createCategory);
router.get("/read/", categoryController.readCategory);
router.get("/readByCategoryId/:id", categoryController.readByCategoryId);
router.put("/updateByCategoryId/:id", categoryController.updateByCategoryId);
router.delete("/deleteByCategoryId/:id", categoryController.deleteByCategoryId);

module.exports = router;


