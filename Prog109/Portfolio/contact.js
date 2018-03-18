function validateEmail() {
    var x = document.getElementById("email").value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        //alert("Not a valid e-mail address");
        return false;
    }
	else{
		return true;
	}		
}

function ValidateForm(){
var validName = false;
var validMessage = false;
var validEmail = validateEmail();

var nameErrorMessage = "";// name error message to be filled if mistakes made
var emailErrorMessage = "";// email error message to be filled if mistakes made 
var messageErrorMessage = ""// message error message to be filled if mistakes made 

//validates name 20 char or less. must be alphabetical
if (myContact.name.value==null 
	|| myContact.name.value=== "" 
	|| myContact.name.value.length >20){
	nameErrorMessage += "<p>The name must be less than 20 characters and is required.</p>";
	}
else{
	validName = true; 
	}

//validates message field
if (myContact.message.value==null 
	|| myContact.message.value=== "" 
	|| myContact.message.value==="Your message..."){
	messageErrorMessage += "<p>A message needs to be entered</p>";
	}
else{
	validMessage = true; 
	}

//this is for if the email is not valid
if (!validEmail){
	emailErrorMessage = "<p>A valid email address needs to be entered</p>";
	}
	
//error message and return here
document.getElementById("nameError").innerHTML = nameErrorMessage;
document.getElementById("emailError").innerHTML = emailErrorMessage;
document.getElementById("messageError").innerHTML = messageErrorMessage;
// Make sure you return all the boolean variables that are checking each field
 return (validName && validEmail && validMessage) ;
}