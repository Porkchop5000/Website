//Chang colors
function changeColors(coolColor, hotColor){
	var coolEls = document.getElementsByClassName('cool');
	var i;
	for (i=0; i < coolEls.length; i++)   {
		coolEls[i].style.backgroundColor = coolColor;
	}
		var hotEls = document.getElementsByClassName('hot');
	var i;
	for (i=0; i < coolEls.length; i++)   {
		coolEls[i].style.backgroundColor = hotColor;
	}
}