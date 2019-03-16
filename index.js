const Discord = require("discord.js");
const http = require('http');
const bot = new Discord.Client();
const { CommandHandler } = require('djs-commands');
const CH = new CommandHandler({
	folder: __dirname + "/commands/",
	prefix: ["?"]
});
const myEmitter = require('./my_emitter');
var Game = require('./game');

var player1 = null;
var player2 = null;
var game = null;

//http.createServer(function (request, response) {
	
	bot.on("ready", () => {
		console.log("El bot esta listo para bardear");
	});

	bot.on("message", (message) => {
		let args = message.content.split(" ");
		let command = args[0];
		let cmd = CH.getCommand(command);
		if (!cmd) return;

		try {
			cmd.run(bot, message, args);
		} catch(err) {
			console.log("*** ERROR: " + err);
		}

	});

	myEmitter.on('challenger', (message, user1, user2) => {
	  	player1 = user1;
	  	player2 = user2;
	  	message.channel.send("<@" + player2.id + "> para aceptar el reto escriba ?aceptar");
	});

	myEmitter.on('accept', (message, user) => {
	  	if (user.id != player2.id) return;
	  	game = new Game(player1, player2);
	  	message.channel.send("<@" + player2.id + "> aceptó el reto. Prepárencen para la batalla <@" + player1.id + "> y <@" + player2.id + ">");
	});

	myEmitter.on('attack', (message, user, skill) => {
		if (game.isMyTurn(user) && !game.isFinished()) {
			game.attack(message, user, skill);
		}
	});

	myEmitter.on('dead', (message, winner, losser) => {
		//MANDAR MENSAJE DE QUIEN GANO
		message.channel.send("<@" + winner.id + "> dejo a <@" + losser.id + "> en silla de ruedas");
	})

	bot.login("NTU2MjI2OTcwNzU3ODkwMDQ4.D22s4A.VkNQr4I8KWf3jezKnsYyjTu9U8Q").catch((err) => console.log("*** ERROR: ", err));

//}).listen(process.env.PORT || 5000);

