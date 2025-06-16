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

  const content = document.querySelector('.ss-content');
  if (content && !content.hasAttribute('aria-label')) {
    content.setAttribute('aria-label', 'Выберите город');
  }
};

const toggleSelectContentClass = (wrapper) => {
  const content = document.querySelector('.ss-content');
  if (!content) {
    return;
  }

  const expanded = wrapper.getAttribute('aria-expanded');
  content.classList.toggle('form__select-open', expanded === 'true');
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
      const content = document.querySelector('.ss-content');
      if (content && !content.hasAttribute('aria-label')) {
        content.setAttribute('aria-label', 'Выберите город');
      }
    });

    observer.observe(wrapper, {
      attributes: true,
      attributeFilter: ['aria-expanded']
    });
  }
});
