import { renderTemplate } from './utils';

const templatePicture = document.querySelector('#picture').content;
const picturePool = document.querySelector('.pictures');

const uploadPictureForm = document.querySelector('.img-upload__form');
const uploadPictureInput =
  uploadPictureForm.querySelector('.img-upload__input');
const uploadPictureOverlay = uploadPictureForm.querySelector(
  '.img-upload__overlay'
);
const uploadPictureFormCancel = uploadPictureForm.querySelector(
  '.img-upload__cancel'
);
const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
const descriptionInput = uploadPictureForm.querySelector('.text__description');
const submitButton = uploadPictureForm.querySelector('.img-upload__submit');

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImgTag = bigPictureImg.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShowCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
const commentsTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const pictureDescription = bigPicture.querySelector('.social__caption');
const pictureComments = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');

const uploadPicturePreview = document.querySelector('.img-upload__preview');
const uploadPicturePreviewImg = uploadPicturePreview.querySelector('img');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector(
  '.img-upload__effect-level'
);
const effectList = document.querySelector('.effects__list');
const effectsPreview = effectList.querySelectorAll('.effects__preview');

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const alertContainer = renderTemplate('#data-error', '.data-error');
const errorTitle = alertContainer.querySelector('.data-error__title');

const errorContainer = renderTemplate('#error', '.error');
const errorButton = errorContainer.querySelector('.error__button');

const successContainer = renderTemplate('#success', '.success');
const successButton = successContainer.querySelector('.success__button');

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
  alertContainer,
  bigPicture,
  bigPictureCancel,
  bigPictureImgTag,
  commentCount,
  commentLoader,
  commentsShowCount,
  commentsTotalCount,
  descriptionInput,
  effectLevelSlider,
  effectLevelValue,
  effectList,
  effectStyle,
  effectsPreview,
  errorButton,
  errorContainer,
  errorTitle,
  filterButtons,
  filterContainer,
  filterForm,
  hashtagInput,
  imgUploadEffectLevel,
  likesCount,
  pictureComments,
  pictureDescription,
  picturePool,
  scaleControlBigger,
  scaleControlSmaller,
  scaleControlValue,
  submitButton,
  successButton,
  successContainer,
  templatePicture,
  uploadPictureForm,
  uploadPictureFormCancel,
  uploadPictureInput,
  uploadPictureOverlay,
  uploadPicturePreview,
  uploadPicturePreviewImg,
};
