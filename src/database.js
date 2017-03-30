var MongoClient = require('mongodb').MongoClient;

var db = null;

exports.connect = function(url, done) {
  if (db) {
    return done();
  }

  MongoClient.connect(url, function(error, database) {
    if (error) {
      return done(error);
    }
    db = database;
    done();
  });
};

exports.get = function() {
  return db;
};

exports.close = function(done) {
  if (db) {
    db.close(function(error) {
      db = null;
      done(error);
    });
  }
};
