import Swiper from 'swiper';
import {Navigation} from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';

const initSliderPrograms = () => {
  const sliderElement = document.querySelector('.programs__swiper');
  if (!sliderElement) {
    return;
  }

  new Swiper('.programs__swiper',{
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
      nextEl: '.programs__button-next',
      prevEl: '.programs__button-prev',
    },

    scrollbar: {
      el: '.programs__scrollbar',
      draggable: true,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 32,
      }
    }
  });
};

initSliderPrograms();
