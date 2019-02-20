let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let posY = 50;
let gravity = 0.05;
let velocity = 0;
let jump = -4;

let bird = new Image();
let background = new Image();

bird.src = "images/bird.png";
background.src = "images/background.png";

function draw() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(bird, 50, posY);
  velocity += gravity;

  if (posY>background.height-bird.height || posY<0){
    velocity = 0; //stop game
  }
  posY = posY + velocity;

  requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(){ velocity=velocity+jump})

draw();
