import { effectStyle } from './config';
import {
  effectLevelSlider,
  effectLevelValue,
  effectList,
  imgUploadEffectLevel,
  uploadPicturePreviewImg,
} from './page-elements';
import { addOrRemoveClass } from './utils';

/**
 * Получение выбранного эффекта
 */
const getSelectedEffect = function () {
  return effectList.querySelector('input[type="radio"][name="effect"]:checked')
    .value;
};

/**
 * Установить эффект
 */
const setSelectedEffect = function (value) {
  effectList.querySelector(
    `input[type="radio"][value="${value}"]`
  ).checked = true;
};

/**
 * Применить эффект
 */
const applyEffect = function () {
  effectLevelValue.value = +effectLevelSlider.noUiSlider.get();
  const curentEffect = getSelectedEffect();
  const newStyleEffect = effectStyle[curentEffect]?.css(effectLevelValue.value);
  Object.assign(uploadPicturePreviewImg.style, newStyleEffect);
};

/**
 * Создание слайдера
 */
const initUISlider = function () {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
  });

  /**
   * Обработчик изменения ползунка слайдера.
   * По выбранному эффеку получаем строку с css, добавляем ее в текущий стиль.
   * Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется
   * сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в
   * поле .effect-level__value в виде числа. При изменении уровня интенсивности эффекта
   * (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
   * следующим образом (см. effectStyle).
   */

  effectLevelSlider.noUiSlider.on('slide', applyEffect);
};

/**
 * Сброс состояния эффектов.
 * При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
 * слайдер, CSS-стиль изображения и значение поля должны обновляться.
 */
const resetEffect = function () {
  const curentEffect = getSelectedEffect();
  const sliderOption = effectStyle[curentEffect].slider;
  effectLevelSlider.noUiSlider.updateOptions(sliderOption);
  effectLevelSlider.noUiSlider.set(sliderOption.range.max);
  applyEffect();
  addOrRemoveClass(imgUploadEffectLevel, 'hidden', curentEffect === 'none');
};

/**
 * Обработчик переключателя эффекта.
 */
const onEffectItemClick = function (evt) {
  evt.preventDefault();
  if (
    evt.target !== effectList &&
    !evt.target.classList.contains('effects__radio')
  ) {
    return;
  }
  resetEffect();
};

/**
 * Инициализация эффектов.
 */
const initEffectPicture = function () {
  if (!effectLevelSlider.noUiSlider) {
    initUISlider();
  }
  effectList.addEventListener('change', onEffectItemClick);
  setSelectedEffect('none');
  resetEffect();
};

export { initEffectPicture, resetEffect };
