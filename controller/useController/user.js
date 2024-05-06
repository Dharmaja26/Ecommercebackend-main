
const bcrypt = require('bcrypt');
const User = require('../../models/user');

//////////////register\\\\\\\\\\\\\\\\\
const registerUserCntrl =  async (req,res) => {
    try {
        console.log(req.body);
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.email &&
         !req.body.password) throw Error('Request body is empty');

      const {
            email,
            firstName,
            lastName,
            password,
           } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        firstName,
        lastName,
        password:hashedPassword
    });
    const savedUserToDb = await newUser.save();
    console.log('kjlhgfcd',savedUserToDb);
    if(!savedUserToDb) throw Error('Not able to save user, please try again later');
    res.status(200).send({
        message: "successFully registered the user"
    });
    } catch (error) {
        
   console.log(error);
    }
}


//////////////login\\\\\\\\\\\\\\\\\
const loginUserCntrl = async (req,res) => {
    console.log('&8636862362');
    try {
        console.log(req.body);
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.email && 
         !req.body.password) throw Error('Request body is empty');

      const {
            email,
            password,
           } = req.body;
    const userByEmail = await User.findOne({ email: email});
    if(!userByEmail) throw Error('user with the Given mail not found');
    const hashedPassword = await  bcrypt.compare(password, userByEmail.password)
console.log('!!!!!!!!!!');
    if(!hashedPassword) throw Error('Given password is incorrect, please try again later');
    console.log(userByEmail,'erfre');
    res.status(200).send(userByEmail);
    } catch (error) {
        console.log(7)
     
    }
}




const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) throw new Error('users not found');
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};
//////////////////////update//////////////////////////////////////////
const updateForget = async (req, res, next) => {
    try {
        if(!req.body) throw new Error('Body is required');        
        const {
            email,
            new_password
        } = req.body;
        const updatingUser = await User.findOne({email: email});     
        // if(!updatingUser) throw new Error('User not found');
        // else {           
            const hashedPassword = await bcrypt.hash(new_password, 10);
            updatingUser.password = hashedPassword;
            const savedUserToDb = await updatingUser.save();
            if(savedUserToDb) {
                res.status(200).send({
                    msg: 'User saved successfully'
                })
            }  
    } catch (error) {

        // res.status(500).send({
        //     error: error.message
        // });
    }
}
/////////////////////fav\\\\\\\\\\\\\\\\\
const wishList = async (req, res, next) => {
  try {
    if(!req.body) throw new Error('Body is required');        
    const {
        productId,
        userId
    } = req.body;
    const updatingWishList = await wishList.findOne({_id: userId});        
        updatingWishList.wishList.push(productId);
        const savedUserToDb = await updatingUser.save();
        if(savedUserToDb) {
            res.status(200).send({
                msg: 'Your Favourites'
            })
        }  
} catch (error) {

    // res.status(500).send({
    //     error: error.message
    // });
}
}


module.exports = {
   registerUserCntrl,
   loginUserCntrl,
   getAllUser,
   updateForget,
   wishList
}
