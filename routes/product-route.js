const express = require("express");
const multer = require('multer');
const path = require('path');

const router = express.Router();
const productController = require("../controller/productController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename for the uploaded file
  },
});
const upload = multer({ storage });


router.post("/add/", upload.single('productImage'), productController.addProduct);
router.get("/read/", productController.readProduct);
router.get("/readByProductId/:id", productController.readByProductId);
router.put("/updateByProductId/:id", upload.single('productImage'), productController.updateByProductId);
router.delete("/deleteByProductId/:id", productController.deleteByProductId);

module.exports = router;
