import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const initSliderNews = () => {
  const sliderElement = document.querySelector('.news__swiper');
  if (!sliderElement) {
    return;
  }

  new Swiper('.news__swiper', {
    modules: [Navigation, Pagination],

    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    slidesPerView: 1,
    grid: {
      rows: 2,
      fill: 'row'
    },
    slidesPerGroup: 2,
    spaceBetween: 20,
    initialSlide: 0,
    simulateTouch: true,
    allowTouchMove: true,
    watchOverflow: true,

    pagination: {
      el: '.news__pagination-numbers',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.news__pagination-arrow-next',
      prevEl: '.news__pagination-arrow-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        //slidesPerGroup: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 32,
      }
    }
  });
};

initSliderNews();
