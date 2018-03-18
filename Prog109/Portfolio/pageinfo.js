//page information for the footer//
var today = new Date();
var pageInfoMsg = '<p><b>Title: </b>' + document.title + '<br />';
pageInfoMsg += '<b>Last Modified: </b>' + document.lastModified + '<br />';
pageInfoMsg += '<b>Current Date & Time: </b>' + today + '<br />';
pageInfoMsg += '<b>URL: </b>' + document.URL + '<br />';
pageInfoMsg += '<b>Domain: </b>' + document.domain + '</p>';
//here we get the div id from the footer to put in the code//
var pageInfoFooter = document.getElementById('pageInfo');
pageInfoFooter.innerHTML = (pageInfoMsg);
