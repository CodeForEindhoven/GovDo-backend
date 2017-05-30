'use strict';
module.exports = function(sequelize, DataTypes) {
  var Program = sequelize.define('Program', {
    name: DataTypes.STRING,
    mission: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Program.belongsToMany(models.Task, {through: 'ProgramTask'});
		Program.belongsToMany(models.Domain, {through: 'DomainProgram'});
      }
    }
  });
  return Program;
};
