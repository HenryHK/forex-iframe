'use strict';

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var router = require("./app/routers/app.server.router");

var app = express();
app.use(express.static(path.join(__dirname, "app")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views', path.join(__dirname, "app", "views"));
app.use("/", router);

app.listen(3000, function() {
    console.log("The app is running");
});