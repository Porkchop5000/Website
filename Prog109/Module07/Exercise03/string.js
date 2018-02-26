function results(form) {
	var textEntered = form.textInput.value;
	var upperLower = document.getElementsByName('upperOrLower');
	if ( upperLower[0].checked) {
		
		textEntered = textEntered.toUpperCase();
	}
	else {
		textEntered = textEntered.toLowerCase();
	}
	var textLength = textEntered.length;
	alert ('You typed: ' + textEntered +'. It is ' + textLength + ' characters long.');
}