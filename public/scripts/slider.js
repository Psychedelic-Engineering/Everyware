
/************************************************
	Drag&Drop Behavior
	dragDrop.initElement('element');
	ToDo:
	Actions as Parameter
	Move / rotate as Parameter
************************************************/

function Slider( knob, onChange, minValue, maxValue ) {

	var knob	= $(knob);
	var slider	= knob.parentNode;
	var self	= this;
	this.value	= 0;
	this.onDrag		= undefined;
	this.onRelease	= undefined;
	this.onChange	= onChange;
	this.min = minValue;
	this.max = maxValue;
	this.rng = this.max - this.min;

	console.log(this.rng);
	
	var knobX	= undefined;
	var msX		= undefined;
	
	this.clickKnob	= function (e) {
		slider.onmousedown	= null;
		var evt 	= e || window.event;
		if (evt.changedTouches) {
			evt		= evt.changedTouches[0];
		}
		knobX 		= knob.offsetLeft;
		msX 		= evt.clientX;
		addEvent(document, 'mousemove',	self.dragKnob);
		addEvent(document, 'mouseup',	self.releaseKnob);
		addEvent(document, 'touchmove',	self.dragKnob);
		addEvent(document, 'touchend',	self.releaseKnob);
		preventEvents	= true;
		return false;
	}
	
	this.dragKnob	= function (e) {
		var evt 	= e || window.event;
		if (evt.changedTouches) {
			evt		= evt.changedTouches[0];
		}
		var left 	= knobX + evt.clientX - msX;
		var px		= slider.offsetLeft;
		var pw		= slider.offsetWidth;
		var dw		= knob.offsetWidth;
		left		= clamp( left, px, px+pw-dw);
		newValue 	= (left - px) / (pw-dw);
		self.value	= self.min + (newValue * self.rng);
		knob.style.left 	= left + 'px';
		if ( self.onChange ) {
			self.onChange( self.value );
		}
		evt.preventDefault();
		return false;
	}
	
	this.releaseKnob	= function() {
		removeEvent(document,'mousemove', 	self.dragKnob);
		removeEvent(document,'mouseup',		self.releaseKnob);
		removeEvent(document, 'touchmove',	self.dragKnob);
		removeEvent(document, 'touchend',	self.releaseKnob);
		slider.onmousedown	= self.clickSlider;
		preventEvents	= false;
	}
	
	this.setValue	= function( v ) {
		self.value		= v;
		var vNorm		= (v - self.min) / self.rng;
		var knobX		= slider.offsetLeft + (vNorm * (slider.offsetWidth- knob.offsetWidth) );
		knob.style.left = knobX + 'px';
	}
	
	this.clickSlider	= function(e) {
		var evt 	= e || window.event;
		if (evt.changedTouches) {
			evt		= evt.changedTouches[0];
		}
		newValue = (evt.clientX - slider.offsetLeft) / slider.offsetWidth;
		self.setValue( self.min + (newValue * self.rng) );
		self.clickKnob( evt );
		if ( self.onChange ) {
			self.onChange( self.value );
		}
	}

	if ('ontouchstart' in window)
	{
		knob.ontouchstart	= this.clickKnob;
		slider.ontouchstart	= this.clickSlider;
	} else {
		knob.onmousedown 	= this.clickKnob;
		slider.onmousedown	= this.clickSlider;
	}
	
}