'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('TaskEffort', {
        EffortId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        TaskId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('TaskEffort');
    }
};
