import { SCALE_DEFAULT_VALUE, SCALE_MAX_VALUE, SCALE_STEP } from './config';
import {
  scaleControlBiggerElement,
  scaleControlSmallerElement,
  scaleControlValueElement,
  uploadPicturePreviewImgElement,
} from './page-elements';

/**
 * Функция получения текущего значения масштаба в процентах
 */
const getScaleValue = function () {
  return +scaleControlValueElement.value.replace('%', '');
};

/**
 * Обработчик изменения значения масштаба.
 * Тут просто стиль надо допнуть
 */
const onScaleValueChange = function () {
  const currentScaleValue = getScaleValue() / 100;
  uploadPicturePreviewImgElement.style.transform = `scale(${currentScaleValue})`;
};

/**
 * Записать новое значение в поле с масштабом
 * @param {number} value значение масштаба 0..100
 */
const setScaleValue = function (value) {
  scaleControlValueElement.value = `${value}%`;
  onScaleValueChange();
};

/**
 * Обработчик клика на +/- масштаба
 * @param {number} changeValue на сколько изменить масштаб
 */
const changeScaleValue = function (changeValue) {
  const currentScaleValue = getScaleValue();
  const newScaleValue = currentScaleValue + changeValue;

  if (newScaleValue <= 0 || newScaleValue > SCALE_MAX_VALUE) {
    return;
  }
  setScaleValue(newScaleValue);
};

const onScaleControlSmallerClick = function () {
  changeScaleValue(SCALE_STEP * -1);
};

const onScaleControlBiggerClick = function () {
  changeScaleValue(SCALE_STEP);
};

const initScalePicture = function () {
  scaleControlSmallerElement.addEventListener(
    'click',
    onScaleControlSmallerClick
  );
  scaleControlBiggerElement.addEventListener(
    'click',
    onScaleControlBiggerClick
  );
  scaleControlValueElement.addEventListener('change', onScaleValueChange);
  setScaleValue(SCALE_DEFAULT_VALUE);
  onScaleValueChange();
};

export { initScalePicture };
