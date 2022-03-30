var express = require("express");
// var mongoose = require("mongoose");
var app = express();
var bodyParser = require("body-parser");
// var router = require("./Routers/route");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var router = express.Router();
var router = require("./app/routers/route");

var connectDB = require("./config/db");

// //proxy
// const { createProxyMiddleware } = require('http-proxy-middleware');

// app.use('/api', createProxyMiddleware({ target: 'http://localhost/4000', changeOrigin: true }));

// //proxy
// mongoose.set('useCreateIndex', true);
// mongoose.connect(('mongodb://localhost:27017/crm'), {
//   useNewUrlParser:true,
//   useUnifiedTopology:true
// });
// mongoose.connection.once("Connected",function(){
// 	console.log("Connection Established");
// });

connectDB();

var port = process.env.PORT || 4000;
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", router);
// app.use(express.static(path.join(__dirname, 'public')));
app.all("*", function (req, res) {
  res.status(200);
});
app.listen(port);
console.log("Express server listening on port " + port);

app.use(bodyParser.json());
