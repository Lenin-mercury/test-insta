
var wrapper = require('../models/constants/wrapper.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const auth = require('../middleware/auth');

const mongoose = require('mongoose');
var User = mongoose.model('user')

module.exports.createUser = async function (req, res) {
try{

    const{name, phone, email, password, lastname, ...rest} = req.body;

    // newCustomer.Date = new Date();

     newUser = new User({
        name,
        lastname,
        phone,
       password,
        email

    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
     await newUser.save();

    // res.status(wrapper.SuccessCode).json(docs);

    const payload = {
        newUser: {
                        id: newUser.id
                    }
                }
                //return jssonwebtoken
                jwt.sign(
                    payload,
                    config.get('jwtSECRET'),
                    { expiresIn: 36000 },
                    (err, token) => {
                        if (err) throw err;
                        res.status(wrapper.SuccessCode).json({ token });
                    }
                );


}catch(err){
    console.log(err)
    res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
}
}

//get all user
module.exports.getAllUser= async function (req, res) {
    try {
        const searchCriteria = {
            statusflag: "A",
        };
        // const getUser = await User.find(searchCriteria).exec();
        let getUser = await User.find();

        res.status(wrapper.SuccessCode).json({ getUser: getUser })
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}

//get user By id
module.exports.getUserById= async function (req, res) {
  try {
    let user = await User.findOne({_id:req.params.id}).exec();

    res.status(wrapper.SuccessCode).json({ getUser: user });
} catch (e) {
    res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
}
}

module.exports.loginUser = async (req, res) =>

{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Password ' }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };


      jwt.sign(
        payload,
        config.get('jwtSECRET'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }

  //get user By id
module.exports.loadUser= async function (req, res) {
  try {
    let user = await User.findById(req.user.id).select('-password');
    res.json(user);
   } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error");
   }

}