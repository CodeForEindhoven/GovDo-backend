'use strict';
module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define('Domain', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Domain;
};
