"use strict";

var ObjectId = require('mongodb').ObjectID;

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      if (!newTweet) return;
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, tweets);
      });
    },
  }
}
