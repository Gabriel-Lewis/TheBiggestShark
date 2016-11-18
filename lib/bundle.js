/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const Game = __webpack_require__(1);
	const Player = __webpack_require__(5);
	const GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvas = document.getElementsByTagName("canvas")[0];
	  canvas.width = ( window.innerWidth * .9);
	  canvas.height = (window.innerHeight * .8);
	  const ctx = canvas.getContext("2d");
	  const game = new Game();
	  const player = new Player({height: 51.666666666666664, width: 93, game: game});
	  new GameView(game, ctx, canvas, player).start();
	
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Shark = __webpack_require__(2);
	const Player = __webpack_require__(5);
	const Util = __webpack_require__(3);
	
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
	
	    // isCollidedWith(mainObject, otherObject) {
	    //
	    //   const firstDist = mainObject.pos[0] === otherObject.pos[0]
	    //   const secondDist = mainObject.pos[1] === otherObject.pos[0]
	    //   debugger
	    //   if (firstDist && secondDist) {
	    //     console.log('hello')
	    //   }
	    //   return false
	    // }
	
	//      checkCollisions() {
	//     for(var i in playerBullets) {
	//         var bullet = playerBullets[i];
	//         for(var j in enemies) {
	//             var enemy = enemies[j];
	//             if(collided(bullet,enemy)) {
	//                 bullet.state = "hit";
	//                 enemy.state = "hit";
	//                 enemy.counter = 0;
	//             }
	//         }
	//     }
	//
	//     if(player.state == "hit" || player.state == "dead") return;
	//     for(var i in enemyBullets) {
	//         var bullet = enemyBullets[i];
	//         if(collided(bullet,player)) {
	//             bullet.state = "hit";
	//             player.state = "hit";
	//             player.counter = 0;
	//         }
	//     }
	// }
	
	  isBigger(a, b) {
	    if (a.width > b.size[1]) {
	      return true
	    }
	  }
	
	 collided(a, b) {
	    //check for horz collision
	    //   if (a.pos[0] < b.pos[0] + b.size[0] &&
	    //      a.pos[0] + a.width > b.pos[0] &&
	    //      a.pos[1] < b.pos[1] + b.size[1] &&
	    //      a.height + a.pos[1] > b.pos[1]) {
	    //        debugger
	    //   // collision detected!
	    //   return true
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  wrap (coord, max) {
	    if (coord < 0) {
	      return max - (coord % max);
	    } else if (coord > max) {
	      return coord % max;
	    } else {
	      return coord;
	    }
	  },
	
	  getRandomInt (min, max) {
	      min = Math.ceil(min);
	      max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
	  }
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	
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


/***/ },
/* 5 */
/***/ function(module, exports) {

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
	            11, 10, 61, 33, //src coords
	            this.pos[0], this.pos[1], this.width, this.height //dst coords
	        );
	    }
	
	}
	
	
	module.exports = Player;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const game = __webpack_require__(1);
	const Player = __webpack_require__(5);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map