const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({

   user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
         },
   name: { type: String, },
   dob: { type: String, },
   email: { type: String,  },
   phone: { type: String,  },
   address: { type: String },
   medicareID: { type: String },
   status: { type: String },
   date:{type: Date, default:Date.now}

});

module.exports = mongoose.model('customer', CustomerSchema);


