//create MongoClient const
const MongoClient = require('mongodb').MongoClient;

//create Hapi const
const Hapi = require('hapi');

//create server const
const server = new Hapi.Server();

//connect server to port
server.connection({
  port: 8080
});

server.route([
  //Homepage

  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hello World');
    }
  },
  //Display all tours
  {
    method: 'GET',
    path: '/api/tours',
    handler: (request, reply) => {
      const userSearch = {};
      for (const key in request.query) {
        userSearch[key] = request.query[key];
      }
      collection.find(userSearch).toArray((error, tours) => {
        reply(tours);
      });
    }
  },

  //Display one tour
  {
    method: 'GET',
    path: '/api/tours/{name}',
    handler: (request, reply) => {
      collection.findOne({ tourName: request.params.name }, (error, tour) => {
        reply(tour);
      });
    }
  },

  //create a new tour
  //request.payload contains all fields and values sent by the client
  {
    method: 'POST',
    path: '/api/tours',
    handler: (request, reply) => {
      collection.insertOne(request.payload, (error, result) => {
        reply(request.payload);
      });
    }
  },

  //update a single tour
  {
    method: 'PUT',
    path: '/api/tours/{name}',
    handler: (request, reply) => {
      if (request.query.replace == 'true') {
        request.payload.tourName = request.params.name;
        collection.replaceOne({ tourName: request.params.name }, request.payload, (error, results) => {
          collection.findOne({ tourName: request.params.name }, (error, results) => {
            reply(results);
          });
        });
      } else {
        collection.updateOne({ tourName: request.params.name }, { $set: request.payload }, (error, results) => {
          collection.findOne({ tourName: request.params.name }, (error, results) => {
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
    handler: (request, reply) => {
      collection.deleteOne({ tourName: request.params.name }, (error, results) => {
        reply().code(204);
      });
    }
  }
]);

//this is using the mongodb package
const url = 'mongodb://localhost:27017/learning_mongo';

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
