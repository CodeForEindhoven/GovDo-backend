var model = require('../model');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Person.findAll({
			attributes: ['id', 'name']
		}));
	},
	create: function (request, reply) {
		model.Person.create({
			name: request.payload.name
		}).then(function(person){
			reply(person);
		});
	},
};
