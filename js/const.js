export const templatePicture = document.querySelector('#picture').content;
export const picturePool = document.querySelector('.pictures');

export const uploadPictureForm = document.querySelector('.img-upload__form');
export const uploadPictureInput =
  uploadPictureForm.querySelector('.img-upload__input');
export const uploadPictureOverlay = uploadPictureForm.querySelector(
  '.img-upload__overlay'
);
export const uploadPictureFormCancel = uploadPictureForm.querySelector(
  '.img-upload__cancel'
);
export const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
export const descriptionInput =
  uploadPictureForm.querySelector('.text__description');
export const submitButton = uploadPictureForm.querySelector(
  '.img-upload__submit'
);

export const bigPicture = document.querySelector('.big-picture');
export const bigPictureImg = bigPicture.querySelector('.big-picture__img');
export const bigPictureCancel = bigPicture.querySelector(
  '.big-picture__cancel'
);
export const img = bigPictureImg.querySelector('img');
export const likes = bigPicture.querySelector('.social__likes');
export const commentsShowCount = bigPicture.querySelector(
  '.social__comment-shown-count'
);
export const commentsTotalCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
export const pictureDescription = bigPicture.querySelector('.social__caption');
export const pictureComments = bigPicture.querySelector('.social__comments');
export const commentCount = bigPicture.querySelector('.social__comment-count');
export const commentLoader = bigPicture.querySelector('.comments-loader');

export const uploadPicturePreview = document.querySelector(
  '.img-upload__preview'
);
export const scaleControlSmaller = document.querySelector(
  '.scale__control--smaller'
);
export const scaleControlBigger = document.querySelector(
  '.scale__control--bigger'
);
export const scaleControlValue = document.querySelector(
  '.scale__control--value'
);
export const effectLevelSlider = document.querySelector(
  '.effect-level__slider'
);
export const effectLevelValue = document.querySelector('.effect-level__value');
export const imgUploadEffectLevel = document.querySelector(
  '.img-upload__effect-level'
);
export const effectList = document.querySelector('.effects__list');
