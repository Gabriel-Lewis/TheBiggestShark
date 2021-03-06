const Shark = require("./shark");
const Player = require("./player");
const Util = require("./util");

class Game {
 constructor() {
    this.sharks = [];
    this.player = new Player({height: 40, width: 85, game: this})
    this.addSharks();
    this.checkCollisions = this.checkCollisions.bind(this)
 }

 addSharks() {
   for (let i = 0; i < Game.NUM_SHARKS; i++) {
      this.sharks.push(new Shark({ game: this }));
    }
 }

 randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  randomSize() {
    let x = Util.getRandomInt(50,100)
    let y = x / 1.8
    return [
      x,
      y
    ];
  }



  draw(ctx, player) {

    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.sharks.forEach((shark) => {
      shark.draw(ctx);
    });
    player.draw(ctx)
  }

  moveObjects(delta) {
    this.sharks.forEach((shark) => {
      shark.move(delta);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[0] > Game.DIM_X) || (pos[1] < 0) || (pos[1] > Game.DIM_Y);
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
    }

    checkCollisions() {
      const sharks = this.sharks;
      const player = this.player;
      for (let i = 0; i < sharks.length; i++) {
          const shark = sharks[i];

          if (this.collided(player, shark)) {
            if (this.isBigger(player, shark)) {
              let index = this.sharks.indexOf(shark)
              if (index > -1) {
                this.sharks.splice(index, 1);
              }
            } else {
              console.log('you dead');
            }
          }
        }
      }

  isBigger(a, b) {
    if (a.width > b.size[1]) {
      return true
    }
  }

 collided(a, b) {
    //   if (a.pos[0] < b.pos[0] + b.size[0] &&
    //      a.pos[0] + a.width > b.pos[0] &&
    //      a.pos[1] < b.pos[1] + b.size[1] &&
    //      a.height + a.pos[1] > b.pos[1]) {
    //         return true
    // }
    let a_radius = a.width
    let b_radius = b.size[0]

    var dx = a.pos[0] - b.pos[0];
    var dy = a.pos[1] - b.pos[1];


    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < a_radius + b_radius) {
    // collision detected!
      return true
    }
    //
    // if(b.pos[0] + b.size[0] >= a.pos[0] && b.pos[0] < a.pos[0] + a.width) {
    //     //check for vert collision
    //     if(b.pos[1] + b.size[1] >= a.pos[1] && b.pos[1] < a.pos[1] + a.height) {
    //         return true;
    //     }
    // }
    //
    // //check a inside b
    // if(b.pos[0] <= a.pos[0] && b.pos[0] + b.size[0] >= a.pos[0] + a.width) {
    //     if(b.pos[1] <= a.pos[1] && b.pos[1] + b.size[1] >= a.pos[1] + a.height) {
    //         return true;
    //     }
    // }
    //
    // //check b inside a
    // if(a.pos[0] <= b.pos[0] && a.pos[0] + a.width >= b.pos[0] + b.size[0]) {
    //     if(a.pos[1] <= b.pos[1] && a.pos[1] + a.height >= b.pos[1] + b.size[1]) {
    //         return true;
    //     }
    // }

    return false;
  }
}

Game.DIM_X = ( window.innerWidth * .9);
Game.DIM_Y = (window.innerHeight * .8);

Game.NUM_SHARKS = 20
module.exports = Game;
