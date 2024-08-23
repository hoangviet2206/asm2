var express = require('express');
var router = express.Router();
var ProductModel = require('../model/ProductModel'); // Import ProductModel

// Route để render trang chủ với danh sách sản phẩm
router.get('/', async (req, res) => {
  try {
      let products = await ProductModel.find({});
      console.log(products);  // Log sản phẩm ra để kiểm tra
      res.render('home', { products });
  } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Internal Server Error');
  }
});

// Route xử lý đăng nhập
router.post('/login', (req, res) => {
   let username = req.body.username;
   let password = req.body.password;
   
   if (username == "admin" && password == "admin") {
      res.redirect('/product/admin');
   } else if (username == "customer" && password == "customer") {
      res.redirect('/product/customer');
   } else {
      res.redirect('/');
   }
});

module.exports = router;
