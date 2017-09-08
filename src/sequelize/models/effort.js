'use strict';
module.exports = function(sequelize, DataTypes) {
  var Effort = sequelize.define('Effort', {
    name: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
	description: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
	endproduct: {
		type: DataTypes.STRING,
		defaultValue: ""
	},
    type: {
        type: DataTypes.INTEGER,
        defaultValue: -1
    },
	mode: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
		Effort.belongsToMany(models.Task, {through: 'TaskEffort'});
		Effort.belongsToMany(models.Person, {through: 'PeopleEffort'});
      }
    }
  });
  return Effort;
};
