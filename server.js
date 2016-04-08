/**
 * Created by Anantha on 3/24/16.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var connectionString = mongoose.connect('mongodb://127.0.0.1:27017/test');

var db = mongoose.connection;

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log("server.js running");

require("./public/server/app.js")(app,mongoose,db);

app.listen(port, ipaddress);