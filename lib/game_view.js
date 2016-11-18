const game = require('./game');
const Player = require('./player');
class GameView {
  constructor(game, ctx, canvas, player) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas
    this.player = player
  }


  bindKeyHandlers() {
    let t = this
    this.canvas.addEventListener('mousemove', function(e) {
      t.player = new Player({pos: [e.clientX, e.clientY], height: 132, width: 244})
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
      //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx, this.player);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}


module.exports = GameView;
