const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products)
  } catch (error) {
    console.log('error',error);
  }
}

module.exports = {
  getProducts
}