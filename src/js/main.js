console.log("main.js inside");
/************* add WOW *************/
wow = new WOW({
    boxClass:     'wow',
    animateClass: 'animated',
    offset:       0,
    mobile:       true,
    live:         true
  }
)
wow.init();

jQuery('.carousel').carousel({
  interval: 5000000,
  ride: false
});


/*********************************/
/****   block JSON - start *******/
/*********************************/

$.getJSON( "../json/data.json", function( data ) {
  /*********** get data from JSON to topMenu ************/
  $.topmenu = data.topmenu;
  $.topmenuItems = "";
  $.each( $.topmenu, function(key) {
    $.topmenuItems = $.topmenuItems + "<li><a href='"+$.topmenu[key]["href"]+"' class='btn btn-warning btn-sm'>"+$.topmenu[key]["text"]+"</a></li>";
  });
  $('#top-menu-ul').append( $.topmenuItems);


function addClassActive(){
    var lastId,
    topMenu = $("#top-menu-ul"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop()+topMenuHeight;
    
    // Get id of current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
  
    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#"+id+"']").parent().addClass("active");
    }                   
  });
}  
addClassActive();

    /**************mobile menu start *******************/
  $(".menu-toggle, .isMobile").click(function() {
    $(".mobilePart").toggle();
    $(".mobilePart").toggleClass("isMobile");
  });

  
  $(window).scroll(function()
  { 
    var width = screen.width;
    if (width<769){
      $(".mobilePart").hide();
      $('.mobilePart').removeClass('isMobile');
    }

  });

 // if($("#home").hasClass("sticky"))
 // $(".mobilePart").hide;
    
    
    /**************mobile menu end *******************/

    /*********** get data from JSON to sale ************/
    $.sale = data.sale;
    $.saleItems = "";
    $.countItemSale = 0;
    $.flagActiveSale = "";
    $.each( $.sale, function(key) {
      $.countItemSale>0 ? $.flagActiveSale="" : $.flagActiveSale=" active";
      
      $.saleItems = $.saleItems + 
        "<div class='carousel-item"+$.flagActiveSale+"'>"+
          "<div class='wrapperSaleCarousel'><p><strong>"+$.sale[key]["text1"]+"</strong></p>"+
          "<p>"+$.sale[key]["text2"]+"</p></div>"+
        "</div>";
      
        $.countItemSale++;
    });
    $('#carouselSale').append( $.saleItems);

  /*********** get data from JSON to variants-ceiling ************/
  $.variantsCeiling = data.variantsCeiling;
  $.variantsCeilingItems = "";
  var imgPath = "../img/pictograms/";
  $.each( $.variantsCeiling, function(key) {
    $.variantsCeilingItems = $.variantsCeilingItems +

    "<div class='col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 variants-info'>"+
      "<div class='container-fluid'>"+
        "<div class='row'>"+
          "<div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'><img src='"+imgPath+$.variantsCeiling[key]["img"]+".png' /></div>"+
          "<div class='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>"+
            "<h2>"+$.variantsCeiling[key]["h2"]+"</h2>"+
            "<p>"+$.variantsCeiling[key]["p"]+"</p>"+
          "</div>"+
        "</div>"+
      "</div>"+
    "</div>"
  });
  $('#pictogramsResult').append( $.variantsCeilingItems);

  $.cardCeiling = data.cardCeiling;
  $.cardItems = "";
  var imgPath2 = "../img/variants/";
  $.each( $.cardCeiling, function(key) {
    $.cardItems = $.cardItems +

    "<div class='col-md-4 col-lg-4 col-sm-6 col-xs-12'>"+
      "<div class='card-item wow slideInUp' data-wow-delay='1s'>"+
        "<div class='card-item-name'><h4>"+$.cardCeiling[key]["h4"]+"</h4></div>"+
        "<div class='card-item-img'>"+
          "<div class='triangle'></div>"+
          "<img src='"+imgPath2+$.cardCeiling[key]["img"]+".jpg' />"+
        "</div>"+
        "<div class='card-item-details'>"+$.cardCeiling[key]["text"]+
          "<div>Стоимость:</div>"+
        "</div>"+
        "<div class='card-item-button'><button type='button' class='btn btn-warning btn-sm'>Заказать рассчет</button></div>"+
      "</div>"+
    "</div>";
  });

  $.cardItems += "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'><p>* Цена за кв.м снижается с увеличением площади помещения.</p></div>";
  $('#cardItems').append( $.cardItems);

  /*********** get data from JSON to advantages-ceiling ************/
  $.advantagesСeiling = data.ceilingAdvantages;
  $.сeilingItems = "";
  $.each( $.advantagesСeiling, function(key) {
    $.сeilingItems = $.сeilingItems +

    "<div class='col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 e1'>"+
      "<h5>"+$.advantagesСeiling[key]["title"]+"</h5>"+
      "<p>"+$.advantagesСeiling[key]["description"]+"</p>"+
    "</div>";
  });
  $('#ceiling-advantages').append( $.сeilingItems);


  /*********** get data from JSON to advantages-company ************/
  $.companyСeiling = data.companyAdvantages;
  $.companyItems = "";
  $.addClass="";
  $.each( $.companyСeiling, function(key) {
    $.companyСeiling[key]["addClass"] != false ? $.addClass = "<div class='"+$.companyСeiling[key]["addClass"]+"'></div>" : $.addClass="";

    $.companyItems = $.companyItems +
    "<div class='"+$.companyСeiling[key]["class"]+"'>"+
      "<h5>"+$.companyСeiling[key]["title"]+"</h5>"+
      "<p>"+$.companyСeiling[key]["description"]+"</p>"+
      $.addClass+"</div>";
  });
  $('#company-advantages').append( $.companyItems);

  /*********** get data from JSON to review (clientsReview) ************/
  $.clientsReview = data.clientsReview;
  $.clientsReviewItems = "";
  $.imgPathReview = "../img/review/";
  $.countItem = 0;
  $.flagActive="";
  $.wrapperDivStart = "";
  $.wrapperDivEnd = "";
  $.modalSectionReview = "";

  $.each( $.clientsReview, function(key) {
    $.countItem>0 ? $.flagActive="" : $.flagActive=" active";
    
    var flagEndDiv = key%2;
    if (flagEndDiv !== 0){
      $.wrapperDivStart = "";
      $.wrapperDivEnd = "</div>";
    }else{
      $.wrapperDivStart = "<div class='carousel-item "+$.flagActive+"'>";
      $.wrapperDivEnd = "";
    } 
    

    $.clientsReviewItems = $.clientsReviewItems + 
    $.wrapperDivStart+
        "<div class='carousel-item-2 a"+key%2+"'>"+
          "<div class='card-item'>"+
            "<div class='card-item-name'>"+
              "<h4><strong>"+$.clientsReview[key]["name"]+"</strong>, "+$.clientsReview[key]["address"]+"</h4>"+
            "</div>"+
            "<div class='card-item-img'>"+
              "<div class='triangle'></div>"+
              "<img src="+$.imgPathReview+$.clientsReview[key]["img"]+" />"+
            "</div>"+
            "<div class='card-item-details'>"+
              "<div>"+$.clientsReview[key]["description"]+"</div>"+
            "</div>"+
            "<div class='card-item-button'>"+
              "<a href='' data-toggle='modal' data-target='#text"+key+"'>Подробнее</a>"+
            "</div>"+
          "</div>"+
        "</div>"+
        $.wrapperDivEnd;
      $.countItem++;

      $.modalSectionReview = $.modalSectionReview + 
        "<div class='modal fade' id='text"+key+"' tabindex='-1' role='dialog' aria-hidden='true'>"+
          "<div class='modal-dialog' role='document'>"+
            "<div class='modal-content'>"+
              "<div class='modal-body'>"+
                $.clientsReview[key]["description"]+
              "</div>"+
            "<div class='modal-footer'>"+
              "<button type='button' class='btn btn-warning btn-sm' data-dismiss='modal'>Закрыть</button>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
      $('#modalSectionReview').append( $.modalSectionReview);
    });
    $('#clientsReview').append( $.clientsReviewItems);
    

  /*********** get data from JSON to review (ourCertificates) ************/
  $.ourCertificates = data.ourCertificates;
  $.certificatesItems = "";
  $.imgPathReview = "../img/review/";
  $.countItem2 = 0;
  $.flagActive2 ="";
  $.wrapperDivStart2 = "";
  $.wrapperDivEnd2 = "";
  $.modalSectionCertificates = "";

  $.each( $.ourCertificates, function(key) {
    $.countItem2>0 ? $.flagActive2="" : $.flagActive2=" active";
    
    var flagEndDiv2 = key%3;

    switch(flagEndDiv2){
      case 0:
        $.wrapperDivStart2 = "<div class='carousel-item "+$.flagActive2+"'>";
        $.wrapperDivEnd2 = "";
      break;
      case 1:
        $.wrapperDivStart2 = "";
        $.wrapperDivEnd2 = "";
      break;
      case 2:
        $.wrapperDivStart2 = "";
        $.wrapperDivEnd2 = "</div>";
      break;
    }


    $.certificatesItems = $.certificatesItems + 
        $.wrapperDivStart2+
          "<div class='carousel-item-3 a"+key%3+"'>"+
            "<div class='card-item'>"+
              "<div class='card-item-img'>"+
                "<a href='' data-toggle='modal' data-target='#img"+key+"'><img src="+$.imgPathReview+$.ourCertificates[key]["img"]+" /></a>"+
              "</div>"+
            "</div>"+
          "</div>"+
        $.wrapperDivEnd2;
        $.countItem2++;

        $.modalSectionCertificates = $.modalSectionCertificates + 
        "<div class='modal fade' id='img"+key+"' tabindex='-1' role='dialog' aria-hidden='true'>"+
          "<div class='modal-dialog' role='document'>"+
            "<div class='modal-content'>"+
              "<div class='modal-body'>"+
                "<img src="+$.imgPathReview+$.ourCertificates[key]["img"]+" />"+
              "</div>"+
            "<div class='modal-footer'>"+
              "<button type='button' class='btn btn-warning btn-sm' data-dismiss='modal'>Закрыть</button>"+
            "</div>"+
          "</div>"+
        "</div>"+
      "</div>";
        $('#modalSectionCertificates').append( $.modalSectionCertificates);
    });
    $('#clientsCertificates').append( $.certificatesItems);
});


/*********************************/
/****   block JSON - end *******/
/*********************************/
   
var header = $("#myHeader");
var offset = header.offset();
var sticky = offset.top;

function myFunction() {
  if (window.pageYOffset > sticky)    { header.addClass("sticky");    }
  else                                { header.removeClass("sticky"); }
}
$(window).scroll(function () {
  /************ add top menu **************/
  myFunction();

  /********** SCROLL TO TOP ************/
  var $totalHeight = $(window).scrollTop();
  var $scrollToTop = $(".scrolltotop");
  if ($totalHeight > 300) { $(".scrolltotop").fadeIn();  } 
  else                    { $(".scrolltotop").fadeOut(); }
  
  if ($totalHeight + $(window).height() === $(document).height()) { $scrollToTop.css("bottom", "90px"); } 
  else                                                            { $scrollToTop.css("bottom", "20px"); }
});