function validateEmail() {
    var x = document.getElementById("email").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("Not a valid e-mail address");
        return false;
    }
	else{
		return true;
	}		
}

function ValidateForm(){
var validUsername = false;
var validPassword = false;
var validFirstName = false;
var validLastName = false;
var validPhone = false;
var validAddress = false;
var validCity = false;
var validCountry = false;
var validZipCode = false;
var validEmail = validateEmail();


var errorMessages = "";//error message to be filled if mistakes made

//validates first name 20 char or less. must be alphabetical
if (myContact.firstname.value==null 
	|| myContact.firstname.value=== "" 
	|| myContact.firstname.value.length >20){
	errorMessages += "<p>The first name must be less than 20 characters and is required.</p>";
	}
else{
	validFirstName = true; 
	}
//validate last name 50 char or less. must be alphabetical
if (myContact.lastname.value==null 
	|| myContact.lastname.value=== "" 
	|| myContact.lastname.value.length >50){
	errorMessages += "<p>The last name must be less than 50 characters and is required.</p>";
	}
else{
	validLastName = true; 
	}
	

//Validate User Name - 12 char or less
if (myContact.username.value.length > 12 
	|| myContact.username.value===null 
	|| myContact.username.value===""){
	errorMessages += "<p>The user name must be less than 12 characters and is required.</p>";
	}
else {
	validUsername =true;
	}

//validates password - 7 char or less 
if (myContact.password.value==null 
	|| myContact.password.value=== "" 
	|| myContact.password.value.length >7){
	errorMessages += "<p>The password must be less than 7 characters and is required.</p>";
	}
else{
	validPassword = true; 
	}

//validates phone number - max 15 digits, must be a number
if (myContact.phone.value==null 
	|| myContact.phone.value=== "" 
	|| myContact.phone.value.length >14
	|| isNaN(myContact.phone.value)){
	errorMessages += "<p>The phone number must be less than 14 characters, must be a number, and is required.</p>";
	}
else{
	validPhone = true; 
	}

//validates address - must have something in it
if (myContact.address.value==null 
	|| myContact.address.value=== ""){
	errorMessages += "<p>A street address is required.</p>";
	}
else{
	validAddress = true; 
	}

//validates city - must have something in it
if (myContact.city.value==null 
	|| myContact.city.value=== ""){
	errorMessages += "<p>A city is required.</p>";
	}
else{
	validCity = true; 
	}

//validates country - must be Canada, Mexico, or the United States
if (myContact.countries.value=== "Select one..."
	|| myContact.countries.value == null
	|| myContact.countries.value === ""){
		errorMessages += "<p>A country is required</p>";
	}
else{
	validCountry = true;
}

//validates zip code - required if US and must be 5 characters
if (myContact.countries.value==="United States"){
	if (myContact.zipcode.value.length !=5
	|| isNaN(myContact.zipcode.value)){
		errorMessages += "<p>Zip code for the United States must have 5 characters, must be a number, and is required</p>";
	}
	else{
		validZipCode = true;
	}
}
else{
	validZipCode = true;
}
//error message and return here
document.getElementById("errorMessages").innerHTML = errorMessages;
// Make sure you return all the boolean variables that are checking each field
 return (validUsername && validPassword && validFirstName  && validLastName 
	&& validEmail && validPhone && validAddress && validCity && validCountry
	&& validZipCode) ;
}

