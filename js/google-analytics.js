// $(document).ready(function() {

//   $("a.leeds-to-link").each(function() {
//     var text = $(this).text();
//     $(this).click(function(event) { // when someone clicks these links
//       _gaq.push(["_trackEvent", "Links", "Clicked", "", , false]); // create a custom event
//     });
//   });

// });

jQuery(function($){


  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-63082890-1', 'auto');
  ga('send', 'pageview');



  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-63082890-1']);
  _gaq.push(['_trackPageview']);

  _gaq.push(["_trackEvent", "Links", "Clicked", "Dummy", , false]);


  

});




// Add events http://www.lunametrics.com/blog/2013/07/02/jquery-event-tracking-generator-google-analytics/
