import {
  DEBOUNCE_TIMEOUT,
  filterButtons,
  filterContainer,
  filterForm,
} from './const';
import { createThumbnails } from './draw-thumbnails';
import {
  getPictureCount,
  getSelectedFilter,
  setSelectedFilter,
} from './picture-state';
import { addOrRemoveClass, debounce } from './utils';

/**
 * Устранение дребезга. Перерисовываем фото только через DEBOUNCE_TIMEOUT
 */
const drawThumbnailsDebounce = debounce(createThumbnails, DEBOUNCE_TIMEOUT);

/**
 * Отрисовка выбранного фильтра
 */
const renderActiveFilter = function () {
  const currentFilter = getSelectedFilter();
  filterButtons.forEach((element) => {
    addOrRemoveClass(
      element,
      'img-filters__button--active',
      element === currentFilter
    );
  });

  drawThumbnailsDebounce();
};

/**
 * Применение выбранного фильтра
 */
const applyFilter = function (target) {
  setSelectedFilter(target);
  renderActiveFilter();
};

/**
 * Обработчик события клик по фильтру
 */
const onFilterClick = function (evt) {
  applyFilter(evt.target);
};

const initFilters = function () {
  applyFilter(filterForm.querySelector('.img-filters__button--active'));
  filterForm.addEventListener('click', onFilterClick);
  addOrRemoveClass(
    filterContainer,
    'img-filters--inactive',
    getPictureCount() === 0
  );
};

export { initFilters };
