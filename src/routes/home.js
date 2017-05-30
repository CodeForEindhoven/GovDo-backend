var pack = require("./../package.json");
module.exports = {
	version: function (request, reply) {
		reply({
			name: pack.name,
			version: pack.version
		});
	}
};
