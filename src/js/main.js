document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menu-btn');
	const nav = document.getElementById('nav');
	const navContainer = document.getElementById('nav-container');
	const logo = document.getElementById('logo');

	menuBtn.addEventListener('click', (e) => {
		menuBtn.classList.toggle('clicked');
		nav.classList.toggle('show');
		navContainer.classList.toggle('overlay');
		logo.classList.toggle('hide');
	});

	window.addEventListener('scroll', (e) => {
		if (document.documentElement.scrollTop > 0) {
			navContainer.classList.add('sticky');
		} else {
			navContainer.classList.remove('sticky');
		}
	});
});
