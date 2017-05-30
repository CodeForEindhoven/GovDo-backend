'use strict';
module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define('Domain', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
		  Domain.belongsToMany(models.Program, {through: 'DomainProgram'});
      }
    }
  });
  return Domain;
};
