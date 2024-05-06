const product = require('../../models/product')
const cart = require('../../models/cart')

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({userId: req.user._id}).populate('productId')
    // console.log(carts)
    res.status(200).send({status: 'ok', cart})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const addProductInCart = async (req, res) => {
  const {productId,
    price,
    quantity, 
    total} = req.body
  try {
    const cart = await Cart.findOneAndUpdate(
      {productId},
      {productId, 
        price,
        quantity,
        total,
         userId: req.user._id},
      {upsert: true},
    )

    res.status(201).send({status: 'ok', cart})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
const deleteProductInCart = async (req, res) => {
  try {
    await cart.findByIdAndRemove(req.params.id)
    res.status(200).send({status: 'ok'})
  } catch (e) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const allProducts = async (req, res) => {
  try {
    const allproducts= await  product.find()
    res.status(200).send({allProducts: 'ok',allProducts})
  } catch (e) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}
module.exports = {addProductInCart, deleteProductInCart, getCartProducts,allProducts}


