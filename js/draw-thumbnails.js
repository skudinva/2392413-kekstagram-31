import { picturePool, templatePicture } from './const';
import { renderBigPicture } from './draw-picture';
import { getPictures, setSelectedPicture } from './picture-state';

const clearThumbnails = function () {
  picturePool.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

const onThumbnailsClick = function (evt, pictureId) {
  evt.preventDefault();
  setSelectedPicture(pictureId);
  renderBigPicture();
};

const createThumbnail = function ({ id, url, description, likes, comments }) {
  const pictureElement = templatePicture.cloneNode(true);
  const link = pictureElement.querySelector('a');
  const img = pictureElement.querySelector('.picture__img');
  const like = pictureElement.querySelector('.picture__likes');
  const comment = pictureElement.querySelector('.picture__comments');

  img.src = url;
  img.alt = description;
  like.textContent = likes;
  comment.textContent = comments.length;

  link.addEventListener('click', (evt) => onThumbnailsClick(evt, id));
  return pictureElement;
};

const drawThumbnails = function () {
  clearThumbnails();
  const pictures = getPictures();
  pictures.forEach((picture) => {
    picturePool.appendChild(createThumbnail(picture));
  });
};

export { drawThumbnails };
