'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    name: DataTypes.STRING
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
