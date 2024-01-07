const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database/db.js");

// Define the Category model
const Category = database.define('Category', {

    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

module.exports=Category;