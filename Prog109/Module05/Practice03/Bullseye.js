var table = Number(prompt("Pick a number 1-10"));             // Unit of table
var operator = prompt("+ or *"); // Type of calculation
var i = 1;                 // Set counter to 1
var msg = '';              // Message

if (operator === '+') {
  // Do addition
  while (i < 11) {
    msg += i + ' + ' + table + ' = ' + (i + table) + '<br />';
    i++;
  }
} else {
  // Do multiplication
  while (i < 11) {
    msg += i + ' x ' + table + ' = ' + (i * table) + '<br />';
    i++;
  }
}

// Write the message into the page
var el = document.getElementById('blackboard');
el.innerHTML = msg;