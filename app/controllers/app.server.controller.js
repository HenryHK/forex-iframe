"use strict";

var http = require('http');
var https = require('https');

module.exports.getApi = function(req, res) {
    var parsedAUDCNH;
    var AUDCNH_url = "https://forex.1forge.com/1.0.2/quotes?pairs=AUDCNH&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";

    function CDL(countdown, completion) {
        this.signal = function() {
            if (--countdown < 1) completion();
        };
    }

    var latch = new CDL(1, function() {

        console.log("latch.signal() was called 1 times.");
        console.log({
            AUDCNH: parsedAUDCNH
        });
        res.json({
            AUDCNH: (Number(parsedAUDCNH[0].price) * 1.025).toFixed(4)
        });

    });

    https.get(AUDCNH_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDCNH = JSON.parse(rawData);
            latch.signal();
        });
    });
}

module.exports.getForexPrice = function(req, res) {
    var AUD_url = "http://api.fixer.io/latest?symbols=CNY,USD,NZD,CHF&base=AUD";
    var CNY_url = "http://api.fixer.io/latest?symbols=CNY&base=USD";

    var AUDCNH_url = "https://forex.1forge.com/1.0.2/quotes?pairs=AUDCNH&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";
    var AUDUSD_url = "https://forex.1forge.com/1.0.2/quotes?pairs=AUDUSD&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";
    var AUDNZD_url = "https://forex.1forge.com/1.0.2/quotes?pairs=AUDNZD&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";
    var AUDCHF_url = "https://forex.1forge.com/1.0.2/quotes?pairs=AUDCHF&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";
    var USDCNH_url = "https://forex.1forge.com/1.0.2/quotes?pairs=USDCNH&api_key=QfvLze2oE5R3qD5UGvkhEUg1mWwxellN";

    var parsedAUDCNH;
    var parsedAUDUSD;
    var parsedAUDNZD;
    var parsedAUDCHF;
    var parsedUSDCNH;

    function CDL(countdown, completion) {
        this.signal = function() {
            if (--countdown < 1) completion();
        };
    }

    var latch = new CDL(5, function() {
        console.log("latch.signal() was called 5 times.");
        console.log({
            AUDCNH: parsedAUDCNH,
            AUDUSD: parsedAUDUSD,
            AUDNZD: parsedAUDNZD,
            AUDCHF: parsedAUDCHF,
            USDCNH: parsedUSDCNH
        });
        res.render("index.pug", {
            AUDCNH: parsedAUDCNH,
            AUDUSD: parsedAUDUSD,
            AUDNZD: parsedAUDNZD,
            AUDCHF: parsedAUDCHF,
            USDCNH: parsedUSDCNH
        });

    });

    https.get(AUDCNH_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDCNH = JSON.parse(rawData);
            latch.signal();
        });
    });

    https.get(AUDUSD_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDUSD = JSON.parse(rawData);
            latch.signal();
        });
    });

    https.get(AUDNZD_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDNZD = JSON.parse(rawData);
            latch.signal();
        });
    });

    https.get(AUDCHF_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedAUDCHF = JSON.parse(rawData);
            latch.signal();
        });
    });

    https.get(USDCNH_url, function(res) {

        var rawData = "";

        res.on('data', function(chunk) { rawData += chunk; });
        res.on('end', function() {
            parsedUSDCNH = JSON.parse(rawData);
            latch.signal();
        });
    });

}