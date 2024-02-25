export const initUploadPicture = function() {
  const uploadPictureForm = document.querySelector('.img-upload__form');
  const uploadPictureInput = uploadPictureForm.querySelector('.img-upload__input');
  const uploadPictureOverlay = uploadPictureForm.querySelector('.img-upload__overlay');
  const uploadPictureFormCancel = uploadPictureForm.querySelector('.img-upload__cancel');
  const uploadPicturePreview = uploadPictureOverlay.querySelector('.img-upload__preview');
  const uploadPicturePreviewImg = uploadPicturePreview.querySelector('img');

  uploadPictureForm.addEventListener('submit', () => {

  });

  uploadPictureInput.addEventListener('change', () => {
    uploadPictureOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPicturePreviewImg.src = uploadPictureInput.value;
  });

  const onClickClose = function(evt) {
    if (evt.type === 'keydown' && evt.key === 'Escape'
    || evt.type === 'click') {
      uploadPictureOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadPictureInput.value = '';
      uploadPictureForm.removeEventListener('keydown', onClickClose);
    }
  };
  uploadPictureForm.addEventListener('keydown', onClickClose);
  uploadPictureFormCancel.addEventListener('click', onClickClose);
};
