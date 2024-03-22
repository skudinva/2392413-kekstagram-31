import { picturePoolElement, templatePictureElement } from './page-elements';
import { getPictures, setSelectedPicture } from './picture-state';
import { renderBigPicture } from './picture-view';

/**
 * Очистка миниатюр
 */
const clearThumbnails = () => {
  picturePoolElement.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

/**
 * Обработчик события клик на миниатюре
 */
const onThumbnailClick = (evt) => {
  const picture = evt.target.closest('.picture');
  if (!picture) {
    return;
  }

  evt.preventDefault();
  setSelectedPicture(Number(picture.dataset.pictureId));
  renderBigPicture();
};

/**
 * Создание миниатюры
 * @param {{id: number, url: string, description: string, likes: number, comments: string}} данные миниатюры
 * @returns {DocumentFragment}
 */
const getThumbnailElement = ({ id, url, description, likes, comments }) => {
  const pictureElement = templatePictureElement.content.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');
  const like = pictureElement.querySelector('.picture__likes');
  const comment = pictureElement.querySelector('.picture__comments');
  const link = pictureElement.querySelector('a');

  link.dataset.pictureId = id;
  img.src = url;
  img.alt = description;
  like.textContent = likes;
  comment.textContent = comments.length;

  return pictureElement;
};

/**
 * Создание миниатюр
 */
const createThumbnails = () => {
  clearThumbnails();
  const pictures = getPictures();
  pictures.forEach((picture) => picturePoolElement.appendChild(getThumbnailElement(picture))
  );
  picturePoolElement.addEventListener('click', onThumbnailClick);
};

export { createThumbnails };
