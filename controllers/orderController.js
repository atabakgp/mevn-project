const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products)
  } catch (error) {
    console.log('error', error);
  }
}

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findById(id);
    res.json(singleProduct);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProductById
}