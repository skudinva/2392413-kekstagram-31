const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_TIMEOUT = 500;
const PICTURE_RANDOM_COUNT = 10;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const COMMENT_LOADING_COUNT = 5;

const SCALE_STEP = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_DEFAULT_VALUE = 100;

/**
 * В объекте хранится для каждого эффекта параметры слайдера и стиля.
 * CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
 * - Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
 * - Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
 * - Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
 * - Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
 * - Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
 * - Для эффекта «Оригинал» CSS-стили filter удаляются.
 */
const effectStyle = {
  none: {
    slider: {
      range: { min: 0, max: 0 },
      step: 0.1,
    },
    css: () => ({ filter: 'none' }),
  },
  chrome: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => ({ filter: `grayscale(${value})` }),
  },
  sepia: {
    slider: {
      range: { min: 0, max: 1 },
      step: 0.1,
    },
    css: (value) => ({ filter: `sepia(${value})` }),
  },
  marvin: {
    slider: {
      range: { min: 0, max: 100 },
      step: 1,
    },
    css: (value) => ({ filter: `invert(${value}%)` }),
  },
  phobos: {
    slider: {
      range: { min: 0, max: 3 },
      step: 0.1,
    },
    css: (value) => ({ filter: `blur(${value}px)` }),
  },
  heat: {
    slider: {
      range: { min: 1, max: 3 },
      step: 0.1,
    },
    css: (value) => ({ filter: `brightness(${value})` }),
  },
};

export {
  ALERT_SHOW_TIME,
  COMMENT_LOADING_COUNT,
  DEBOUNCE_TIMEOUT,
  FILE_TYPES,
  PICTURE_RANDOM_COUNT,
  SCALE_DEFAULT_VALUE,
  SCALE_MAX_VALUE,
  SCALE_STEP,
  effectStyle,
};
