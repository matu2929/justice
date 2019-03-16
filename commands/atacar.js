const myEmitter = require('../my_emitter');
const skills = require('../skills')

class Atacar {
	constructor() {
		this.name = "atacar";
		this.alias = "attack";
		this.usage = "?atacar";
	}

	run(bot, message, args) {
		var user = message.author;
		console.log("CODE " + args[1])
		var skill = skills.find((item) => {
			return args[1] == item.code;
		});
		myEmitter.emit("attack", message, user, skill);
	}
}

module.exports = Atacar;