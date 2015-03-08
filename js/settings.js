jQuery(function($){

var SWEET = window.SWEET || {};


//Slider
SWEET.slider = function(){

var tpj=jQuery;
tpj.noConflict();

tpj(document).ready(function() {

if (tpj.fn.cssOriginal!=undefined)
	tpj.fn.css = tpj.fn.cssOriginal;

	tpj('.fullwidthbanner').revolution(
		{
			delay:9000,
			startwidth:960,
			startheight:500,

			onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

			thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight:50,
			thumbAmount:3,

			hideThumbs:0,
			navigationType:"none",				// bullet, thumb, none
			navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

			navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


			navigationHAlign:"left",				// Vertical Align top,center,bottom
			navigationVAlign:"bottom",					// Horizontal Align left,center,right
			navigationHOffset:30,
			navigationVOffset:30,

			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:0,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:0,

			touchenabled:"on",						// Enable Swipe Function : on/off


			stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

			hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
			hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
			hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value


			fullWidth:"on",

			shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

		});

	});
}
//End Slider





// //isotope
// SWEET.gallery = function(){

//   var $container = $('#containerisotope');

//   $container.isotope({
// 	itemSelector : '.element'
//   });
  
  
//   var $optionSets = $('#options .option-set'),
// 	  $optionLinks = $optionSets.find('a');

//   $optionLinks.click(function(){
// 	var $this = $(this);
// 	// don't proceed if already selected
// 	if ( $this.hasClass('selected') ) {
// 	  return false;
// 	}
// 	// var $optionSet = $this.parents('.option-set');
// 	var $optionSet = $('.option-set');
// 	$optionSet.find('.selected').removeClass('selected');
// 	$this.addClass('selected');

// 	// make option object dynamically, i.e. { filter: '.my-filter-class' }
// 	var options = {},
// 		key = $optionSet.attr('data-option-key'),
// 		value = $this.attr('data-option-value');
// 	// parse 'false' as false boolean
// 	value = value === 'false' ? false : value;
// 	options[ key ] = value;
// 	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
// 	  // changes in layout modes need extra logic
// 	  changeLayoutMode( $this, options )
// 	} else {
// 	  // otherwise, apply new options
// 	  $container.isotope( options );
// 	}
	
// 	return false;
//   });
  
// }
// //end isotope



// //map
// SWEET.map = function(){
	

// var map;
// var brooklyn = new google.maps.LatLng(40.759277, -73.977064);

// var MY_MAPTYPE_ID = 'custom_style';

// function initialize() {

//   var featureOpts = [
//   {
//     'featureType': 'landscape.man_made',
//     'stylers': [
//       { 'color': '#92bab4' }
//     ]
//   },{
//     'featureType': 'road.arterial',
//     'elementType': 'geometry.stroke',
//     'stylers': [
//       { 'color': '#6a6a6a' }
//     ]
//   },{
//     'featureType': 'road.arterial',
//     'stylers': [
//       { 'color': '#a2c2c3' }
//     ]
//   },{
//     'featureType': 'road.arterial',
//     'elementType': 'labels.text.fill',
//     'stylers': [
//       { 'color': '#ffffff' }
//     ]
//   },{
//     'featureType': 'road.arterial',
//     'elementType': 'labels.icon',
//     'stylers': [
//       { 'color': '#ffffff' }
//     ]
//   },{
//     'featureType': 'road.arterial',
//     'elementType': 'geometry.stroke',
//     'stylers': [
//       { 'color': '#83aaa7' }
//     ]
//   },{
//     'featureType': 'road.local',
//     'elementType': 'geometry.stroke',
//     'stylers': [
//       { 'color': '#82ada7' }
//     ]
//   }
// ];

//   var mapOptions = {
//     zoom: 17,
//     center: brooklyn,
// 	disableDefaultUI: true,
// 	scrollwheel: false,
//     mapTypeControlOptions: {
//       mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
//     },
//     mapTypeId: MY_MAPTYPE_ID
//   };

//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   var styledMapOptions = {
//     name: 'Custom Style'
//   };

//   var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

//   map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
// }

// google.maps.event.addDomListener(window, 'load', initialize);
	
	
	
	
// }
// //end map



//Scroll navigation
SWEET.menu = function(){
$("#navigationmenu a, .contanchors a, .backtotop").click(function(event){

	event.preventDefault();
	var full_url = this.href;
	var parts = full_url.split("#");
	var trgt = parts[1];
	var target_offset = $("#"+trgt).offset();
	var target_top = target_offset.top;

	$('html,body').animate({scrollTop:target_top -13}, 900);
	
});
}
//End Scroll navigation






// //Pretty Photo
// SWEET.prettyphoto = function(){
// 	$(document).ready(function(){
// 		$("a[data-rel^='prettyPhoto']").prettyPhoto({
					
// 			animation_speed:'fast',
// 			slideshow:10000, 
// 			hideflash: true,
// 			autoplay_slideshow: false,
// 			social_tools:false
			
// 		});
// 	});
// }
// //end Pretty Photo



//Marker Map Effect
SWEET.markereffect = function(){

	$("#littlemarker").click(function() {
		
			$("#bigmarker").removeClass("showbigmarker");
        	$("#bigmarker").addClass("hidebigmarker");
			$("#littlemarker").css('display','none');
			$("#littlemarkerclose").css('display','block');
	});
	
	$("#littlemarkerclose").click(function() {
		
			$("#bigmarker").removeClass("hidebigmarker");
        	$("#bigmarker").addClass("showbigmarker");
			$("#littlemarkerclose").css('display','none');
			$("#littlemarker").css('display','block');
	});
		
}
//end Marker Map Effect


//init
SWEET.slider();
// SWEET.gallery();
// SWEET.map();
SWEET.menu();
// SWEET.prettyphoto();
SWEET.markereffect();
//end init

});