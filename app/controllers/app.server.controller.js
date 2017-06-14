"use strict";

var http = require('http');

module.exports.getForexPrice = function(req, res) {
    var AUD_url = "http://api.fixer.io/latest?symbols=CNY,USD,NZD,CHF&base=AUD";
    var CNY_url = "http://api.fixer.io/latest?symbols=CNY&base=USD";

    var parsedAUDData;
    var parsedCNYData;

    function CDL(countdown, completion) {
        this.signal = function() {
            if (--countdown < 1) completion();
        };
    }

    var latch = new CDL(2, function() {
        console.log("latch.signal() was called 2 times.");
        console.log({
            AUD: parsedAUDData,
            CNY: parsedCNYData
        });
        res.render("index.pug", {
            AUD: parsedAUDData,
            CNY: parsedCNYData
        });

    });

    http.get(AUD_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDData = JSON.parse(rawData);
            latch.signal();
        });
    });

    http.get(CNY_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedCNYData = JSON.parse(rawData);
            latch.signal();
        });
    });


}