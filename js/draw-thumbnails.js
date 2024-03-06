import { picturePool, templatePicture } from './const';
import { renderBigPicture } from './draw-picture';
import { getPictures, setSelectedPicture } from './picture-state';

const drawThumbnails = function () {
  const pictures = getPictures();
  pictures.forEach((picture) => {
    const pictureElement = templatePicture.cloneNode(true);
    const link = pictureElement.querySelector('a');
    const img = pictureElement.querySelector('.picture__img');
    const like = pictureElement.querySelector('.picture__likes');
    const comment = pictureElement.querySelector('.picture__comments');
    img.src = picture.url;
    img.alt = picture.description;
    like.textContent = picture.likes;
    comment.textContent = picture.comments.length;
    picturePool.appendChild(pictureElement);
    link.addEventListener('click', (evt) => {
      evt.preventDefault();
      setSelectedPicture(picture.id);
      renderBigPicture();
    });
  });
};

export { drawThumbnails };
