$(function(){
	'use strict';
	//Slider
	var $owl = $('.owl');
	$owl.each( function() {
		var $a = $(this);
		$a.owlCarousel({
			transitionStyle: $a.attr('data-transitionstyle'),
			autoPlay:  $a.attr('data-autoplay'),
			singleItem: JSON.parse($a.attr('data-singleItem')),
			items : $a.attr('data-items'),
			itemsDesktop : [1199,$a.attr('data-itemsDesktop')],
			itemsDesktopSmall : [979,$a.attr('data-itemsDesktopSmall')],
			itemsTablet:  [797,$a.attr('data-itemsTablet')],
			itemsMobile :  [479,$a.attr('data-itemsMobile')],
			navigation : JSON.parse($a.attr('data-buttons')),
			pagination: JSON.parse($a.attr('data-pag'))
		});
	});
	//Preloader
	$(window).load(function()
	{
		$('.preloader i').fadeOut();
		$('.preloader').delay(500).fadeOut('slow');
		$('body').delay(600).css({'overflow':'visible'});
	});
	//Magnific-popup
	$('.image-zoom').magnificPopup({
		type:'image',
		gallery: {
			enabled: true
		},
	});
	//Menu
	$('.navbar-toggle').on('click',function(){
		height_w(); 
	});
	function height_w()
	{
		$('.navbar-nav').css('max-height',$(window).height()-165);
	}
	window.onresize = function()
	{
		height_w();
	}
	//cart dropdown
	$('.cart .dropdown-menu').on('click',function(e) {
		e.stopPropagation();  
	});
	//Filter price
	$( ".slider-range" ).slider({
		range: true,
		min: 5000,
		max: 200000,
		step: 1000,
		values: [ 60000, 130000 ],
		slide: function( event, ui ) {
			$( ".slider_amount" ).val( "$" + ui.values[ 0 ].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + ui.values[ 1 ].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});
	$( ".slider_amount" ).val( "$" + $( ".slider-range" ).slider( "values", 0 ).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + " - $" + $( ".slider-range" ).slider( "values", 1 ).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
});