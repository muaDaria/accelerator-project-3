import './vendor/slimselect.js';

const addCustomizations = (wrapper) => {
  if (!wrapper || !wrapper.classList) {
    return;
  }
  wrapper.setAttribute('tabindex', '0');

  const arrow = wrapper.querySelector('.ss-arrow');
  if (arrow) {
    arrow.remove();
  }
};

const toggleSelectContentClass = (wrapper) => {
  const content = document.querySelector('.ss-content');
  if (!content) {
    return;
  }

  const expanded = wrapper.getAttribute('aria-expanded');
  if (expanded === 'true') {
    content.classList.add('form__select-open');
  } else {
    content.classList.remove('form__select-open');
  }
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

document.addEventListener('DOMContentLoaded', () => {
  new window.SlimSelect({
    select: '#city-select',
    cssClasses: { option: 'form__option' },
    settings: { showSearch: false, hideSelected: true }
  });

  const wrapper = document.querySelector('.ss-main');
  if (wrapper) {
    addCustomizations(wrapper);

    const observer = new MutationObserver(() => {
      toggleSelectContentClass(wrapper);
    });

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ['aria-expanded']
    });
  }
});
