function ValidateForm(){
 var validUsername = false;
 var validUserPassword = false;
 var errorMessages ="";  // All the error messages are going to stay in this variable
 /*********** VALIDATES USERNAME ******** */
 //Required field
//This syntax is using name-of-form.name-of-field.value
// You can also use document.getElementById("id-of-field").value

/*********** VALIDATES USERNAME ******** */
//required 12 characters or less
 
 if (myContact.userName.value.length > 12 
 || myContact.userName.value === null 
|| myContact.userName.value === "") {
 errorMessages += "<p>The user name must be 12 characters or less and it is required</p>"; 
}
 else 
 {
 validUsername = true;
 }
 //console.log(validUsername);  
 /*********** VALIDATES PASSWORD ********/
 if (myContact.password.value==null ||
 myContact.password.value=== "" ||
 myContact.password.value.length >15){
 errorMessages += "<p>The password must be less than 7 characters and it is required</p>";
 validUserPassword = false;
 }
 else{
 validUserPassword = true; 
 }

 document.getElementById("errorMessages").innerHTML = errorMessages;
// Make sure you return all the boolean variables that are checking each field
 return (validUsername && validUserPassword) ;

}
