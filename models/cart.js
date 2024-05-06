const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const cart = mongoose.model('cart', cartSchema)
module.exports =  cart