import { renderTemplate } from './utils';

const templatePictureElement = document.querySelector('#picture').content;

const picturePoolElement = document.querySelector('.pictures');

const uploadPictureFormElement = document.querySelector('.img-upload__form');
const uploadPictureInputElement =
  uploadPictureFormElement.querySelector('.img-upload__input');
const uploadPictureOverlayElement = uploadPictureFormElement.querySelector(
  '.img-upload__overlay'
);
const uploadPictureFormCancelElement = uploadPictureFormElement.querySelector(
  '.img-upload__cancel'
);
const hashtagInputElement =
  uploadPictureFormElement.querySelector('.text__hashtags');
const descriptionInputElement =
  uploadPictureFormElement.querySelector('.text__description');
const submitButtonElement = uploadPictureFormElement.querySelector(
  '.img-upload__submit'
);
const inputFieldContainerElement =
  uploadPictureFormElement.querySelector('.img-upload__text');

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement =
  bigPictureElement.querySelector('.big-picture__img');
const bigPictureCancelElement = bigPictureElement.querySelector(
  '.big-picture__cancel'
);
const bigPictureImgTagElement = bigPictureImgElement.querySelector('img');
const bigPictureLikesCountElement =
  bigPictureElement.querySelector('.likes-count');
const bigPictureCommentsShowCountElement = bigPictureElement.querySelector(
  '.social__comment-shown-count'
);
const bigPictureCommentsTotalCountElement = bigPictureElement.querySelector(
  '.social__comment-total-count'
);
const bigPictureDescriptionElement =
  bigPictureElement.querySelector('.social__caption');
const bigPictureCommentsElement =
  bigPictureElement.querySelector('.social__comments');
const bigPictureCommentCountElement = bigPictureElement.querySelector(
  '.social__comment-count'
);
const bigPictureCommentLoaderElement =
  bigPictureElement.querySelector('.comments-loader');

const uploadPicturePreviewElement = document.querySelector(
  '.img-upload__preview'
);
const uploadPicturePreviewImgElement =
  uploadPicturePreviewElement.querySelector('img');
const scaleControlSmallerElement = document.querySelector(
  '.scale__control--smaller'
);
const scaleControlBiggerElement = document.querySelector(
  '.scale__control--bigger'
);
const scaleControlValueElement = document.querySelector(
  '.scale__control--value'
);
const effectLevelSliderElement = document.querySelector(
  '.effect-level__slider'
);
const effectLevelValueElement = document.querySelector('.effect-level__value');
const imgUploadEffectLevelElement = document.querySelector(
  '.img-upload__effect-level'
);
const effectListElement = document.querySelector('.effects__list');
const effectsPreviewElement =
  effectListElement.querySelectorAll('.effects__preview');

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement =
  filterContainerElement.querySelector('.img-filters__form');
const filterButtonsElement = filterContainerElement.querySelectorAll(
  '.img-filters__button'
);

const errorDataContainerElement = renderTemplate('#data-error', '.data-error');
const errorDataTitleElement =
  errorDataContainerElement.querySelector('.data-error__title');

const errorContainerElement = renderTemplate('#error', '.error');
const errorButtonElement =
  errorContainerElement.querySelector('.error__button');

const successContainerElement = renderTemplate('#success', '.success');
const successButtonElement =
  successContainerElement.querySelector('.success__button');

export {
  bigPictureCancelElement,
  bigPictureCommentCountElement,
  bigPictureCommentLoaderElement,
  bigPictureCommentsElement,
  bigPictureCommentsShowCountElement,
  bigPictureCommentsTotalCountElement,
  bigPictureDescriptionElement,
  bigPictureElement,
  bigPictureImgTagElement,
  bigPictureLikesCountElement,
  descriptionInputElement,
  effectLevelSliderElement,
  effectLevelValueElement,
  effectListElement,
  effectsPreviewElement,
  errorButtonElement,
  errorContainerElement,
  errorDataContainerElement,
  errorDataTitleElement,
  filterButtonsElement,
  filterContainerElement,
  filterFormElement,
  hashtagInputElement,
  imgUploadEffectLevelElement,
  inputFieldContainerElement,
  picturePoolElement,
  scaleControlBiggerElement,
  scaleControlSmallerElement,
  scaleControlValueElement,
  submitButtonElement,
  successButtonElement,
  successContainerElement,
  templatePictureElement,
  uploadPictureFormCancelElement,
  uploadPictureFormElement,
  uploadPictureInputElement,
  uploadPictureOverlayElement,
  uploadPicturePreviewElement,
  uploadPicturePreviewImgElement,
};
