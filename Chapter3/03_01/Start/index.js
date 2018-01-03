var MongoClient = require('mongodb').MongoClient,
  Hapi = require('hapi');
//this is using the mongodb package

var url = 'mongodb://localhost:27017/learning_mongo';

var server = new Hapi.Server();
server.connection({
  port: 8080
});

server.route([
  {
    //Get tour List
    method: 'GET',
    path: '/api/tours',
    handler: function(request, reply) {
      //allow user to search by parameters
      var findObject = {};
      for (var key in request.query) {
        findObject[key] = request.query[key];
      }

      //retrieve list of all tours in the database
      collection.find(findObject).toArray(function(error, tours) {
        reply(tours);
      });
    }
  },
  {
    //Get a single tour
    method: 'GET',
    path: '/api/tours/{name}',
    handler: function(request, reply) {
      reply('Retrieving ' + request.params.name);
    }
  }
]);

MongoClient.connect(url, function(err, db) {
  console.log('Successfully Connected to Server');
  collection = db.collection('tours');
  server.start(function(err) {
    console.log('Hapi is listening to http://localhost:8080');
  });
});
