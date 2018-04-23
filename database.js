var MongoClient = require('mongodb').MongoClient;
var db;

exports.connect = function (options, callback) {
  var {url, dbName, user, pwd} = options;
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    if (callback) callback();
  });
};

exports.createPotato = function (potato, callback) {
  db.collection('potatoes').save(potato, err => {
    if (err) throw err;
    console.log('Saved to DB!');
    if (callback) callback();
  });
};

exports.getPotatoes = async function (callback) {
  var potatoes = await db.collection('potatoes').find().toArray();
  console.log(potatoes);
  if (callback) callback(potatoes);
}
