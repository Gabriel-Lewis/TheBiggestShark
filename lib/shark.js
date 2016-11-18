const Util = require("./util");
const MovingObject = require("./moving_object");


const DEFAULTS = {
	SPEED: 4
};

class Shark extends MovingObject {
	constructor(options = {}) {
		options.pos = options.pos || options.game.randomPosition();
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
		options.size = options.size || options.game.randomSize();
			super(options);
	}
}

module.exports = Shark;
