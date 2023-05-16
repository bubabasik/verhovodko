
$(window).on('load', function(){
	$('body').addClass('is-loaded');
	if($('.top__bg').length) {
		setTimeout(function(){
			$('body').addClass('is-scrollable');
		}, 2200);
	}else{
		$('body').addClass('is-scrollable');
	}
})

$(function(){

	const body = document.querySelector('body');

	body.addEventListener('mousemove', e => {
		clientX = e.pageX;
		clientY = e.pageY;

		mouseCoords(e);
		aura.classList.remove('hidden');
	})

	const
	aura = document.getElementById('aura'),
	links = document.getElementsByTagName('a'),
	buttons = document.getElementsByTagName('button');

	mouseX = 0, mouseY = 0, posX = 0, posY = 0;

	function mouseCoords(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	}

	gsap.to({}, .01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 5;
			posY += (mouseY - posY) / 5;

			gsap.set(aura, {
				css: {
					left: posX - 10,
					top: posY - 10
				}
			})
		}
	})

	body.addEventListener('mouseout', () => {
		aura.classList.add('hidden');
	})

	for(let i = 0; i < links.length; i++) {
		links[i].addEventListener('mouseover', () => {
			aura.classList.add('active');
		})
		links[i].addEventListener('mouseout', () => {
			aura.classList.remove('active');
		})
	}
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('mouseover', () => {
			aura.classList.add('active');
		})
		buttons[i].addEventListener('mouseout', () => {
			aura.classList.remove('active');
		})
	}


	

	$(function(line_title){
		for(const node of document.getElementsByClassName('line_title')) {
			LineWrapper(node);
		}
		function LineWrapper(node) {
			const paragraphContent = node.innerHTML.replace(/^\s+|\s+$/gm, '');
			const paragrapthWrappedWords = paragraphContent.replace(/(\S+)/g, '<span class="word"> $1 </span>');
			node.innerHTML = paragrapthWrappedWords;
			const wrappedWords = document.getElementsByClassName('word');
			const arrayOfWordNodes = Object.keys(wrappedWords).map(k => wrappedWords[k]);
			let currLineTop = 0;
			let finalHTML = ' ';
			arrayOfWordNodes.forEach(( node, index ) => {
				const nodeTop = node.offsetTop;
				finalHTML += ' '
				+ ( index !== 0 && currLineTop !== nodeTop ? '</span></span> ' : ' ' )
				+ ( index === 0 || currLineTop !== nodeTop ? '<span class="unwrap"><span class="upwrap"> ' : ' ' )
				+ node.innerHTML;
				currLineTop = nodeTop;
			});
			node.innerHTML = finalHTML.trim();
		}
		$('.unwrap').unwrap();	
	});


	$(function(titleAppear){    // ПОЯВЛЕНИЕ ЗАГОЛОВКОВ
		const title = gsap.utils.toArray('.title-appear, .text-appear, .anim-item, .anim-parent');
		title.forEach((box, i) => {
			var $duration = $(box).hasClass('signature') ? .8 : 1.2;
			const anim = gsap.from(box, {
				stagger:0.1,
				onComplete: function(){
					$(box).addClass('anim-active');
				}
			});
			ScrollTrigger.create({
				trigger: box,
				start: "top bottom-=40px",
				animation: anim,
				toggleActions: 'play none none none',
				once: true
			});
		});
	});

	// const scroll = new LocomotiveScroll({
	// 	el: document.querySelector('[data-scroll-container]'),
	// 	smooth: true
	// });

	var windowWidth = $(window).width();

	if(windowWidth > 1200){
		$(function(footerAnimTop){
			gsap.set('.footer__in', { yPercent: -50 })

			const uncover = gsap.timeline({ paused:true })
			uncover
			.to('.footer__in', { yPercent: 0, ease: 'none' });

			ScrollTrigger.create({  
				trigger: '.footer__trigger',
				start: 'bottom bottom',
				end: '+=100%',
				animation: uncover,
				scrub: 0
			}); 
		});
	}


	if(windowWidth > 1200){
		$(function(headerExp1){

			gsap.set('.top__container-in', { yPercent: 0 })
			gsap.set('.top__bg-outer', { yPercent: 0, scale: 1 })
			gsap.set('.top__over', { autoAlpha: 0 })

			const fullAnim = gsap.timeline({ paused:true });
			fullAnim
			.to('.top__over', { autoAlpha: .5, ease: 'none' })
			.to('.top__bg-outer', { yPercent: 30, scale: 1.1, ease: 'none' }, '<')
			.to('.top__container-in', { yPercent: 70, ease: 'none' }, '<');


			ScrollTrigger.create({  
				trigger: '.top__trigger',
				start: 'top top',
				end: '+=100%',
				animation: fullAnim,
				scrub: 0
			}); 


		});
	}


	$(function(darkMode){
		const darks = gsap.utils.toArray('.dark-mode-trigger, .dark-mode-trigger-last');

		darks.forEach((box, i) => {
			let end_trigger, end_position;
			if($(box).hasClass('dark-mode-trigger-last')) {
				end_trigger = 'html';
				end_position = 'bottom top';
			}else{
				end_trigger = box;
				end_position = "bottom bottom-=30%";
			}
			
			ScrollTrigger.create({
				trigger: box,
				endTrigger: end_trigger,
				start: "top+=10% bottom-=10%",
				end: end_position,
				onToggle: self => {
					if(self.isActive) {
						$('body').addClass('dark-mode');
					}else{
						$('body').removeClass('dark-mode');
					}
				},
			});
		});
	});


	$(function(runText){ 
		if($('.marquee').length) {

			$(window).on("load resize scroll", function() {
				$(".marquee").each(function() {
					var windowTop = $(window).scrollTop();
					var elementTop = $(this).offset().top;
					var leftPosition = windowTop * 1600 / elementTop;
					$(this)
					.find(".marquee__inner")
					.css({ right: leftPosition });
				});  
			}); 
		}
	});



	$(function(button){
		gsap.set('.btn-fill', { y: "76%" })

		$('.btn').on('mouseenter', function() {
			if($(this).find(".btn-fill").length) {
				gsap.to($(this).find(".btn-fill"), .45, {
					startAt: {y: "-76%"},
					y: "0%",
					ease: Power2.easeInOut
				});
			}
			$(this.parentNode).removeClass('not-active');
		});

		$('.btn').on('mouseleave', function() {
			if($(this).find(".btn-fill").length) {
				gsap.to($(this).find(".btn-fill"), .45, {
					y: "76%",
					ease: Power2.easeInOut
				});
			}
			$(this.parentNode).removeClass('not-active');
		});
	}) 

	if($('.nf__icon-double').length) {
		$(function () {
			$('body').mouseleave(function(e){
				gsap.to('.nf__icon-double', 0.5,{x: 0, y: 0});
			});
			$('body').mousemove(function(e){   
				callParallax(e);
			});
			function callParallax(e){
				parallaxIt(e, '.nf__icon-double', 25);
			}
			function parallaxIt(e, target, movement){
				var $this = $('body');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;
				gsap.to(target, 0.5, {
					x: (relX - $this.width()/2) / ($this.width()) * movement,
					y: (relY - $this.height()/2) / ($this.height()) * movement,
					ease: Power2.easeOut 
				});
			}
		});
	}


});


(function() { 
	let isSafari = (function() { 
		let ua = navigator.userAgent; 
		if (/safari/gi.test(ua) && !/chrome/gi.test(ua)) return true; else return false; })(); 
		if (!isSafari) { 
			SmoothScroll ({ 
				animationTime: 800, 
				stepSize: 170, 
				accelerationDelta: 150, 
				accelerationMax: 10, 
				keyboardSupport: true, 
				arrowScroll: 50, 
				pulseAlgorithm: true, 
				pulseScale: 5, 
				pulseNormalize: 1, 
				fixedBackground : true, 
				touchpadSupport: true 
			}) 
		} 
	}());