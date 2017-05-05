var config = require("./config");

var hapi = require('hapi');
var model = require('./model');
var routes = require('./routes');

var server = new hapi.Server();
server.connection({
	port: config.port,
	routes: { cors: true }
});

// domains
server.route({method: 'GET',	path:'/domain', 					handler: routes.program.getAll });

server.route({method: 'POST', 	path:'/program', 					handler: routes.program.create });
server.route({method: 'GET',	path:'/program/{program}', 			handler: routes.program.getOne });
server.route({method: 'POST', 	path:'/program/{program}', 			handler: routes.program.update });
server.route({method: 'DELETE', path:'/program/{program}', 			handler: routes.program.delete });

server.route({method: 'POST', 	path:'/task', 						handler: routes.task.create });
server.route({method: 'GET',	path:'/task/{task}',  				handler: routes.task.getOne });
server.route({method: 'POST', 	path:'/task/{task}', 				handler: routes.task.update });
server.route({method: 'DELETE', path:'/task/{task}', 				handler: routes.task.delete });

server.route({method: 'POST', 	path:'/effort', 					handler: routes.effort.create });
server.route({method: 'GET', 	path:'/effort/{task}', 				handler: routes.effort.getOne });
server.route({method: 'POST', 	path:'/effort/{task}', 				handler: routes.effort.update });
server.route({method: 'DELETE', path:'/effort/{program}', 			handler: routes.effort.delete });

server.route({method: 'GET',	path:'/details/{effort}',  			handler: routes.effort.getOne });
server.route({method: 'POST',	path:'/details/{effort}/type',  	handler: routes.effort.setType });
server.route({method: 'POST',	path:'/details/{effort}/person',  	handler: routes.effort.addPerson });
server.route({method: 'POST',	path:'/details/{effort}/removeperson',  handler: routes.effort.removePerson });

server.route({method: 'GET',	path:'/people',  	handler: routes.person.getAll });
server.route({method: 'POST',	path:'/person',  	handler: routes.person.create });

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
