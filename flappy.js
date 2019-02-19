let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let background = new Image();

background.src = "images/background.png";

function draw() {
  ctx.drawImage(background, 0, 0);
  requestAnimationFrame(draw);
}

draw();
