import { ScaleProperties } from './config';
import {
  picturePreviewElement,
  scaleControlBiggerElement,
  scaleControlSmallerElement,
  scaleControlValueElement,
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
  picturePreviewElement.style.transform = `scale(${currentScaleValue})`;
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

  if (newScaleValue <= 0 || newScaleValue > ScaleProperties.MAX_VALUE) {
    return;
  }
  setScaleValue(newScaleValue);
};

const onScaleControlSmallerClick = function () {
  changeScaleValue(ScaleProperties.STEP * -1);
};

const onScaleControlBiggerClick = function () {
  changeScaleValue(ScaleProperties.STEP);
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
  setScaleValue(ScaleProperties.DEFAULT_VALUE);
  onScaleValueChange();
};

export { initScalePicture };
