import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';

const initSliderReviews = () => {
  const sliderElement = document.querySelector('.reviews__swiper');
  if (!sliderElement) {
    return;
  }

  new Swiper('.reviews__swiper',{
    modules: [Navigation, Scrollbar],

    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    slidesPerView: 1,
    initialSlide: 0,
    simulateTouch: true,
    allowTouchMove: true,
    watchOverflow: true,

    navigation: {
      nextEl: '.reviews__button-next',
      prevEl: '.reviews__button-prev',
    },

    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 'auto',
        spaceBetween: 32,
        allowTouchMove: false,
      }
    }
  });
};

initSliderReviews();
