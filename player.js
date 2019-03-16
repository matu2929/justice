
class Player {
	constructor(user) {
		this.id = user.id;
		this.user = user;
		this.life = 100;
	}


	loseLife(points) {
		this.life = this.life - points;
	}

	isDead() {
		return this.life <= 0;
	}

	getLife() {
		return this.life;
	}
}

module.exports = Player;