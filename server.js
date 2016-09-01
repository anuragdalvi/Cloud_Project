/**
 * Created by Anantha on 3/24/16.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var connectionString = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test');

var db = mongoose.connection;
//var fs = require('fs');
app.use(express.static(__dirname + '/public'));

//var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.PORT || 3000;

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

console.log("server.js running");

require("./public/server/app.js")(app,mongoose,db);

app.listen(port, function() {
console.log("Listening on " + port);
});