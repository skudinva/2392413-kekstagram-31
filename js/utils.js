const getRandomInteger = function (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(firstNumber, secondNumber));
  const upper = Math.floor(Math.max(firstNumber, secondNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

const getUniqueRandomArrayElement = function (elements, maxCount) {
  const uniqueueIndex = new Set();
  while (uniqueueIndex.size !== Math.min(maxCount, elements.length)) {
    uniqueueIndex.add(getRandomInteger(0, elements.length - 1));
  }

  const result = [];
  uniqueueIndex.forEach((value) => result.push(elements[value]));
  return result;
};

const validateHashtag = function (hashtag) {
  return /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);
};

const allowHashtagChar = function (char) {
  return /[#a-zа-яё0-9 ]/.test(char);
};

const validateStringLen = function (stringValue, maxLength) {
  return stringValue.length <= maxLength;
};

const debounce = function (callback, timeoutDelay) {
  let timeoutId = 0;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, rest);
    }, timeoutDelay);
  };
};

const renderTemplate = function (templateId, selector) {
  const template = document.querySelector(templateId).content;
  return (selector ? template.querySelector(selector) : template).cloneNode(
    true
  );
};

const addOrRemoveClass = function (element, className, condition) {
  if (condition) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
};

const isEscapeKey = function (evt) {
  return evt.key === 'Escape';
};

export {
  addOrRemoveClass,
  allowHashtagChar,
  debounce,
  getRandomArrayElement,
  getRandomInteger,
  getUniqueRandomArrayElement,
  isEscapeKey,
  renderTemplate,
  validateHashtag,
  validateStringLen,
};
