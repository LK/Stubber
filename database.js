var mongo = require('mongodb');

var Server= mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('winedb', server);

db.open(function(err, db) {
});

exports.findAll = function(req, res) {
	db.collection('wines', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

exports.addObject = function(req, res) {
	var object = req.body;
	db.collection('wines', function(err, collection) {
		collection.insert(object, {safe:true}, function(err, result) {
			if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(result[0]);
            }
		});
	});
}

exports.findById = function(req, res) {
	var id = req.params.id;
	db.collection('wines', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			res.send(item);
		});
	});
}


exports.deleteObject = function(req, res) {
	var id = req.params.id;
	db.collection('wines', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			}
			else {
				console.log('' + result + ' document(s) deleted');
                res.send(req.body);
			}
		});
	});
}

exports.updateObject = function(req, res) {
	var id = req.params.id;
	var object = req.body;
	db.collection('wines', function(err, collection) {
		collection.update({'_id':new BSON.ObjectID(id)}, object, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(wine);
            }
        });
	});
}