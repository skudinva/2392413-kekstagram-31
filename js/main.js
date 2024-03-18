import { getData } from './api';
import { showErrorData } from './error-data';
import { initFilters } from './picture-filter';
import { setPictures } from './picture-state';
import { initUploadPicture } from './picture-upload';
import { initPictureView } from './picture-view';

getData()
  .then((pictures) => {
    setPictures(pictures);
  })
  .catch((err) => {
    showErrorData(err.message);
  })
  .finally(initFilters);

initUploadPicture();
initPictureView();
