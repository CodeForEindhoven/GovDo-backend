var sqlite3 = require('sqlite3').verbose();
//var db = new sqlite3.Database('database.sql');
var db = new sqlite3.Database(':memory:');

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS tasks (id INT PRIMARY KEY, name TEXT)");
	db.run("CREATE TABLE IF NOT EXISTS efforts (id INT PRIMARY KEY, name TEXT, task INT)");

	db.run("INSERT INTO tasks VALUES (?, ?)", 1, "new task");
	db.run("INSERT INTO efforts VALUES (?, ?, ?)", 1, "new effort", 1);
	db.run("INSERT INTO efforts VALUES (?, ?, ?)", 2, "new effort2", 1);

	db.each("SELECT efforts.id, efforts.name, tasks.name AS task FROM efforts INNER JOIN tasks ON tasks.id = efforts.task", function(err, row) {
		console.log(row);
	});
});

db.close();
