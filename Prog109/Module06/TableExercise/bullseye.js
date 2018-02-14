var table = prompt("Enter a number 0-10");// Unit of table
var operator = prompt("Enter addition or multiplication"); // Type of calculation
msg = generateTable(table,operator);//this calls the function
function generateTable(base, operator) {
var i = 1;                 // Set counter to 1
var msg = '';              // Message
if (operator === 'addition') {
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
return msg
}

// Write the message into the page
var el = document.getElementById('blackboard');
el.innerHTML = msg;