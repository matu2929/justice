const myEmitter = require('../my_emitter');

class Retar {

	constructor() {
		this.name = "retar";
		this.alias = "r";
		this.usage = "?retar";
	}

	run(bot, message, args) {
		message.reply(" retó a " + args[1]);
		var player1 = message.author;
		var player2 = message.mentions.users.first();

		myEmitter.emit("challenger", message, player1, player2);
	}

}

module.exports = Retar;
