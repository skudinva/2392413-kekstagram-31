import { ERROR_DATA_SHOW_TIME } from './config';
import {
  errorDataContainerElement,
  errorDataTitleElement,
} from './page-elements';

/**
 * Показать предупреждение
 * @param {string} errorText текст предупреждени
 */
const showErrorData = function (errorText) {
  if (errorText) {
    errorDataTitleElement.textContent = errorText;
  }
  document.body.appendChild(errorDataContainerElement);
  setTimeout(() => {
    errorDataContainerElement.remove();
  }, ERROR_DATA_SHOW_TIME);
};

export { showErrorData };
