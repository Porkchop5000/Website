//This is a space horror game I created using concept art for Dead Space. Created by Josh Prokopp 2/9/19

//get buttons from the dom tree
const playButton01 = document.getElementById("playButton01"),
	continueButton = document.getElementById("continueButton"),
	loadButton01 = document.getElementById("loadButton01"),
	loadButton02 = document.getElementById("loadButton02"),
	saveButton = document.getElementById("saveButton"),
	quitButton01 = document.getElementById("quitButton01"),
	quitButton02 = document.getElementById("quitButton02"),
	enterButton = document.getElementById("enterButton"),
	helpButton = document.getElementById("helpButton");
	

//get divs from the dom tree. making them variables to they can be manipulated
var	locationImage = document.querySelector("#locationImage"),
	locationName = document.querySelector("#locationName"),
	locationMessage = document.querySelector("#locationMessage"),
	locationCreatures = document.querySelector("#creatures"),
	input = document.querySelector("#playerInput"),
	consoleDisplay = document.querySelector("#playerConsole"),
	inventoryDisplay = document.querySelector("#itemsHeld"),
	oxygenDisplay = document.querySelector("#oxygenRemaining"),
	helpDisplay = document.querySelector("#help"),
	gameOverBanner = document.querySelector("#gameOverBanner"),
	gameOverMessage = document.querySelector("#gameOverMessage"),
	gameOverScreen = document.querySelector("#gameOverScreen");
	
//get audio from html
const atmosphereNoise = document.getElementById("atmosphere"),
	swarmNoise = document.getElementById("swarmNoise"),
	turretNoise = document.getElementById("turretFire"),
	lurkerNoise = document.getElementById("lurkerNoise"),
	sentinelNoise = document.getElementById("sentinelNoise"),
	spacesuitOnNoise = document.getElementById("spacesuitOn"),
	spacesuitOffNoise = document.getElementById("spacesuitOff"),
	airlockNoise = document.getElementById("airlockNoise"),
	blasterNoise = document.getElementById("blasterNoise"),
	breathingNoise = document.getElementById("breathingNoise"),
	powerUpNoise = document.getElementById("powerUpNoise"),
	switchNoise = document.getElementById("switchNoise"),
	doorOpenNoise = document.getElementById("doorOpenNoise"),
	radioNoise = document.getElementById("radioNoise");

//set volume on sounds
atmosphereNoise.volume = 0.5;
swarmNoise.volume = 0.5;
turretNoise.volume = 0.5;
lurkerNoise.volume = 0.5;
sentinelNoise.volume = 0.5;
spacesuitOnNoise.volume = 0.25;
spacesuitOffNoise.volume = 0.25;
airlockNoise.volume = 0.25;
blasterNoise.volume = 0.25;
breathingNoise.volume = 0.15;
powerUpNoise.volume = 0.25;
switchNoise.volume = 0.5;
doorOpenNoise.volume = 0.5;
radioNoise.volume = 0.5;

//set ambient and noise to loop
atmosphereNoise.loop = true;
breathingNoise.loop = true;

//create a sound effects variable to play sounds separate from the ambient noise
var sfx = null;


//event listeners
playButton01.addEventListener("click", startGameHandler, false);
continueButton.addEventListener("click", continueHandler, false);
loadButton01.addEventListener("click", loadHandler, false);
loadButton02.addEventListener("click", loadHandler, false);
saveButton.addEventListener("click", saveHandler, false);
quitButton01.addEventListener("click", quitHandler, false);
quitButton02.addEventListener("click", quitHandler, false);
helpButton.addEventListener("click", help, false);
enterButton.addEventListener("click", playGame, false);
window.addEventListener("keydown",keydownHandler,false);

