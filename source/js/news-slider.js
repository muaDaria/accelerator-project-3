import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const MAX_VISIBLE_PAGINATION = 4;

const wrapNewsSlides = () => {
  const container = document.querySelector('.news__swiper .swiper-wrapper');
  const contentBlocks = [...container.querySelectorAll('.news__content')];

  const existingSlides = container.querySelectorAll('.news__slide.swiper-slide');
  if (existingSlides.length) {
    existingSlides.forEach((slide) => {
      const children = slide.querySelectorAll('.news__content');
      children.forEach((child) => container.appendChild(child));
      slide.remove();
    });
  }

  let groupSize = 2;

  if (window.innerWidth >= 1440) {
    groupSize = 3;
  } else if (window.innerWidth >= 768) {
    groupSize = 4;
  }

  for (let i = 0; i < contentBlocks.length; i += groupSize) {
    const group = contentBlocks.slice(i, i + groupSize);
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('news__slide', 'swiper-slide');
    group.forEach((element) => slideWrapper.appendChild(element));
    container.appendChild(slideWrapper);
  }
};

const renderPagination = (swiper) => {
  const paginationContainer = document.querySelector('.news__pagination');
  if (!paginationContainer) {
    return;
  }

  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.activeIndex;

  let start = 0;
  let end = Math.min(totalSlides, MAX_VISIBLE_PAGINATION);

  if (totalSlides > MAX_VISIBLE_PAGINATION) {
    if (currentIndex <= 1) {
      start = 0;
      end = MAX_VISIBLE_PAGINATION;
    } else if (currentIndex >= totalSlides - 2) {
      start = totalSlides - MAX_VISIBLE_PAGINATION;
      end = totalSlides;
    } else {
      start = currentIndex - 1;
      end = currentIndex + 3;
      if (end > totalSlides) {
        end = totalSlides;
        start = end - MAX_VISIBLE_PAGINATION;
      }
    }
  }

  let bullets = '';
  for (let i = start; i < end; i++) {
    const isActive = i === currentIndex ? 'news__pagination-bullet--active' : '';
    bullets += `<button type="button" aria-label="Слайд ${i + 1}" class="news__pagination-bullet ${isActive}" data-index="${i}">${i + 1}</button>`;
  }

  paginationContainer.innerHTML = bullets;

  paginationContainer.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'), 10);
      swiper.slideTo(index);
    });
  });
};

const initSliderNews = () => {
  const sliderElement = document.querySelector('.news__swiper');
  if (!sliderElement) {
    return;
  }

  wrapNewsSlides();

  new Swiper(sliderElement, {
    modules: [Navigation, Pagination],
    direction: 'horizontal',
    loop: false,
    grabCursor: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    simulateTouch: true,
    allowTouchMove: true,
    watchOverflow: true,

    navigation: {
      nextEl: '.news__button-next',
      prevEl: '.news__button-prev',
    },

    on: {
      init(swiperInstance) {
        renderPagination(swiperInstance);
      },
      slideChange(swiperInstance) {
        renderPagination(swiperInstance);
      },
    },
  });
};

window.addEventListener('DOMContentLoaded', initSliderNews);
window.addEventListener('resize', () => {
  clearTimeout(window.__newsSliderResizeTimeout);
  window.__newsSliderResizeTimeout = setTimeout(() => {
    document.querySelector('.news__swiper')?.swiper?.destroy(true, true);
    initSliderNews();
  }, 200);
});
