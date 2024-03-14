import { effectStyle } from './config';
import {
  effectLevelSlider,
  effectLevelValue,
  effectList,
  imgUploadEffectLevel,
  uploadPicturePreviewImg,
} from './const';
import { addOrRemoveClass } from './utils';

/**
 * Создание слайдера
 */
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
});

/**
 * Получение выбранного эффекта
 */
const getSelectedEffect = function () {
  return effectList.querySelector('input[type="radio"][name="effect"]:checked')
    .value;
};

const setSelectedEffect = function (value) {
  effectList.querySelector(
    `input[type="radio"][value="${value}"]`
  ).checked = true;
};

/**
 * Обработчик изменения ползунка слайдера.
 * По выбранному эффеку получаем строку с css, добавляем ее в текущий стиль.
 * Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется
 * сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в
 * поле .effect-level__value в виде числа. При изменении уровня интенсивности эффекта
 * (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются
 * следующим образом (см. effectStyle).
 */
effectLevelSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = +effectLevelSlider.noUiSlider.get();
  const curentEffect = getSelectedEffect();
  const newStyleEffect = effectStyle[curentEffect]?.css(effectLevelValue.value);
  Object.assign(uploadPicturePreviewImg.style, newStyleEffect);
});

/**
 * Обработчик переключателя эффекта.
 * При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%):
 * слайдер, CSS-стиль изображения и значение поля должны обновляться.
 *
 * Проблема: точно сбрасывать до 100%? Страшно же.
 */
const onEffectItemClick = function (evt) {
  if (
    evt.target !== effectList &&
    !evt.target.classList.contains('effects__radio')
  ) {
    return;
  }
  const curentEffect = getSelectedEffect();
  const filterStyle = effectStyle[curentEffect];

  effectLevelSlider.noUiSlider.updateOptions(filterStyle.slider);
  effectLevelSlider.noUiSlider.set(filterStyle.slider.range.max);

  addOrRemoveClass(imgUploadEffectLevel, 'hidden', curentEffect === 'none');
};

//Навешиваем событие на весь список. В обработчике будем ловить evt.target.
effectList.addEventListener('click', onEffectItemClick);

/**
 * Это для того чтобы при открытии формы слайдер и его контейнер (элемент
 * .img-upload__effect-level) скрывались.
 */
const initEffectPicture = function () {
  setSelectedEffect('none');
  effectList.dispatchEvent(new Event('click'));
};

export { initEffectPicture };
