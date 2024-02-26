import { Pristine } from '../vendor/pristine/pristine.min';
import { validateHashtag, validateStringLen } from './utils';

export const initUploadPicture = function () {
  const uploadPictureForm = document.querySelector('.img-upload__form');
  const uploadPictureInput =
    uploadPictureForm.querySelector('.img-upload__input');
  const uploadPictureOverlay = uploadPictureForm.querySelector(
    '.img-upload__overlay'
  );
  const uploadPictureFormCancel = uploadPictureForm.querySelector(
    '.img-upload__cancel'
  );
  const uploadPicturePreview = uploadPictureOverlay.querySelector(
    '.img-upload__preview'
  );
  const uploadPicturePreviewImg = uploadPicturePreview.querySelector('img');
  const pristine = new Pristine(uploadPictureForm, {}, false);

  pristine.addValidator(
    uploadPictureForm.querySelector('.text__hashtags'),
    validateHashtag,
    'Начинается с #, до 19 символов и цифр'
  );

  const validateDescription = (description) => {
    validateStringLen(description, 140);
  };

  pristine.addValidator(
    uploadPictureForm.querySelector('.text__description'),
    validateDescription,
    'не более 140 символов'
  );

  uploadPictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  uploadPictureInput.addEventListener('change', () => {
    uploadPictureOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPicturePreviewImg.src = uploadPictureInput.value;
  });

  const onClickClose = function (evt) {
    if (
      (evt.type === 'keydown' && evt.key === 'Escape') ||
      evt.type === 'click'
    ) {
      uploadPictureOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadPictureInput.value = '';
      uploadPictureForm.removeEventListener('keydown', onClickClose);
    }
  };
  uploadPictureForm.addEventListener('keydown', onClickClose);
  uploadPictureFormCancel.addEventListener('click', onClickClose);
};
