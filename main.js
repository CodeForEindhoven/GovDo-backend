var hapi = require('hapi');
var model = require('./tempModel');

var efforts = {

};

// Create a server with a host and port
var server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000,
	routes: { cors: true }
});

// Add the route
server.route({
	method: 'GET',
	path:'/team',
	handler: function (request, reply) {
		reply(model.get());
	}
});

server.route({
	method: 'POST',
	path:'/task',
	handler: function (request, reply) {
		console.log(request.payload.title);
		reply(model.addTask(request.payload.title));
	}
});

server.route({
	method: 'POST',
	path:'/effort',
	handler: function (request, reply) {
		reply(model.addEffort(request.payload.task, request.payload.title));
	}
});

// Start the server
server.start(function(err){
	if (err) {throw err;}
	console.log('Server running at:', server.info.uri);
});
