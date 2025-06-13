const navToggle = document.querySelector('.header__toggle');
const navList = document.querySelector('.header__nav-list');
const logo = document.querySelector('.header__logo-wrapper');
const navLinks = navList.querySelectorAll('.header__nav-link');
const overlayElement = document.querySelector('.overlay');

function onEscapePress(event) {
  if (event.key === 'Escape') {
    toggleNav();
  }
}

function toggleNav() {
  const isOpen = navList.classList.toggle('header__nav-list--open');
  navToggle.classList.toggle('header__toggle--open', isOpen);
  logo.classList.toggle('header__logo-wrapper--hidden', isOpen);
  overlayElement.classList.toggle('overlay--active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  navLinks.forEach((link) => {
    link.removeEventListener('click', toggleNav);
    if (isOpen) {
      link.addEventListener('click', toggleNav);
    }
  });

  if (isOpen) {
    document.addEventListener('keydown', onEscapePress);
  } else {
    document.removeEventListener('keydown', onEscapePress);
  }
}

function toggleSublist(evt) {
  const dropdownItem = evt.target.closest('.header__nav-item--dropdown');
  if (dropdownItem) {
    dropdownItem.classList.toggle('header__nav-item--open');
  }
}

navToggle.addEventListener('click', toggleNav);
overlayElement.addEventListener('click', toggleNav);
navList.addEventListener('click', toggleSublist);
