//shuffler Javascript written by Josh Prokopp 1/31/19
//Program enters user defined entries into an array then allows user to shuffle the array
"use strict";//setting up strict Javascript

//set up variables
var addButton = document.getElementById("addButton");
var shuffleButton = document.getElementById("shuffleButton");
var resetButton = document.getElementById("resetButton");
var errorMessage = document.getElementById("errorMessage");
var list = [];
var emptyList = [];//this is to clear out the list should the user need to reset

//set up event listeners for buttons
addButton.addEventListener("click", addItem, false);
shuffleButton.addEventListener("click", shuffle, false);
resetButton.addEventListener("click", reset, false);
window.addEventListener("keydown", enterHit, false);


//set up functions

function enterHit (e) {//function to activate the addItem function if enter key is pressed 
	if (e.keyCode === 13) {
		addItem();
	}
}

function addItem (e) {
	let newItem = document.getElementById("item").value;
	if (newItem == "" || newItem == null) {//makes sure there is something in the text field 
		errorMessage.innerHTML = "*Please type in an item before adding it to the list.";
	}
	else {
		list.push(newItem);
		document.getElementById("item").value = "";//clears the text field once the item is entered
		document.getElementById("list").innerHTML = list.join("<br />");
		errorMessage.innerHTML = "";//clears any prior error message
	}
}

function shuffle (e) {
	let newList = [];
	while (list.length > 0) {
		let rnd = Math.floor(Math.random() * list.length);
		newList.push(list[rnd]);
		list.splice(rnd, 1);
	}
	if (newList.length < 2) { //make sure there is at least 2 items to shuffle 
		errorMessage.innerHTML = "*There needs to be at least two items in the list to shuffle. Please add more items.";
	}
	else {
		list = newList;//replaces the old list with the newly shuffled list 
		document.getElementById("list").innerHTML = list.join("<br />");
		errorMessage.innerHTML = "";//clears any error messages 
	}
}

function reset (e) {
	list = emptyList;//clears the list variable 
	document.getElementById("list").innerHTML = "";//clears the list displayed
	errorMessage.innerHTML = "";//clears any error messages
}
	
