/**
 * Created by Anantha on 3/24/16.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');



app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


console.log("server.js running");
app.listen(port, ipaddress);