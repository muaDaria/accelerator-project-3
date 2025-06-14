import './vendor/slimselect.js';

let modalSlimSelectInstance = null;
const modal = document.querySelector('.modal');
const openBtn = document.querySelector('.about__button');
const closeBtn = modal.querySelector('.modal__button');

const tryRemoveArrows = () => {
  let attempts = 0;
  const maxAttempts = 20;
  const interval = setInterval(() => {
    const arrows = document.querySelectorAll('svg.ss-arrow');
    arrows.forEach((arrow) => arrow.remove());

    attempts++;
    if (attempts >= maxAttempts) {
      clearInterval(interval);
    }
  }, 100);
};

const addCustomizations = (wrapper) => {
  if (!wrapper || !wrapper.classList) {
    return;
  }
  wrapper.setAttribute('tabindex', '0');
};

const toggleSelectContentClass = () => {
  const wrappers = document.querySelectorAll('.ss-main');
  const contents = document.querySelectorAll('.ss-content');

  wrappers.forEach((wrapper, index) => {
    const expanded = wrapper.getAttribute('aria-expanded') === 'true';
    const content = contents[index];
    if (content) {
      content.classList.toggle('form__select-open', expanded);
    }
  });
};

const observeAllWrappers = () => {
  document.querySelectorAll('.ss-main').forEach((wrapper) => {
    new MutationObserver(() => {
      toggleSelectContentClass();
    }).observe(wrapper, {
      attributes: true,
      attributeFilter: ['aria-expanded']
    });
  });
};

const originalRender = window.SlimSelect.prototype.render;
window.SlimSelect.prototype.render = function (...args) {
  originalRender.apply(this, args);
  addCustomizations(this.main);
};

const originalInit = window.SlimSelect.prototype.init;
window.SlimSelect.prototype.init = function (...args) {
  originalInit.apply(this, args);
  addCustomizations(this.main);
};

const initModalSelect = () => {
  if (!modalSlimSelectInstance) {
    const selectElement = modal.querySelector('#city-select--modal');
    if (!selectElement) {
      return;
    }

    modalSlimSelectInstance = new window.SlimSelect({
      select: selectElement,
      cssClasses: { option: 'form__option' },
      settings: { showSearch: false, hideSelected: true }
    });

    tryRemoveArrows();

    setTimeout(() => {
      toggleSelectContentClass();
      observeAllWrappers();
    }, 0);
  }
};

const openModal = () => {
  modal.classList.remove('modal--close');
  document.body.style.overflow = 'hidden';
  initModalSelect();
};

const closeModal = () => {
  modal.classList.add('modal--close');
  document.body.style.overflow = '';
};

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !modal.classList.contains('modal--close')) {
    closeModal();
  }
});

modal.addEventListener('click', (evt) => {
  if (evt.target === modal) {
    closeModal();
  }
});
