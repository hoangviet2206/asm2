const express = require('express')
const router = express.Router()

var LegoModel= require('../model/LegoModel')

//Get all product
//URL: http://localhost:PORT/book/admin
router.get('/adminlego', async (req, res) => {
   let legos = await LegoModel.find({}).sort({ _id: -1 })
   res.render('Lego/adminlego', { legos })
})

//URL: http://localhost:PORT/book/customer
router.get('/customerlego', async (req, res) => {
   let legos = await LegoModel.find({}).sort({ _id: -1 })
   res.render('Lego/customerlego', { legos })
})

//Get book by id
//URL: http://localhost:PORT/book/detail/{id}
router.get('/detaillego/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   //return book data based on id
   let legos = await LegoModel.findById(id)
   console.log(legos)
   //render view with book data
   res.render('Lego/detaillego', { legos })
})

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/deletelego/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await LegoModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/Lego/adminlego')
})

//URL: http://localhost:PORT/book/add
//r
router.get('/addlego', async (req, res) => {
   let legos = await LegoModel.find({})
   res.render('Lego/addlego' , { legos })
})


router.post('/addlego', async (req, res) => {
   try {
      //get input data
      let legos = req.body
      //save book to DB
      await LegoModel.create(legos)
      //show message to console
      console.log('Add product succeed !')
   } catch (err) {
      console.error (err)
   }

   //redirect to book list page
   res.redirect('/Lego/adminlego')
})

//URL: http://localhost:PORT/book/edit/{id}
//render form "edit"
router.get('/editlego/:id', async (req, res) => {
   let id = req.params.id
   let products = await ProductModel.findById(id)
   res.render('Lego/editlego', { products })
})

//process form "edit"
router.post('/editlego/:id', async (req, res) => {
   let id = req.params.id
   let legos = req.body
   try {
      await LegoModel.findByIdAndUpdate(id, legos)
      console.log('Edit product succeed !')
   } catch (err) {
      console.log("Edit product failed !")
      console.error(err)
   }
   res.redirect('/Lego/adminlego')
})

router.post('/searchlego', async (req, res) => {
   let keyword = req.body.title
   let legos = await LegoModel.find({ title: new RegExp(keyword, "i")})
   res.render('Lego/adminlego', { legos })
})

router.get('/sort/asc', async (req, res) => {
   let products = await ProductModel.find().sort({ price: 1 })
   res.render('Lego/adminlego', { legos })
})

router.get('/sort/desc', async (req, res) => {
   let legos = await LegoModel.find().sort({ price: -1 })
   res.render('Lego/adminlego', { legos })
})

router.get('/', async (req, res) => {
  try {
      let legos = await LegoModel.find({}).sort({ _id: -1 });
      res.render('Lego', { legos });
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router