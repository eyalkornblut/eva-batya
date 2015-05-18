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
    	var filterLinks = $("a.leeds-to-link").get();
    	var filterDescription = $(".filter-description h2").get()[0];

    	for (var i = 0; i < filterLinks.length; i++) 
    	{
    		(function()
    		{
    			var link = filterLinks[i];
    			link.addEventListener("click", function()
    			{
    				filterDescription.innerHTML = $(link).attr('data-option-label');

			        var target_offset = $("#filters").offset();
			        var target_top = target_offset.top;
			        $('html,body').animate({scrollTop:target_top -13}, 900);


			        var data_option_value = $(link).attr('data-option-value');
			        console.log(data_option_value);
		            if (typeof _gaq !== 'undefined') 
		            {
		            	_gaq.push(["_trackEvent", "Links", "Clicked", data_option_value, , false]);
					}
					else
					{
			        	console.log("_gaq not exists");
			        	_gaq = [];
			        	_gaq.push(['_setAccount', 'UA-63082890-1']);
 						_gaq.push(['_trackPageview']);

  						_gaq.push(["_trackEvent", "Links", "Clicked", "Dummy", , false]);

					}


    			});
    		}())
		}
    };

	//init
	SWEET.gallery();
	SWEET.prettyphoto();
	//end init

	forceFirstFilterSelection();
	addFunctionalityToFilterSelection();


	$(window).scroll(function(e){ 
	  	$el = $('.side-menu');
	  	var current_scroll = $(this).scrollTop();
	  	var portfolio_top = $("#sectionportfolio").offset().top;
	  	var portfolio_bottom = $("#sectionteam").offset().top - 140;

	  	if (current_scroll > portfolio_top && current_scroll < portfolio_bottom && $el.css('position') != 'fixed'){ 
	    	$('.side-menu').css({'position': 'fixed'}); 
	  	}
	  	if ((current_scroll < portfolio_top || current_scroll > portfolio_bottom) && $el.css('position') == 'fixed')
	  	{
	    	$('.side-menu').css({'position': 'static'}); 
	  	} 
	});

});