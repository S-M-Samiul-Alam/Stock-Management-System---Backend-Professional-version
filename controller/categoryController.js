const Category = require("../model/category-info-model");


// Create a new category
exports.createCategory=async (req, res) => {
    try {
      const { categoryName, categoryType, categoryDescription } = req.body;
      const newCategory = await Category.create({
        categoryName,
        categoryType,
        categoryDescription,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get all categories
exports.readCategory=async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Get a specific category by ID
exports.readByCategoryId=async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


// Update a category by ID
exports.updateByCategoryId=async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { categoryName, categoryType, categoryDescription } = req.body;
      const updatedCategory = await Category.findByPk(categoryId);
      if (!updatedCategory) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        updatedCategory.categoryName = categoryName;
        updatedCategory.categoryType = categoryType;
        updatedCategory.categoryDescription = categoryDescription;
        await updatedCategory.save();
        res.status(200).json(updatedCategory);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Delete a category by ID
exports.deleteByCategoryId=async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await Category.findByPk(categoryId);
      if (!deletedCategory) {
        res.status(404).json({ error: 'Category not found' });
      } else {
        await deletedCategory.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };