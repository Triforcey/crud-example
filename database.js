var {MongoClient, ObjectID} = require('mongodb');
var db;

exports.connect = function (options, callback) {
  var {url, dbName} = options;
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
    if (callback) callback();
  });
};

exports.createPotato = function (potato, callback) {
  db.collection('potatoes').save(potato, err => {
    if (err) throw err;
    if (callback) callback();
  });
};

exports.getPotatoes = async function (callback) {
  var potatoes = await db.collection('potatoes').find().toArray();
  if (callback) callback(potatoes);
};

exports.replacePotato = async function (potato, callback) {
  try {
    potato._id = ObjectID(potato._id);
  } catch (e) {
    if (callback) callback(e);
    return;
  }
  await db.collection('potatoes').replaceOne({_id: potato._id}, potato);
  callback(false);
};

exports.updatePotato = async function (potato, callback) {
  try {
    potato._id = ObjectID(potato._id);
  } catch (e) {
    if (callback) callback(e);
    return;
  }
  await db.collection('potatoes').updateOne({_id: potato._id}, {$set: potato});
  if (callback) callback(false);
};

exports.deletePotato = async function (potato, callback) {
  try {
    potato._id = ObjectID(potato._id);
  } catch (e) {
    if (callback) callback(e);
    return;
  }
  await db.collection('potatoes').deleteOne(potato);
  callback(false);
};
