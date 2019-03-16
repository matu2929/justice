const myEmitter = require('../my_emitter');
const skills = require('../skills')

class Help {
	constructor() {
		this.name = "help";
		this.alias = "h";
		this.usage = "?help";
	}

	run(bot, message, args) {
		var msg = "Habilidades: \n";
		for (var i = 0; i < skills.length; i++) {
			msg += skills[i].code + " " + skills[i].name + " " + skills[i].damage + " dmg " + skills[i].probability + "%" + "\n";
		}
		message.channel.send(msg);
	}
}

module.exports = Help;