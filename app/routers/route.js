let express = require("express");
let api = express.Router();
let routers = require("./router");

api.use('/user', routers.user);
api.use('/auth', routers.auth);
api.use('/customer', routers.customer);


module.exports = api;