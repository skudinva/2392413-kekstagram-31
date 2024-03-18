import { picturePool, templatePicture } from './page-elements';
import { getPictures, setSelectedPicture } from './picture-state';
import { renderBigPicture } from './picture-view';

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
const onThumbnailClick = function (evt) {
  const picture = evt.target.closest('.picture__img');
  if (!picture) {
    return;
  }

  evt.preventDefault();
  setSelectedPicture(+picture.dataset.pictureId);
  renderBigPicture();
};

/**
 * Создание одной миниатюры
 * @param {{id: number, url: string, description: string, likes: number, comments: string}} данные миниатюры
 * @returns {DocumentFragment}
 */
const createThumbnail = function ({ id, url, description, likes, comments }) {
  const pictureElement = templatePicture.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');
  const like = pictureElement.querySelector('.picture__likes');
  const comment = pictureElement.querySelector('.picture__comments');

  img.dataset.pictureId = id;
  img.src = url;
  img.alt = description;
  like.textContent = likes;
  comment.textContent = comments.length;

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
  picturePool.addEventListener('click', onThumbnailClick);
};

export { createThumbnails };
