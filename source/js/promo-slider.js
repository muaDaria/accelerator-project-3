import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';

const initSliderHero = () => {
  const sliderElement = document.querySelector('.promo__swiper');
  if (!sliderElement) {
    return;
  }

  new Swiper('.promo__swiper',{
    modules: [Pagination],

    direction: 'horizontal',
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    initialSlide: 0,
    simulateTouch: true,
    allowTouchMove: true,

    pagination: {
      el: '.promo__pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} promo__pagination-bullet" type="button" aria-label="Выберите слайд"></button>`;
      },
      bulletClass: 'promo__pagination-bullet',
      bulletActiveClass: 'promo__pagination-bullet--active',
      horizontalClass: 'promo__pagination-horizontal',
    },

    breakpoints: {
      1440: {
        allowTouchMove: false,
        slidesPerView: 1,
      }
    },

    on: {
      slideChange: function () {
        this.slides.forEach((slide, index) => {
          const isActive = index === this.activeIndex;
          slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
            .forEach((el) => {
              el.tabIndex = isActive ? 0 : -1;
            });
        });
      },
    },
  });
};

initSliderHero();
