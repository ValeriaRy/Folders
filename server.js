var http = require('http');
var express = require('express');
var server = express();
var func = require("./file_tree.js");

server.get('/hello', function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    func.folderView(req.query.name, function(answer){
        res.send(answer);

        return answer;
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});