import { showAlert } from './alert';
import { getData } from './api';
import { initFilters } from './picture-filter';
import { setPictures } from './picture-state';
import { initUploadPicture } from './picture-upload';
import { initPictureView } from './picture-view';

getData()
  .then((pictures) => {
    setPictures(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  })
  .finally(initFilters);

initUploadPicture();
initPictureView();
