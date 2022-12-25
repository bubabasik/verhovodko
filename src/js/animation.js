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

	$(window).on('load', function(){
		$('body').addClass('is-loaded');
	})

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


	$(function(footerAnimTop){// ФУТЕР
		gsap.set('.footer__in', { yPercent: -50 })

		const uncover = gsap.timeline({ paused:true })
		uncover
		.to('.footer__in', { yPercent: 0 });

		ScrollTrigger.create({  
			trigger: '.footer__trigger',
			start: 'bottom bottom',
			end: '+=100%',
			animation: uncover,
			scrub: 0
		}); 


	});




});

(function() { 
	let isSafari = (function() { 
		let ua = navigator.userAgent; 
		if (/safari/gi.test(ua) && !/chrome/gi.test(ua)) return true; else return false; })(); 
		if (!isSafari) { 
			SmoothScroll ({ 
				animationTime: 800, 
				stepSize: 50, 
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