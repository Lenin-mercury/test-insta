const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const User_controller = require('../../controllers/User_controller');

//import model
// const { User } = require('../../models/user');

//import middlewaare
let { authApp , auth} = require('../../middleware/auth');

//@route post api/users
//@desc Register user
//@access Public


router.get("/", auth, User_controller.loadUser);
router.post("/create", User_controller.createUser);
router.get("/getall", User_controller.getAllUser);
router.get("/getbyid/:id", User_controller.getUserById);

router.post("/login", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
   User_controller.loginUser);

module.exports = router;
