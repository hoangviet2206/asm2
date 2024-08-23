const express = require('express')
const router = express.Router()

var ProductModel= require('../model/ProductModel')

//Get all product
//URL: http://localhost:PORT/book/admin
router.get('/admin', async (req, res) => {
   let products = await ProductModel.find({}).sort({ _id: -1 })
   res.render('product/admin', { products })
})

//URL: http://localhost:PORT/book/customer
router.get('/customer', async (req, res) => {
   let products = await ProductModel.find({}).sort({ _id: -1 })
   res.render('product/customer', { products })
})

//Get book by id
//URL: http://localhost:PORT/book/detail/{id}
router.get('/detail/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   //return book data based on id
   let products = await ProductModel.findById(id)
   console.log(products)
   //render view with book data
   res.render('product/detail', { products })
})

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/delete/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await ProductModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/product/admin')
})

//URL: http://localhost:PORT/book/add
//r
router.get('/add', async (req, res) => {
   let products = await ProductModel.find({})
   res.render('product/add' , { products })
})


router.post('/add', async (req, res) => {
   try {
      //get input data
      let products = req.body
      //save book to DB
      await ProductModel.create(products)
      //show message to console
      console.log('Add product succeed !')
   } catch (err) {
      console.error (err)
   }

   //redirect to book list page
   res.redirect('/product/admin')
})

//URL: http://localhost:PORT/book/edit/{id}
//render form "edit"
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let products = await ProductModel.findById(id)
   res.render('product/edit', { products })
})

//process form "edit"
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let products = req.body
   try {
      await ProductModel.findByIdAndUpdate(id, products)
      console.log('Edit product succeed !')
   } catch (err) {
      console.log("Edit product failed !")
      console.error(err)
   }
   res.redirect('/product/admin')
})

router.post('/search', async (req, res) => {
   let keyword = req.body.title
   let products = await ProductModel.find({ title: new RegExp(keyword, "i")})
   res.render('product/admin', { products })
})

router.get('/sort/asc', async (req, res) => {
   let products = await ProductModel.find().sort({ price: 1 })
   res.render('product/admin', { products })
})

router.get('/sort/desc', async (req, res) => {
   let products = await ProductModel.find().sort({ price: -1 })
   res.render('product/admin', { products })
})

router.get('/', async (req, res) => {
  try {
      let products = await ProductModel.find({}).sort({ _id: -1 });
      res.render('product', { products });
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router