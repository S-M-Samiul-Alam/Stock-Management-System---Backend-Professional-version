const express = require("express");
const app = express();
const verifyToken = require('../middleware/verifyToken');

const category = require("./category-route");
const product = require("./product-route");
const authRoutes = require('./auth-route');

app.use("/category/", category);
app.use('/auth', authRoutes);
app.use('/product', product);

module.exports = app;
