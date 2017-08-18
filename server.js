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
app.use("/api", router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("The app is running");
});