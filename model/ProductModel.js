const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         minLength: 5,
         maxLength: 50
      },
      company: String,
      price: {
         type: Number,
         required: true,
         min: [1, 'Lowest price must be 1$'],
         max: 1000
      },
      cover: String,
   },
   {
      versionKey: false
   }
)
const ProductModel = mongoose.model('products', ProductSchema)  //books: table name
module.exports = ProductModel