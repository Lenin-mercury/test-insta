// import the necessary modules
const mongoose = require('mongoose');

const { Schema } = mongoose;

// create an export function to encapsulate the model creation
module.exports = exports = function auditinfo(schema, options) {
  // define schema

  schema.add({
    // createdby: {
    //   type: Schema.ObjectId, ref: 'User', required: true, index: true,
    // },
    createdby: String,
    createdat: { type: Date, required: true, index: true },
    // modifiedby: {
    //   type: Schema.ObjectId, ref: 'User', required: true, index: true,
    // },
    modifiedat: { type: Date, required: true, index: true },
    statusflag: { type: String, required: true, index: true },
    // orguid: {
    //   type: Schema.ObjectId, ref: 'Organisation', required: true, index: true,
    // },
    /** externaluid {String} - any external table unique uid */
    // externaluid: String,
  });
};