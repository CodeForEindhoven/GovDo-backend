var model = require('../sequelize/models');

module.exports = {
	getRecentChanges: function (request, reply) {
		reply(model.Effort.findAll({
			attributes: ['id', 'name', 'updatedAt', 'createdAt'],
			limit: 10,
			order: '"updatedAt" DESC',
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []},
					include: [
						{
							model: model.Program,
							attributes: ['id', 'name'],
							through: {attributes: []},
						}
					]
				}
			]
		}));
	},

	getAllEfforts: function(request, reply) {
		model.Effort.findAll({
			where: {
				$or: {
					name: {like: "%"+request.payload.query+"%"},
					description: {like: "%"+request.payload.query+"%"}
				}
			},
			attributes: ['id', 'name', 'description', 'endproduct',],
			limit: 20,
			include: [
				{
					model: model.Task,
					attributes: ['id', 'name'],
					through: {attributes: []},
					include: [
						{
							model: model.Program,
							attributes: ['id', 'name'],
							through: {attributes: []},
						}
					]
				}
			]
		}).then(function(efforts){
			model.Task.findAll({
				where: {
					$or: {
						name: {like: "%"+request.payload.query+"%"},
						means: {like: "%"+request.payload.query+"%"}
					}
				},
				attributes: ['id', 'name', 'means'],
				limit: 20,
				include: [
					{
						model: model.Program,
						attributes: ['id', 'name'],
						through: {attributes: []},
					}
				]
			}).then(function(tasks){

				efforts = efforts.filter(function(result){
					return (result.Tasks[0] && result.Tasks[0].Programs[0])?true:false;
				}).map(function(result){
					result = result.get({plain: true});
					result.type = "effort";
					result.task = result.Tasks[0];
					result.program = result.Tasks[0].Programs[0];
					delete result.Tasks;
					delete result.task.Programs;
					delete result.Programs;
					return result;
				});

				tasks = tasks.filter(function(result){
					return (result.Programs[0])?true:false;
				}).map(function(result){
					result = result.get({plain: true});
					result.type = "task";
					result.program = result.Programs[0];
					delete result.Programs;
					return result;
				});


				reply(efforts.concat(tasks));
			});
		});

	}
};
