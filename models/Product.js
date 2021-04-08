const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  imgUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number
  }
});


const Product = mongoose.model('products', productSchema);
module.exports = Product;