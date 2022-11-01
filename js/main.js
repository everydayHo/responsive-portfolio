'use strict';

// navbar resize

$(window).resize(function () {
	if ($(window).width() >= 1200) {
		$('.nav-wrap').css({ display: 'block' });
		$('.mobile-header').css({ display: 'none' });
		$('main').addClass('sec-p').css({ paddingTop: 0 });
	}
	if ($(window).width() < 1200) {
		$('.nav-wrap').css({ display: 'none' });
		$('.mobile-header').css({ display: 'block' });
		$('main').removeClass('sec-p');
	}
	if ($(window).width() < 1200) {
		$('#about > div:first, #skills > div:first, #contact > div:first')
			.removeClass('container')
			.addClass('container-fluid');
	} else {
		$('#about > div:first, #skills > div:first, #contact > div:first')
			.removeClass('container-fluid')
			.addClass('container');
	}
	if ($(window).width() >= 768) {
		$('.nav-menu').css({ display: 'block' });
		$('.hamburger-button').css({ display: 'none' });
		$('.overlay-wrap').css({ display: 'none' });
	}
	if ($(window).width() < 768) {
		$('.nav-menu').css({ display: 'none' });
		$('.hamburger-button').css({ display: 'block' });
		$('.overlay-wrap').css({ display: 'block' });
		$('#home > div:first, .jarallax > div:first')
			.removeClass('container')
			.addClass('container-fluid');
	} else {
		$('#home > div:first, .jarallax > div:first')
			.removeClass('container-fluid')
			.addClass('container');
	}
	if ($(window).width() < 480) {
		$('#gallery .project-card img').each(function (idx) {
			$(this).attr('src', `./images/sm/project-${idx + 1}@2x.png`);
		});
	} else {
		$('#gallery .project-card img').each(function (idx) {
			$(this).attr('src', `./images/lg/work-card${idx + 1}.png`);
		});
	}
});

// mouse cursor

const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
	return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
	const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	const maxSqueeze = 0.15;
	const accelerator = 1500;
	return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
	const diffX = Math.round(mouse.x - pos.x);
	const diffY = Math.round(mouse.y - pos.y);

	pos.x += diffX * speed;
	pos.y += diffY * speed;

	const angle = getAngle(diffX, diffY);
	const squeeze = getSqueeze(diffX, diffY);

	const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
	const rotate = 'rotate(' + angle + 'deg)';
	const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

	cursor.style.transform = translate;
	cursorCircle.style.transform = rotate + scale;
};

function loop() {
	updateCursor();
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[data-cursor-class]');

cursorModifiers.forEach((curosrModifier) => {
	curosrModifier.addEventListener('mouseenter', function () {
		const className = this.getAttribute('data-cursor-class');
		cursor.classList.add(className);
	});

	curosrModifier.addEventListener('mouseleave', function () {
		const className = this.getAttribute('data-cursor-class');
		cursor.classList.remove(className);
	});
});

// hamberger button

$('.hamburger-button').on('click', function (event) {
	event.preventDefault();

	$(this).toggleClass('active');
	$('.overlay').toggleClass('visible');
});

// textillate

$('.tlt').textillate({
	selector: '.texts',
	loop: true,
	minDisplayTime: 3000,
	in: {
		effect: 'flip',
		delayScale: 1.5,
		delay: 200,
		sync: false,
		shuffle: false,
		reverse: false,
	},

	out: {
		effect: 'flipOutY',
		delayScale: 1.5,
		delay: 50,
		sync: false,
		shuffle: true,
		reverse: false,
	},
});

// img mouse move

let img1 = document.querySelector('#about .about-img img ');
let imgBox = document.querySelector('#about .about-img');
let x = 0,
	y = 0;
let mx = 0,
	my = 0;
const speed1 = 1;
const loop1 = () => {
	mx += (x - mx) * speed1;
	my += (y - my) * speed1;
	window.requestAnimationFrame(loop1);
};

loop1();
const mouseFunc = (e) => {
	(x = e.clientX - window.innerWidth / 2),
		(y = e.clientY - window.innerHeight / 2);
	img1.style.transform = `translate(${-(mx / 50)}px, ${-(my / 70)}px)`;
	imgBox.style.transform = `translate(${mx / 30}px, ${my / 60}px)`;
};
window.addEventListener('mousemove', mouseFunc);
window.addEventListener('touchstart', mouseFunc);
window.addEventListener('touchmove', mouseFunc);
window.addEventListener('touchleave', mouseFunc);
window.addEventListener('touchend', mouseFunc);

//smooth controll
gsap.registerPlugin(ScrollTrigger);

const pageContainer = document.querySelector('[data-scroll-container]');
const scroller = new LocomotiveScroll({
	el: pageContainer,
	smooth: true,
	smoothMobile: 1,
	multiplier: 1,
	// reloadOnContextChange: true,
	touchMultiplier: 3,
	tablet: {
		breakpoint: 1024,
		smooth: true,
	},
	smartphone: {
		breakpoint: 480,
		smooth: true,
	},
});

//gsap service scroll

scroller.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
	scrollTop(value) {
		return arguments.length
			? scroller.scrollTo(value, 0, 0)
			: scroller.scroll.instance.scroll.y;
	},
	getBoundingClientRect() {
		return {
			left: 0,
			top: 0,
			width: window.innerWidth,
			height: window.innerHeight,
		};
	},
	pinType: pageContainer.style.transform ? 'transform' : 'fixed',
});

