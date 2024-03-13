import {
  SCALE_DEFAULT_VALUE,
  SCALE_MAX_VALUE,
  SCALE_STEP,
  scaleControlBigger,
  scaleControlSmaller,
  scaleControlValue,
  uploadPicturePreviewImg,
} from './const';

/**
 * Функция получения текущего значения масштаба в процентах
 */
const getScaleValue = function () {
  return +scaleControlValue.value.replace('%', '');
};

/**
 * Обработчик изменения значения масштаба.
 * Тут просто стиль надо допнуть
 */
const onScaleValueChange = function () {
  const currentScaleValue = getScaleValue() / 100;
  uploadPicturePreviewImg.style.transform = `scale(${currentScaleValue})`;
};

/**
 * Записать новое значение в поле с масштабом
 */
const setScaleValue = function (value) {
  scaleControlValue.value = `${value}%`;
  onScaleValueChange();
};

/**
 * Обработчик клика на +/- масштаба
 * dispatchEvent тут вызываю т.к. value у scaleControlValue изменяю программно и
 * события change|input не отрабатывают. Решил искусственно вызвать чтобы отработал
 * лиснер. Ну опять же вдруг readonly уберут у scaleControlValue и тогда с клавиатуры
 * все будет работать.
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

scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);
scaleControlValue.addEventListener('change', onScaleValueChange);

const initScalePicture = function () {
  setScaleValue(SCALE_DEFAULT_VALUE);
  onScaleValueChange();
};

export { initScalePicture };
