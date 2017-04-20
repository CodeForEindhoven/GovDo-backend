var efforts = {
	"1": {
		tasks: ["1"],
		people: ["1","2"],
		title: "this is an effort",

	}
};

var tasks = {
	"1": {
		title: "this is a task"
	}
};

var people = {
	"1": {
		name: "heinz"
	},
	"2": {
		name: "kees"
	}
};

function get_efforts(){

	var transformed_efforts = []

	var task_selection = {};
	for(var i in efforts){
		for(var j in efforts[i].tasks){
			if(!task_selection[efforts[i].tasks[j]]){
				task_selection[efforts[i].tasks[j]] = tasks[efforts[i].tasks[j]];
				task_selection[efforts[i].tasks[j]].efforts = [];
			}
			task_selection[efforts[i].tasks[j]].efforts.push();

			console.log(task_selection);
		}
	}
}

get_efforts();

/*var store = {};

var uid_counter = 0;
function uid(){
	return uid_counter++;
}

function save(type, value){
	if(!store[type]){
		store[type]={};
	}
	var id = uid();
	store[type][id] = value;
	return id;
}

function get(type, id){
	return store[type][id];
}


module.exports = {
	save: save,
	get: get
};
*/
