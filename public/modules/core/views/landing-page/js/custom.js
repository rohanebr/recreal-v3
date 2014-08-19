/* Template: Appster | Author: eriktailor | Version: 1.0.0  */
/*----------------------------------------------------------*/


/*----------------------------------------------------------*/
/* # DOCUMENT START */
/*----------------------------------------------------------*/
$(document).ready(function(){
$("html").removeClass("no-js").addClass("js");

/*----------------------------------------------------------*/
/* # BACK TOP */
/*----------------------------------------------------------*/
$(function(){
	$(window).scroll(function () {
		if ($(this).scrollTop() > 600) {
			$('.back-top').removeClass('downscaled');
		} else {
			$('.back-top').addClass('downscaled');
		}
	});	
	$('.back-top').click(function(){
			$('body,html').animate({ scrollTop: 0 }, 800);

	});
});

/*----------------------------------------------------------*/
/* # NAVIGATION */
/*----------------------------------------------------------*/
$('.header').waypoint('sticky', { offset: -1 });

var docTop = $(window).scrollTop();
if(docTop != 0){ $('.header').addClass('stuck');}

// Cache selectors
var topMenu = $(".header"),
    topMenuHeight = topMenu.outerHeight()+15,
    menuItems = topMenu.find("a"),
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind to scroll
$(window).scroll(function(){
   var fromTop = $(this).scrollTop()+topMenuHeight;
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   menuItems
     .parent().removeClass("active")
     .end().filter("[href=#"+id+"]").parent().addClass("active");
})

// Scroll to section
menuItems.click(function(e){		
	var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top-topMenu.outerHeight()+1+42;
	$('html, body').stop().animate({ scrollTop: offsetTop }, 800);				
	e.preventDefault();

});

// Mobile nav
$(".mobile-menu").click(function(){
	$(".menu").slideToggle(400);
});

/*----------------------------------------------------------*/
/* # ZOOMER */
/*----------------------------------------------------------*/

$('.zoomer-image').loupe({
  width: 200, // width of magnifier
  height: 200, // height of magnifier
  loupe: 'magnifier' // css class for magnifier
});

/*----------------------------------------------------------*/
/* # PARALLAX & SCROLL */
/*----------------------------------------------------------*/

var w = $(window).width();
	if(w > 960){
	$('.slider').parallax("50%", -0.3);
	$('.testimonials').parallax("50%", -0.3);
	$('.twitter-feed').parallax("50%", -0.2);
	$('.call-to-action').parallax("50%", -0.2);
	$('.zoomer-bg').parallax("50%", -0.6);	
}

$('html').niceScroll({
	horizrailenabled: false,
	autohidemode: false
});

/*----------------------------------------------------------*/
/* # TEAM MEMBERS */
/*----------------------------------------------------------*/

$('.team-member').click(function() {
  var clicks = $(this).data('clicks');
  if (clicks) {

	$(this).find('.team-member-dropdown').slideUp(600);
	$(this).find('.team-member-bullet > i').removeClass('fa-minus').addClass('fa-plus');	
  } else {
	$(this).find('.team-member-dropdown').slideDown(600);
	$(this).find('.team-member-bullet > i').removeClass('fa-plus').addClass('fa-minus');
  }
  $(this).data("clicks", !clicks);
});

/*----------------------------------------------------------*/
/* # TESTIMONIALS */
/*----------------------------------------------------------*/
$(function(){
	var allQuotes = $('.quote-slide'),
		firstQuotes = $('.quote-slide:eq(0), .quote-slide:eq(1), .quote-slide:eq(2)'),
		secondQuotes = $('.quote-slide:eq(3), .quote-slide:eq(4), .quote-slide:eq(5)');
		thirdQuotes = $('.quote-slide:eq(6), .quote-slide:eq(7), .quote-slide:eq(8)'),
		quoteControl = $('.quote-slider-controls span');
	
	secondQuotes.hide();
	thirdQuotes.hide();
	
	
	quoteControl.click(function(){
		allQuotes.hide(); 
		quoteControl.removeClass('active');
		$(this).addClass('active'); 
	});	
	
	quoteControl.eq(0).click(function(){ firstQuotes.fadeIn(500); });		
	quoteControl.eq(1).click(function(){ secondQuotes.fadeIn(500); });	
	quoteControl.eq(2).click(function(){ thirdQuotes.fadeIn(500); });
		
});

/*----------------------------------------------------------*/
/* # CAROUSEL */
/*----------------------------------------------------------*/
$(function(){
	
	var cSlideEffect = 'fadeInUpBig';
	
	$('.carousel-slide.active > div').addClass('animated '+cSlideEffect);	

	$('.carousel-next').click(function(){	
		if($('.carousel-slide:last').hasClass('active')){
			$('.carousel-slide:last').removeClass('active');
			$('.carousel-slide:first').addClass('active');
		} else {
			$('.carousel-slide.active').removeClass('active').next('.carousel-slide').addClass('active');
		}
		$('.carousel-slide.active > div').addClass('animated '+cSlideEffect);
	});
	
	$('.carousel-prev').click(function(){	
		if($('.carousel-slide:first').hasClass('active')){
			$('.carousel-slide:first').removeClass('active');
			$('.carousel-slide:last').addClass('active');
		} else {
			$('.carousel-slide.active').removeClass('active').prev('.carousel-slide').addClass('active');
		}
		$('.carousel-slide.active > div').addClass('animated '+cSlideEffect);
	});
	
});

/*----------------------------------------------------------*/
/* # SHOTS & LIGHTBOX */
/*----------------------------------------------------------*/
$(function(){
	var lb = $('.lightbox'),
		lbOverlay = $('.lightbox-overlay'),
		lbClose = $('.lightbox-close');

	$('.screenshot').click(function(){
		lbOverlay.removeClass('fadeOutUpBig').show().addClass('animated fadeInDownBig');	
		lb.removeClass('fadeOutDownBig').show().addClass('animated fadeInUpBig');
		var lbImage = $(this).children('img').attr('src');
		var lbImageStr = lbImage.replace('img/shots/index.html','');
		lb.children('img').attr('src', 'img/shots/'+lbImageStr);
	});

	lbClose.click(function(){
		lbOverlay.removeClass('fadeInDownBig').addClass('fadeOutUpBig');	
		lb.removeClass('fadeInUpBig').addClass('fadeOutDownBig');	
	});
});

/*----------------------------------------------------------*/
/* # FEATURE SELECTOR */
/*----------------------------------------------------------*/
$(function(){
	var selectorFrame = $('.feature-selector-frame'),
		selectorImage = $('.feature-selector-frame img'),
		selectorButton = $('.feature-selector-buttons li');
	selectorImage.eq(1).show();
	selectorButton.click(function(){
		selectorButton.removeClass('active');
		$(this).addClass('active');
		var selectorImg = $(this).data('fselector');
		selectorImage.addClass('animated fadeOutLeftBig');
		selectorFrame.find("[data-fselector='" + selectorImg + "']").show().removeClass('fadeOutLeftBig').addClass('animated fadeInRightBig');
	});

});

/*----------------------------------------------------------*/
/* # DETAILS COUNTUP */
/*----------------------------------------------------------*/
$(function(){
	$('.details').waypoint(function(){
		$('.counter h4').countTo();
	}, {offset: 400});
});

/*----------------------------------------------------------*/
/* # CONTACT FORM */
/*----------------------------------------------------------*/
$(function() {
  $("#cform").on("submit",function(e){
    
    if($("#cform")[0].checkValidity()) {
      $.post("mailer.html", $("#cform").serialize(),  function(response) {
        $('#success').fadeIn(500).html(response);
        $("#cform").fadeOut(300);
		e.preventDefault();
      });
    } else console.log("invalid form");
	e.preventDefault(); // stop actual submission
  }); 
});

$(function(){
	$('input, textarea').placeholder();
});

/*----------------------------------------------------------*/
/* # END DOCUMENT */
/*----------------------------------------------------------*/
});




