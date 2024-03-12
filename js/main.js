import { showAlert } from './alert';
import { getData } from './api';
import { initFilters } from './filter-picture';
import { setPictures } from './picture-state';
import { initUploadPicture } from './upload-picture';

getData()
  .then((pictures) => {
    setPictures(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  })
  .finally(initFilters);

initUploadPicture();
