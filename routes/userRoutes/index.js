const express = require('express');
const router = express();
const multer  = require('multer')

const { loginUserCntrl, registerUserCntrl, getAllUser, updateForget,wishList} = require('../../controller/useController/user');
const { addProduct, productList, getAllProduct } = require('../../controller/useController/productManagement');
const { allProducts, addProductInCart } = require('../../controller/useController/cart.controller');


router.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });

router.post('/login', loginUserCntrl);
router.post('/register', registerUserCntrl);
router.get('/user', getAllUser);
router.post('/forgot',updateForget);
router.post('/favourite',wishList);
router.post('/addproduct',upload.single('file'),addProduct);
router.get('/productlist',getAllProduct);
router.post('/allproduct',allProducts);
router.get('/cart',addProductInCart)
const fs = require('fs');
const path = require('path');

router.get('/uploads/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, '../../uploads', fileName);
  console.log(fileName);
  console.log(filePath);

  if (fs.existsSync(filePath)) {
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});
module.exports = router;
