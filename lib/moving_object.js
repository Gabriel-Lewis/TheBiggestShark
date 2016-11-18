const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.size = options.size;
    this.vel = options.vel;
    this.game = options.game;
    this.isWrappable = true;
  }


  draw(ctx) {
    let shark_image = new Image();
    shark_image.src = "images/sharks.png";
    ctx.drawImage(shark_image,
        11, 10, 61, 33,
        this.pos[0], this.pos[1], this.size[0], this.size[1]
      );
  }

  move(timeDelta) {

     const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
         offsetX = this.vel[0] * velocityScale,
         offsetY = this.vel[1] * velocityScale;

     this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

     if (this.game.isOutOfBounds(this.pos)) {
       if (this.isWrappable) {
         this.pos = this.game.wrap(this.pos);
       }
     }
   }

}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;
