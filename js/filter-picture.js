import {
  DEBOUNCE_TIMEOUT,
  filterButtons,
  filterContainer,
  filterForm,
} from './const';
import { drawThumbnails } from './draw-thumbnails';
import { getSelectedFilter, setSelectedFilter } from './picture-state';
import { debounce } from './utils';

const drawThumbnailsDebounce = debounce(drawThumbnails, DEBOUNCE_TIMEOUT);

const setActiveFilter = function () {
  const currentFilter = getSelectedFilter();
  filterButtons.forEach((element) => {
    if (element === currentFilter) {
      currentFilter.classList.add('img-filters__button--active');
    } else {
      element.classList.remove('img-filters__button--active');
    }
  });

  drawThumbnailsDebounce();
};

const applyFilter = function (target) {
  setSelectedFilter(target);
  setActiveFilter();
};

const onFilterClick = function (evt) {
  evt.preventDefault();
  applyFilter(evt.target);
};

const initFilters = function () {
  filterContainer.classList.remove('img-filters--inactive');
  applyFilter(filterForm.querySelector('.img-filters__button--active'));
  filterForm.addEventListener('click', onFilterClick);
};

export { initFilters };
