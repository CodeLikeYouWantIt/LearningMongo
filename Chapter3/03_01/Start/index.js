//create MongoClient var
var MongoClient = require('mongodb').MongoClient;

// set url
var url = 'mongodb://localhost:27017/learning_mongo';

//create Hapi var
var Hapi = require('hapi');

//create server var
var server = new Hapi.Server();

//connect server to port
server.connection({
  port: 8080
});

server.route([
  //Display all tours
  {
    method: 'GET',
    path: '/api/tours',
    handler: function(request, reply) {
      var userSearch = {};
      for (var key in request.query) {
        userSearch[key] = request.query[key];
      }
      collection.find(userSearch).toArray(function(error, tours) {
        reply(tours);
      });
    }
  },

  //Display one tour
  {
    method: 'GET',
    path: '/api/tours/{name}',
    handler: function(request, reply) {
      collection.findOne({ tourName: request.params.name }, function(error, tour) {
        reply(tour);
      });
    }
  }
]);

//this is using the mongodb package
var url = 'mongodb://localhost:27017/learning_mongo';

MongoClient.connect(url, function(err, db) {
  //show user server connected successfuly
  console.log('Successfully Connected to Server');

  //collection tours
  collection = db.collection('tours');

  //start server
  server.start(function(err) {
    console.log('Hapi is listening to http://localhost:8080');
  });
});
