$.fn.isVisible = function () {

	let elementTop = $(this).offset().top;
	let elementBottom = elementTop + $(this).outerHeight();

	let viewportTop = $(window).scrollTop();
	let viewportBottom = viewportTop + $(window).height() * 0.75;

	let flag = elementBottom > viewportTop && elementTop < viewportBottom;

	let item = $(this)

	if(flag) {

		if(item.hasClass('pfl-bg')) {
			let src = item.attr('href');
			$('<img>').attr('src', src).load(function(){
				item.css('background-image', 'url(' + src + ')');
				item.removeClass('pfl-lazy');
				item.removeClass('pfl-bg');
			});
		}
		if(item.hasClass('pfl-lazy')){
			let 
			src = item.attr('data-src');
			item.removeAttr('data-src');

			item.attr('src', src);
			item.on('load', function(){
				item.removeClass('pfl-lazy');
			})
		}
		if(item.hasClass('pfl')){

		}
	}
};
winScroll = function(){
	$('.pfl-lazy').each(function(){
		$(this).isVisible();
	});
}
showModal = function($href, $class=""){
	$instance = $.fancybox.getInstance();
	if($instance){$instance.close();}
	$.fancybox.open({
		src  : $href,
		type : 'inline',
		closeExisting: false,
		opts : {
			baseClass: $class,
			animationEffect: false,
			animationDuration: 300,
			transitionEffect: false,
			transitionDuration: 300,
			touch: false,
			btnTpl: {
				close: '<button class="btn btn-scale modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#close" /></svg></button>',
				smallBtn: '<button class="btn btn-scale modal__close" data-fancybox-close><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#close" /></svg></button>',
			},
			afterShow : function( instance, current ) {
				$(current.src).addClass('active');
			},
			beforeClose : function( instance, current ) {
				this.opts.animationEffect = true;
				this.opts.transitionEffect = true;
				$(current.src).removeClass('active');
			},
			afterClose : function( instance, current ) {
					// $('#modal_menu').removeClass('active mmenu__vis');
				}
			}
		});
}

scrollTo = function(target = '') {
	if(target && $(target).length) {
		$('html, body').animate({scrollTop: $(target).offset().top}, 800);
	}
}

$(function(){

	$(window).on('load scroll resize', winScroll);

	$('input[name="phone"]').inputmask({
		mask: "+7 (999) 999-99-99",
		showMaskOnHover: false
	});

	$(document).on('click','.modalshow', function(e){
		e.preventDefault();
		var 
		$href = $(this).attr('href'),
		$class = $(this).attr('data-class');

		showModal($href, 'fancy-from-right ' + $class);
	})



	$('.form__label').on('click', function(){
		$(this).siblings('input, textarea').focus();
	})
	$('.form__input, .form__textarea').on('change', function(){
		if($(this).val().length > 0) {
			$(this).addClass('valid');
		}else{
			$(this).removeClass('valid');
		}
	});

	if($('.tabs').length) {
		$('.tabs').easytabs({
			animationSpeed: 300,
			tabs: "> .tabs__list > li",
			transitionInEasing: 'linear',
			transitionOutEasing: 'linear',
			transitionCollapseEasing: 'linear',
			transitionUncollapseEasing: 'linear',
			updateHash: false
		});
	}

	if($('.modprj__slider').length) {
		var modPrjSlider = $('.modprj__slider').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev nav__item nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg></button>',
			nextArrow: '<button type="button" class="slick-next nav__item nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg></button>',
			responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 1,
				}
			},
			]
		})
	}

	if($('.team__slider').length) {
		var teamSlider = $('.team__slider').slick({
			infinite: false,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: false,
			prevArrow: '<button type="button" class="slick-prev nav__item nav__item-dark nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg></button>',
			nextArrow: '<button type="button" class="slick-next nav__item nav__item-dark nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg></button>',
			responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 1,
				}
			},
			]
		})
	}

	if($('.teamrev__slider').length) {
		$('.teamrev__slider').on('init', function(event, slick){
			$('.teamrev__dots').html('<span>1</span> / ' + slick.slideCount);
		});
		var teamSlider = $('.teamrev__slider').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: false,
			fade: true,
			cssEase: 'linear',
			prevArrow: '<button type="button" class="slick-prev nav__item nav__item-dark nav__item-prev"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-left" /></svg></button>',
			nextArrow: '<button type="button" class="slick-next nav__item nav__item-dark nav__item-next"><svg class="ico ico-center"><use xlink:href="./img/sprite.svg#arrow-right" /></svg></button>',
			responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
				}
			}
			]
		}).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			var currentIndex = (currentSlide ? currentSlide : 0) + 1;
			$('.teamrev__dots').html('<span>' + currentIndex + '</span> / ' + slick.slideCount);
		});
	}


	if($('.modspec__item').length) {
		$('.modspec__item').on('mouseenter', function() {
			var $self = $(this);
			$self.addClass('hover')
			.closest('li').siblings('li').find('.hover').removeClass('hover');
		});
	}

	if($('.spec__item').length) {
		$('.spec__item').on('mouseenter', function() {
			var $self = $(this);
			$('.spec__item').removeClass('hover').addClass('unhover');
			$self.addClass('hover').removeClass('unhover');
		});
		$('.spec__item').on('mouseleave', function() {
			var $self = $(this);
			$('.spec__item').removeClass('hover unhover').addClass('unhover');
		});
	}

	if($('.navline').length) {
		changeViewNav()
	}

	$(document).on('click', '.thide__btn .btn', function(e){
		e.preventDefault();
		var
		$self = $(this),
		$hidden = $self.closest('.thide__outer').find('.thide__hidden');
		if($self.hasClass('active')) {
			$self.removeClass('active')
			$hidden.stop(true, true).slideUp();
		}else{
			$self.addClass('active')
			$hidden.stop(true, true).slideDown();
		}
	});

	$(document).on('click', '.cont__show', function(e){
		e.preventDefault();
		$('.cont__outer').toggleClass('show');
	})

	$(document).on('click', '.goTo', function(e){
		e.preventDefault();
		scrollTo($(this).attr('href'));
	})


});

function changeViewNav() {
	var 
	nav = [];

	nav.cont = $('.navline'),
	nav.list = $('.navline ul'),
	nav.more = $('.navline__more'),
	nav.more_class = '.navline__more';

	$(window).on('load resize', function(){

		nav.list.find('li').not(nav.more_class).removeClass('d-none');
		nav.more.hide();

		if($(window).innerWidth() >= 768) {
			if(nav.cont.outerWidth() < nav.list.outerWidth()) {
				nav.more.show();
				hideLastNav();
			}
		}

	});

	function hideLastNav() {
		nav.list.find('li').not('.d-none').not(nav.more_class).last().addClass('d-none');
		if(nav.cont.outerWidth() < nav.list.outerWidth()) {
			hideLastNav();
		}
	}
}
