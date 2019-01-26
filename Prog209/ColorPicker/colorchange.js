//set up variables and pull items from the DOM tree
var colorButton = document.querySelector("#showColor");
var resetButton = document.querySelector("#Reset");
var redInput = document.querySelector("#red");
var greenInput = document.querySelector("#green");
var blueInput = document.querySelector("#blue");

//button event listeners
colorButton.addEventListener("click", showColorHandler, false);
resetButton.addEventListener("click", resetColors, false);

//function that changes the color bar
function showColorHandler(e) {
	var red = parseInt(redInput.value);
	var green = parseInt(greenInput.value);
	var blue = parseInt(blueInput.value);
	//verify if numbers are valid, then run code
	if (validate(red) && validate(green) && validate(blue)) {	
	colorBar.style.backgroundColor = "rgb(" + red + "," + green + "," + blue +")";
	}
	else {
		alert("You must enter numbers from 0 to 255");
	}
}
//function that resets the colors
function resetColors(e) {
	redInput.value = "0";
	greenInput.value = "0";
	blueInput.value = "0";
	colorBar.style.backgroundColor = "black";
}

//verifies numbers are valid and between 0 and 255
function validate(number) {
	if (isNaN(number)|| number < 0 || number > 255 ) {
		return false;
	}
	else {
		return true;
	}
}

	