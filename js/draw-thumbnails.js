import { picturePool, templatePicture } from './const';
import { renderBigPicture } from './draw-picture';
import { getPictures, setSelectedPicture } from './picture-state';

/**
 * Очистка миниатюр
 */
const clearThumbnails = function () {
  picturePool.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

/**
 * Обработчик события клик на миниатюре
 */
const onThumbnailClick = function (evt, pictureId) {
  evt.preventDefault();
  setSelectedPicture(pictureId);
  renderBigPicture();
};

/**
 * Создание одной миниатюры
 */
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

  link.addEventListener('click', (evt) => onThumbnailClick(evt, id));
  return pictureElement;
};

/**
 * Создание миниатюр
 */
const createThumbnails = function () {
  clearThumbnails();
  const pictures = getPictures();
  pictures.forEach((picture) =>
    picturePool.appendChild(createThumbnail(picture))
  );
};

export { createThumbnails };
