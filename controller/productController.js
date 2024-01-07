const Product = require("../model/product-info-model");
const path = require('path');


// Create a new product
exports.addProduct=async (req, res) => {
    try {
      const { productName, productCategory, productDescription, productQuantity, productPrice } = req.body;
    
      // Get the file path of the uploaded image
      const imagePath = path.basename(req.file.path);

      const newProduct = await Product.create({
        productName,
        productCategory,
        productDescription,
        productQuantity,
        productPrice,
        productImage: imagePath, // Store the image path in the product record
      });
      res.status(201).json({message: 'Product added successfully',newProduct});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get all products
exports.readProduct=async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get a specific product by ID
exports.readByProductId=async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Update a category by ID
exports.updateByProductId=async (req, res) => {
  try {
    const productId = req.params.id; // Get the product ID from the URL
    
    // Extract updated product details from the request body
    const { productName, productDescription, productCategory, productPrice, productQuantity } = req.body;
    
    let updatedProductData = {
      productName,
      productDescription,
      productCategory,
      productPrice,
      productQuantity,
    };
    
    // If a new image is uploaded, update the image path
    if (req.file) {
      const imagePath = path.basename(req.file.path)
      updatedProductData.productImage = imagePath;
    }

    // Find the product by ID and update its details
    const updatedProduct = await Product.update(updatedProductData, {
      where: { id: productId },
    });

    // Check if the product was updated successfully
    if (updatedProduct[0] === 1) {
       // Retrieve the updated product details after the update operation
      const updatedProduct = await Product.findOne({ where: { id: productId } });
      res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } else {
      res.status(404).json({ error: 'Product not found or not updated' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
}

// Delete a product by ID
exports.deleteByProductId= async (req, res) => {
    try {
      const productId = req.params.id;
      const deletedProduct = await Product.findByPk(productId);
      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        await deletedProduct.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };