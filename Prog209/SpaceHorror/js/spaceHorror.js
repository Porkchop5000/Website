//This is a space horror game I created using concept art for Dead Space. Created by Josh Prokopp 2/9/19

//get buttons from the dom tree
const playButton = document.getElementById("playButton"),
	continueButton = document.getElementById("continueButton"),
	loadButton = document.getElementById("loadButton"),
	saveButton = document.getElementById("saveButton"),
	quitButton = document.getElementById("quitButton"),
	enterButton = document.getElementById("enterButton");

//get divs from the dom tree. making them variables to they can be manipulated
var	locationImage = document.querySelector("#locationImage"),
	locationName = document.querySelector("#locationName"),
	locationMessage = document.querySelector("#locationMessage"),
	locationCreatures = document.querySelector("#creatures"),
	input = document.querySelector("#playerInput"),
	consoleDisplay = document.querySelector("#playerConsole"),
	inventoryDisplay = document.querySelector("#itemsHeld"),
	oxygenDisplay = document.querySelector("#oxygenRemaining");	

//event listeners
playButton.addEventListener("click", startGameHandler, false);
continueButton.addEventListener("click", continueHandler, false);
loadButton.addEventListener("click", loadHandler, false);
saveButton.addEventListener("click", saveHandler, false);
quitButton.addEventListener("click", quitHandler, false);
enterButton.addEventListener("click", playGame, false);
window.addEventListener("keydown",keydownHandler,false);

//set up the map creating an array of objects
var map = [
{
	locationName: "Communications Hub",//map location 0
	locationDescription: "<p>This is the main communications hub for the ship. There's a <em>console</em> in here. Perhaps you can call for help. You'll probably go to prison, but it sure beats dying here.</p>",
	locationImage: "images/commHub.jpg",
	locationItems: null,
	usableItems: "commconsole",
	locked: false,
	creatures: null,	
},
{
	locationName: "Communications Satellite Dish",//map location 1
	locationDescription: "",
	locationImage: "images/commSat.jpg",
	locationItems: null,
	usableItems: "commsatellite",
	locked: true,
	creatures: "lurker",
	satelliteAligned: false,
	onEnter: function () {
		if (this.satelliteAligned != true) {
			this.locationDescription += "The communications <em>satellite dish</em> appears be out of alignment.";
		}
		else {
			this.locationDescription += "The communications satellite dish is aligned."
		}
		if (this.creatures != null) {
			this.locationDescription += "There is something else out here...";
		}
	}
},	
{
	locationName: "Mining Turret",//map location 2
	locationDescription: "This photon <em>turret</em> was used to blow holes in asteroids to get to their precious metals. You can see the satellite dish from here.",
	locationImage: "images/turret.jpg",
	locationItems: null,
	usableItems: "turret",
	locked: false,
	creatures: null,
	onEnter: function () {
		if (map[1].creatures != null) {
			this.locationDescription += "There's also something moving around out there.";
		}
	}	
},
{
	locationName: "Hold",//map location 3
	locationDescription: "Doesn't look like there is much left of the prisoners here.",
	locationImage: "images/hold.jpg",
	locationItems: "repairkit",
	usableItems: null,
	locked: false,
	creatures: null,
	onEnter: function () {
	//on enter function goes here
	}	
},
{
	locationName: "Flight Deck",//map location 4
	locationDescription: "Your ship doesn't look like it's going to be repairable. Where is everyone? Maybe you should take a look around.",
	locationImage: "images/flightDeck.jpg",
	locationItems: null,
	usableItems: null,
	locked: false,
	creatures: null,
	onEnter: function () {
	//on enter function goes here
	}	
},
{
	locationName: "Main Power",//map location 5
	locationDescription: "There is a <em>power console</em> here.",
	locationImage: "images/mainPower.jpg",
	locationItems: null,
	usableItems: "powerconsole",
	locked: false,
	creatures: null,
	mainPowerActivated: false,
	consoleRepaired: false,
	onEnter: function () {
		if (this.mainPowerActivated != true) {
			locationDescription += " The ship is currently only running on auxillary power.";			
		}
		else {
			locationDescription += " The main power has been activated.";
		}
		if (this.consoleRepaired != true) {
			" The <em>power console</em> is damaged, but it looks repairable...";
		}
	}	
},
{
	locationName: "Quarter Deck",//map location 6
	locationDescription: "Looks like the captain barricaded himself in here. A lot of good that did. There doesn't appear to be much left of him.",
	locationImage: "images/quarterDeck.jpg",
	locationItems: "securitychip",
	usableItems: null,
	locked: true,
	creatures: null,
	onEnter: function () {
	//on enter function goes here
	}	
},
{
	locationName: "Muster Station",//map location 7
	locationDescription: "Looks like some sort of massacre happened here.",
	locationImage: "images/musterStation.jpg",
	locationItems: "keycard",
	usableItems: "airlock",
	locked: false,
	creatures: "swarm",
	onEnter: function () {
	//need to put functions for creature descriptions and airlock here 
	}	
},
{
	locationName: "Ward Room",//map location 8
	locationDescription: "This is where the crew would relax.",
	locationImage: "images/wardRoom.jpg",
	locationItems: "spacesuit",
	usableItems: null,
	locked: false,
	creatures: null,
	onEnter: function () {
	//on enter function goes here
	}	
},
];

//start location
var mapLocation = 4;

