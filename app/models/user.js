const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: { type: String, required: true },
   lastname: { type: String, },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, minlength: 6 },
   token: { type: String },
   Date: { type: Date, default: Date.now },
});


module.exports  = mongoose.model('user', UserSchema);

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const user_schema = new Schema({
//    name: { type: String, required: true },
//    lastname: { type: String, },
//    email: { type: String, required: true, unique: true },
//    password: { type: String, required: true, minlength: 6 },
//    token: { type: String },
//    Date: { type: Date, default: Date.now }
// });


// module.exports = mongoose.model('user', user_schema);

