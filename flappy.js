//part-07 - Dodano:
//1. wyświetlanie pipeTop
//2. losowa wspol. Y dla pipeBottom i pipeTop 

const pauseBtn = document.querySelector("#pauseGame");
const playBtn = document.querySelector("#playGame");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
//ustawia rodzaj i wielkosc czcionki dla ctx
ctx.font = "16px Arial";
let birdPosY = 50;
let birdPosX = 30;
let gravity = 0.06;
let velocity = 0;
let jump = -3;
let pause = false;
//zmienna score do zliczania punktów
let score = 0;
//wysokosc przerwy pomiedzy pipeBottom i pipeTop
let gap = 200;
let max = 350;
let min = 200;

let bird = new Image();
let background = new Image();
let pipeBottom = new Image();
let pipeTop = new Image();
let counterFrame = 0;

bird.src = "images/bird.png";
background.src = "images/background.png";
pipeBottom.src = `images/pipeBottom.png`;
pipeTop.src = `images/pipeTop.png`;

const pipes = [
	{
		x: 200,
		y: 250
	}
];

function draw() {
	requestID = requestAnimationFrame(draw);
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(bird, birdPosX, birdPosY);
	counterFrame++;
	for (let i = 0; i < pipes.length; i++) {

		ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y);
		//rysuje pipeTop 
		ctx.drawImage(pipeTop, pipes[i].x, pipes[i].y-pipeTop.height-gap);
		pipes[i].x--;
		//detekcja kolizji - poprawiona kolizja
		if (
			(pipes[i].x > -pipeBottom.width) &&
			(
				( (birdPosX < pipes[i].x) && (birdPosX + bird.width >pipes[i].x) ) ||
				( (birdPosX > pipes[i].x) && (birdPosX  + bird.width  < pipes[i].x + pipeBottom.width) ) ||
				( (birdPosX < pipes[i].x + pipeBottom.width) && (birdPosX + bird.width> pipes[i].x + pipeBottom.width) )
			) &&
			( (birdPosY + bird.height >= pipes[i].y) || (birdPosY <= pipes[i].y - gap))
		) {
			cancelAnimationFrame(requestID);
		}
		
		//zlicza wynik czyli ilosc minietych przeszkod
		if (pipes[i].x == 0) { score++;}
		//usuwa pipeBottom ktory wyjechal z ekranu
		if (pipes[i].x <= -400) {
			pipes.shift();
		}
	}
	// co 200 klatek wstaw/dodaj obiekt z nowymi wspolrzednymi dla kolejnego pipeBottom
	if (counterFrame == 200) {
		pipes.push({
			x: 310,
			//losuje 1 liczbe z zakresu (min, max)
			y: Math.floor(Math.random() * (max - min) + min)
		});
		counterFrame = 1;
	}

	velocity += gravity;
	ctx.fillText("Score: " +  score  , 100, 20);
	if (birdPosY > background.height - bird.height || birdPosY < 0) {
		velocity = 0; //stop bird move
		cancelAnimationFrame(requestID); //stop game
	}
	birdPosY = birdPosY + velocity;
}

document.addEventListener("keydown", function() {
	velocity = velocity + jump;
});

pauseBtn.addEventListener("click", function() {
	// animacja stop;
	cancelAnimationFrame(requestID);
	pause = true;
});

playBtn.addEventListener("click", function() {
	//animacja start;
	if ( pause === true ) {
		velocity = 0;
		requestAnimationFrame(draw);
	}
	this.blur();
	pause = false;
});

draw();
