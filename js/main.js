import { showAlert } from './alert';
import { getData } from './api';
import { createThumbnails } from './draw-thumbnails';
import { initFilters } from './filter-picture';
import { setPictures } from './picture-state';
import { initUploadPicture } from './upload-picture';

getData()
  .then((pictures) => {
    setPictures(pictures);
    initFilters();
    createThumbnails();
  })
  .catch((err) => {
    showAlert(err.message);
  });

initUploadPicture();
