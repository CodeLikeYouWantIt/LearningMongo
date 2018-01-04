//create MongoClient var
var MongoClient = require('mongodb').MongoClient;

//create Hapi var
var Hapi = require('hapi');

//create server var
var server = new Hapi.Server();

//connect server to port
server.connection({
  port: 8080
});

server.route([
  //Homepage

  {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      reply('Hello World');
    }
  },
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
  },

  //create a new tour
  //request.payload contains all fields and values sent by the client
  {
    method: 'POST',
    path: '/api/tours',
    handler: function(request, reply) {
      collection.insertOne(request.payload, function(error, result) {
        reply(request.payload);
      });
    }
  },

  //update a single tour
  {
    method: 'PUT',
    path: '/api/tours/{name}',
    handler: function(request, reply) {
      if (request.query.replace == 'true') {
        request.payload.tourName = request.params.name;
        collection.replaceOne({ tourName: request.params.name }, request.payload, function(error, results) {
          collection.findOne({ tourName: request.params.name }, function(error, results) {
            reply(results);
          });
        });
      } else {
        collection.updateOne({ tourName: request.params.name }, { $set: request.payload }, function(error, results) {
          collection.findOne({ tourName: request.params.name }, function(error, results) {
            reply(results);
          });
        });
      }
    }
  },

  //Delete Single Tour
  {
    method: 'DELETE',
    path: '/api/tours/{name}',
    handler: function(request, reply) {
      collection.deleteOne({ tourName: request.params.name }, function(error, results) {
        reply().code(204);
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
