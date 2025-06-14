import './vendor/imask.js';
import {initPhoneMask} from './mask-phone.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form__group');

  const fieldName = form.querySelector('.form__field--name');
  const fieldPhone = form.querySelector('.form__field--phone');
  const fieldText = document.querySelector('.form__text');
  const fieldSelect = form.querySelector('#city-select');
  const selectWrapper = fieldSelect.closest('.ss-main');
  const fieldAgreement = form.querySelector('.form__control');

  const NAME_PATTERN = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  const inputs = [fieldName, fieldPhone, fieldText, fieldSelect, fieldAgreement];

  const phoneMask = initPhoneMask(fieldPhone);

  form.addEventListener('submit', (evt) => {
    let isValid = true;

    inputs.forEach((input) => {
      input.classList.remove('form__error');
      input.setCustomValidity('');
    });

    if (selectWrapper) {
      selectWrapper.classList.remove('form__error');
    }

    if (!fieldName.value.trim() || !NAME_PATTERN.test(fieldName.value)) {
      fieldName.classList.add('form__error');
      fieldName.setCustomValidity('Введите корректное имя');
      isValid = false;
    }

    if (phoneMask.unmaskedValue.length !== 10) {
      fieldPhone.classList.add('form__error');
      fieldPhone.setCustomValidity('Введите номер в формате +7 (XXX) XXX-XX-XX');
      isValid = false;
    }

    if (!fieldText.value.trim()) {
      fieldText.classList.add('form__error');
      fieldText.setCustomValidity('Поле обязательно для заполнения');
      fieldText.blur();
      fieldText.focus();
      isValid = false;
    }

    if (!fieldSelect.value) {
      fieldSelect.setCustomValidity('Пожалуйста, выберите город');
      if (selectWrapper) {
        selectWrapper.classList.add('form__error');
      } else {
        fieldSelect.classList.add('form__error');
      }
      isValid = false;
    }

    if (!fieldAgreement.checked) {
      fieldAgreement.classList.add('form__error');
      isValid = false;
    }

    if (!isValid) {
      evt.preventDefault();
      requestAnimationFrame(() => {
        inputs.forEach((input) => input.reportValidity());
      });
    }
  });

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      input.classList.remove('form__error');
      input.setCustomValidity('');
    });

    if (input.type === 'checkbox') {
      input.addEventListener('change', () => {
        input.classList.remove('form__error');
        input.setCustomValidity('');
      });
    }
  });

  if (fieldSelect) {
    fieldSelect.addEventListener('change', () => {
      if (selectWrapper) {
        selectWrapper.classList.remove('form__error');
      } else {
        fieldSelect.classList.remove('form__error');
      }
      fieldSelect.setCustomValidity('');
    });
  }
});
