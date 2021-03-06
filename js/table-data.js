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
    var COL_ORDER_PRICE     = "OrderPrice";

    var DEFAULT_IMAGE_PATH_1 = "img/section-works/templates/template-1.png";
    var DEFAULT_IMAGE_PATH_2 = "img/section-works/templates/template-2.png";

    // Members
    var filtersElement = $("#sectionportfolio #filters");
    var productsElement = $("#sectionportfolio .products");
    var ordersElement = $("#sectionorder .products");
    var ordersContainer = $("#sectionorder");

    var filterColors = ["orange", "blue", "yellow", "navi", "green"];
    var lastAddedFilterColorIndex = 0;

    var filterIconDictionary = {};
    var filterDescriptionDictionary = {};

    var lastUsedDefaultImage = "";
    var lastUsedDefaultImageItemName = "";

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
      var urlParams = queryURLParams();

      for(var itemIndex = 0; itemIndex < data.length ; ++itemIndex) 
      {
        var item = data[itemIndex];
        
        if (item[COL_AVAILABLE] == 1 && item[COL_TOP_FILTER] == 1)
        {
          addTopFilter(item);
        }
        if (item[COL_AVAILABLE] == 1 && item[COL_PRODUCT] == 1)
        {
          addProduct(item);
        }
        if (urlParams.order != "undefined" && item[urlParams.order] == 1 && item[COL_PRODUCT] == 1)
        {
          addOrderItem(item);
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
      var description = getProductBigDescription(item);
      if (description.length > 0)
      {
        filterDescriptionDictionary[item[COL_LEEDS_TO]] = description;
      }
    }

    function addProduct(item) 
    {
      productsElement.append(getProductElementByItem(item));
    }

    function addOrderItem(item) 
    {
      ordersContainer.removeClass("hidden");
      ordersElement.append(getProductElementByItem(item));
    }

    function getFilterElementByItem(item, colorIndex)
    {
      // var filterClass = filterColors[colorIndex];
      // var filterContent = item[COL_NAME];
      // if (item[COL_IMAGE_BIG].length > 0)
      // {
        // filterClass = '';
        // filterContent = "<img class='rotate' alt='' src='" + item[COL_IMAGE_BIG] + "' />";
      // }
      // return "<li class=" + filterClass + "><a href='#filter' data-option-value=" + "." + item[COL_LEEDS_TO] + ">" + filterContent + "</a></li>";
      
      return "<li class=" + filterColors[colorIndex] + "><a class='leeds-to-link' href='#filter' data-option-value=" + "." + item[COL_LEEDS_TO] + " data-option-label='" + getProductBigDescription(item) + "'>" + item[COL_NAME] + "</a></li>";
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
        "    <a class='leeds-to-link' data-option-value='." + item[COL_LEEDS_TO] + "' data-option-label='" + getProductBigDescription(item) + "'>" +
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
        // " <div class='product-links contanchors'>";

        var index;
        for (index = 0; index < productCategories.length; ++index) 
        {
          var category = productCategories[index];
          if (!(category in filterIconDictionary)) continue;

          var categoryDescription = '';
          if (category in filterDescriptionDictionary)
          {
            categoryDescription = filterDescriptionDictionary[category];
          }

          product += 
          "     <a class='leeds-to-link' href='#' data-option-value='." + category + "' data-option-label='" + categoryDescription + "'><img class='rotate' alt='' src='" + filterIconDictionary[category] + "' /></a>";
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

      // console.log("1 - " + lastUsedDefaultImage);

      // if (lastUsedDefaultImage == DEFAULT_IMAGE_PATH_1) lastUsedDefaultImage = DEFAULT_IMAGE_PATH_2;
      // else lastUsedDefaultImage = DEFAULT_IMAGE_PATH_1;

      if (lastUsedDefaultImageItemName != item[COL_NAME])
      {
        lastUsedDefaultImage = (lastUsedDefaultImage == DEFAULT_IMAGE_PATH_1 ? DEFAULT_IMAGE_PATH_2 : DEFAULT_IMAGE_PATH_1);  
      }
      lastUsedDefaultImageItemName = item[COL_NAME];
      

      // console.log("2 - " + lastUsedDefaultImage);

      return lastUsedDefaultImage;
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
      var $categoryLink = $('.products a.leeds-to-link');
      $categoryLink.click(function()
      {
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

    function queryURLParams()
    {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
          query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
          query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
      } 
        return query_string;
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
