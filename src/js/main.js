document.addEventListener('DOMContentLoaded', function () {
	const menuBtn = document.getElementById('menu-btn');
	const nav = document.getElementById('nav');
	const navContainer = document.getElementById('nav-container');
	const logo = document.getElementById('logo');

	const carousel = document.getElementById('carousel');

	let firstSlide;
	let lastSlide;

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

	function getJsonData() {
		return new Promise((resolve, reject) => {
			fetch('./js/carousel.json')
				.then((resp) => resp.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	async function displayCarousel() {
		const dataList = await getJsonData();

		dataList.slides.forEach((slide, slideNumber) => {
			newSlide = document.createElement('div');
			newSlide.classList.add('carousel__slide');

			newSlide.innerHTML = `
				<div class="carousel__hero">
					<div class="carousel__hero-img">
						<img
							src="${slide.image}"
							class="carousel__hero-img-src"
							alt="img1"
						/>
					</div>

					<div class="carousel__btns">
					<button class="carousel__btn btn-left" id="prev">
						<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M13 0L1 12l12 12"
								stroke="#FFF"
								fill="none"
								fill-rule="evenodd"
							/>
						</svg>
					</button>
					<button class="carousel__btn btn-right" id="next">
						<svg width="14" height="24" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 0l12 12L1 24"
								stroke="#FFF"
								fill="none"
								fill-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
				</div>

					<div class="carousel__content">
						<h2 class="carousel__title">
							${slide.title}
						</h2>
						<p class="carousel__desc">
							${slide.desc}
						</p>
						<button class="carousel__button-open">
							Shop now
							<svg width="40" height="12" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z"
									fill="#000"
									fill-rule="nonzero"
								/>
							</svg>
						</button>
					</div>
				`;

			carousel.appendChild(newSlide);

			if (slideNumber === 0) {
				firstSlide = newSlide;
				newSlide.classList.add('active');
			} else if (slideNumber + 1 === dataList.slides.length) {
				lastSlide = newSlide;
			}
		});

		nextSlide();
		previousSlide();
	}

	function nextSlide() {
		const nextBtn = document.querySelectorAll('.btn-right');

		nextBtn.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const activeSlide = document.querySelector('.carousel__slide.active');
				let nextSibling = activeSlide.nextElementSibling;

				if (nextSibling == null) {
					nextSibling = activeSlide;
				}

				if (nextSibling.classList.contains('carousel__slide')) {
					activeSlide.classList.remove('active');
					nextSibling.classList.add('active');
				}
			});
		});
	}

	function previousSlide() {
		const prevBtn = document.querySelectorAll('.btn-left');

		prevBtn.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const activeSlide = document.querySelector('.carousel__slide.active');
				let nextSibling = activeSlide.previousElementSibling;

				console.log(nextSibling);

				if (nextSibling == null) {
					nextSibling = activeSlide;
				}

				if (nextSibling.classList.contains('carousel__slide')) {
					activeSlide.classList.remove('active');
					nextSibling.classList.add('active');
				}
			});
		});
	}

	(function () {
		displayCarousel();
	})();
});
