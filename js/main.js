import { showAlert } from './alert';
import { getData } from './api';
import { drawThumbnails } from './draw-thumbnails';
import { initUploadPicture } from './upload-picture';

getData()
  .then((posts) => {
    drawThumbnails(posts);
  })
  .catch((err) => {
    showAlert(err.message);
  });

initUploadPicture();
