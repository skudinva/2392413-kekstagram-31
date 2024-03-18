import { ERROR_DATA_SHOW_TIME } from './config';
import { errorDataContainer, errorDataTitle } from './page-elements';

/**
 * Показать предупреждение
 * @param {string} errorText текст предупреждени
 */
const showErrorData = function (errorText) {
  if (errorText) {
    errorDataTitle.textContent = errorText;
  }
  document.body.appendChild(errorDataContainer);
  setTimeout(() => {
    errorDataContainer.remove();
  }, ERROR_DATA_SHOW_TIME);
};

export { showErrorData };
