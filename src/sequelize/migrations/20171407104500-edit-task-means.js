'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Tasks','means', {
			type: Sequelize.STRING,
			defaultValue: ""
		});
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.changeColumn('Tasks','means', Sequelize.STRING);
	}
};
