import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const initSliderHero = () => {
  const sliderElement = document.querySelector('.promo__swiper');
  const paginationEl = document.querySelector('.promo__pagination');

  if (!sliderElement || !paginationEl) {
    return;
  }

  new Swiper(sliderElement, {
    modules: [Pagination],
    loop: true,
    direction: 'horizontal',
    slidesPerView: 1,
    allowTouchMove: true,
    simulateTouch: true,
    pagination: {
      el: paginationEl,
      clickable: true,
      bulletClass: 'promo__pagination-bullet',
      bulletActiveClass: 'promo__pagination-bullet--active',
      horizontalClass: 'promo__pagination-horizontal',
      renderBullet: (i, className) =>
        `<button class="${className}" type="button" aria-label="Слайд ${i + 1}"></button>`,
    },

    breakpoints: {
      1440: {
        allowTouchMove: false,
      },
    },

    on: {
      init() {
        movePagination(this);
      },
      slideChange() {
        movePagination(this);

        this.slides.forEach((slide, index) => {
          const isActive = index === this.activeIndex;
          slide
            .querySelectorAll('a, button, input, textarea, select, [tabindex]')
            .forEach((el) => {
              el.tabIndex = isActive ? 0 : -1;
            });
        });
      },
    },
  });
};

function movePagination(swiperInstance) {
  const pagination = document.querySelector('.promo__pagination');
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];

  let wrapper = activeSlide.querySelector('.promo__container-nebo--pagination');
  if (!wrapper) {
    const promoWrapper = activeSlide.querySelector('.promo__wrapper');
    if (!promoWrapper) {
      return;
    }
    wrapper = document.createElement('div');
    wrapper.className = 'promo__container-nebo promo__container-nebo--pagination nebo nebo--tr';
    promoWrapper.prepend(wrapper);
  }

  if (!wrapper.contains(pagination)) {
    wrapper.appendChild(pagination);
  }
}

initSliderHero();
