
const Game = require("./game");
const Player = require("./player");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = ( window.innerWidth * .9);
  canvas.height = (window.innerHeight * .8);
  const ctx = canvas.getContext("2d");
  const game = new Game();
  const player = new Player({height: 40, width: 100, game: game});
  new GameView(game, ctx, canvas, player).start();

});
