var mongodb = require('mongodb');
var assert = require('assert');

function insertIntoDB(comment, folder, result) {
	if (comment) {
		var db = new mongodb.Db('test', new mongodb.Server('localhost', 27017, {}), {safe:false});
		db.open(function(err, db) {
			var collection = db.collection("folder_comments");
			var commentsTime = new Date().toLocaleString();
			collection.insert({pathFolder:folder, userComment: comment, time: commentsTime});
			assert.equal(null, err);
			db.close();
		});
		result("Comment add");
	}
}

var getFromDB = function(folder, result) {
	var db = new mongodb.Db('test', new mongodb.Server('localhost', 27017, {}), {safe:false});
	db.open(function(err, db) {
		var collection = db.collection("folder_comments");
		collection.find({"pathFolder": folder}).toArray(function(err, docs){
		    result(docs);
		    db.close();
		});
	});
};

exports.insertIntoDB = insertIntoDB;
exports.getFromDB = getFromDB;