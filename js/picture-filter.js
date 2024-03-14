import { DEBOUNCE_TIMEOUT } from './config';
import { filterButtons, filterContainer, filterForm } from './page-elements';
import {
  getPictureCount,
  getSelectedFilter,
  setSelectedFilter,
  setUseDebaunce,
  useDebaunce,
} from './picture-state';
import { createThumbnails } from './thumbnails';
import { addOrRemoveClass, debounce } from './utils';

/**
 * Устранение дребезга. Перерисовываем фото только через DEBOUNCE_TIMEOUT
 */
const createThumbnailsDebounce = debounce(createThumbnails, DEBOUNCE_TIMEOUT);

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

  if (useDebaunce()) {
    createThumbnailsDebounce();
  } else {
    createThumbnails();
    setUseDebaunce(true);
  }
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

const initFilters = async function () {
  filterForm.addEventListener('click', onFilterClick);
  addOrRemoveClass(
    filterContainer,
    'img-filters--inactive',
    getPictureCount() === 0
  );

  applyFilter(filterForm.querySelector('.img-filters__button--active'));
};

export { initFilters };