//blocked-path messages
var blockedPathMessages = [];
blockedPathMessages [0] = "You can't go that way";
blockedPathMessages [1] = "You need a <em>space suit</em> to go out there";
blockedPathMessages [2] = "It appears the door is barricaded from the other side";
blockedPathMessages [3] = "The door is locked.";
blockedPathMessages [4] = "";

//item locations - may only need this for local storage
var items = ["securitychip", "spacesuit", "repairkit", "keycard"];
var itemLocations = [6, 8, 3, 7];

//keep track of player's inventory
var inventory = [];

//initialize the player's input
var playersInput = ""

//initialize the console messages
var consoleMessage = ""

//create array of actions the game understands
//and variable to store the action
var actionsIknow = ["north", "south", "east", "west", "take", "use"];
var action = "";

//array of items and usable room items the game understands
var itemsIknow = ["commconsole", "commsatellite", "turret", "repairkit", "powerconsole", "securitychip", "keycard", "airlock", "spacesuit"];
var item = "";

//display the player's location
render();

//functions
//this starts the game from the title screen
function startGameHandler() {
	// Hide the title screen, show the intro screen
	"use strict";
	displayScreen(introScreen);
}

//this starts the game from the intro screen
function continueHandler() {	
	"use strict";
	displayScreen(gameScreen);
}

//this quits the game and goes back to the title screen
function quitHandler() {
	"use strict";
	displayScreen(titleScreen);
}

//this is for when the game ends (win or lose) 
function gameOver() {
	"use strict";
	displayScreen(gameOverScreen);
	//more code to go here for the different endings
}

//this is for saving the game to local storage
function saveHandler( ){
	"use strict";
	//code to save to local storage
}

//this is for loading a saved game 
function loadHandler( ) { 
	"use strict";
	displayScreen(gameScreen);
	//code to load from local storage
}

function keydownHandler () {
	"use strict";
	//keydown functions go here 
}

//function to clean up the code for displaying screens on other functions
function displayScreen(screen) {
	"use strict";
	titleScreen.style.display = "none";
	introScreen.style.display = "none";
	gameScreen.style.display = "none";
	gameOverScreen.style.display = "none";
	screen.style.display = "block";
}

//function to play the game - takes character's actions and does stuff
function playGame() {
	"use strict";
	//get players input and convert to lower case 
	playersInput = input.value;
	playersInput = playersInput.toLowerCase();
	//reset variables from prior turn
	consoleMessage = "";
	action = "";
	//determine if action is known
	for (let i = 0; i < actionsIknow.length; i++) {
		if(playersInput.indexOf(actionsIknow[i]) !== -1) {
			action = actionsIknow[i];
			//console log this for testing
			console.log("Player's action: " + action);
			break;
		}
	}
	//determine if the item player wants is known
	for(let i = 0; i < itemsIknow; i++) {
		if(playersInput.indexOf(itemsIknow[i]) !== -1) {
			item = itemsIknow[i];
			//console log this for testing
			console.log("Player's item: " + item);
		}
	}
	//choose the correct action
	switch(action) {
		//start with directions - probably will add a direction handler using the location objects
		case "north":
		if(mapLocation >=3) {
			mapLocation -= 3;
		}
		else {
			consoleMessage = blockedPathMessages[0];
		}
		break;
		case "east":
		if(mapLocation % 3 != 2) {
			mapLocation += 1;
		}
		else {
			consoleMessage = blockedPathMessages[0];
		}
		break;
		case "south":
		if(mapLocation < 6) {
			mapLocation += 3;
		}
		else {
			consoleMessage = blockedPathMessages[0];
		}
		break;
		case "west":
		if(mapLocation % 3 != 0) {
			mapLocation -= 1;
		}
		else {
			consoleMessage = blockedPathMessages[0];
		}
		break;
		//now for the other possible actions
		case "take":
		takeItem();
		break;
		case "use":
		useItem();
		break;
		//default message if command is not understood
		default:
		consoleMessage = "I do not understand that command.";		
	}
	//after all these are completed, this renders the game
	render();
}

//function that executes the take command
function takeItem() {
	//this is different from the text - I'm using the map location object to keep track of items
	//see if the location object has the item
	if(item == map[mapLocation].locationItems) {
		//set up the console message 
		consoleMessage = "You take the " + item + ".";
		//remove from the map location
		map[mapLocation].locationItems = null;
		//put the item in the players inventory
		inventory.push(item);
	}
	else {
		consoleMessage = "You can't do that"
	}
}

//function to render the player's location
function render() {	
	// render the image using the map location object 
	locationImage.style.backgroundImage = "url(" + map[mapLocation].locationImage + ")";
	// render the location name 
	locationName.innerHTML = "<h1>" + map[mapLocation].locationName + "</h1>";
	// render the location description 
	locationMessage.innerHTML = "<p>" + map[mapLocation].locationDescription + "</p>";
	// call to render creatures if they exist in this room 
	if (map[mapLocation].creatures != null) {
		creatureDisplayHandler();
	}
	else {
		locationCreatures.style.display = "none";
	}
	//display the console messages
	consoleDisplay.innerHTML = consoleMessage; 
	//display inventory if the player has anything
	if (inventory.length !== 0) {
		inventoryDisplay.innerHTML = "<ul>Items Held: <li>" + inventory.join("</li><li>");
	}
	//display oxygen remaining if implemented
}

//function to render creatures if they exist in a room
function creatureDisplayHandler() {
	locationCreatures.style.display = "block";
	//more code to go here
}
