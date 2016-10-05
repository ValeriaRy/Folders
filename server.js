var express = require('express');
var server = express();
var func = require("./server/file_tree.js");
var addComment = require("./server/mongo.js");

server.get("/files", function(req, res){
    req.setMaxListeners(0);
    res.setHeader("Access-Control-Allow-Origin", "*");
    func.folderView(req.query.name, function(answer) {
        res.send(answer);

        return answer;
    });
});

server.get("/recall", function(req, res) {
    req.setMaxListeners(0);
    res.setHeader("Access-Control-Allow-Origin", "*");
    addComment.insertIntoDB(req.query.text, req.query.path, function(answer) {
        res.send(answer);

        return answer;
    });
});

server.get("/comm", function(req, res) {
    req.setMaxListeners(0);
    res.setHeader("Access-Control-Allow-Origin", "*");
    addComment.getFromDB(req.query.path, function(answer) {
        res.send(answer);

        return answer;
    });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
});