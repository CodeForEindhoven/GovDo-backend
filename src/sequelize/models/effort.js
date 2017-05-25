'use strict';
module.exports = function(sequelize, DataTypes) {
  var Effort = sequelize.define('Effort', {
    name: DataTypes.STRING,
    type: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		Effort.belongsToMany(models.Task, {through: 'TaskEffort'});
      }
    }
  });
  return Effort;
};