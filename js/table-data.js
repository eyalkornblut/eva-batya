jQuery(function($){

  (function() { init() })();

    // Table Consts
    var COL_NAME            = "Name";
    var COL_DESCRIPTION     = "Description";
    var COL_DESCRIPTION_BIG = "BigDescription";
    var COL_IMAGE           = "Image";
    var COL_IMAGE_BIG       = "BigImage";
    var COL_AVAILABLE       = "Available";
    var COL_TOP_FILTER      = "TopFilter";
    var COL_PRODUCT         = "Product";
    var COL_LEEDS_TO        = "LeedsTo";

    var DEFAULT_IMAGE_PATH = "img/section-works/template.jpg";

    // Members
    var filtersElement = $("#sectionportfolio #filters");
    var productsElement = $("#sectionportfolio .products");

    var filterColors = ["orange", "blue", "yellow", "navi", "green"];
    var lastAddedFilterColorIndex = 0;

    var filterIconDictionary = {};

    // Functions
    function init() 
    {
      updatePrototypes();

      Tabletop.init( { key: "https://docs.google.com/spreadsheets/d/1X-P7NTM5xAH5fj5W7iiiIByVpbTpPjPKwIYUl2IcZZQ/pubhtml",
                       callback: showInfo,
                       simpleSheet: true } );
    };

    function updatePrototypes()
    {
      if (typeof String.prototype.startsWith != 'function') 
      {
        String.prototype.startsWith = function (str)
        {
          return this.indexOf(str) == 0;
        };
      }      
    }

    function showInfo(data, tabletop) 
    {
      for(var itemIndex = 0; itemIndex < data.length ; ++itemIndex) 
      {
        var item = data[itemIndex];
        if (item[COL_AVAILABLE] != 1) continue;
        if (item[COL_TOP_FILTER] == 1)
        {
          addTopFilter(item);
        }
        if (item[COL_PRODUCT] == 1)
        {
          addProduct(item);
        }
      }

      refreashIsotope();
      enableCategoryAsProduct(); 
    };

    function addTopFilter(item) 
    {
      filtersElement.append(getFilterElementByItem(item, lastAddedFilterColorIndex));
      lastAddedFilterColorIndex++;
      if (lastAddedFilterColorIndex == filterColors.length) lastAddedFilterColorIndex = 0;

      if (item[COL_IMAGE_BIG].length > 0)
      {
        filterIconDictionary[item[COL_LEEDS_TO]] = item[COL_IMAGE_BIG];
      }
    }

    function addProduct(item) 
    {
      productsElement.append(getProductElementByItem(item));
    }

    function getFilterElementByItem(item, colorIndex)
    {
      return "<li class=" + filterColors[colorIndex] + "><a href='#filter' data-option-value=" + "." + item[COL_LEEDS_TO] + ">" + item[COL_NAME] + "</a></li>";
    }

    function getProductElementByItem(item)
    {
      var productCategories = getProductCategories(item);

      var product = 
      "<div class='element " + productCategories.join(' ') + "' data-category='blue'>" + 
      " <div class='element-internal'>";

      var isCategory = (item[COL_LEEDS_TO].length > 0);

      if (isCategory)
      {
        product += 
        "    <a class='leeds-to-link' data-option-value='." + item[COL_LEEDS_TO] + "'>" +
        "        <img alt='' class='imgwork' src='" + getProductImagePath(item) + "' />" +
        "    </a>";                  
      }
      else
      {
        product += 
        "   <a data-rel='prettyPhoto[]' href='" + getProductBigImagePath(item) + "' title='" + getProductBigDescription(item) + "'>" + 
        "        <img alt='" + item[COL_NAME] + "' class='imgwork' src='" + getProductImagePath(item) + "' />" + 
        "   </a>";                  
      }

      product += 
      "    <div class='worksarrow'>" +
      "        <img alt='' src='img/section-works/arrow.png' />" +
      "    </div>" +
      "    <h2>" + item[COL_NAME] + "</h2>" +
      "    <p>" + item[COL_DESCRIPTION] + "</p>";      

      if (isCategory)
      {
        product += 
        "    <div class='worksbottom'></div>" + 
        " </div>" + 
        "</div>";
      }
      else
      {
        product += 
        " </div>" + 
        " <div class='product-links'>";

        var index;
        for (index = 0; index < productCategories.length; ++index) 
        {
          var category = productCategories[index];
          if (!(category in filterIconDictionary)) continue;

          product += 
          "     <a href='#'><img class='rotate' alt='' src='" + filterIconDictionary[category] + "' /></a>";
        }

        product += 
        " </div>" + 
        "</div>";
      }

      return product;
    }

    function getProductCategories(item)
    {
      var categories = [];
      for (var key in item)
      {
        if (!key.startsWith("cat_")) continue; 
        if (item[key] != 1) continue;

        categories.push(key);
      }
      return categories;
    }

    function getProductImagePath(item)
    {
      if (item[COL_IMAGE].length > 0) return item[COL_IMAGE];
      return DEFAULT_IMAGE_PATH;
    }

    function getProductBigImagePath(item)
    {
      if (item[COL_IMAGE_BIG].length > 0) return item[COL_IMAGE_BIG];
      return getProductImagePath(item);
    }

    function getProductBigDescription(item)
    {
      if (item[COL_DESCRIPTION_BIG].length > 0) return item[COL_DESCRIPTION_BIG];
      return item[COL_DESCRIPTION];
    }

    function enableCategoryAsProduct() 
    {
      var $categoryLink = $('a.leeds-to-link');
      $categoryLink.click(function(){
        var value = $(this).attr('data-option-value')
        $("a[data-option-value='" + value + "']").first().click();
      });
    };

    function refreashIsotope()
    {
      // $.getScript("js/run-isotop.js", function(){
      //    alert("Script loaded and executed.");
      //    // Use anything defined in the loaded script...
      // });

      loadScript("js/table-data-end.js", loadScriptCallback);
    }

    function loadScript(url, callback)
    {
      // Adding the script tag to the body
      var body = document.getElementsByTagName('body')[0];
      var script = document.createElement('script');
      // script.type = 'text/javascript';
      script.src = url;

      // Then bind the event to the callback function.
      // There are several events for cross browser compatibility.
      script.onreadystatechange = callback;
      script.onload = callback;

      // Fire the loading
      body.appendChild(script);
    }

    var loadScriptCallback = function() {};
});
