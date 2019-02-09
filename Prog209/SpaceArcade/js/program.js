// Arrow key codes
const UP = 38,
    DOWN = 40,
    RIGHT = 39,
    LEFT = 37,
	ufoUP = 87,
	ufoDown = 90;
	
var laserSound = document.querySelector("laserCannon");

// rocket object
var rocket = {
	img: document.querySelector("#rocket"),
	x: 490,
	y: 390,
	width: 100
};
var ufo = {
	img: document.querySelector("#ufo"),
	x: 115,
	y: 120,
	width: 100,
	exploded: false
};


const velocity = 4;//changed this to const since it will not be modified by any functionsj also upped the speed

const torpedo = document.querySelector("#torpedo"),//also changed these to constants since we are not changing values 
    startBtn = document.querySelector("#start"),
    fireBtn = document.querySelector("#fire");
//    ufo = document.querySelector("#ufo"); removed this line of code since ufo is now an object 

// Initialize objects on the screen
render ( );

startBtn.addEventListener("click",startGameHandler,false);
fireBtn.addEventListener("click",fireTorpedoHandler,false)
window.addEventListener("keydown",keydownHandler,false);

function startGameHandler( ) {
	// Hide the intro screen, show the game screen
	"use strict";
	introScreen.style.display = "none";
	gameScreen.style.display = "block";
	rocket.img.style.display = "block";
	ufo.img.style.display = "block";
}

function fireTorpedoHandler( ) {
	// Fire the photon torpedo!
	// CSS animation occurs whenever torpedo
	// 'left' property changes value
	"use strict";
	torpedo.style.visibility = "visible";
	torpedo.style.left = (rocket.x - 200)+ "px";
	laserCannon.play();
		
}

function keydownHandler(event) {
	// handle user keyboard input
	"use strict";

	if (event.keyCode == UP) {
		rocket.y -= velocity;
	}
	if (event.keyCode == LEFT) {
		rocket.x -= velocity;
	}
	if (event.keyCode == DOWN) {
		rocket.y += velocity;
	}
	if (event.keyCode == RIGHT) {
		rocket.x += velocity;
	}
	if (event.keyCode == ufoUP) {
		ufo.y -= velocity;
	}
	if (event.keyCode == ufoDown) {
		ufo.y += velocity;
	}
	
	render( );
}

function render( ) {
	// position objects on the screen
	"use strict";
	rocket.img.style.left = rocket.x + "px";
	rocket.img.style.top = rocket.y + "px";
	torpedo.style.left = (rocket.x + 10) + "px";
	torpedo.style.top = (rocket.y + 8) + "px";
	torpedo.style.visibility = "hidden";
	ufo.img.style.left = ufo.x + "px";
	ufo.img.style.top = ufo.y + "px";
}
