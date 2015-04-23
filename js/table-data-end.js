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

    function addFunctionalityToFilterSelection() 
    {
    	// $("#filters li a").get().each(function() {alert("fdfdfd")});

    	// var filterLinks = $("#filters li a").get();
    	var filterLinks = $("a.leeds-to-link").get();
    	// console.log(filterLinks);
    	// for (var filterLink in filterLinks)
    	// {
    	// 	filterLink.addEventListener("click", function(){alert("sssss");});
    	// }

    	for (var i = 0; i < filterLinks.length; i++) 
    	{
    		(function()
    		{
    			var link = filterLinks[i];
    			link.addEventListener("click", function(){console.log(link)});
    			// console.log(filterLinks[i]);
    		}())
		}
    	// console.log(filterLinks);
    };

    function aaa()
    {
    	console.log("aaaaaaaa");
    }

	//init
	SWEET.gallery();
	SWEET.prettyphoto();
	//end init

	forceFirstFilterSelection();
	addFunctionalityToFilterSelection();

});