var elements = document.getElementsByClassName('hot'); // Find hot items

if (elements.length > 2) {                            // If 3 or more are found

  var el = elements[2];              // Select the third one from the NodeList
  el.className = 'cool';             // Change the value of its class attribute

}

var listElements = document.getElementsByTagName('li');
var listClassText = document.getElementById('classList');
var i;
for (i = 0; i < listElements.length; i++) {
	listClassText.innerHTML += 'Item ' + (i + 1) + ': ' + listElements[i].className + '<br />';
	}
