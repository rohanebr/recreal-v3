/* Template: Appster | Author: eriktailor | Version: 1.0.0  */
/*----------------------------------------------------------*/

$(document).ready(function(){
/*----------------------------------------------------------*/

// Slide model first
var SlideModelFirstAnim = 'fadeInUpBig';

// Slide model second
var SlideModelSecondAnim = 'fadeInUpBig';

// Slide title first
var SlideTitleFirstAnim = 'fadeInDownBig';

// Slide title second
var SlideTitleSecondAnim = 'fadeInDownBig';

// First showcase model
var FirstShowcaseModel = 'fadeInUpBig';

// Second showcase model
var SecondShowcaseModel = 'fadeInLeftBig';

// Third showcase model
var ThirdShowcaseModel = 'fadeInRightBig';

// First pricing table
var FirstPricingTable = 'fadeInLeftBig';

// Second pricing table
var SecondPricingTable = 'fadeInUpBig';

// Third pricing table
var ThirdPricingTable = 'fadeInRightBig';

// Zoomer frame
var ZoomerFrameAnim = 'fadeInUpBig';

// Magnifier
var MagnifierAnim = 'bounceIn';

// Screenshots
var ScreenShotsAnim = 'bounceIn';

// Download button
var DownloadButtonAnim = 'fadeInUpBig';

/*----------------------------------------------------------*/
/*----------------------------------------------------------*/

$('.showcase.first').waypoint(function(){
	$(this).find('.showcase-model img').addClass('animated '+FirstShowcaseModel);
}, {offset: 400});

$('.showcase.second').waypoint(function(){
	$(this).find('.showcase-model img').addClass('animated '+SecondShowcaseModel);
}, {offset: 400});

$('.showcase.third').waypoint(function(){
	$(this).find('.showcase-model img').addClass('animated '+ThirdShowcaseModel);
}, {offset: 400});

$('.feature-selectors').waypoint(function(){
		$('.feature-selector-buttons > li').each(function(i){
			$(this).css({
				'animation-delay' : (i*0.3)+"s",
				'-webkit-animation-delay' : (i*0.3)+"s",
				'-moz-animation-delay' : (i*0.3)+"s",
				'-ms-animation-delay' : (i*0.3)+"s",
				'-o-animation-delay' : (i*0.3)+"s"
			});
		});
	$('.feature-selector-buttons > li').addClass('animated fadeInLeftBig');
}, {offset: 400});

$('.pricing').waypoint(function(){
	$('.price-table:eq(0)').addClass('animated '+FirstPricingTable).css({'opacity':'1','filter':'alpha(opacity=100)'});;
	$('.price-table:eq(1)').addClass('animated '+SecondPricingTable).css({'opacity':'1','filter':'alpha(opacity=100)'});;
	$('.price-table:eq(2)').addClass('animated '+ThirdPricingTable).css({'opacity':'1','filter':'alpha(opacity=100)'});;
}, {offset: 400});

$('.features').waypoint(function(){
	$('.zoomer-frame').addClass('animated '+ZoomerFrameAnim);
	$('.magnifier').addClass('animated '+MagnifierAnim).css({'opacity':'1','filter':'alpha(opacity=100)'});
}, {offset: 100});

$('.shots').waypoint(function(){
	$('.screenshot').addClass('animated '+ScreenShotsAnim).css({'opacity':'1','filter':'alpha(opacity=100)'});
}, {offset: 400});

$('.call-to-action').waypoint(function(){
	$('.call-to-action .button').addClass('animated '+DownloadButtonAnim).css({'opacity':'1','filter':'alpha(opacity=100)'});
}, {offset: 400});

$(".slide-model-a").addClass('animated '+SlideModelFirstAnim);
$(".slide-model-b").addClass('animated '+SlideModelSecondAnim);
$(".slide-content h1").addClass('animated '+SlideTitleFirstAnim);
$(".slide-content h2").addClass('animated '+SlideTitleSecondAnim);

/*----------------------------------------------------------*/
});