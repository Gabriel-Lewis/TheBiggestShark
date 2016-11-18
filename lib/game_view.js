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
    let player = t.player
    this.canvas.addEventListener('mousemove', function(e) {
      let mousePos = t.getMousePos(t.canvas, e)
      t.player = new Player({pos: mousePos, height: player.height, width: player.width})
    });
  }

  getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return [
          e.clientX - rect.left,
          e.clientY - rect.top
        ];
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
