/************************************************
	DOM & Event helpers
************************************************/

var preventEvents	= false;

function addEvent(element,evt,fn) {
	if (element.addEventListener)
		element.addEventListener(evt,fn,true);
	else if (element.attachEvent)
		element.attachEvent('on'+evt,fn);
}

function removeEvent(element,evt,fn) {
	if (element.removeEventListener)
		element.removeEventListener(evt,fn,true);
	else if (element.detachEvent)
		element.detachEvent('on'+evt,fn);
}

function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function $( element ) {
	if (typeof element == 'string')
		element = document.getElementById(element);
	return element;
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return [curleft,curtop];
	}
}


/************************************************
	XMLHTTPRequest
************************************************/

function httpGET( path ) {
	var request		= location.protocol + "//" + location.host + path;
	console.log(request);
	var xmlhttp 	= new XMLHttpRequest();
	xmlhttp.open('GET', request, false);
	xmlhttp.send( null );
	return xmlhttp.responseText; 
}


/************************************************
	Math Utilities
************************************************/
function clamp(v, min, max) {
	return Math.min( Math.max( v, min ), max);
}

