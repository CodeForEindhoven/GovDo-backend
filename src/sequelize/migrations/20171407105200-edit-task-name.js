'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Tasks','name', {
			type: Sequelize.STRING,
			defaultValue: ""
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Tasks','name', Sequelize.STRING);
	}
};
