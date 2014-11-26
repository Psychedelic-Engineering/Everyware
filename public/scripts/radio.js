
function RadioGroup( parentElement, handler ) {

	self			= this;
	this.selected	= null;
	this.handler	= handler;
	
	this.selectItem	= function( e ) {
		var evt 	= e || window.event;
		var target	= evt.target;
		
		for( var child in self.children ) {
			var current	= self.children[child];
			if ( current == target ) {
				addClass( current, "selected" );
				self.selected	= current;
			} else {
				removeClass( current, "selected" );
			}
		}
		self.handler( self.selected.id );
	}
	
	
	this.parent	= $(parentElement);
	this.children	= new Array();
	
	for( var child in this.parent.childNodes ) {
		var child	= this.parent.childNodes[child];
		if ( child.nodeName == "A" ) {
			this.children.push( child );
			addEvent( child, 'click', self.selectItem );
		}
	}
	
}

/*
	$(document).ready(function(){
		$('.radiogroup .radio').click( radioHandler );
	});
*/
	
	function radioHandler( event ) {
		$(this).parent().children().removeClass("selected");
		$(this).addClass( "selected" );
		console.log( this.id );
	}