const Player = require('./player');
const myEmitter = require('./my_emitter');

class Game {
	constructor(user1, user2) {
		this.player1 = new Player(user1);
		this.player2 = new Player(user2);
		console.log("PLAYER 1 " + this.player1.life)
		console.log("PLAYER 2 " + this.player2.life)
		this.turn = this.player1;
	}

	setPlayer(user1, user2) {
		this.player1 = new Player(user1);
		this.player2 = new Player(user2);
		this.turn = this.player1;		
	}

	isMyTurn(user) {
		return user.id == this.turn.id;
	}

	isFinished() {
		return this.player1.isDead() || this.player2.isDead();
	}

	getState() {
		return "<@" + this.player1.id + "> tiene " + this.player1.getLife() + " puntos de vida /n <@" + this.player2.id + "> tiene " + this.player2.getLife() + " puntos de vida";
	}

	attack(message, user, skill) {		

		if (this.turn.id == this.player1.id) {
			if (isFailed(skill)) {
				message.channel.send("El movimiento de cintura de <@" + this.player2.id + "> te deja anonadado!!!");
				this.turn = this.player2;
				return;
			}

			var str = "";
			if (skill.code == 5 || skill.code == 7 || skill.code == 16 ) {
				this.player1.loseLife(skill.damage);
				str = "pierde";
			} else {
				this.player2.loseLife(skill.damage);
				str = "inflige";
			}

			var msg = "<@" + this.player1.id + "> " + skill.description + ", " + str + " " + skill.damage + " puntos de vida";
			message.channel.send(msg);

			var state = "<@" + this.player1.id + "> tiene " + this.player1.getLife() + " puntos de vida \n <@" + this.player2.id + "> tiene " + this.player2.getLife() + " puntos de vida";
			message.channel.send(state);

			if (skill.code != 6)
				this.turn = this.player2;
		} else {
			if (isFailed(skill)) {
				message.channel.send("El movimiento de cintura de <@" + this.player1.id + "> te deja anonadado!!!");
				this.turn = this.player1;
				return;
			}

			var str = "";
			if (skill.code == 5 || skill.code == 7 || skill.code == 16 ) {
				this.player2.loseLife(skill.damage);
				str = "pierde";
			} else {
				this.player1.loseLife(skill.damage);
				str = "inflige";
			}

			var msg = "<@" + this.player2.id + "> " + skill.description + ", " + str + " " + skill.damage + " puntos de vida";
			message.channel.send(msg);

			var state = "<@" + this.player1.id + "> tiene " + this.player1.getLife() + " puntos de vida \n <@" + this.player2.id + "> tiene " + this.player2.getLife() + " puntos de vida";
			message.channel.send(state);

			if (skill.code != 6)
				this.turn = this.player1;
		}

		if (this.player1.isDead()) {
			myEmitter.emit("dead", message, this.player2.user, this.player1.user);
		}
		if (this.player2.isDead()) {
			myEmitter.emit("dead", message, this.player1.user, this.player2.user);
		}
	}

}

function isFailed(skill) {
	var numberRandom = Math.floor((Math.random() * 100) + 1);
	if (numberRandom <= skill.probability)
		return false;
	else
		return true;
}

module.exports = Game;