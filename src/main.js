var config = require("./config");

var hapi = require('hapi');
var joi = require('joi');
var model = require('./sequelize/models');
var routes = require('./routes');

var server = new hapi.Server();
server.connection({
	port: config.port,
	routes: { cors: true }
});

// domains
//server.route({method: 'GET',	path:'/domain', 					handler: routes.programtype.getAll });
//server.route({method: 'POST',	path:'/domain', 					handler: routes.programtype.create });
//server.route({method: 'POST', 	path:'/domain/{domain}/program', 	handler: routes.programtype.addProgram });
server.route({
	method: 'GET', path:'/',
	handler: routes.home.version
});

server.route({
	method: 'GET', path:'/domain',
	handler: routes.program.getAll
});

/*programs*/
server.route({
	method: 'POST', path:'/program',
	config: { validate: { payload: {
		name: joi.string().min(1).max(255).required(),
		mission: joi.string().allow('').max(255).required()
	}}},
	handler: routes.program.create
});

server.route({
	method: 'GET',	path:'/program/{program}',
	config: { validate: { params: {
		program: joi.number().integer().required(),
	}}},
	handler: routes.program.getOne
});

server.route({
	method: 'POST', path:'/program/{program}',
	config: { validate: { params: {
		program: joi.number().integer().required(),
	}, payload: {
		name: joi.string().min(1).max(255).required(),
		mission: joi.string().allow('').max(255).required()
	}}},
	handler: routes.program.update
});

server.route({
	method: 'DELETE', path:'/program/{program}',
	config: { validate: { params: {
		program: joi.number().integer().required(),
	}}},
	handler: routes.program.delete
});


/*task*/
server.route({
	method: 'POST', path:'/task',
	config: { validate: { payload: {
		name: joi.string().min(1).max(255).required(),
		program: joi.number().integer().required(),
	}}},
	handler: routes.task.create
});

server.route({
	method: 'GET',	path:'/task/{task}',
	config: { validate: { params: {
		task: joi.number().integer().required(),
	}}},
	handler: routes.task.getOne
});

server.route({
	method: 'POST', path:'/task/{task}',
	config: { validate: { params: {
		task: joi.number().integer().required(),
	}, payload: {
		name: joi.string().min(1).max(255).required(),
	}}},
	handler: routes.task.update
});

server.route({
	method: 'DELETE', path:'/task/{task}',
	config: { validate: { params: {
		task: joi.number().integer().required(),
	}}},
	handler: routes.task.delete
});

/*effort*/
server.route({
	method: 'POST', path:'/effort',
	config: { validate: { payload: {
		task: joi.number().integer().required(),
		name: joi.string().min(1).max(255).required(),
		type: joi.number().integer().min(-1).max(100).required(),
		people: joi.array().items(joi.object().keys({
			id: joi.number().integer().required()
		}))
	}}},
	handler: routes.effort.create
});

server.route({
	method: 'GET', path:'/effort/{effort}',
	config: { validate: { params: {
		effort: joi.number().integer().required(),
	}}},
	handler: routes.effort.getOne
});

server.route({
	method: 'POST', path:'/effort/{effort}',
	config: { validate: { params: {
		effort: joi.number().required(),
	}, payload: {
		name: joi.string().min(1).max(255).required(),
		type: joi.number().integer().min(-1).max(100).required(),
		people: joi.array().items(joi.object().keys({
			id: joi.number().integer().required(),
			name: joi.string()
		}))
	}}},
	handler: routes.effort.update
});

server.route({
	method: 'DELETE',path:'/effort/{effort}',
	config: { validate: { params: {
		effort: joi.number().integer().required(),
	}}},
	handler: routes.effort.delete
});

/*people*/
server.route({
	method: 'GET', path:'/people',
	handler: routes.person.getAll
});

server.route({
	method: 'POST',	path:'/person',
	config: { validate: { payload: {
		name: joi.string().min(1).max(255).required(),
	}}},
	handler: routes.person.create
});



/*run the server*/
model.sequelize.sync().then(function(){
	server.start(function(err){
		if (err) {throw err;}
		console.log('Server running at:', server.info.uri);
	});
});
