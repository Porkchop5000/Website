window.addEventListener("load",init);

function init(){
	if(typeof(Storage)!=="undefined"){
	
	display();
	document.getElementById("donutType").focus();
	var orderButton = document.getElementById("orderButton");
	orderButton.addEventListener("click",saveInfo, false);
	}
	
	else{
	//old bowser
		alert("Local storage is not supported");
	}
}

function saveInfo(){
	var donutType = document.getElementById("donutType").value;
	var filling = document.getElementById("filling").value;
	var toppings = document.getElementById("toppings").value;
	var howMany = document.getElementById("howMany").value;
	var specialInstructions = document.getElementById("specialInstructions").value;
	
	localStorage.setItem("donutType",donutType);
	localStorage.setItem("filling",filling);
	localStorage.setItem("toppings",toppings);
	localStorage.setItem("howMany",howMany);
	localStorage.setItem("specialInstructions",specialInstructions);
	
	
	display();
	
}

function display(){
	var rightBox = document.getElementById("useroutput");
	var theDonut = localStorage.getItem("donutType");
	var theFilling = localStorage.getItem("filling");	
	var theToppings = localStorage.getItem("toppings");
	var theAmount = localStorage.getItem("howMany");
	var theInstructions = localStorage.getItem("specialInstructions");
	var donuts = "donuts";
	var instructions = "You gave the following special instructions:<br />"
	
	if(theInstructions == undefined || theInstructions == ""){
		instructions = "";		
	}
	if (theFilling == undefined || theFilling == "") {
		theFilling = "no";
	}
	if (theToppings == undefined || theToppings == "") {
		theToppings = "nothing";
	}
	if (theAmount < 2) {
		donuts = "donut";
		}
	if (theDonut == undefined || theAmount == undefined || theDonut == "" || theAmount == "") {
		document.getElementById("orderMade").innerHTML = "";
	}
	else {
	document.getElementById("orderMade").innerHTML = "You ordered " + theAmount + " " + theDonut + " " + donuts + 
	" with " + theFilling + " filling and " + theToppings + " on top.<br />" + instructions + "<p>" 
	+ theInstructions + "</p>"; 
	}
}
