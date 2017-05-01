var hapi = require('hapi');
var model = require('./model');
var routes = require('./routes');

var server = new hapi.Server();
server.connection({
	port: 8080,
	routes: { cors: true }
});

// domains
server.route({method: 'GET',	path:'/domain', 		handler: routes.program.getAll });
server.route({method: 'POST', 	path:'/program', 		handler: routes.program.create });

server.route({method: 'GET',	path:'/task/{program}', handler: routes.program.getOne });
server.route({method: 'POST', 	path:'/task/{program}', handler: routes.task.create });

server.route({method: 'GET',	path:'/effort/{task}',  handler: routes.task.getOne });
server.route({method: 'POST', 	path:'/effort/{task}', 	handler: routes.effort.create });

server.route({method: 'GET',	path:'/details/{effort}',  handler: routes.effort.getOne });
server.route({method: 'POST',	path:'/details/{effort}/type',  handler: routes.effort.setType });
//groups
//server.route({method: 'GET',	path:'/group/{id}', handler: routes.group.getOne });
//server.route({method: 'POST', 	path:'/group', 		handler: routes.group.create });
//
////tasks
//server.route({method: 'GET',	path:'/task/{id}',  handler: routes.task.getOne });
//server.route({method: 'POST', 	path:'/task', 		handler: routes.task.create });
//
////effort



//server.route({
//	method: 'POST',
//	path:'/task',
//	handler: function (request, reply) {
//		console.log(request.payload.title);
//		reply(model.addTask(request.payload.title));
//	}
//});
//
//server.route({
//	method: 'POST',
//	path:'/effort',
//	handler: function (request, reply) {
//		reply(model.addEffort(request.payload.task, request.payload.title));
//	}
//});
//
//server.route({
//	method: 'POST',
//	path:'/effort/person',
//	handler: function (request, reply) {
//		reply(model.addEffortPerson(request.payload.task, request.payload.effort, request.payload.person));
//	}
//});
//
//start the database
model.run(function(){
	// Start the server
	server.start(function(err){
		if (err) {throw err;}
		console.log('Server running at:', server.info.uri);
	});

});
