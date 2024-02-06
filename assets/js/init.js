/** *************Init JS*********************

    TABLE OF CONTENTS
	---------------------------
	1. Preloader
	2. Ready Function
	   a) Auto height for the home page
	   b) Smooth Scroll
	   c) 3d gallery
	   d) Vimeo Video
	   e) Schedule Accordian
	   f) Speaker Slider
	   g) Animation
	   h) Registration Form
	   i) Subscribe
	   j) Nice Scroll
	   h) Placeholder for ie9
	3.only play video on desktop devices


/*************************************/

"use strict";

/*************************************/
/* Preloader */
/**************************************/
jQuery(window).on('load', function() {
        // will first fade out the loading animation
	jQuery(".status").fadeOut();
        // will fade out the whole DIV that covers the website.
	jQuery(".preloader").delay(100).fadeOut("slow");
	jQuery("body").css('overflow-y','visible');

});

/*************************************/
/* Ready Function */
/**************************************/

jQuery( document ).ready(function( $ ) {
	$.noConflict();

	var isAutoScrolling = false;
	var isManualScrolling = false;
	function smoothScrollToAnchor(anchor) {
		if (!anchor) {
			return;
		}

		if (isManualScrolling) {
			return;
		}
		isAutoScrolling = true;

		var offset = $(".navbar.navbar-default").height();

		if (!$(anchor).offset()) {
			isAutoScrolling = false;
			return;
		}

		var target = $(anchor).offset().top - offset;
		target = Math.max(0, target);

		var bottom = $(document).height() - $(window).height();
		target = Math.min(bottom, target);

		var page = $("html, body");

		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			page.stop();
		});

		page.animate({
			scrollTop: target
		}, 1500, 'easeInOutCubic', function () {
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
			isAutoScrolling = false;
		});
	}

	// initialize the application
	function pageExists(path){

		var http = new XMLHttpRequest();

		http.open('HEAD', path, false);
		http.send();

		return http.status !== 404;
	}

	ModalEffects.init();

	var trueMobile = isMobile.any();
	if (trueMobile && (window.location !== window.top.location)){
		setTimeout(function () {
			$('#modal-13').addClass("md-show");
		}, 500);
	} else {
		continueLoading();
	}

	$('#homeLink').on('click', function(e) {
		e.preventDefault();
		if (window.location.hash.startsWith('#/weekend')) {
			window.location.hash = '#/weekend';
		} else if (window.location.hash.startsWith('#/')){
			window.location.hash = '';
		} else {
			var page = $("html, body");

			page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
				page.stop();
			});

			page.animate({
				scrollTop: 0
			}, 1500, 'easeInOutCubic', function () {
				page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
				isAutoScrolling = false;
			});
		}
	});

	$('#continueLoadingBtn').click(function() {
		$('#modal-13').removeClass("md-show");
		continueLoading();
	});

	$('#escapeFrameBtn').click(function() {
		window.top.location = window.location;
	});

	function showCorrectMenu() {
		if (window.location.hash.startsWith('#/weekend')) {
			$('body').addClass('weekend');
			$('#mainMenu').hide();
			$('#weekendMenu').show();
		} else {
			$('body').removeClass('weekend');
			$('#mainMenu').show();
			$('#weekendMenu').hide();
		}
	}

	function continueLoading() {
		var app = $.sammy('#app', function() {
			this.use('Template');

			var currentPage;

			this.get('\/?fbclid=(.+)#(.+)', function() {
				var fbclid = this.params['splat'][0];
				var target = this.params['splat'][1];

				this.redirect('/#' + target);
			})

			this.get('\/(#[^\/]+)?', function() {
				var anchor = this.params['splat'][0];
				var page = '';

				if (currentPage === page) {
					smoothScrollToAnchor(anchor);
					return;
				}
				this.partial("assets/pages/home.html", function() {
					window.scrollTo(0,0);
					loadAfterPartial();
					smoothScrollToAnchor(anchor);
					currentPage = page;
				});
			});

			this.get('\/#\/([^#]+)(#[^\/]+)?', function() {
				var page = this.params['splat'][0];
				var anchor = this.params['splat'][1];

				if (currentPage === page) {
					smoothScrollToAnchor(anchor);
					return;
				}

				if (!pageExists('assets/pages/' + page + '.html')) {
					page = '404';
					showCorrectMenu();
				}

				this.partial('assets/pages/' + page + '.html', function() {
					window.scrollTo(0,0);
					loadAfterPartial(page);
					smoothScrollToAnchor(anchor);
					currentPage = page;
				});
			})
		});

		// start the application
		app.run('/');

		function loadAfterPartial(page) {
			ModalEffects.init();

			showCorrectMenu()

			if (page) {
				$(".navbar-default .navbar-nav > li").addClass("notHome");
			} else {
				$(".navbar-default .navbar-nav > li").removeClass("notHome");
			}

			$(window).scroll(function () {
				var height = $(window).height();
				var scroll = $(window).scrollTop();
				if (scroll) {
					$(".header-hide").addClass("scroll-header");
				} else {
					$(".header-hide").removeClass("scroll-header");
				}
			});

			/***************** Do fire ********************/

			// var fireElements = $(".font-effect-fire-animation");
			// function randomBetween(min, max) { // min and max included
			// 	return Math.floor(Math.random() * (max - min + 1) + min)
			// }
			// fireElements.each(function() {
			// 	var el = $(this);
			// 	var text = el.text();
			// 	var chars = text.split("");
			// 	var html = chars.reduce((acc, char) => acc + `<span text="${char}" style="--duration: ${randomBetween(30,100)/100}s;--delay: ${randomBetween(30,100)/100}s;">${char}</span>`, "");
			// 	el.html(html);
			// })


			/***************** Animation ******************/
			var wow = new WOW(
				{
					boxClass: 'wow', // animated element css class (default is wow)
					animateClass: 'animated', // animation css class (default is animated)
					offset: 0, // distance to the element when triggering the animation (default is 0)
					mobile: false, // trigger animations on mobile devices (default is true)
					live: true // act on asynchronously loaded content (default is true)
				}
			);

			wow.init();

			/*** Auto height function ***/
			var setElementHeight = function () {
				var height = $(window).height();
				$('.autoheight').css('min-height', (height));
			};

			$(window).on("resize", function () {
				setElementHeight();
			}).resize();

			$('body').click(function(event){
				// check if the clicked element is a descendent of navigation
				if ($(event.target).closest('.header').length) {
					return; //do nothing if event target is within the navigation
				} else {
					$('.navbar-collapse.collapse').removeClass('in');
				}
			});

			/**********Menu Close Logic***************/

			$('.nav li a').click(function () {
				$('.navbar-collapse.collapse').removeClass('in');
			});


			/*******Schedule Accordion *************/
			$('.accordion .item .heading').click(function () {
				var a = $(this).closest('.item');
				var b = $(a).hasClass('open');
				var c = $(a).closest('.accordion').find('.open');

				if (b != true) {
					$(c).find('.content').slideUp(500);
					$(c).removeClass('open');
				}

				$(a).toggleClass('open');
				$(a).find('.content').slideToggle(500);

			});

			var currentHash;
			$(document).scroll(function () {
				$('.mainSection').each(function () {
					clearTimeout($.data(this, 'scrollTimer'));
					$.data(this, 'scrollTimer', setTimeout(function() {
						// do something
						isAutoScrolling = false;
						isManualScrolling = false;
					}, 100));

					if (!isAutoScrolling) {
						isManualScrolling = true;
					}

					var id = $(this).attr('id');
					var top = window.pageYOffset;
					var distance = top - $(this).offset().top;
					var offsetDistance = distance;
					if (id !== 'home') {
						offsetDistance += $(".navbar.navbar-default").height();
					}

					if (id && offsetDistance < 50 && offsetDistance > -50 ) {
						var current = $('.navbar-nav a[href*="#' + id + '"]');

						if (current.length) {
							$('.navbar-nav li').removeClass('active');
							current.parent().addClass('active');
						}
					}

					if (id && distance < 15 && distance > -15 && !isAutoScrolling && currentHash !== id) {
						currentHash = id;
						isManualScrolling = true;
						if(history.pushState) {
							history.pushState(null, null, "#"+id);
						} else {
							window.location.hash = id;
						}
					}
				});
			});
		}
	}
});

var isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};