//set up the map creating an array of objects
var map = [
{
	locationName: "Communications Hub",//map location 0
	locationDescription: "",
	locationImage: "images/commHub.jpg",
	locationItems: "",
	usableItems: "comm console",
	locked: false,
	creatures: null,
	onRender: function () {
		this.locationDescription = "";//reset the desription for each render
		this.locationDescription += `<p>This is the main communications hub for the ship.
		There's a <em>comm console</em> in here. Perhaps you can call for help. 
		You'll probably go to prison, but it sure beats dying here.</p>`;
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here.`; 
		}		
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: `There is a comm satellite to the east of here that will need to be aligned. 
	You will also need a security chip to access the communications system. Most likely the captain
	has it.</br>`
},
{
	locationName: "Communications Satellite Dish",//map location 1
	locationDescription: "",
	locationImage: "images/commSat.jpg",
	locationItems: "",
	usableItems: "satellite dish",
	locked: true,
	creatures: "lurker",
	satelliteAligned: false,
	onRender: function () {
		this.locationDescription = "";//reset the description
		if (this.satelliteAligned !== true) {
			this.locationDescription += `The communications <em>satellite dish</em> appears be out of alignment. `;
		}
		else {
			this.locationDescription += `The communications satellite dish is aligned. `;
		}
		if (this.creatures != null) {
			this.locationDescription += `There is something else out here... `;
		}
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}		
		console.log("This rendered");
	},
	onEnter: function () {
		//on enter function goes here
		if (this.creatures !== null) {
			sfx = lurkerNoise;
			sfx.play();
		}
		console.log("onEnter function fired");
	},
	helpMessage: `You won't be able to adjust the satellite if the Lurker is still alive out here.
	There is a mining turret to the east of here that might solve that problem.</br>`
},	
{
	locationName: "Mining Turret",//map location 2
	locationDescription: "",
	locationImage: "images/turret.jpg",
	locationItems: "",
	usableItems: "turret",
	locked: false,
	creatures: null,
	onRender: function () {
		this.locationDescription = "";
		this.locationDescription += `This photon <em>turret</em> was used to blow holes in asteroids
			 to get to their precious metals. You can see the satellite dish from here. `;
		if (map[1].creatures !== null) {
			this.locationDescription += `There's also something moving around out there. `;
		}
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here.`; 
		}
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: `The mining turret needs a lot of power to operate. If the ship is still running on
	auxillary power, that won't be enough. You'll need to find a way to activate the main power.</br>`
},
{
	locationName: "Hold",//map location 3
	locationDescription: "",
	locationImage: "images/hold.jpg",
	locationItems: "repair kit",
	usableItems: "",
	locked: false,
	creatures: "sentinel",
	onRender: function () {
		this.locationDescription = "";//reset the desription for each render
		this.locationDescription += `Doesn't look like there is much left of the prisoners here. `;
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//sentinel noise if the sentinel is here
		if (this.creatures !== null) {
			sfx = sentinelNoise;
			sfx.play();
		}
		console.log("onEnter function fired");
	},
	helpMessage: `The sentinel seems weaker than some of the other creatures on the ship.
	If you can find a weapon, you might be able to kill it and get to the repair kit.</br>
	The captain's quarters are south of here, but the door is locked. If you can find a key card
	you might be able to open it.</br>`
},
{
	locationName: "Flight Deck",//map location 4
	locationDescription: "",
	locationImage: "images/flightDeck.jpg",
	locationItems: "",
	usableItems: "",
	locked: false,
	creatures: null,
	onRender: function () {
		this.locationDescription = "";//reset the desription for each render
		this.locationDescription += `Your ship doesn't look like it's going to be repairable.  
			Where is everyone? Maybe you should take a look around.`;
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: "There isn't much to do in this room except explore.</br>"
},
{
	locationName: "Main Power",//map location 5
	locationDescription: "",
	locationImage: "images/mainPower.jpg",
	locationItems: "blaster",
	usableItems: "switch",
	locked: false,
	creatures: null,
	mainPowerActivated: false,
	consoleRepaired: false,
	onRender: function () {
		this.locationDescription = "",
		this.locationDescription = `There is a console with the main power control <em>switch</em> here.`;
		if (this.mainPowerActivated !== true) {
			this.locationDescription += ` The ship is currently only running on auxillary power. `;			
		}
		else {
			this.locationDescription += ` The main power has been activated. `;
		}
		if (this.consoleRepaired !== true) {
			this.locationDescription += ` The power controls are damaged, but it looks repairable...`;
		}
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: `Before you can activate the switch, you'll need to repair it. Maybe there are 
	some tools in the ship.</br>`
},
{
	locationName: "Quarter Deck",//map location 6
	locationDescription: "",
	locationImage: "images/quarterDeck.jpg",
	locationItems: "security chip",
	usableItems: "",
	locked: true,
	creatures: null,
	onRender: function () {
		this.locationDescription = "";
		this.locationDescription += `Looks like the captain barricaded himself in here. 
		A lot of good that did. There doesn't appear to be much left of him. `;
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: `Not much to do here except take the security chip from the captain's body.</br>`
},
{
	locationName: "Muster Station",//map location 7
	locationDescription: "",
	locationImage: "images/musterStation.jpg",
	locationItems: "key card",
	usableItems: "airlock",
	locked: false,
	creatures: "swarm",
	onRender: function () {
		this.locationDescription = "";
		this.locationDescription += `Looks like some sort of massacre happened here. 
		There is an <em>airlock</em> that still appears to be functioning. `;		
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//make swarm noise upon room entry if the swarm is in the room
		if (this.creatures !== null) {
			sfx = swarmNoise;
			sfx.play();
		}
		console.log("onEnter function fired");
	},
	helpMessage: `The swarm is too strong to kill with standard weapons. There is an airlock in here,
	but if you aren't wearing a space suit when you activate it, you'll die too.</br>`
},
{
	locationName: "Ward Room",//map location 8
	locationDescription: "",
	locationImage: "images/wardRoom.jpg",
	locationItems: "space suit",
	usableItems: "",
	locked: false,
	creatures: null,
	onRender: function () {
		this.locationDescription = "";
		this.locationDescription += `This is where the crew would relax.
		 Nothing about this place feels relaxing anymore. `;		
		if (this.locationItems !== "") {
			this.locationDescription += `There is a <em> ${this.locationItems} </em> here. `; 
		}
	},
	onEnter: function () {
		//on enter function goes here
		console.log("onEnter function fired");
	},
	helpMessage: `The space suit will be useful for environments with no oxygen. Just be sure to 
	use the space suit to equip it.</br>`
},
];

//start location
var mapLocation = 4;

//item locations - may only need this for local storage
var items = ["security chip", "space suit", "repair kit", "blaster", "key card"];
var itemLocations = [6, 8, 3, 5, 7];

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
var itemsIknow = ["comm console", "satellite dish", "turret", "repair kit",
 "switch", "security chip", "key card", "airlock", "space suit", "blaster"];

var item = "";

//variable to determine if player is wearing the space suit or not
var spaceSuit = false;

//this will be used within the render function to call different renders from when
//a player changes locations
var locationChanged = false;

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
	locationChanged = true;
	render();
	atmosphereNoise.play();
}

//this quits the game and goes back to the title screen
function quitHandler() {
	"use strict";
	displayScreen(titleScreen);
	if (sfx !== null) {
		sfx.pause();
		sfx = null;
	}
}

//this is for when the game ends (win or lose) 
function gameOver(ending) {
	"use strict";
	displayScreen(gameOverScreen);
	switch(ending) {
		case "suckedIntoSpace":
		breathingNoise.pause();
		console.log("you dead sucka");
		gameOverMessage.innerHTML = "<p>You activate the airlock and are sucked into the void of space." +
		" As the fluid in your eyes boils and the oxygen is violently sucked out of your lungs only to" +
		" freeze instantly, you get the small satisfaction of knowing that the swarm is out here suffering" +
		" the same fate as you. Perhaps you should have worn a space suit. So it goes.</p>";
		break;
		
		case "saved":
		breathingNoise.pause();
		console.log("saved");
		if (sfx !== null) {
			sfx.pause();
			sfx = null;
		}
		sfx = radioNoise;
		sfx.play();
		gameOverScreen.style.backgroundImage = "url(images/savedEnding.jpg)";
		gameOverBanner.style.display = "none";
		console.log("saved ending");
		gameOverMessage.innerHTML = "<p>You use the comm console to place a distress call. Help arrives " + 
		"and you are taken back to earth. After your incarceration you are one of the few prisoners " +
		"with a constant smile on your face. Being locked up beats whatever the Hell was going on in " +
		"that abandoned vessel. Over the following weeks the smile slowly fades and the voices start to " +
		"come to you in the night. You convince your self that it is post traumatic stress; you've been " +
		"through a lot. They've got pills for that. Thing is, the pills aren't working and now something " + 
		"is starting to grow...</p>";
		break;
	}
	//more code to go here for the different endings
}

//this is for saving the game to local storage
function saveHandler( ){
	"use strict";
	//clear out what is currently in local storage
	localStorage.clear();
	//code to save inventory to local storage
	for (let i =0; i < inventory.length; i++) {
		localStorage.setItem(inventory[i], inventory[i])
	}
	//save the player's current location 
	localStorage.setItem("mapLocation", mapLocation);
	//save whether the player is wearing the space suit
	localStorage.setItem("spaceSuit", spaceSuit);
	//save room states and whether creatures are alive or dead
	localStorage.setItem("satelliteAligned",map[1].satelliteAligned);
	localStorage.setItem("consoleRepaired",map[5].consoleRepaired);
	localStorage.setItem("mainPowerActivated",map[5].mainPowerActivated);
	localStorage.setItem("quarterDeckLocked",map[6].locked);
	//need to fix this 
	localStorage.setItem("lurker", map[1].creatures);
	localStorage.setItem("swarm", map[7].creatures);
	localStorage.setItem("sentinel", map[3].creatures);
}

//this is for loading a saved game 
function loadHandler( ) { 
	"use strict";
	displayScreen(gameScreen);
	inventory = [];//clear out existing inventory
	//code to load inventory from local storage
	for (let i =0; i <itemsIknow.length; i++) {
		if (localStorage.getItem(itemsIknow[i]) !== null) {
			//put the item in the players inventory
			inventory.push(itemsIknow[i]);			
			//remove from the map location
			for (let x = 0; x <map.length; x++) {
				if (itemsIknow[i] == map[x].locationItems) {
					map[x].locationItems = "";
					break;
				}
			}
		}
	}
	//code to load player's current location
	mapLocation = parseInt(localStorage.getItem("mapLocation"));//convert string to integer
	//code just in case no integer is found
	if (isNaN(mapLocation)) {
		mapLocation = 4;
	}
	//code to pull various room states and load them so that it creates a boolean from the string
	spaceSuit = (localStorage.getItem("spaceSuit") == "true");
	if (spaceSuit) {
		map[1].locked = false;//unlocks the comm sat area if the space suit is true
		breathingNoise.play();//start the breathing noise
	}
	map[1].satelliteAligned = (localStorage.getItem("satelliteAligned") == "true");
	map[5].consoleRepaired = (localStorage.getItem("consoleRepaired") == "true");
	if (map[5].consoleRepaired) {
		map[5].locationItems = ""; //remove repair kit if console has already been fixed 
	}
	map[5].mainPowerActivated = (localStorage.getItem("mainPowerActivated") == "true");
	map[6].locked = (localStorage.getItem("quarterDeckLocked") == "true");
	if (!map[6].locked) {
		map[7].locationItems = ""; //remove the key card if the room is not locked 
	}
	if (localStorage.getItem("lurker") == "null") {
		map[1].creatures = null;//remove the lurker if it's already been killed
	};
	if (localStorage.getItem("swarm") == "null") {
		map[7].creatures = null;//remove the swarm if it's already been killed 
	};
	if (localStorage.getItem("sentinel") == "null") {
		map[3].creatures = null;//remove the sentinel if it's already been killed 
	};
	atmosphereNoise.play();//start playing the atmospheric noise
	locationChanged = true;
	//call render function 
	render();
}

function keydownHandler (event) {
	"use strict";
	//keydown functions for enter varying depending on what screen you are on
	let enter = 13
	if (event.keyCode == enter && titleScreen.style.display == "block") {
		startGameHandler();//not working?
	}
	if (event.keyCode == enter && introScreen.style.display == "block") {
		continueHandler();
	}
	if (event.keyCode == enter && gameScreen.style.display == "block") {
		playGame();
	}
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
	for(let i = 0; i < itemsIknow.length; i++) {
		if(playersInput.indexOf(itemsIknow[i]) !== -1) {
			item = itemsIknow[i];
			//console log this for testing
			console.log("Player's item: " + item);
		}
	}
	//choose the correct action
	switch(action) {
		//start with directions - verifies if rooms are locked prior to allow player to enter 
		case "north":
		if(mapLocation >=3 && map[mapLocation - 3].locked == false) {
			mapLocation -= 3;
			//stop any sfx from prior rooms
			if (sfx !== null) {
				sfx.pause();
				sfx = null;
			}
			locationChanged = true;//change this to true so that the onEnter function can be rendered
		}
		else {
			blockedPathMessageHandler(mapLocation - 3);
		}
		break;
		case "east":
		if(mapLocation % 3 != 2 && map[mapLocation + 1].locked == false) {
			mapLocation += 1;
			if (sfx !== null) {
				sfx.pause();
				sfx = null;
			}
			locationChanged = true;
		}
		else {
			blockedPathMessageHandler(mapLocation + 1);
		}
		break;
		case "south":
		if(mapLocation < 6 && map[mapLocation + 3].locked == false) {
			mapLocation += 3;
			if (sfx !== null) {
				sfx.pause();
				sfx = null;
			}
			locationChanged = true;
		}
		else {
			blockedPathMessageHandler(mapLocation + 3);
		}
		break;
		case "west":
		if(mapLocation % 3 != 0 && map[mapLocation - 1].locked == false) {
			mapLocation -= 1;
			if (sfx !== null) {
				sfx.pause();
				sfx = null;
			}
			locationChanged = true;
		}
		else {
			blockedPathMessageHandler(mapLocation - 1);
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
		//prevent a player from taking an item in a room full of creatures
		if(map[mapLocation].creatures != null) {
		consoleMessage = `You can't take the ${item} the ${map[mapLocation].creatures} will kill you.`;
		}
		//set up the console message
		else {
		consoleMessage = `You take the ${item}.`;
		//remove from the map location
		map[mapLocation].locationItems = "";
		//put the item in the players inventory
		inventory.push(item);
		}
	}
	else {
		consoleMessage = "You can't do that"
	}
}

//function that executes the use item command
function useItem() {
	//search inventory for item
	let inventoryIndexNumber = inventory.indexOf(item);
	//see if room has the usable item
	let usableItemIndexNumber = map[mapLocation].usableItems.indexOf(item);
	if(inventoryIndexNumber === -1 && usableItemIndexNumber === -1) {
		consoleMessage = "I'm afraid you can't do that...";
	}
	else {
		if(map[mapLocation].creatures !== null && map[mapLocation].usableItems !== "airlock" &&
		inventoryIndexNumber === -1) {
			consoleMessage = `You can't get to the ${item} the ${map[mapLocation].creatures} will kill you`;
		}
		else {
				switch(item) {
					case "airlock":
						//make sfx to airlock
						if (sfx !== null) {
								sfx.pause();
						}
						sfx = airlockNoise;
						sfx.play();
						if (spaceSuit) {//verify player is wearing the space suit
							consoleMessage = "You open the airlock and hold on tight while the ";
							if (map[mapLocation].creatures !== null) {
								consoleMessage += map[mapLocation].creatures + 
								" gets sucked in the vacuum of space. ";
							}
							else {
								consoleMessage += "air sucks out of the room. ";
							}
							consoleMessage += "You reseal the airlock and breathable air slowly fills the room.";
							map[mapLocation].creatures = null;						
						}
						else { 
							gameOver("suckedIntoSpace");//player dies if not wearing the space suit						
						}
						break;
						
					case "space suit":
						if (spaceSuit) {//checks to see if play is already wearing the space suit
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							breathingNoise.pause();
							sfx = spacesuitOffNoise;
							sfx.play();
							consoleMessage = "You take off the space suit.";
							spaceSuit = false;//removes the space suit 
							map[1].locked = true;//you cannot travel outside anymore 
						}
						else {//puts the space suit on if they are not already wearing it
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = spacesuitOnNoise;
							sfx.play();
							breathingNoise.play();
							consoleMessage = "You put on the space suit.";
							spaceSuit = true;
							map[1].locked = false;
						}
						break;
						
					case "security chip":
						if (mapLocation == 0) {
							if (map[1].satelliteAligned) {
								gameOver("saved");							
							}
							else {
								consoleMessage = "You can access the communications system," +
								" but the satellite dish is out of alignment";
							}
							break;
						}
						else {
							consoleMessage = "That doesn't work for anything here.";
						}
						break;
					
					case "key card":
						if (mapLocation == 3) {
							map[6].locked = false;
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = doorOpenNoise;
							sfx.play();
							consoleMessage = "You use the key card to unlock the captain's quarters.";
							let inventoryIndexNumber = inventory.indexOf(item);
							inventory.splice(inventoryIndexNumber, 1);
						}
						else {
							consoleMessage = "You can't use that here.";
						}
						break;
					
					case "repair kit":
						if (mapLocation == 5) {
							map[5].consoleRepaired = true;
							let inventoryIndexNumber = inventory.indexOf(item);
							inventory.splice(inventoryIndexNumber, 1);
							consoleMessage = "You have repaired the main power console.";
						}
						else {
								consoleMessage = "There is nothing that is repairable here.";
						}
						break;
					
					case "switch":
						if (map[5].consoleRepaired) { //check to see if the console is fixed first
							map[5].mainPowerActivated = true; //activates main power
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = powerUpNoise;
							sfx.play();
							consoleMessage = "You have activated the main power.";
						}
						else {
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = switchNoise;
							sfx.play();
							consoleMessage = "The main power console is damaged and you cannot activate" + 
							" the switch";
						}
						break;
					
					case "turret":
						if (map[5].mainPowerActivated) { //check to see if the main power is on
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = turretNoise;
							sfx.play();
							if (map[1].creatures !== null) { //check to see if the lurker is still out there
								map[1].creatures = null;//kill the lurker
								consoleMessage = "A few careful well-timed shots and now the Lurker is dead.";
							}
							else {
								consoleMessage = "You fire a few shots into space. Nothing happens.";
							}
						}
						else {
							consoleMessage = "This thing doesn't have enough juice to fire." +
							" It won't run on auxillary power.";
						}
						break;
					
					case "satellite dish":
						map[1].satelliteAligned = true;
						consoleMessage = "You put the satellite back in alignment. Maybe now you " + 
						"can call for help.";
						break;
						
					case "comm console":
						if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = switchNoise;
							sfx.play();
						consoleMessage = "This has a security lock. Looks like the captain blocked " + 
						"access to everyone else, but himself.";
						break;
						
					case "blaster":
						if (map[mapLocation].creatures == null)	{
							consoleMessage = "There doesn't seem to be much of a point firing this off " +
							"in here. This ship is already damaged enough as it is. ";
						}
						if (mapLocation == 3 && map[3].creatures !== null) {
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = blasterNoise;
							sfx.play();
							consoleMessage = `You fire a shot at the ${map[3].creatures}
							 killing it. It looks like these things are mortal after all.`;
							map[3].creatures = null;
							break;
						}
						if (mapLocation == 1 && map[1].creatures !== null) {
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = blasterNoise;
							sfx.play();
							consoleMessage = `You fire your blaster at the ${map[1].creatures}
							 and it has no effect. You're going to need something with more firepower.`;
						}
						if (mapLocation == 7 && map[7].creatures !== null) {
							if (sfx !== null) {
								sfx.pause();
								sfx = null;
							}
							sfx = blasterNoise;
							sfx.play();
							consoleMessage = `You take aim and fire, but the ${map[7].creatures}
							 seems to regenerate faster than you can damage it. There must 
							 be some other way to kill this thing.`;
						}
						break;
					
					default: 
						consoleMessage = "You can't do that.";
				}
		}
	}
}

//function to render the player's location
function render() {	
//	if (locationChanged) {
//		exitLocationChangeAnimation();//do the animation for exiting a location 
//	}
	//use the location's on render function if one exists
	map[mapLocation].onRender();
	// render the image using the map location object 
	locationImage.style.backgroundImage = "url(" + map[mapLocation].locationImage + ")";
	// render the location name 
	locationName.innerHTML = "<h1>" + map[mapLocation].locationName + "</h1>";
	// render the location description 
	locationMessage.innerHTML = "<p>" + map[mapLocation].locationDescription + "</p>";
	// call to render creatures if they exist in this room 
	if (map[mapLocation].creatures !== null) {
		creatureDisplayHandler();
	}
	else {
		locationCreatures.style.display = "none";
	}
	//hide help message if it is up
	helpDisplay.style.display = "none";
	//display the console messages
	consoleDisplay.innerHTML = consoleMessage; 
	//display inventory if the player has anything
	inventoryDisplay.innerHTML = "<ul>Items Held: <li>" + inventory.join("</li><li>");
	//clear the player's input
	input.value = "";
	//if location was changed, use the onEnter function for the room
	if (locationChanged) {
		enterLocationChangeAnimation();
		map[mapLocation].onEnter();
		locationChanged = false;//set this back to false so it doesn't keep doing the on enter
		//function.
	}
	//display oxygen remaining if implemented
}

//function to render creatures if they exist in a room
function creatureDisplayHandler() {
	locationCreatures.style.display = "block";
	locationCreatures.style.backgroundImage = "url(images/" + map[mapLocation].creatures + ".png)";
	locationCreatures.innerHTML = "<h3>" + map[mapLocation].creatures.toUpperCase() + "</h3>";
}

//function to verify if a room is locked 
function blockedPathMessageHandler(location) {
		switch(location) {
			case 1: 
				consoleMessage = "You can't go out there without a space suit.";
				break;
			case 6:
				if (mapLocation == 7) {
					consoleMessage = "The door is barricaded from the other side. You can't open it.";					
				}
				else {
					consoleMessage = "The door is locked.";
				}
				break;
			default:
				consoleMessage = "You can't go that way.";
		}
}

//function for exiting a location animation - not functioning
//function exitLocationChangeAnimation() {
//	var tl = new TimelineMax();
//	switch(action) {
//		case "north": 
//		TweenMax.to(locationImage, 1, {y: 700});
//		break;
//		case "south":
//		TweenMax.to(locationImage, 1, {y: -700});
//		break;
//		case "east":
//		TweenMax.to(locationImage, 1, {x: -700});
//		break;
//		case "west":
//		TweenMax.to(locationImage, 1, {x: 700});
//		default:
//		break;
//	}
//	console.log('exit location change animation fired');
//	return tl;
//}

//function for enteriong a location animation
function enterLocationChangeAnimation() {
//		var exitAnimation = exitLocationChangeAnimation();
//		exitAnimation.pause(0);
		TweenMax.from(locationName, 1, {y: -50});
		TweenMax.from(locationMessage, 1, {x: -450});
		TweenMax.from(locationCreatures, 1, {x: -700});
//		switch(action) {
//			case "north": 
//			TweenMax.from(locationImage, 1, {y: 700});
//			break;
//			case "south":
//			TweenMax.from(locationImage, 1, {y: -700});
//			break;
//			case "east":
//			TweenMax.from(locationImage, 1, {x: -700});
//			break;
//			case "west":
//			TweenMax.from(locationImage, 1, {x: 700});
//			default:
//			break;
//		}
		console.log('enter location change animation fired');
}

//function for the help button 
function help(){
	//function goes here
	helpDisplay.style.display = "block";
	helpDisplay.innerHTML = map[mapLocation].helpMessage;
	TweenMax.from(helpDisplay, 1, {y: 400});
	console.log("help function fired");
}
