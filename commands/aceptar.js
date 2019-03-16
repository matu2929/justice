const myEmitter = require('../my_emitter');

class Aceptar {
	constructor() {
		this.name = "aceptar";
		this.alias = "a";
		this.usage = "?aceptar";
	}

	run(bot, message, args) {
		var user = message.author;
		myEmitter.emit("accept", message, user);
	}
}

module.exports = Aceptar;