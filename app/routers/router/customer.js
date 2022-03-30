const express = require('express');
const router = express.Router();
// const { check, validationResult } = require('express-validator');

const {auth} = require('../../middleware/auth');

const Customer_controller = require('../../controllers/Customer_controller');

//import model
// const { Customer } = require('../../models/customer');

router.get('/', (req, res) => res.send('Customer Route'));

//@route post api/Customers
//@desc Register Customer
//@access Public

router.post("/create", auth, Customer_controller.createCustomer);

//@route get api/customer/getall
//@desc Get All Customer
//@access Public
router.get("/getall", Customer_controller.getAllCustomer);

router.get("/all",Customer_controller.getCustomer);
// router.get("/all", Customer_controller.getCustomer);

//@route get api/customer/getByid/:id
//@desc Get All Customer
//@access Public

router.get("/getbyid/:id", auth,Customer_controller.getbyid);


//@route get api/customer/updateByid/:id
//@desc Put Update Customer
//@access Public

router.put("/updatebyid/:id",auth, Customer_controller.updatebyid);


//@route delete api/customer/deletebyid/:id
//@desc delete Customer
//@access Public

router.delete("/deletebyid/:id", auth,Customer_controller.deletebyid);


module.exports = router;

