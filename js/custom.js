jQuery(function($){

// Helper Methods - Start
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function actuateLink(link)
{
   var allowDefaultAction = true;
      
   if (link.click)
   {
      link.click();
      return;
   }
   else if (document.createEvent)
   {
      var e = document.createEvent('MouseEvents');
      e.initEvent(
         'click'     // event type
         ,true      // can bubble?
         ,true      // cancelable?
      );
      allowDefaultAction = link.dispatchEvent(e);           
   }
         
   if (allowDefaultAction)       
   {
      var f = document.createElement('form');
      f.action = link.href;
      document.body.appendChild(f);
      f.submit();
   }
}

function clickLink(link)
{
  var target = link.attr("target");

  if($.trim(target).length > 0)
  {
    window.open(link.attr("href"), target);
  }
  else
  {
     window.location = link.attr("href");
  }
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}
// Helper Methods - End

});
