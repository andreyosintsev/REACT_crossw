
import ModalBackdropStyles from './modal-backdrop.module.css';

/**
 * @component - Компонент фонового затемнения для модальных окон
 * @param {Function} onClick - Обработчик клика по фону (обычно закрытие модалки)
 * @returns {JSX.Element} Затемненный фон модального окна
 * 
 * @description
 * Компонент реализует фоновое затемнение с:
 * - Полупрозрачным черным фоном
 * - Занимает всю видимую область экрана
 * - Обработчиком клика для закрытия
 * - Фиксированным позиционированием
 * 
 * @styleFeatures
 * 1. Анимация появления/исчезновения
 * 2. Блокировка скролла контента под модалкой
 * 3. Высокий z-index для перекрытия других элементов
 * 
 * @note
 * Компонент должен использоваться вместе с Modal для корректной работы
 * 
 * @see ModalBackdropStyles Модуль стилей фона
 * @see Modal Компонент модального окна
**/
const ModalBackdrop = ({onClick}) => {
  return (
    <div className={ModalBackdropStyles.backdrop} onClick={onClick}></div>
  );
};

export default ModalBackdrop