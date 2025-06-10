import './vendor/slimselect.js';

document.addEventListener('DOMContentLoaded', () => {
  const slim = new window.SlimSelect ({
    select: '#city-select',
    cssClasses: {
      option: 'form__option'
    },
    settings: {
      showSearch: false,
      hideSelected: true,
    },
  });

  const formSelect = document.querySelector('.ss-main');
  const content = document.querySelector('.ss-content');

  if (formSelect) {
    formSelect.classList.add('form__select');
    formSelect.setAttribute('tabindex', '0');

    const arrow = formSelect.querySelector('.ss-arrow');
    if (arrow) {
      arrow.remove();
    }

    formSelect.addEventListener('focus', (evt) => {
      if (evt.detail === 0) {
        slim.open();
      }
    });

    const observer = new MutationObserver(() => {
      const expanded = formSelect.getAttribute('aria-expanded');
      if (expanded === 'true') {
        content.style.display = 'block';
        content.classList.add('form__select-open');
      } else {
        content.style.display = 'none';
        content.classList.remove('form__select-open');
      }
    });

    observer.observe(formSelect, { attributes: true, attributeFilter: ['aria-expanded'] });
  }
});
