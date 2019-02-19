let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let posY = 50; //step 1: define bird position Y

let bird = new Image(); //step 2: create a variable bird
let background = new Image();

bird.src = "images/bird.png"; //step 3: set source image
background.src = "images/background.png";

function draw() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(bird, 50, posY); //step 4: draw bird image with variable "posY"
  posY = posY + 1; //step 5: change posY in each animation frame
  requestAnimationFrame(draw);
}

draw();
