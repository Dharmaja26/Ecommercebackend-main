const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addProduct: {
        type: String,
      
    },
    productList: {
        type: String,
       
    },
    wishList: [{
        type: String,
    
      }]

      
},

{
    collection: 'user'
});

module.exports = mongoose.model('User',userSchema);

