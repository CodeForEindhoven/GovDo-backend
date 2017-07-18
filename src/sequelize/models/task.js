'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
	means: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
	kpi: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
	mode: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsToMany(models.Program, {through: 'ProgramTask'});
		Task.belongsToMany(models.Effort, {through: 'TaskEffort'});
      }
    }
  });
  return Task;
};
