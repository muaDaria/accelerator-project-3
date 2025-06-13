/*const reorderTabIndexReadingFlow = () => {
  const navLinks = Array.from(document.querySelectorAll('.footer__list a'));
  const socialLinks = Array.from(document.querySelectorAll('.social__link'));
  const privacyLink = document.querySelector('.footer__privacy-policy');
  const allFooterLinks = Array.from(document.querySelectorAll('.footer a'));

  allFooterLinks.forEach(link => {
    link.tabIndex = -1;
  });

  if (window.innerWidth < 1440) {
    allFooterLinks.forEach(link => {
      link.tabIndex = 0;
    });
    return;
  }

  [...navLinks, ...socialLinks].forEach(link => {
    link.tabIndex = 0;
  });

  if (privacyLink) {
    privacyLink.tabIndex = 0;
  }
};

reorderTabIndexReadingFlow();
window.addEventListener('resize', reorderTabIndexReadingFlow);
*/

const reorderTabIndex = () => {
  const navLinks = Array.from(document.querySelectorAll('.footer__list a'));
  const socialLinks = Array.from(document.querySelectorAll('.footer__social a'));
  const privacyLink = document.querySelector('.footer__privacy-policy');
  const allFooterLinks = Array.from(document.querySelectorAll('.footer a'));

  if (window.innerWidth >= 1440) {
    allFooterLinks.forEach((link) => {
      link.tabIndex = -1;
    });

    let tabIndex = 1;
    [...navLinks, ...socialLinks].forEach((link) => {
      link.tabIndex = tabIndex++;
    });

    if (privacyLink) {
      privacyLink.tabIndex = tabIndex;
    }
  } else {
    allFooterLinks.forEach((link) => {
      link.tabIndex = 0;
    });
  }
};

reorderTabIndex();
window.addEventListener('resize', reorderTabIndex);
