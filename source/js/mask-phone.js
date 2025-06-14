function initPhoneMask(fieldPhone) {
  if (!fieldPhone._imask) {
    fieldPhone._imask = new window.IMask(fieldPhone, {
      mask: '+7 (000) 000-00-00'
    });
  }
  return fieldPhone._imask;
}

export {initPhoneMask};
