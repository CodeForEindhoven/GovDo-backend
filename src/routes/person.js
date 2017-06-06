var model = require('../sequelize/models');

module.exports = {
	getAll: function (request, reply) {
		reply(model.Person.findAll({
			attributes: ['id', 'name']
		}));
	},
	getByTeam: function (request, reply) {
		model.Program.findAll({
			attributes: ['id', 'name'],
			include: [
				{
					model: model.Task,
					attributes: ['id'],
					through: {attributes: []},
					include: [
						{
							model: model.Effort,
							attributes: ['id'],
							through: {attributes: []},
							include: [
								{
									model: model.Person,
									attributes: ['id', 'name'],
									through: {attributes: []}
								}
							]
						}
					]
				}
			]
		}).then(function(data){
			data = data.map(function(program){
				var keys = {};
				var People = [];
				program.Tasks.map(function(task){
					task.Efforts.map(function(effort){
						effort.People.map(function(person){
							if(!keys[person.id]){
								People.push(person);
								keys[person.id] = true;
							}
						});
					});
				});

				return {
					name: program.name,
					id: program.id,
					People: People
				};
			});
			reply(data);
		});
	},
	create: function (request, reply) {
		model.Person.create({
			name: request.payload.name
		}).then(function(person){
			reply(person);
		});
	},
};
