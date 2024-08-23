const mongoose = require('mongoose')
const LegoSchema = new mongoose.Schema(
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
const LegoModel = mongoose.model('legos', LegoSchema)  //books: table name
module.exports = LegoModel