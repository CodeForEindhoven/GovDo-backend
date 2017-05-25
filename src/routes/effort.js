var model = require('../sequelize/models');

module.exports = {
	getOne: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'type'],
			where: {id: request.params.effort},
			include: [
				{
					model: model.Person,
					attributes: ['id', 'name'],
					through: {attributes: []}
				}
			]
		}));
	},
	create: function (request, reply) {
		model.Effort.create({
			name: request.payload.name,
			type: request.payload.type
		}).then(function(effort){
			model.Task.findAll({
				attributes: ['id'],
				where: {id: request.payload.task},
			}).then(function(task){
				effort.addTask(task[0]);
				reply(effort);
			});
		});
	},

	update: function(request, reply) {
		model.Effort.find({
			attributes: ['id', 'name'],
			where: {id: request.params.effort}
		}).then(function(effort){
			effort.updateAttributes({
				name: request.payload.name,
				type: request.payload.type
			});
			reply(effort);
		});
	},

	delete: function(request, reply) {
		model.Effort.destroy({
			where: {id: request.params.effort}
		}).then(function(data){
			reply(data);
		});
	},

	setType: function (request, reply) {
		model.Effort.update(
  			{ type: request.payload.type },
  			{ where: {id: request.params.effort} }
		).then(function(updated){
			console.log(updated);
			reply(updated);
		});
	},
	addPerson: function (request, reply) {

		model.Effort.find({
			where: {id: request.params.effort},
		}).then(function(effort){
			console.log(request.payload.person);
			model.Person.findOrCreate({
				where: {name: request.payload.person},
			}).then(function(person){
				effort.addPerson(person[0]);
				reply(effort);
			});
		});
	},
	removePerson: function (request, reply) {
		model.Effort.find({
			where: {id: request.params.effort},
		}).then(function(effort){
			model.Person.findAll({
				where: {name: request.payload.person},
			}).then(function(person){
				effort.removePerson(person[0]);
				reply(person);
			});
		});
	}
};
