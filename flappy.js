//part-04 - PipeBottom: 
//wyświetlenie, animacja, powielenie,
//usuwanie ominiętych i niewidocznych

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

let posY = 50;
let gravity = 0.05;
let velocity = 0;
let jump = -3;

let bird = new Image();
let background = new Image();
let pipeBottom = new Image(); // 1 : tworzymy obiekt Image
let counter = 0;

bird.src = "images/bird.png";
background.src = "images/background.png";
pipeBottom.src = `images/pipeBottom.png`; // 2: ustawiamy wlasciwosci src obiektu Image

const pipes = [{
  x:200,
  y:250
}];

function draw() {
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(bird, 50, posY);
  counter++;
  for(let i = 0; i < pipes.length; i++){
    ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y); //
    pipes[i].x--;
    if(pipes[i].x<=1){
      pipes.shift();
     }
  }

  if (counter % 200 == 0){
    console.log("object");
    pipes.push({x:250, y: 250});
    counter=1;
  }

  velocity += gravity;

  if (posY>background.height-bird.height || posY<0){
    velocity = 0; //stop game
  }
  posY = posY + velocity;

  requestAnimationFrame(draw);
}

document.addEventListener('keydown', function(){ velocity=velocity+jump})

draw();
