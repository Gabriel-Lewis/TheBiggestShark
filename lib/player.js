class Player {
    constructor(options = {}) {
        this.pos = options.pos || options.game.randomPosition()
				this.game = options.game
        this.height = options.height
        this.width = options.width
				this.state = options.state || "alive"
        this.counter = 0;
    }
    draw(c) {
        let shark_image = new Image();
        shark_image.src = "images/sharks.png";
        c.drawImage(shark_image,
            11, 105, 61, 33, //src coords
            this.pos[0], this.pos[1], this.width, this.height //dst coords
        );
    }

}


module.exports = Player;
