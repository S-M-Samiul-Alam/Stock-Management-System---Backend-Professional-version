const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database/db.js");

const Product = database.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    productCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  module.exports=Product;