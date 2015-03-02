jQuery(function($){

	var SWEET = window.SWEET || {};

	//isotope
	SWEET.gallery = function(){

		// modify Isotope's absolute position method
		$.Isotope.prototype._positionAbs = function( x, y ) {
		  return { right: x, top: y };
		};

	  	var $container = $('#containerisotope');

		$container.isotope({
			itemSelector : '.element',
			transformsEnabled: false
		});
	  
	  
	    var $optionSets = $('#options .option-set'),
		    $optionLinks = $optionSets.find('a');

	    $optionLinks.click(function(){
		    var $this = $(this);
		    // don't proceed if already selected
		    if ( $this.hasClass('selected') ) {
		    return false;
		}
		// var $optionSet = $this.parents('.option-set');
		var $optionSet = $('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		var options = {},
			key = $optionSet.attr('data-option-key'),
			value = $this.attr('data-option-value');
		// parse 'false' as false boolean
		value = value === 'false' ? false : value;
		options[ key ] = value;
		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
		  // changes in layout modes need extra logic
		  changeLayoutMode( $this, options )
		} else {
		  // otherwise, apply new options
		  $container.isotope( options );
		}
		
		return false;
	  });
	  
	}
	//end isotope


	//Pretty Photo
	SWEET.prettyphoto = function(){
		$(document).ready(function(){
			$("a[data-rel^='prettyPhoto']").prettyPhoto({
						
				animation_speed:'fast',
				slideshow:10000, 
				hideflash: true,
				autoplay_slideshow: false,
				social_tools:false
				
			});
		});
	}
	//end Pretty Photo


    function forceFirstFilterSelection() 
    {
      $("#filters li a").last().click();
      $("#filters li a").first().click();
    };

	//init
	SWEET.gallery();
	SWEET.prettyphoto();
	//end init

	forceFirstFilterSelection();

});