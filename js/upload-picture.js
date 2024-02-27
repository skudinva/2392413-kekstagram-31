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
//  const uploadPicturePreview = uploadPictureOverlay.querySelector(
//    '.img-upload__preview'
//  );
//  const uploadPicturePreviewImg = uploadPicturePreview.querySelector('img');
  const hashtagInput = uploadPictureForm.querySelector('.text__hashtags');
  const descriptionInput = uploadPictureForm.querySelector('.text__description');

  const pristine = new Pristine(uploadPictureForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  }, true);

  const getHashtagErrorMessage = function(hashtag) {
    if(hashtag === '') {
      return '';
    }

    const hashtagArray = hashtag.split(' ');
    if(!hashtagArray.every(validateHashtag)) {
      return 'Начинается с #, до 19 символов и цифр';
    }

    if((new Set(hashtagArray)).size !== hashtagArray.length) {
      return 'Есть дублирующие хэштеги';
    }

    if(hashtagArray.length > 5){
      return 'Нельзя указать больше пяти хэштегов';
    }

    return '';
  };

  pristine.addValidator(
    hashtagInput,
    (hashtag) => (getHashtagErrorMessage(hashtag) === ''),
    getHashtagErrorMessage
  );

  pristine.addValidator(
    descriptionInput,
    (description) => validateStringLen(description, 140),
    'не более 140 символов'
  );

  uploadPictureForm.addEventListener('submit', (evt) => {
    if(!pristine.validate()) {
      evt.preventDefault();
    }
  });

  uploadPictureInput.addEventListener('change', () => {
    uploadPictureOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');    
  });

  const onClickClose = function (evt) {
    if ((evt.type === 'keydown' && evt.key === 'Escape'
      && evt.target !== hashtagInput
      && evt.target !== descriptionInput)
      || evt.type === 'click'
    ) {
      uploadPictureOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadPictureInput.value = '';
      document.removeEventListener('keydown', onClickClose);
    }
  };

  document.addEventListener('keydown', onClickClose);
  uploadPictureFormCancel.addEventListener('click', onClickClose);
};