window.addEventListener('load', function () {
	let pinWrap = document.querySelector('.pin-wrap');
	let pinWrapWidth = pinWrap.offsetWidth;
	let horizontalScrollLength = pinWrapWidth - window.innerWidth;

	// Pinning and horizontal scrolling
	ScrollTrigger.matchMedia({
		'(min-width: 768px)': function () {
			gsap.to('.pin-wrap', {
				scrollTrigger: {
					scroller: pageContainer, //locomotive-scroll
					scrub: true,
					trigger: '#whatido',
					pin: true,
					// anticipatePin: 1,
					start: 'top top',
					end: pinWrapWidth,
				},
				x: -horizontalScrollLength,
				ease: 'none',
			});
			ScrollTrigger.addEventListener('refresh', () => scroller.update()); //locomotive-scroll

			ScrollTrigger.refresh();
		},
	});
	ScrollTrigger.refresh();
});

// skill counter

$('.counter').each(function (index, element) {
	var count = $(this),
		zero = {
			val: 0,
		},
		num = count.data('number'),
		split = (num + '').split('.'), // to cover for instances of decimals
		decimals = split.length > 1 ? split[1].length : 0;

	gsap.to(zero, {
		val: num,
		duration: 5,
		scrollTrigger: {
			scroller: pageContainer,
			trigger: '#skills',
			start: 'top top',
		},
		onUpdate: function () {
			count.text(zero.val.toFixed(decimals) + '%');
		},
	});
});

// arrow up transition

scroller.on('scroll', (position) => {
	var progressPath = document.querySelector('.progress-wrap path');
	var pathLength = progressPath.getTotalLength();
	progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
	progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
	progressPath.style.strokeDashoffset = pathLength;
	progressPath.getBoundingClientRect();
	progressPath.style.transition = progressPath.style.WebkitTransition =
		'stroke-dashoffset 1ms linear';
	var updateProgress = function () {
		var scroll = position.scroll.y;
		var height = $(document).height() - $(window).height();
		var progress = pathLength - (scroll * pathLength) / height;
		progressPath.style.strokeDashoffset = progress;
	};
	updateProgress();
	scroller.on('scroll', () => updateProgress());
	var offset = 150;
	var duration = 10;
	scroller.on(
		'scroll',
		function () {
			if (position.scroll.y > offset) {
				$('.progress-wrap').addClass('active-progress');
			} else {
				$('.progress-wrap').removeClass('active-progress');
			}
		},
		duration
	);
});
$('.progress-wrap').on('click', function (event) {
	event.preventDefault();
	scroller.scrollTo(pageContainer);
});

// logo scroll

$('h1 a').on('click', function (e) {
	e.preventDefault();
	scroller.scrollTo(pageContainer);
});

// parallax
$('.jarallax').jarallax({
	speed: 0.7,
});

// menu scroll smooth

const $workmenuActive = $('.work-menu ul li a');
const $descNavActive = $('.desc-nav nav ul li a');
const $mobileNavActive = $('.mobile-header nav ul li a');

function linkTaget(menu) {
	menu.each(function (idx, item) {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const linkTaget = document.querySelector(item.getAttribute('href'));
			scroller.scrollTo(linkTaget);
		});
	});
}

linkTaget($descNavActive);
linkTaget($mobileNavActive);

// portfolio menu active

function menuActive(menu) {
	menu.each(function (idx, item) {
		$(item).on('click', function (e) {
			e.preventDefault();
			menu.removeClass('active');
			$(item).addClass('active');
		});
	});
}
menuActive($workmenuActive);
menuActive($descNavActive);
menuActive($mobileNavActive);
