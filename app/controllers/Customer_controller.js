
var wrapper = require('../models/constants/wrapper.js');
const  Customer  = require("../models/Customer");

const mongoose = require('mongoose');
const { getRounds } = require('bcryptjs');
var User = mongoose.model('user')

// const { check, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports.createCustomer = async function (req, res) {
try{

    const getUser = await User.findOne({_id:req.user.id});
    const{name, phone, email, dob, address, status, medicareID,approver, ...rest} = req.body;

     newCustomer = new Customer({
        user: req.user.id,
        approver: getUser.approver,
        name,
        phone,
        address,
        email,
        dob,
        medicareID,
        status
    });
    

    let docs =  await newCustomer.save();
    res.status(wrapper.SuccessCode).json(docs);
    // res.status(wrapper.SuccessCode).json({ getUser: getUser })

}catch(err){
    console.log(err)
    res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
}
}

// Get all customer.
module.exports.getCustomer= async function (req, res) {
    try {
        const searchCriteria = {
            statusflag: "A",            
        };
        // const getCustomer = await Customer.find(searchCriteria).exec();
        const getCustomer = await Customer.find().populate('user', ['name', 'email']);
        

        res.status(wrapper.SuccessCode).json({ getCustomer: getCustomer })
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}

// Get all customer of the user.
module.exports.getAllCustomer= async function (req, res) {
    try {
        // const searchCriteria = {
        //     statusflag: "A",            
        // };

        // const getCustomer = await Customer.find(searchCriteria).exec();
        const getCustomer = await Customer.find({user:req.user.id})
                                        .populate('user', ['name', 'email'])
                                        .populate('approver', ['name', 'email']);

        res.status(wrapper.SuccessCode).json({ getCustomer: getCustomer })
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}

module.exports.getbyid = async function (req, res) {
    try {
        let customer = await Customer.findOne({_id:req.params.id})
        .populate('user', ['name', 'email'])
        .populate('approver', ['name', 'email'])
        ;

        res.status(wrapper.SuccessCode).json({ getCustomer: customer });
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}

module.exports.updatebyid = async function (req, res) {
    try {
        let customer = await Customer.findOne({_id:req.params.id}).exec();
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer.email = req.body.email;
        customer.dob = req.body.dob;
        customer.address = req.body.address;
        customer.status = req.body.status;
        customer.medicareID = req.body.medicareID;
        let docs =  await customer.save();
        res.status(wrapper.SuccessCode).json({ getCustomer: docs });
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}

module.exports.deletebyid = async function (req, res) {
    try {
        await Customer.deleteOne({ _id: req.params.id }).exec();
        res.status(wrapper.SuccessCode).json(wrapper.SuccessStatus);
    } catch (e) {
        res.status(wrapper.FailureCode).json({ error: wrapper.FailureStatus });
    }
}
