var MongoClient = require('mongodb').MongoClient,
  Hapi = require('hapi');
//this is using the mongodb package

var url = 'mongodb://localhost:27017/learning_mongo';

var server = new Hapi.Server();
server.connection({
  port: 8080
});

server.route({
  //Get tour List

  method: 'GET',
  path: '/api/tours',
  handler: function(request, reply) {
    collection.find().toArray(function(error, tours) {
      reply(tours);
    });
  }
});

MongoClient.connect(url, function(err, db) {
  console.log('Successfully Connected to Server');
  collection = db.collection('tours');
  server.start(function(err) {
    console.log('Hapy is listening to http://localhost:8080');
  });
});
